import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { toast } from 'sonner';
import { format, addDays, addMonths, addYears, isPast, isFuture } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  Key, 
  Users, 
  BookOpen, 
  Bell, 
  BarChart3, 
  Copy, 
  Plus, 
  Power, 
  PowerOff,
  RefreshCw,
  Send,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Smartphone
} from 'lucide-react';

interface Client {
  id: string;
  salon_name: string;
  owner_name: string | null;
}

interface SubscriptionCode {
  id: string;
  client_id: string | null;
  code: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  used_at: string | null;
  used_by_email: string | null;
  created_at: string;
  clients?: Client | null;
}

interface AppUser {
  subscription_code: string;
  user_email: string;
  client_id: string | null;
  last_activity: string;
  clients?: Client | null;
}

interface Notification {
  id: string;
  client_id: string | null;
  title: string;
  message: string;
  notification_type: string;
  is_sent: boolean;
  sent_at: string | null;
  created_at: string;
  clients?: Client | null;
}

interface Activity {
  id: string;
  client_id: string | null;
  subscription_code: string | null;
  user_email: string | null;
  event_type: string;
  event_data: unknown;
  created_at: string;
  clients?: Client | null;
}

export default function ClientAppManagement() {
  const { user } = useAuth();
  const { isSzef } = useUserRole();
  const [activeTab, setActiveTab] = useState('codes');
  
  // Kody
  const [codes, setCodes] = useState<SubscriptionCode[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(true);
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [validityPeriod, setValidityPeriod] = useState<string>('30');
  const [generatingCode, setGeneratingCode] = useState(false);
  const [codeFilter, setCodeFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');
  
  // Użytkownicy
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  
  // Powiadomienia
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');
  const [notificationTarget, setNotificationTarget] = useState<string>('all');
  const [sendingNotification, setSendingNotification] = useState(false);
  
  // Aktywność
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  // Fetch codes
  useEffect(() => {
    fetchCodes();
    fetchClients();
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'users') {
      fetchAppUsers();
    } else if (activeTab === 'notifications') {
      fetchNotifications();
    } else if (activeTab === 'stats') {
      fetchActivities();
    }
  }, [activeTab]);

  const fetchCodes = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_codes')
        .select(`
          *,
          clients (id, salon_name, owner_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCodes(data || []);
    } catch (error) {
      console.error('Error fetching codes:', error);
      toast.error('Błąd podczas pobierania kodów');
    } finally {
      setLoadingCodes(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('id, salon_name, owner_name')
        .order('salon_name');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchAppUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from('client_app_activity')
        .select(`
          subscription_code,
          user_email,
          client_id,
          created_at,
          clients (id, salon_name, owner_name)
        `)
        .eq('event_type', 'login')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by email to get unique users with their last activity
      const usersMap = new Map<string, AppUser>();
      (data || []).forEach(activity => {
        if (activity.user_email && !usersMap.has(activity.user_email)) {
          usersMap.set(activity.user_email, {
            subscription_code: activity.subscription_code || '',
            user_email: activity.user_email,
            client_id: activity.client_id,
            last_activity: activity.created_at,
            clients: activity.clients as Client | null
          });
        }
      });

      setAppUsers(Array.from(usersMap.values()));
    } catch (error) {
      console.error('Error fetching app users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const { data, error } = await supabase
        .from('client_app_notifications')
        .select(`
          *,
          clients (id, salon_name, owner_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchActivities = async () => {
    setLoadingActivities(true);
    try {
      const { data, error } = await supabase
        .from('client_app_activity')
        .select(`
          *,
          clients (id, salon_name, owner_name)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const generateCode = async () => {
    if (!selectedClient) {
      toast.error('Wybierz klienta');
      return;
    }

    setGeneratingCode(true);
    try {
      // Generate unique code
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_subscription_code');

      if (codeError) throw codeError;

      const code = codeData as string;

      // Calculate validity dates
      const validFrom = new Date();
      let validUntil: Date;
      
      switch (validityPeriod) {
        case '30':
          validUntil = addDays(validFrom, 30);
          break;
        case '90':
          validUntil = addDays(validFrom, 90);
          break;
        case '180':
          validUntil = addMonths(validFrom, 6);
          break;
        case '365':
          validUntil = addYears(validFrom, 1);
          break;
        default:
          validUntil = addDays(validFrom, 30);
      }

      const { error: insertError } = await supabase
        .from('subscription_codes')
        .insert({
          client_id: selectedClient,
          code,
          valid_from: format(validFrom, 'yyyy-MM-dd'),
          valid_until: format(validUntil, 'yyyy-MM-dd'),
          created_by: user?.id
        });

      if (insertError) throw insertError;

      toast.success(`Wygenerowano kod: ${code}`);
      setCodeDialogOpen(false);
      setSelectedClient('');
      setValidityPeriod('30');
      fetchCodes();
    } catch (error) {
      console.error('Error generating code:', error);
      toast.error('Błąd podczas generowania kodu');
    } finally {
      setGeneratingCode(false);
    }
  };

  const toggleCodeStatus = async (codeId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('subscription_codes')
        .update({ is_active: !currentStatus })
        .eq('id', codeId);

      if (error) throw error;

      toast.success(currentStatus ? 'Kod dezaktywowany' : 'Kod aktywowany');
      fetchCodes();
    } catch (error) {
      console.error('Error toggling code status:', error);
      toast.error('Błąd podczas zmiany statusu');
    }
  };

  const deleteCode = async (codeId: string) => {
    if (!isSzef) {
      toast.error('Tylko szef może usuwać kody');
      return;
    }

    try {
      const { error } = await supabase
        .from('subscription_codes')
        .delete()
        .eq('id', codeId);

      if (error) throw error;

      toast.success('Kod usunięty');
      fetchCodes();
    } catch (error) {
      console.error('Error deleting code:', error);
      toast.error('Błąd podczas usuwania kodu');
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Skopiowano kod do schowka');
  };

  const sendNotification = async () => {
    if (!notificationTitle || !notificationMessage) {
      toast.error('Wypełnij wszystkie pola');
      return;
    }

    setSendingNotification(true);
    try {
      const { error } = await supabase
        .from('client_app_notifications')
        .insert({
          client_id: notificationTarget === 'all' ? null : notificationTarget,
          title: notificationTitle,
          message: notificationMessage,
          notification_type: notificationType,
          is_sent: true,
          sent_at: new Date().toISOString(),
          created_by: user?.id
        });

      if (error) throw error;

      toast.success('Powiadomienie wysłane');
      setNotificationDialogOpen(false);
      setNotificationTitle('');
      setNotificationMessage('');
      setNotificationType('info');
      setNotificationTarget('all');
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('Błąd podczas wysyłania powiadomienia');
    } finally {
      setSendingNotification(false);
    }
  };

  const getCodeStatus = (code: SubscriptionCode): { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' } => {
    if (code.used_at) {
      return { label: 'Użyty', variant: 'secondary' };
    }
    if (!code.is_active) {
      return { label: 'Dezaktywowany', variant: 'destructive' };
    }
    if (isPast(new Date(code.valid_until))) {
      return { label: 'Wygasły', variant: 'destructive' };
    }
    return { label: 'Aktywny', variant: 'default' };
  };

  const filteredCodes = codes.filter(code => {
    if (codeFilter === 'all') return true;
    const status = getCodeStatus(code);
    if (codeFilter === 'active') return status.label === 'Aktywny';
    if (codeFilter === 'used') return status.label === 'Użyty';
    if (codeFilter === 'expired') return status.label === 'Wygasły' || status.label === 'Dezaktywowany';
    return true;
  });

  const getEventTypeLabel = (eventType: string): string => {
    const labels: Record<string, string> = {
      'login': 'Logowanie',
      'view_campaign': 'Podgląd kampanii',
      'view_document': 'Podgląd dokumentu',
      'view_content': 'Podgląd treści',
      'register': 'Rejestracja'
    };
    return labels[eventType] || eventType;
  };

  // Stats
  const totalCodes = codes.length;
  const activeCodes = codes.filter(c => getCodeStatus(c).label === 'Aktywny').length;
  const usedCodes = codes.filter(c => c.used_at).length;
  const activeUsers = appUsers.length;

  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Aurine Academy</h1>
              <p className="text-muted-foreground">Zarządzaj dostępem i treściami w aplikacji edukacyjnej dla klientek</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border-pink-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Key className="w-8 h-8 text-pink-500" />
                <div>
                  <p className="text-2xl font-bold">{totalCodes}</p>
                  <p className="text-xs text-muted-foreground">Wszystkie kody</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{activeCodes}</p>
                  <p className="text-xs text-muted-foreground">Aktywne kody</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{usedCodes}</p>
                  <p className="text-xs text-muted-foreground">Użyte kody</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Aktywni użytkownicy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="codes" className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <span className="hidden sm:inline">Kody</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Użytkownicy</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Treści</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Powiadomienia</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Statystyki</span>
            </TabsTrigger>
          </TabsList>

          {/* Kody dostępu */}
          <TabsContent value="codes" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Select value={codeFilter} onValueChange={(v) => setCodeFilter(v as typeof codeFilter)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtruj kody" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Wszystkie</SelectItem>
                  <SelectItem value="active">Aktywne</SelectItem>
                  <SelectItem value="used">Użyte</SelectItem>
                  <SelectItem value="expired">Wygasłe/Dezaktywowane</SelectItem>
                </SelectContent>
              </Select>

              <Dialog open={codeDialogOpen} onOpenChange={setCodeDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Generuj nowy kod
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Generuj kod abonamentowy</DialogTitle>
                    <DialogDescription>
                      Wygeneruj unikalny kod dostępu do aplikacji dla klientki
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Klient</Label>
                      <Select value={selectedClient} onValueChange={setSelectedClient}>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz klienta" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.salon_name} {client.owner_name && `(${client.owner_name})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Okres ważności</Label>
                      <Select value={validityPeriod} onValueChange={setValidityPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 dni</SelectItem>
                          <SelectItem value="90">90 dni</SelectItem>
                          <SelectItem value="180">6 miesięcy</SelectItem>
                          <SelectItem value="365">1 rok</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCodeDialogOpen(false)}>
                      Anuluj
                    </Button>
                    <Button onClick={generateCode} disabled={generatingCode}>
                      {generatingCode ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generowanie...
                        </>
                      ) : (
                        <>
                          <Key className="w-4 h-4 mr-2" />
                          Generuj kod
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Kod</TableHead>
                      <TableHead>Klient</TableHead>
                      <TableHead>Ważny do</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Użyty przez</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingCodes ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : filteredCodes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Brak kodów do wyświetlenia
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCodes.map(code => {
                        const status = getCodeStatus(code);
                        return (
                          <TableRow key={code.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                  {code.code}
                                </code>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => copyCode(code.code)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              {code.clients?.salon_name || '-'}
                            </TableCell>
                            <TableCell>
                              {format(new Date(code.valid_until), 'd MMM yyyy', { locale: pl })}
                            </TableCell>
                            <TableCell>
                              <Badge variant={status.variant}>
                                {status.label}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {code.used_by_email || '-'}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => toggleCodeStatus(code.id, code.is_active)}
                                  title={code.is_active ? 'Dezaktywuj' : 'Aktywuj'}
                                >
                                  {code.is_active ? (
                                    <PowerOff className="w-4 h-4 text-destructive" />
                                  ) : (
                                    <Power className="w-4 h-4 text-green-500" />
                                  )}
                                </Button>
                                {isSzef && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    onClick={() => deleteCode(code.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Użytkownicy aplikacji */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Użytkownicy aplikacji</CardTitle>
                <CardDescription>
                  Lista klientek, które zarejestrowały się w aplikacji
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Kod</TableHead>
                      <TableHead>Klient</TableHead>
                      <TableHead>Ostatnia aktywność</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingUsers ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : appUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Brak zarejestrowanych użytkowników
                        </TableCell>
                      </TableRow>
                    ) : (
                      appUsers.map((appUser, index) => (
                        <TableRow key={index}>
                          <TableCell>{appUser.user_email}</TableCell>
                          <TableCell>
                            <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                              {appUser.subscription_code}
                            </code>
                          </TableCell>
                          <TableCell>{appUser.clients?.salon_name || '-'}</TableCell>
                          <TableCell>
                            {format(new Date(appUser.last_activity), 'd MMM yyyy, HH:mm', { locale: pl })}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Treści */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Zarządzanie treściami</CardTitle>
                    <CardDescription>
                      Kursy, materiały i przewodniki dostępne w aplikacji
                    </CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Dodaj treść
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Zarządzanie treściami będzie dostępne po integracji z aplikacją kliencką</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Powiadomienia */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={notificationDialogOpen} onOpenChange={setNotificationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700">
                    <Send className="w-4 h-4 mr-2" />
                    Wyślij powiadomienie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Wyślij powiadomienie</DialogTitle>
                    <DialogDescription>
                      Wyślij powiadomienie push do użytkowników aplikacji
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Odbiorca</Label>
                      <Select value={notificationTarget} onValueChange={setNotificationTarget}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Wszyscy użytkownicy</SelectItem>
                          {clients.map(client => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.salon_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Typ powiadomienia</Label>
                      <Select value={notificationType} onValueChange={setNotificationType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Informacja</SelectItem>
                          <SelectItem value="campaign_update">Aktualizacja kampanii</SelectItem>
                          <SelectItem value="new_content">Nowa treść</SelectItem>
                          <SelectItem value="document">Nowy dokument</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tytuł</Label>
                      <Input
                        value={notificationTitle}
                        onChange={(e) => setNotificationTitle(e.target.value)}
                        placeholder="Tytuł powiadomienia"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Treść</Label>
                      <Textarea
                        value={notificationMessage}
                        onChange={(e) => setNotificationMessage(e.target.value)}
                        placeholder="Treść powiadomienia"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setNotificationDialogOpen(false)}>
                      Anuluj
                    </Button>
                    <Button onClick={sendNotification} disabled={sendingNotification}>
                      {sendingNotification ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Wyślij
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Historia powiadomień</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tytuł</TableHead>
                      <TableHead>Odbiorca</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Data wysłania</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingNotifications ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : notifications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          Brak wysłanych powiadomień
                        </TableCell>
                      </TableRow>
                    ) : (
                      notifications.map(notification => (
                        <TableRow key={notification.id}>
                          <TableCell className="font-medium">{notification.title}</TableCell>
                          <TableCell>{notification.clients?.salon_name || 'Wszyscy'}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{notification.notification_type}</Badge>
                          </TableCell>
                          <TableCell>
                            {notification.sent_at 
                              ? format(new Date(notification.sent_at), 'd MMM yyyy, HH:mm', { locale: pl })
                              : '-'
                            }
                          </TableCell>
                          <TableCell>
                            {notification.is_sent ? (
                              <Badge variant="default">Wysłane</Badge>
                            ) : (
                              <Badge variant="secondary">W kolejce</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statystyki */}
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ostatnia aktywność</CardTitle>
                <CardDescription>
                  Ostatnie 100 zdarzeń z aplikacji klienckiej
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Użytkownik</TableHead>
                      <TableHead>Klient</TableHead>
                      <TableHead>Zdarzenie</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingActivities ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ) : activities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Brak zarejestrowanej aktywności
                        </TableCell>
                      </TableRow>
                    ) : (
                      activities.map(activity => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            {format(new Date(activity.created_at), 'd MMM yyyy, HH:mm', { locale: pl })}
                          </TableCell>
                          <TableCell>{activity.user_email || '-'}</TableCell>
                          <TableCell>{activity.clients?.salon_name || '-'}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getEventTypeLabel(activity.event_type)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

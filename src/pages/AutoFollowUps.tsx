import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { format, addDays, isPast, isToday, isFuture } from 'date-fns';
import { pl } from 'date-fns/locale';
import {
  Loader2, Mail, Send, Clock, CheckCircle2, AlertCircle,
  Calendar, User, Building2, Play, Pause, RefreshCw, Zap, Settings2, FileText, MessageSquare, Key, Save, Eye, EyeOff, History, XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LeadFollowUp {
  id: string;
  salon_name: string;
  owner_name: string | null;
  email: string | null;
  email_from: string | null;
  cold_email_sent: boolean;
  cold_email_date: string | null;
  email_follow_up_1_sent: boolean;
  email_follow_up_1_date: string | null;
  email_follow_up_2_sent: boolean;
  email_follow_up_2_date: string | null;
  status: string;
}

interface ZohoCredentials {
  id?: string;
  email_account: string;
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

interface FollowUpLog {
  id: string;
  lead_id: string;
  lead_name: string;
  email_to: string;
  email_from: string;
  template_name: string | null;
  followup_type: string;
  status: string;
  error_message: string | null;
  created_at: string;
}

export default function AutoFollowUps() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadFollowUp[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  const [credentials, setCredentials] = useState<ZohoCredentials[]>([]);
  const [logs, setLogs] = useState<FollowUpLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [savingCredentials, setSavingCredentials] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  
  // Form states for both accounts
  const [kontaktCreds, setKontaktCreds] = useState<ZohoCredentials>({
    email_account: 'kontakt@aurine.pl',
    client_id: '',
    client_secret: '',
    refresh_token: '',
  });
  const [biuroCreds, setBiuroCreds] = useState<ZohoCredentials>({
    email_account: 'biuro@aurine.pl',
    client_id: '',
    client_secret: '',
    refresh_token: '',
  });

  useEffect(() => {
    fetchLeads();
    fetchCredentials();
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLogsLoading(true);
    const { data, error } = await supabase
      .from('auto_followup_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (!error && data) {
      setLogs(data);
    }
    setLogsLoading(false);
  };

  const fetchCredentials = async () => {
    const { data, error } = await supabase
      .from('zoho_credentials')
      .select('*');
    
    if (!error && data) {
      setCredentials(data);
      
      // Populate form fields
      const kontakt = data.find(c => c.email_account === 'kontakt@aurine.pl');
      const biuro = data.find(c => c.email_account === 'biuro@aurine.pl');
      
      if (kontakt) {
        setKontaktCreds({
          id: kontakt.id,
          email_account: kontakt.email_account,
          client_id: kontakt.client_id,
          client_secret: kontakt.client_secret,
          refresh_token: kontakt.refresh_token,
        });
      }
      if (biuro) {
        setBiuroCreds({
          id: biuro.id,
          email_account: biuro.email_account,
          client_id: biuro.client_id,
          client_secret: biuro.client_secret,
          refresh_token: biuro.refresh_token,
        });
      }
    }
  };

  const saveCredentials = async (creds: ZohoCredentials) => {
    setSavingCredentials(true);
    try {
      if (creds.id) {
        // Update existing
        const { error } = await supabase
          .from('zoho_credentials')
          .update({
            client_id: creds.client_id,
            client_secret: creds.client_secret,
            refresh_token: creds.refresh_token,
          })
          .eq('id', creds.id);
        
        if (error) throw error;
      } else {
        // Insert new
        const { error } = await supabase
          .from('zoho_credentials')
          .insert({
            email_account: creds.email_account,
            client_id: creds.client_id,
            client_secret: creds.client_secret,
            refresh_token: creds.refresh_token,
          });
        
        if (error) throw error;
      }
      
      toast.success(`Zapisano kredencjały dla ${creds.email_account}`);
      fetchCredentials();
    } catch (error: any) {
      toast.error(`Błąd: ${error.message}`);
    }
    setSavingCredentials(false);
  };

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('id, salon_name, owner_name, email, email_from, cold_email_sent, cold_email_date, email_follow_up_1_sent, email_follow_up_1_date, email_follow_up_2_sent, email_follow_up_2_date, status')
      .eq('cold_email_sent', true)
      .not('status', 'in', '("converted","lost")')
      .order('cold_email_date', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  const runAutoFollowUps = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-auto-followups');
      
      if (error) throw error;
      
      toast.success(`Wysłano ${data.sent} follow-upów automatycznie`);
      fetchLeads();
      fetchLogs();
    } catch (error: any) {
      toast.error('Błąd podczas przetwarzania follow-upów');
      console.error(error);
    }
    setProcessing(false);
  };

  const recentLogs = logs.slice(0, 10);
  const sentCount = logs.filter(l => l.status === 'sent').length;
  const failedCount = logs.filter(l => l.status === 'failed').length;

  const getFollowUpStatus = (lead: LeadFollowUp) => {
    if (lead.email_follow_up_2_sent) return { label: 'Zakończono', color: 'bg-green-500/20 text-green-400', step: 3 };
    if (lead.email_follow_up_1_sent) return { label: 'FU #2 w kolejce', color: 'bg-blue-500/20 text-blue-400', step: 2 };
    if (lead.cold_email_sent) return { label: 'FU #1 w kolejce', color: 'bg-amber-500/20 text-amber-400', step: 1 };
    return { label: 'Nie rozpoczęto', color: 'bg-zinc-500/20 text-zinc-400', step: 0 };
  };

  const getNextFollowUpDate = (lead: LeadFollowUp): string | null => {
    if (!lead.cold_email_date) return null;
    
    if (!lead.email_follow_up_1_sent) {
      return lead.email_follow_up_1_date || addDays(new Date(lead.cold_email_date), 3).toISOString().split('T')[0];
    }
    if (!lead.email_follow_up_2_sent && lead.email_follow_up_1_date) {
      return lead.email_follow_up_2_date || addDays(new Date(lead.email_follow_up_1_date), 4).toISOString().split('T')[0];
    }
    return null;
  };

  const pendingToday = leads.filter(l => {
    const nextDate = getNextFollowUpDate(l);
    return nextDate && (isPast(new Date(nextDate)) || isToday(new Date(nextDate)));
  });

  const pendingFuture = leads.filter(l => {
    const nextDate = getNextFollowUpDate(l);
    return nextDate && isFuture(new Date(nextDate)) && !isToday(new Date(nextDate));
  });

  const completed = leads.filter(l => l.email_follow_up_2_sent);

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              Automatyczne Follow-upy
            </h1>
            <p className="text-muted-foreground mt-1">Zarządzaj sekwencją email follow-upów</p>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={showCredentialsDialog} onOpenChange={setShowCredentialsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Key className="w-4 h-4" />
                  Zoho API
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Key className="w-5 h-5" />
                    Konfiguracja Zoho Mail API
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* kontakt@aurine.pl */}
                  <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      kontakt@aurine.pl
                      {kontaktCreds.id && <Badge className="bg-green-500/20 text-green-400 text-xs">Skonfigurowano</Badge>}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label>Client ID</Label>
                        <Input 
                          value={kontaktCreds.client_id}
                          onChange={(e) => setKontaktCreds({...kontaktCreds, client_id: e.target.value})}
                          placeholder="1000.XXXXXX..."
                        />
                      </div>
                      <div>
                        <Label>Client Secret</Label>
                        <div className="relative">
                          <Input 
                            type={showSecrets['kontakt_secret'] ? 'text' : 'password'}
                            value={kontaktCreds.client_secret}
                            onChange={(e) => setKontaktCreds({...kontaktCreds, client_secret: e.target.value})}
                            placeholder="***"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowSecrets({...showSecrets, kontakt_secret: !showSecrets['kontakt_secret']})}
                          >
                            {showSecrets['kontakt_secret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Refresh Token</Label>
                        <div className="relative">
                          <Input 
                            type={showSecrets['kontakt_token'] ? 'text' : 'password'}
                            value={kontaktCreds.refresh_token}
                            onChange={(e) => setKontaktCreds({...kontaktCreds, refresh_token: e.target.value})}
                            placeholder="1000.XXXXXX..."
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowSecrets({...showSecrets, kontakt_token: !showSecrets['kontakt_token']})}
                          >
                            {showSecrets['kontakt_token'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={() => saveCredentials(kontaktCreds)} 
                        disabled={savingCredentials || !kontaktCreds.client_id || !kontaktCreds.client_secret || !kontaktCreds.refresh_token}
                        className="w-full"
                      >
                        {savingCredentials ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Zapisz kontakt@aurine.pl
                      </Button>
                    </div>
                  </div>

                  {/* biuro@aurine.pl */}
                  <div className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border/50">
                    <h3 className="font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      biuro@aurine.pl
                      {biuroCreds.id && <Badge className="bg-green-500/20 text-green-400 text-xs">Skonfigurowano</Badge>}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <Label>Client ID</Label>
                        <Input 
                          value={biuroCreds.client_id}
                          onChange={(e) => setBiuroCreds({...biuroCreds, client_id: e.target.value})}
                          placeholder="1000.XXXXXX..."
                        />
                      </div>
                      <div>
                        <Label>Client Secret</Label>
                        <div className="relative">
                          <Input 
                            type={showSecrets['biuro_secret'] ? 'text' : 'password'}
                            value={biuroCreds.client_secret}
                            onChange={(e) => setBiuroCreds({...biuroCreds, client_secret: e.target.value})}
                            placeholder="***"
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowSecrets({...showSecrets, biuro_secret: !showSecrets['biuro_secret']})}
                          >
                            {showSecrets['biuro_secret'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Refresh Token</Label>
                        <div className="relative">
                          <Input 
                            type={showSecrets['biuro_token'] ? 'text' : 'password'}
                            value={biuroCreds.refresh_token}
                            onChange={(e) => setBiuroCreds({...biuroCreds, refresh_token: e.target.value})}
                            placeholder="1000.XXXXXX..."
                          />
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                            onClick={() => setShowSecrets({...showSecrets, biuro_token: !showSecrets['biuro_token']})}
                          >
                            {showSecrets['biuro_token'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button 
                        onClick={() => saveCredentials(biuroCreds)} 
                        disabled={savingCredentials || !biuroCreds.client_id || !biuroCreds.client_secret || !biuroCreds.refresh_token}
                        className="w-full"
                      >
                        {savingCredentials ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Zapisz biuro@aurine.pl
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm text-amber-200">
                    <p className="font-medium mb-1">Jak uzyskać tokeny Zoho?</p>
                    <ol className="list-decimal list-inside space-y-1 text-amber-300/80">
                      <li>Przejdź do <a href="https://api-console.zoho.eu/" target="_blank" rel="noopener noreferrer" className="underline">Zoho API Console</a></li>
                      <li>Utwórz Self Client i skopiuj Client ID oraz Client Secret</li>
                      <li>Wygeneruj refresh token z odpowiednimi uprawnieniami (ZohoMail.messages.ALL, ZohoMail.accounts.READ)</li>
                    </ol>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Link to="/templates">
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Szablony
              </Button>
            </Link>
            <Dialog open={showLogsDialog} onOpenChange={setShowLogsDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <History className="w-4 h-4" />
                  Historia ({logs.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Historia wysyłek follow-upów
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">{sentCount} wysłanych</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400 font-medium">{failedCount} błędów</span>
                    </div>
                  </div>

                  {/* Logs List */}
                  <ScrollArea className="h-[400px]">
                    {logsLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    ) : logs.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Brak historii wysyłek</p>
                      </div>
                    ) : (
                      <div className="space-y-2 pr-4">
                        {logs.map((log) => (
                          <div
                            key={log.id}
                            className={`p-3 rounded-lg border ${
                              log.status === 'sent' 
                                ? 'bg-green-500/5 border-green-500/20' 
                                : 'bg-red-500/5 border-red-500/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {log.status === 'sent' ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                ) : (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                )}
                                <span className="font-medium text-foreground">{log.lead_name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {log.followup_type === 'followup_1' ? 'FU #1' : 'FU #2'}
                                </Badge>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(log.created_at), 'd MMM yyyy, HH:mm', { locale: pl })}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <span>z {log.email_from}</span>
                              <span className="mx-2">→</span>
                              <span>{log.email_to}</span>
                            </div>
                            {log.error_message && (
                              <p className="text-xs text-red-400 mt-1">{log.error_message}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              onClick={runAutoFollowUps} 
              disabled={processing}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
            >
              {processing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
              Wyślij zaległe
            </Button>
          </div>
        </div>

        {/* Info banner */}
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Settings2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Automatyczne wysyłanie</p>
                <p className="text-xs text-muted-foreground">
                  System automatycznie sprawdza codziennie o 9:00 czy są zaległe follow-upy i je wysyła.
                  Przycisk "Wyślij zaległe" pozwala ręcznie uruchomić wysyłkę.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">{pendingToday.length}</p>
                  <p className="text-xs text-muted-foreground">Do wysłania dziś</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{pendingFuture.length}</p>
                  <p className="text-xs text-muted-foreground">Zaplanowane</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{leads.length}</p>
                  <p className="text-xs text-muted-foreground">W sekwencji</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{completed.length}</p>
                  <p className="text-xs text-muted-foreground">Ukończone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Today */}
        {pendingToday.length > 0 && (
          <Card className="border-red-500/30 bg-gradient-to-r from-red-500/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Do wysłania dziś ({pendingToday.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingToday.map((lead) => {
                  const status = getFollowUpStatus(lead);
                  return (
                    <div
                      key={lead.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/60 border border-border/50 hover:border-red-500/30 cursor-pointer transition-all"
                      onClick={() => navigate(`/leads/${lead.id}`)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                          <User className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lead.salon_name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={status.color}>{status.label}</Badge>
                        <span className="text-xs text-muted-foreground">z {lead.email_from}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Leads in Sequence */}
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Wszystkie leady w sekwencji
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={fetchLeads}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leads.map((lead) => {
                const status = getFollowUpStatus(lead);
                const nextDate = getNextFollowUpDate(lead);
                
                return (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{lead.salon_name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{lead.owner_name || 'Brak właściciela'}</span>
                          <span>•</span>
                          <span>{lead.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Progress indicator */}
                      <div className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${lead.cold_email_sent ? 'bg-green-500' : 'bg-zinc-600'}`} />
                        <div className={`w-3 h-3 rounded-full ${lead.email_follow_up_1_sent ? 'bg-green-500' : 'bg-zinc-600'}`} />
                        <div className={`w-3 h-3 rounded-full ${lead.email_follow_up_2_sent ? 'bg-green-500' : 'bg-zinc-600'}`} />
                      </div>
                      <Badge className={status.color}>{status.label}</Badge>
                      {nextDate && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(nextDate), 'd MMM', { locale: pl })}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {leads.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Brak leadów w sekwencji follow-upów</p>
                  <p className="text-sm mt-1">Wyślij cold email do leada, aby rozpocząć sekwencję</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

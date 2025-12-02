import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  ArrowLeft,
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Facebook,
  Calendar,
  DollarSign,
  FileText,
  Target,
  TrendingUp,
  Loader2,
  ExternalLink,
  User,
  CheckSquare,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Client {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  facebook_page: string | null;
  status: string;
  contract_start_date: string | null;
  monthly_budget: number | null;
  notes: string | null;
  created_at: string;
  assigned_to: string | null;
}

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
}

interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number | null;
  start_date: string;
  end_date: string | null;
  objective: string | null;
}

interface Document {
  id: string;
  type: string;
  title: string;
  subtitle: string | null;
  thumbnail: string | null;
  created_at: string;
}

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
}

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  churned: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabels: Record<string, string> = {
  active: 'Aktywny',
  paused: 'Wstrzymany',
  churned: 'Zakończony',
};

const campaignStatusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400',
  paused: 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-blue-500/20 text-blue-400',
  draft: 'bg-zinc-500/20 text-zinc-400',
};

const documentTypeLabels: Record<string, string> = {
  report: 'Raport',
  invoice: 'Faktura',
  contract: 'Umowa',
  presentation: 'Prezentacja',
};

const documentTypeColors: Record<string, string> = {
  report: 'bg-blue-500/20 text-blue-400',
  invoice: 'bg-green-500/20 text-green-400',
  contract: 'bg-purple-500/20 text-purple-400',
  presentation: 'bg-pink-500/20 text-pink-400',
};

export default function ClientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [assignedEmployee, setAssignedEmployee] = useState<Profile | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchClientData();
    }
  }, [id]);

  const fetchClientData = async () => {
    setLoading(true);
    
    // Fetch client
    const { data: clientData, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (clientError) {
      toast.error('Nie znaleziono klienta');
      navigate('/clients');
      return;
    }
    setClient(clientData);

    // Fetch assigned employee if exists
    if (clientData.assigned_to) {
      const { data: employeeData } = await supabase
        .from('profiles')
        .select('id, email, full_name')
        .eq('id', clientData.assigned_to)
        .single();
      
      setAssignedEmployee(employeeData);
    }

    // Fetch campaigns for this client
    const { data: campaignsData } = await supabase
      .from('campaigns')
      .select('*')
      .eq('client_id', id)
      .order('start_date', { ascending: false });
    
    setCampaigns(campaignsData || []);

    // Fetch documents for this client
    const { data: documentsData } = await supabase
      .from('documents')
      .select('*')
      .eq('client_id', id)
      .order('created_at', { ascending: false });
    
    setDocuments(documentsData || []);

    // Fetch tasks for this client
    const { data: tasksData } = await supabase
      .from('tasks')
      .select('id, title, status, priority, due_date, created_at')
      .eq('client_id', id)
      .order('created_at', { ascending: false });
    
    setTasks(tasksData || []);
    setLoading(false);
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!client) return null;

  const totalBudgetSpent = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-2"
          onClick={() => navigate('/clients')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do klientów
        </Button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Client Info Card */}
          <Card className="flex-1 border-border/50 bg-card/80">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{client.salon_name}</CardTitle>
                  {client.owner_name && (
                    <p className="text-muted-foreground mt-1">{client.owner_name}</p>
                  )}
                </div>
                <Badge className={statusColors[client.status]}>
                  {statusLabels[client.status]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {client.city && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{client.city}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{client.phone}</span>
                  </div>
                )}
                {client.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{client.email}</span>
                  </div>
                )}
                {client.instagram && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Instagram className="w-4 h-4" />
                    <span>{client.instagram}</span>
                  </div>
                )}
                {client.facebook_page && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Facebook className="w-4 h-4" />
                    <span className="truncate">{client.facebook_page}</span>
                  </div>
                )}
                {client.contract_start_date && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>od {format(new Date(client.contract_start_date), 'd MMMM yyyy', { locale: pl })}</span>
                  </div>
                )}
              </div>
              {assignedEmployee && (
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Opiekun:</span>
                    <span className="font-medium">{assignedEmployee.full_name || assignedEmployee.email}</span>
                  </div>
                </div>
              )}
              {client.notes && (
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">{client.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:w-64">
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{formatCurrency(client.monthly_budget)}</p>
                    <p className="text-xs text-muted-foreground">Budżet miesięczny</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{activeCampaigns}</p>
                    <p className="text-xs text-muted-foreground">Aktywne kampanie</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{formatCurrency(totalBudgetSpent)}</p>
                    <p className="text-xs text-muted-foreground">Łącznie wydane</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">{documents.length}</p>
                    <p className="text-xs text-muted-foreground">Dokumentów</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaigns Section */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Kampanie ({campaigns.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {campaigns.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Brak kampanii dla tego klienta
              </p>
            ) : (
              <div className="space-y-3">
                {campaigns.map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{campaign.name}</h4>
                        <Badge className={campaignStatusColors[campaign.status] || 'bg-zinc-500/20 text-zinc-400'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{format(new Date(campaign.start_date), 'd MMM yyyy', { locale: pl })}</span>
                        {campaign.end_date && (
                          <span>→ {format(new Date(campaign.end_date), 'd MMM yyyy', { locale: pl })}</span>
                        )}
                        {campaign.objective && <span>• {campaign.objective}</span>}
                      </div>
                    </div>
                    {campaign.budget && (
                      <div className="text-right">
                        <p className="font-semibold text-primary">{formatCurrency(campaign.budget)}</p>
                        <p className="text-xs text-muted-foreground">budżet</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Dokumenty ({documents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {documents.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Brak dokumentów dla tego klienta
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => navigate('/history')}
                  >
                    {doc.thumbnail ? (
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded flex items-center justify-center ${documentTypeColors[doc.type] || 'bg-zinc-500/20'}`}>
                        <FileText className="w-5 h-5" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-sm">{doc.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className={`text-[10px] ${documentTypeColors[doc.type] || 'bg-zinc-500/20 text-zinc-400'}`}>
                          {documentTypeLabels[doc.type] || doc.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(doc.created_at), 'd MMM', { locale: pl })}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckSquare className="w-5 h-5" />
              Zadania ({tasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">
                Brak zadań dla tego klienta
              </p>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => {
                  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';
                  return (
                    <div 
                      key={task.id} 
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => navigate('/tasks')}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        task.status === 'completed' ? 'bg-green-500/20' :
                        task.status === 'in_progress' ? 'bg-blue-500/20' :
                        'bg-zinc-500/20'
                      }`}>
                        {task.status === 'completed' ? (
                          <CheckSquare className="w-5 h-5 text-green-400" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{task.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge className={`text-[10px] ${
                            task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-zinc-500/20 text-zinc-400'
                          }`}>
                            {task.priority === 'high' ? 'Wysoki' : task.priority === 'medium' ? 'Średni' : 'Niski'}
                          </Badge>
                          {task.due_date && (
                            <span className={`text-xs flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-muted-foreground'}`}>
                              {isOverdue && <AlertCircle className="w-3 h-3" />}
                              {format(new Date(task.due_date), 'd MMM', { locale: pl })}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

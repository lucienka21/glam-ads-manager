import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { campaignSchema, campaignMetricsSchema } from '@/lib/validationSchemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  Plus, 
  Search, 
  Target,
  Calendar,
  DollarSign,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  TrendingUp,
  BarChart3,
  MousePointer,
  AlertTriangle,
  ExternalLink,
  LayoutGrid,
  List,
  Eye,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  Building2,
  Megaphone,
  PieChart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Campaign {
  id: string;
  client_id: string;
  name: string;
  status: string;
  budget: number | null;
  start_date: string;
  end_date: string | null;
  objective: string | null;
  notes: string | null;
  created_at: string;
  clients?: {
    salon_name: string;
    facebook_page: string | null;
  };
}

interface CampaignMetrics {
  id: string;
  campaign_id: string;
  impressions: number | null;
  reach: number | null;
  clicks: number | null;
  spend: number | null;
  conversions: number | null;
  bookings: number | null;
  messages: number | null;
  period_start: string;
  period_end: string;
}

interface Client {
  id: string;
  salon_name: string;
  facebook_page: string | null;
}

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  active: { color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', label: 'Aktywna' },
  paused: { color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'Wstrzymana' },
  completed: { color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', label: 'Zakończona' },
  draft: { color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20', label: 'Szkic' },
};

const KPI_TARGETS = {
  cpc: 2.0,
  ctr: 1.0,
  roas: 3.0,
};

export default function Campaigns() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [allMetrics, setAllMetrics] = useState<CampaignMetrics[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState('campaigns');
  
  const [formData, setFormData] = useState({
    client_id: '',
    name: '',
    status: 'draft',
    budget: '',
    start_date: '',
    end_date: '',
    objective: '',
    notes: '',
  });

  const [metricsForm, setMetricsForm] = useState({
    period_start: '',
    period_end: '',
    impressions: '',
    reach: '',
    clicks: '',
    spend: '',
    conversions: '',
    bookings: '',
    messages: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    const { data: campaignsData, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*, clients(salon_name, facebook_page)')
      .order('created_at', { ascending: false });

    if (campaignsError) {
      toast.error('Błąd ładowania kampanii');
    } else {
      setCampaigns(campaignsData || []);
    }

    const { data: metricsData } = await supabase
      .from('campaign_metrics')
      .select('*')
      .order('period_start', { ascending: false });
    
    setAllMetrics(metricsData || []);

    const { data: clientsData } = await supabase
      .from('clients')
      .select('id, salon_name, facebook_page')
      .order('salon_name');
    
    setClients(clientsData || []);
    setLoading(false);
  };

  // Aggregated KPIs for agency stats
  const aggregatedKPIs = useMemo(() => {
    const totalImpressions = allMetrics.reduce((sum, m) => sum + (m.impressions || 0), 0);
    const totalClicks = allMetrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
    const totalSpend = allMetrics.reduce((sum, m) => sum + (m.spend || 0), 0);
    const totalBookings = allMetrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
    const totalConversions = allMetrics.reduce((sum, m) => sum + (m.conversions || 0), 0);
    const totalReach = allMetrics.reduce((sum, m) => sum + (m.reach || 0), 0);
    const totalMessages = allMetrics.reduce((sum, m) => sum + (m.messages || 0), 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);

    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      cpc, ctr, roas, conversionRate,
      totalSpend, totalClicks, totalImpressions, totalReach,
      totalBookings, totalConversions, totalMessages, totalBudget,
      activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      totalCampaigns: campaigns.length,
    };
  }, [allMetrics, campaigns]);

  const chartData = useMemo(() => {
    const grouped: Record<string, { date: string; spend: number; bookings: number }> = {};
    
    allMetrics.forEach(m => {
      const date = m.period_start;
      if (!grouped[date]) {
        grouped[date] = { date, spend: 0, bookings: 0 };
      }
      grouped[date].spend += m.spend || 0;
      grouped[date].bookings += m.bookings || 0;
    });

    return Object.values(grouped).sort((a, b) => a.date.localeCompare(b.date)).slice(-12);
  }, [allMetrics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = campaignSchema.safeParse(formData);
    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }

    const dataToSave = {
      client_id: formData.client_id,
      name: formData.name,
      status: formData.status,
      budget: formData.budget ? parseFloat(formData.budget) : null,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      objective: formData.objective || null,
      notes: formData.notes || null,
    };

    if (editingCampaign) {
      const { error } = await supabase
        .from('campaigns')
        .update(dataToSave)
        .eq('id', editingCampaign.id);

      if (error) {
        toast.error('Błąd aktualizacji kampanii');
      } else {
        toast.success('Kampania zaktualizowana');
        fetchData();
      }
    } else {
      const { error } = await supabase
        .from('campaigns')
        .insert({ ...dataToSave, created_by: user?.id });

      if (error) {
        toast.error('Błąd dodawania kampanii');
      } else {
        toast.success('Kampania dodana');
        fetchData();
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tę kampanię?')) return;

    const { error } = await supabase.from('campaigns').delete().eq('id', id);

    if (error) {
      toast.error('Błąd usuwania kampanii');
    } else {
      toast.success('Kampania usunięta');
      fetchData();
    }
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData({
      client_id: campaign.client_id,
      name: campaign.name,
      status: campaign.status,
      budget: campaign.budget?.toString() || '',
      start_date: campaign.start_date,
      end_date: campaign.end_date || '',
      objective: campaign.objective || '',
      notes: campaign.notes || '',
    });
    setIsDialogOpen(true);
  };

  const handleOpenMetrics = async (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    
    const { data } = await supabase
      .from('campaign_metrics')
      .select('*')
      .eq('campaign_id', campaign.id)
      .order('period_start', { ascending: false });
    
    setCampaignMetrics(data || []);
    setMetricsDialogOpen(true);
  };

  const handleAddMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationResult = campaignMetricsSchema.safeParse(metricsForm);
    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }

    if (!selectedCampaign) return;

    const { error } = await supabase
      .from('campaign_metrics')
      .insert({
        campaign_id: selectedCampaign.id,
        period_start: metricsForm.period_start,
        period_end: metricsForm.period_end,
        impressions: metricsForm.impressions ? parseInt(metricsForm.impressions) : 0,
        reach: metricsForm.reach ? parseInt(metricsForm.reach) : 0,
        clicks: metricsForm.clicks ? parseInt(metricsForm.clicks) : 0,
        spend: metricsForm.spend ? parseFloat(metricsForm.spend) : 0,
        conversions: metricsForm.conversions ? parseInt(metricsForm.conversions) : 0,
        bookings: metricsForm.bookings ? parseInt(metricsForm.bookings) : 0,
        messages: metricsForm.messages ? parseInt(metricsForm.messages) : 0,
      });

    if (error) {
      toast.error('Błąd dodawania metryk');
    } else {
      toast.success('Metryki dodane');
      handleOpenMetrics(selectedCampaign);
      fetchData();
      setMetricsForm({
        period_start: '', period_end: '', impressions: '', reach: '',
        clicks: '', spend: '', conversions: '', bookings: '', messages: '',
      });
    }
  };

  const resetForm = () => {
    setEditingCampaign(null);
    setFormData({
      client_id: '', name: '', status: 'draft', budget: '',
      start_date: '', end_date: '', objective: '', notes: '',
    });
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.clients?.salon_name?.toLowerCase().includes(search.toLowerCase()) ||
      campaign.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesClient = clientFilter === 'all' || campaign.client_id === clientFilter;
    return matchesSearch && matchesStatus && matchesClient;
  });

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };

  const getCampaignKPIs = (campaignId: string) => {
    const metrics = allMetrics.filter(m => m.campaign_id === campaignId);
    const totalSpend = metrics.reduce((sum, m) => sum + (m.spend || 0), 0);
    const totalClicks = metrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
    const totalImpressions = metrics.reduce((sum, m) => sum + (m.impressions || 0), 0);
    const totalBookings = metrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
    
    return {
      cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
      ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
      roas: totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0,
      spend: totalSpend,
      bookings: totalBookings,
    };
  };

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID skopiowane');
  };

  // Group campaigns by client
  const campaignsByClient = useMemo(() => {
    const grouped: Record<string, { client: Client; campaigns: Campaign[] }> = {};
    
    filteredCampaigns.forEach(campaign => {
      if (!grouped[campaign.client_id]) {
        const client = clients.find(c => c.id === campaign.client_id);
        if (client) {
          grouped[campaign.client_id] = { client, campaigns: [] };
        }
      }
      if (grouped[campaign.client_id]) {
        grouped[campaign.client_id].campaigns.push(campaign);
      }
    });
    
    return Object.values(grouped);
  }, [filteredCampaigns, clients]);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              Kampanie
            </h1>
            <p className="text-muted-foreground mt-1">Zarządzaj kampaniami Facebook Ads</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/campaign-generator')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generator AI
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Nowa kampania
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingCampaign ? 'Edytuj kampanię' : 'Nowa kampania'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Klient *</Label>
                      <Select value={formData.client_id} onValueChange={(v) => setFormData(p => ({ ...p, client_id: v }))}>
                        <SelectTrigger><SelectValue placeholder="Wybierz klienta" /></SelectTrigger>
                        <SelectContent>
                          {clients.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.salon_name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Nazwa kampanii *</Label>
                      <Input value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(v) => setFormData(p => ({ ...p, status: v }))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Szkic</SelectItem>
                          <SelectItem value="active">Aktywna</SelectItem>
                          <SelectItem value="paused">Wstrzymana</SelectItem>
                          <SelectItem value="completed">Zakończona</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Budżet (PLN)</Label>
                      <Input type="number" value={formData.budget} onChange={(e) => setFormData(p => ({ ...p, budget: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Data startu *</Label>
                      <Input type="date" value={formData.start_date} onChange={(e) => setFormData(p => ({ ...p, start_date: e.target.value }))} />
                    </div>
                    <div>
                      <Label>Data końca</Label>
                      <Input type="date" value={formData.end_date} onChange={(e) => setFormData(p => ({ ...p, end_date: e.target.value }))} />
                    </div>
                    <div className="col-span-2">
                      <Label>Cel</Label>
                      <Input value={formData.objective} onChange={(e) => setFormData(p => ({ ...p, objective: e.target.value }))} placeholder="np. Więcej rezerwacji" />
                    </div>
                    <div className="col-span-2">
                      <Label>Notatki</Label>
                      <Textarea value={formData.notes} onChange={(e) => setFormData(p => ({ ...p, notes: e.target.value }))} rows={2} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Anuluj</Button>
                    <Button type="submit">{editingCampaign ? 'Zapisz' : 'Dodaj'}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="campaigns" className="gap-2">
              <Megaphone className="w-4 h-4" />
              Kampanie
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <PieChart className="w-4 h-4" />
              Statystyki Agencji
            </TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            {/* Filters */}
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Szukaj po nazwie, kliencie lub ID..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={clientFilter} onValueChange={setClientFilter}>
                    <SelectTrigger className="w-[200px]">
                      <Building2 className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Klient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszyscy klienci</SelectItem>
                      {clients.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.salon_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Wszystkie</SelectItem>
                      <SelectItem value="active">Aktywne</SelectItem>
                      <SelectItem value="paused">Wstrzymane</SelectItem>
                      <SelectItem value="completed">Zakończone</SelectItem>
                      <SelectItem value="draft">Szkice</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns by Client */}
            {campaignsByClient.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="p-12 text-center">
                  <Megaphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground">Brak kampanii</h3>
                  <p className="text-muted-foreground mt-1">Dodaj pierwszą kampanię dla klienta</p>
                  <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Nowa kampania
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {campaignsByClient.map(({ client, campaigns: clientCampaigns }) => (
                  <Card key={client.id} className="border-border/50 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-secondary/50 to-secondary/30 border-b border-border/50 pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-pink-400" />
                          </div>
                          <div>
                            <CardTitle 
                              className="text-lg cursor-pointer hover:text-pink-400 transition-colors"
                              onClick={() => navigate(`/clients/${client.id}`)}
                            >
                              {client.salon_name}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {clientCampaigns.length} {clientCampaigns.length === 1 ? 'kampania' : 'kampanii'}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/clients/${client.id}`)}>
                          Profil klienta
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      {viewMode === 'grid' ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {clientCampaigns.map(campaign => {
                            const kpis = getCampaignKPIs(campaign.id);
                            const status = statusConfig[campaign.status] || statusConfig.draft;
                            
                            return (
                              <div 
                                key={campaign.id}
                                className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-pink-500/30 transition-all group"
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-foreground truncate">{campaign.name}</h4>
                                      <button 
                                        onClick={() => copyId(campaign.id)}
                                        className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Copy className="w-3 h-3" />
                                      </button>
                                    </div>
                                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                                      ID: {campaign.id.slice(0, 8)}...
                                    </p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => handleOpenMetrics(campaign)}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Metryki
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edytuj
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => handleDelete(campaign.id)}
                                        className="text-red-400"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Usuń
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>

                                <Badge variant="outline" className={`${status.bg} ${status.color} border mb-3`}>
                                  {status.label}
                                </Badge>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="p-2 rounded bg-background/50">
                                    <p className="text-xs text-muted-foreground">Budżet</p>
                                    <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                                  </div>
                                  <div className="p-2 rounded bg-background/50">
                                    <p className="text-xs text-muted-foreground">Wydano</p>
                                    <p className="font-medium">{formatCurrency(kpis.spend)}</p>
                                  </div>
                                  <div className="p-2 rounded bg-background/50">
                                    <p className="text-xs text-muted-foreground">ROAS</p>
                                    <p className={`font-medium ${kpis.roas >= KPI_TARGETS.roas ? 'text-green-400' : 'text-amber-400'}`}>
                                      {kpis.roas.toFixed(2)}x
                                    </p>
                                  </div>
                                  <div className="p-2 rounded bg-background/50">
                                    <p className="text-xs text-muted-foreground">Rezerwacje</p>
                                    <p className="font-medium">{kpis.bookings}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                                  <Calendar className="w-3 h-3" />
                                  <span>{format(new Date(campaign.start_date), 'd MMM yyyy', { locale: pl })}</span>
                                  {campaign.end_date && (
                                    <>
                                      <span>-</span>
                                      <span>{format(new Date(campaign.end_date), 'd MMM yyyy', { locale: pl })}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {clientCampaigns.map(campaign => {
                            const kpis = getCampaignKPIs(campaign.id);
                            const status = statusConfig[campaign.status] || statusConfig.draft;
                            
                            return (
                              <div 
                                key={campaign.id}
                                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors group"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-foreground truncate">{campaign.name}</h4>
                                    <Badge variant="outline" className={`${status.bg} ${status.color} border text-xs`}>
                                      {status.label}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    <span className="font-mono">ID: {campaign.id.slice(0, 8)}...</span>
                                    <button onClick={() => copyId(campaign.id)} className="hover:text-foreground">
                                      <Copy className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Budżet</p>
                                    <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground">ROAS</p>
                                    <p className={`font-medium ${kpis.roas >= KPI_TARGETS.roas ? 'text-green-400' : 'text-amber-400'}`}>
                                      {kpis.roas.toFixed(2)}x
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-muted-foreground">Rezerwacje</p>
                                    <p className="font-medium">{kpis.bookings}</p>
                                  </div>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" onClick={() => handleOpenMetrics(campaign)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleEdit(campaign)}>
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" onClick={() => handleDelete(campaign.id)} className="text-red-400 hover:text-red-300">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Agency Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Łączny budżet</p>
                      <p className="text-2xl font-bold text-foreground">{formatCurrency(aggregatedKPIs.totalBudget)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-pink-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{aggregatedKPIs.totalCampaigns} kampanii łącznie</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Wydatki</p>
                      <p className="text-2xl font-bold text-foreground">{formatCurrency(aggregatedKPIs.totalSpend)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{aggregatedKPIs.activeCampaigns} aktywnych kampanii</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">ROAS</p>
                      <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.roas.toFixed(2)}x</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${aggregatedKPIs.roas >= KPI_TARGETS.roas ? 'bg-green-500/20' : 'bg-amber-500/20'}`}>
                      {aggregatedKPIs.roas >= KPI_TARGETS.roas ? (
                        <ArrowUpRight className="w-6 h-6 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-6 h-6 text-amber-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Target: {KPI_TARGETS.roas}x</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Rezerwacje</p>
                      <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.totalBookings}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{aggregatedKPIs.totalConversions} konwersji</p>
                </CardContent>
              </Card>
            </div>

            {/* More Stats */}
            <div className="grid lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Wydatki i rezerwacje w czasie</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          stroke="hsl(var(--muted-foreground))" 
                          fontSize={12}
                          tickFormatter={(v) => format(new Date(v), 'd MMM', { locale: pl })}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Line type="monotone" dataKey="spend" name="Wydatki" stroke="hsl(340, 75%, 55%)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="bookings" name="Rezerwacje" stroke="hsl(160, 70%, 45%)" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      Brak danych do wyświetlenia
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Szczegółowe KPI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">CPC</span>
                    </div>
                    <span className={`font-medium ${aggregatedKPIs.cpc <= KPI_TARGETS.cpc ? 'text-green-400' : 'text-amber-400'}`}>
                      {aggregatedKPIs.cpc.toFixed(2)} PLN
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">CTR</span>
                    </div>
                    <span className={`font-medium ${aggregatedKPIs.ctr >= KPI_TARGETS.ctr ? 'text-green-400' : 'text-amber-400'}`}>
                      {aggregatedKPIs.ctr.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-violet-400" />
                      <span className="text-sm">Zasięg</span>
                    </div>
                    <span className="font-medium">{aggregatedKPIs.totalReach.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <MousePointer className="w-4 h-4 text-pink-400" />
                      <span className="text-sm">Kliknięcia</span>
                    </div>
                    <span className="font-medium">{aggregatedKPIs.totalClicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-sm">Konwersja</span>
                    </div>
                    <span className="font-medium">{aggregatedKPIs.conversionRate.toFixed(2)}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Metrics Dialog */}
        <Dialog open={metricsDialogOpen} onOpenChange={setMetricsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-pink-400" />
                Metryki: {selectedCampaign?.name}
              </DialogTitle>
            </DialogHeader>
            
            {/* Add Metrics Form */}
            <form onSubmit={handleAddMetrics} className="space-y-4 p-4 rounded-lg bg-secondary/30 border border-border/50">
              <h4 className="font-medium text-sm text-muted-foreground">Dodaj nowy okres</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Data od *</Label>
                  <Input 
                    type="date" 
                    value={metricsForm.period_start}
                    onChange={(e) => setMetricsForm(p => ({ ...p, period_start: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Data do *</Label>
                  <Input 
                    type="date" 
                    value={metricsForm.period_end}
                    onChange={(e) => setMetricsForm(p => ({ ...p, period_end: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Wyświetlenia</Label>
                  <Input 
                    type="number" 
                    value={metricsForm.impressions}
                    onChange={(e) => setMetricsForm(p => ({ ...p, impressions: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Zasięg</Label>
                  <Input 
                    type="number" 
                    value={metricsForm.reach}
                    onChange={(e) => setMetricsForm(p => ({ ...p, reach: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Kliknięcia</Label>
                  <Input 
                    type="number" 
                    value={metricsForm.clicks}
                    onChange={(e) => setMetricsForm(p => ({ ...p, clicks: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Wydatki (PLN)</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    value={metricsForm.spend}
                    onChange={(e) => setMetricsForm(p => ({ ...p, spend: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Konwersje</Label>
                  <Input 
                    type="number" 
                    value={metricsForm.conversions}
                    onChange={(e) => setMetricsForm(p => ({ ...p, conversions: e.target.value }))}
                  />
                </div>
                <div>
                  <Label className="text-xs">Rezerwacje</Label>
                  <Input 
                    type="number" 
                    value={metricsForm.bookings}
                    onChange={(e) => setMetricsForm(p => ({ ...p, bookings: e.target.value }))}
                  />
                </div>
              </div>
              <Button type="submit" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj metryki
              </Button>
            </form>

            {/* Metrics History */}
            {campaignMetrics.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="font-medium text-sm text-muted-foreground">Historia metryk</h4>
                {campaignMetrics.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-secondary/30 text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">
                        {format(new Date(m.period_start), 'd MMM', { locale: pl })} - {format(new Date(m.period_end), 'd MMM yyyy', { locale: pl })}
                      </span>
                      <span className="text-muted-foreground">{formatCurrency(m.spend)}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <span>Zasięg: {m.reach?.toLocaleString()}</span>
                      <span>Kliknięcia: {m.clicks}</span>
                      <span>Konwersje: {m.conversions}</span>
                      <span>Rezerwacje: {m.bookings}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

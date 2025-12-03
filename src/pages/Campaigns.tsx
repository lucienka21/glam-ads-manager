import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
  TrendingDown,
  Eye,
  BarChart3,
  MousePointer,
  Users,
  MessageCircle,
  AlertTriangle,
  ExternalLink,
  LayoutGrid,
  List,
  Percent
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  BarChart,
  Bar,
  Legend
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

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  draft: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const statusLabels: Record<string, string> = {
  active: 'Aktywna',
  paused: 'Wstrzymana',
  completed: 'Zakończona',
  draft: 'Szkic',
};

// KPI target thresholds
const KPI_TARGETS = {
  cpc: 2.0, // Max CPC in PLN
  ctr: 1.0, // Min CTR in %
  roas: 3.0, // Min ROAS
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
    
    // Fetch campaigns with client info
    const { data: campaignsData, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*, clients(salon_name, facebook_page)')
      .order('created_at', { ascending: false });

    if (campaignsError) {
      toast.error('Błąd ładowania kampanii');
      console.error(campaignsError);
    } else {
      setCampaigns(campaignsData || []);
    }

    // Fetch all metrics for KPI calculations
    const { data: metricsData } = await supabase
      .from('campaign_metrics')
      .select('*')
      .order('period_start', { ascending: false });
    
    setAllMetrics(metricsData || []);

    // Fetch clients for dropdown
    const { data: clientsData } = await supabase
      .from('clients')
      .select('id, salon_name, facebook_page')
      .eq('status', 'active')
      .order('salon_name');
    
    setClients(clientsData || []);
    setLoading(false);
  };

  // Calculate aggregated KPIs
  const aggregatedKPIs = useMemo(() => {
    const totalImpressions = allMetrics.reduce((sum, m) => sum + (m.impressions || 0), 0);
    const totalClicks = allMetrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
    const totalSpend = allMetrics.reduce((sum, m) => sum + (m.spend || 0), 0);
    const totalBookings = allMetrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
    const totalConversions = allMetrics.reduce((sum, m) => sum + (m.conversions || 0), 0);
    const totalReach = allMetrics.reduce((sum, m) => sum + (m.reach || 0), 0);

    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0; // 200 PLN avg booking value
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      cpc,
      ctr,
      roas,
      conversionRate,
      totalSpend,
      totalClicks,
      totalImpressions,
      totalReach,
      totalBookings,
      totalConversions,
    };
  }, [allMetrics]);

  // Chart data - performance over time
  const chartData = useMemo(() => {
    const grouped: Record<string, { date: string; spend: number; clicks: number; bookings: number }> = {};
    
    allMetrics.forEach(m => {
      const date = m.period_start;
      if (!grouped[date]) {
        grouped[date] = { date, spend: 0, clicks: 0, bookings: 0 };
      }
      grouped[date].spend += m.spend || 0;
      grouped[date].clicks += m.clicks || 0;
      grouped[date].bookings += m.bookings || 0;
    });

    return Object.values(grouped)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-12); // Last 12 periods
  }, [allMetrics]);

  // Campaign comparison data
  const campaignComparison = useMemo(() => {
    return campaigns.slice(0, 5).map(campaign => {
      const metrics = allMetrics.filter(m => m.campaign_id === campaign.id);
      const totalSpend = metrics.reduce((sum, m) => sum + (m.spend || 0), 0);
      const totalClicks = metrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
      const totalBookings = metrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
      const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0;
      
      return {
        name: campaign.name.substring(0, 15) + (campaign.name.length > 15 ? '...' : ''),
        spend: totalSpend,
        roas: Number(roas.toFixed(2)),
        bookings: totalBookings,
      };
    });
  }, [campaigns, allMetrics]);

  // Alerts for underperforming campaigns
  const alerts = useMemo(() => {
    const alertsList: { campaign: Campaign; issue: string; severity: 'warning' | 'critical' }[] = [];
    
    campaigns.filter(c => c.status === 'active').forEach(campaign => {
      const metrics = allMetrics.filter(m => m.campaign_id === campaign.id);
      if (metrics.length === 0) return;
      
      const totalSpend = metrics.reduce((sum, m) => sum + (m.spend || 0), 0);
      const totalClicks = metrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
      const totalImpressions = metrics.reduce((sum, m) => sum + (m.impressions || 0), 0);
      const totalBookings = metrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
      
      const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
      const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
      const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0;
      
      if (cpc > KPI_TARGETS.cpc * 1.5) {
        alertsList.push({ campaign, issue: `CPC (${cpc.toFixed(2)} PLN) znacznie powyżej targetu`, severity: 'critical' });
      } else if (cpc > KPI_TARGETS.cpc) {
        alertsList.push({ campaign, issue: `CPC (${cpc.toFixed(2)} PLN) powyżej targetu`, severity: 'warning' });
      }
      
      if (ctr < KPI_TARGETS.ctr * 0.5) {
        alertsList.push({ campaign, issue: `CTR (${ctr.toFixed(2)}%) znacznie poniżej targetu`, severity: 'critical' });
      } else if (ctr < KPI_TARGETS.ctr) {
        alertsList.push({ campaign, issue: `CTR (${ctr.toFixed(2)}%) poniżej targetu`, severity: 'warning' });
      }
      
      if (totalSpend > 100 && roas < KPI_TARGETS.roas * 0.5) {
        alertsList.push({ campaign, issue: `ROAS (${roas.toFixed(2)}) znacznie poniżej targetu`, severity: 'critical' });
      } else if (totalSpend > 100 && roas < KPI_TARGETS.roas) {
        alertsList.push({ campaign, issue: `ROAS (${roas.toFixed(2)}) poniżej targetu`, severity: 'warning' });
      }
    });
    
    return alertsList;
  }, [campaigns, allMetrics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.client_id || !formData.start_date) {
      toast.error('Wypełnij wymagane pola');
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

    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);

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
    
    if (!selectedCampaign || !metricsForm.period_start || !metricsForm.period_end) {
      toast.error('Wybierz okres');
      return;
    }

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
      console.error(error);
    } else {
      toast.success('Metryki dodane');
      handleOpenMetrics(selectedCampaign);
      fetchData();
      setMetricsForm({
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
    }
  };

  const resetForm = () => {
    setEditingCampaign(null);
    setFormData({
      client_id: '',
      name: '',
      status: 'draft',
      budget: '',
      start_date: '',
      end_date: '',
      objective: '',
      notes: '',
    });
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(search.toLowerCase()) ||
      campaign.clients?.salon_name?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'active').length,
    totalBudget: campaigns.reduce((sum, c) => sum + (c.budget || 0), 0),
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(value);
  };

  const formatFacebookLink = (url: string | null) => {
    if (!url) return null;
    return url.replace(/^https?:\/\/(www\.)?facebook\.com\/?/, '').replace(/\/$/, '') || 'Facebook';
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
    };
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kampanie</h1>
            <p className="text-muted-foreground text-sm">Zarządzaj kampaniami Facebook Ads</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nowa kampania
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingCampaign ? 'Edytuj kampanię' : 'Nowa kampania'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Klient *</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(value) => setFormData({ ...formData, client_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz klienta" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.salon_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nazwa kampanii *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="np. Promocja wiosenna"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
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
                    <Input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Data startu *</Label>
                    <Input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Data końca</Label>
                    <Input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Cel kampanii</Label>
                  <Select
                    value={formData.objective}
                    onValueChange={(value) => setFormData({ ...formData, objective: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz cel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reach">Zasięg</SelectItem>
                      <SelectItem value="traffic">Ruch</SelectItem>
                      <SelectItem value="engagement">Zaangażowanie</SelectItem>
                      <SelectItem value="leads">Pozyskiwanie leadów</SelectItem>
                      <SelectItem value="conversions">Konwersje</SelectItem>
                      <SelectItem value="messages">Wiadomości</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notatki</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                    Anuluj
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    {editingCampaign ? 'Zapisz' : 'Dodaj'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* KPI Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Wszystkie</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-xs text-muted-foreground">Aktywne</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${aggregatedKPIs.cpc <= KPI_TARGETS.cpc ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <MousePointer className={`w-5 h-5 ${aggregatedKPIs.cpc <= KPI_TARGETS.cpc ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{aggregatedKPIs.cpc.toFixed(2)} zł</p>
                  <p className="text-xs text-muted-foreground">CPC</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${aggregatedKPIs.ctr >= KPI_TARGETS.ctr ? 'bg-green-500/10' : 'bg-yellow-500/10'}`}>
                  <Percent className={`w-5 h-5 ${aggregatedKPIs.ctr >= KPI_TARGETS.ctr ? 'text-green-400' : 'text-yellow-400'}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{aggregatedKPIs.ctr.toFixed(2)}%</p>
                  <p className="text-xs text-muted-foreground">CTR</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${aggregatedKPIs.roas >= KPI_TARGETS.roas ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <BarChart3 className={`w-5 h-5 ${aggregatedKPIs.roas >= KPI_TARGETS.roas ? 'text-green-400' : 'text-red-400'}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{aggregatedKPIs.roas.toFixed(2)}x</p>
                  <p className="text-xs text-muted-foreground">ROAS</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(aggregatedKPIs.totalSpend)}</p>
                  <p className="text-xs text-muted-foreground">Wydano</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="border-yellow-500/30 bg-yellow-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="w-5 h-5" />
                Alerty wydajności ({alerts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.slice(0, 5).map((alert, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      alert.severity === 'critical' ? 'bg-red-500/10 border border-red-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {alert.severity === 'critical' ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{alert.campaign.name}</p>
                        <p className="text-xs text-muted-foreground">{alert.issue}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenMetrics(alert.campaign)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        {chartData.length > 0 && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Wydatki w czasie</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" fontSize={12} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      labelStyle={{ color: '#888' }}
                    />
                    <Line type="monotone" dataKey="spend" stroke="#ec4899" strokeWidth={2} dot={false} name="Wydatki (PLN)" />
                    <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={2} dot={false} name="Kliknięcia" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Porównanie kampanii</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={campaignComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" fontSize={10} angle={-15} />
                    <YAxis stroke="#888" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                      labelStyle={{ color: '#888' }}
                    />
                    <Legend />
                    <Bar dataKey="roas" fill="#22c55e" name="ROAS" />
                    <Bar dataKey="bookings" fill="#ec4899" name="Rezerwacje" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj kampanii..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg border border-border/50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Campaigns */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <Card className="border-dashed border-2 border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Target className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Brak kampanii</p>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign) => {
              const kpis = getCampaignKPIs(campaign.id);
              return (
                <Card key={campaign.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">{campaign.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{campaign.clients?.salon_name}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenMetrics(campaign)}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Metryki
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edytuj
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`${statusColors[campaign.status]} border text-xs`}>
                        {statusLabels[campaign.status]}
                      </Badge>
                      {campaign.clients?.facebook_page && (
                        <a 
                          href={campaign.clients.facebook_page.startsWith('http') ? campaign.clients.facebook_page : `https://facebook.com/${campaign.clients.facebook_page}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-3 h-3" />
                          FB
                        </a>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(campaign.start_date), 'd MMM yyyy', { locale: pl })}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <DollarSign className="w-3.5 h-3.5" />
                        {formatCurrency(campaign.budget)}
                      </div>
                    </div>
                    
                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                      <div className="text-center">
                        <p className={`text-sm font-semibold ${kpis.cpc <= KPI_TARGETS.cpc ? 'text-green-400' : 'text-red-400'}`}>
                          {kpis.cpc.toFixed(2)} zł
                        </p>
                        <p className="text-[10px] text-muted-foreground">CPC</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-semibold ${kpis.ctr >= KPI_TARGETS.ctr ? 'text-green-400' : 'text-yellow-400'}`}>
                          {kpis.ctr.toFixed(1)}%
                        </p>
                        <p className="text-[10px] text-muted-foreground">CTR</p>
                      </div>
                      <div className="text-center">
                        <p className={`text-sm font-semibold ${kpis.roas >= KPI_TARGETS.roas ? 'text-green-400' : 'text-red-400'}`}>
                          {kpis.roas.toFixed(1)}x
                        </p>
                        <p className="text-[10px] text-muted-foreground">ROAS</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredCampaigns.map((campaign) => {
              const kpis = getCampaignKPIs(campaign.id);
              return (
                <Card key={campaign.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                          <Badge className={`${statusColors[campaign.status]} border text-xs`}>
                            {statusLabels[campaign.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{campaign.clients?.salon_name}</p>
                      </div>
                      
                      <div className="hidden md:flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className={`font-semibold ${kpis.cpc <= KPI_TARGETS.cpc ? 'text-green-400' : 'text-red-400'}`}>
                            {kpis.cpc.toFixed(2)} zł
                          </p>
                          <p className="text-xs text-muted-foreground">CPC</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-semibold ${kpis.ctr >= KPI_TARGETS.ctr ? 'text-green-400' : 'text-yellow-400'}`}>
                            {kpis.ctr.toFixed(1)}%
                          </p>
                          <p className="text-xs text-muted-foreground">CTR</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-semibold ${kpis.roas >= KPI_TARGETS.roas ? 'text-green-400' : 'text-red-400'}`}>
                            {kpis.roas.toFixed(1)}x
                          </p>
                          <p className="text-xs text-muted-foreground">ROAS</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">{formatCurrency(campaign.budget)}</p>
                          <p className="text-xs text-muted-foreground">Budżet</p>
                        </div>
                      </div>
                      
                      {campaign.clients?.facebook_page && (
                        <a 
                          href={campaign.clients.facebook_page.startsWith('http') ? campaign.clients.facebook_page : `https://facebook.com/${campaign.clients.facebook_page}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenMetrics(campaign)}>
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Metryki
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edytuj
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-red-400">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Metrics Dialog */}
        <Dialog open={metricsDialogOpen} onOpenChange={setMetricsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Metryki: {selectedCampaign?.name}</DialogTitle>
            </DialogHeader>
            
            {/* Add Metrics Form */}
            <form onSubmit={handleAddMetrics} className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium text-sm">Dodaj nowe metryki</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Od</Label>
                  <Input
                    type="date"
                    value={metricsForm.period_start}
                    onChange={(e) => setMetricsForm({ ...metricsForm, period_start: e.target.value })}
                    className="h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs">Do</Label>
                  <Input
                    type="date"
                    value={metricsForm.period_end}
                    onChange={(e) => setMetricsForm({ ...metricsForm, period_end: e.target.value })}
                    className="h-9"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs">Wyświetlenia</Label>
                  <Input
                    type="number"
                    value={metricsForm.impressions}
                    onChange={(e) => setMetricsForm({ ...metricsForm, impressions: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Zasięg</Label>
                  <Input
                    type="number"
                    value={metricsForm.reach}
                    onChange={(e) => setMetricsForm({ ...metricsForm, reach: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Kliknięcia</Label>
                  <Input
                    type="number"
                    value={metricsForm.clicks}
                    onChange={(e) => setMetricsForm({ ...metricsForm, clicks: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Wydatki (PLN)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={metricsForm.spend}
                    onChange={(e) => setMetricsForm({ ...metricsForm, spend: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs">Konwersje</Label>
                  <Input
                    type="number"
                    value={metricsForm.conversions}
                    onChange={(e) => setMetricsForm({ ...metricsForm, conversions: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rezerwacje</Label>
                  <Input
                    type="number"
                    value={metricsForm.bookings}
                    onChange={(e) => setMetricsForm({ ...metricsForm, bookings: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Wiadomości</Label>
                  <Input
                    type="number"
                    value={metricsForm.messages}
                    onChange={(e) => setMetricsForm({ ...metricsForm, messages: e.target.value })}
                    className="h-9"
                    placeholder="0"
                  />
                </div>
              </div>
              <Button type="submit" size="sm" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj metryki
              </Button>
            </form>
            
            {/* Metrics History */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Historia metryk</h4>
              {campaignMetrics.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Brak zapisanych metryk</p>
              ) : (
                <div className="space-y-2">
                  {campaignMetrics.map((m) => (
                    <div key={m.id} className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(m.period_start), 'd MMM', { locale: pl })} - {format(new Date(m.period_end), 'd MMM yyyy', { locale: pl })}
                        </span>
                        <span className="text-xs font-medium text-primary">
                          {formatCurrency(m.spend)}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Wyświetlenia</p>
                          <p className="font-medium">{m.impressions?.toLocaleString() || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Kliknięcia</p>
                          <p className="font-medium">{m.clicks?.toLocaleString() || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Rezerwacje</p>
                          <p className="font-medium">{m.bookings || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Wiadomości</p>
                          <p className="font-medium">{m.messages || 0}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

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
  TrendingDown,
  BarChart3,
  MousePointer,
  AlertTriangle,
  ExternalLink,
  LayoutGrid,
  List,
  Zap,
  Users,
  Eye,
  MessageCircle,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
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
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
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

const CHART_COLORS = ['hsl(340, 75%, 55%)', 'hsl(40, 90%, 55%)', 'hsl(160, 70%, 45%)', 'hsl(200, 70%, 50%)', 'hsl(280, 70%, 55%)'];

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
  const [activeTab, setActiveTab] = useState('overview');
  
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
      .eq('status', 'active')
      .order('salon_name');
    
    setClients(clientsData || []);
    setLoading(false);
  };

  const aggregatedKPIs = useMemo(() => {
    const totalImpressions = allMetrics.reduce((sum, m) => sum + (m.impressions || 0), 0);
    const totalClicks = allMetrics.reduce((sum, m) => sum + (m.clicks || 0), 0);
    const totalSpend = allMetrics.reduce((sum, m) => sum + (m.spend || 0), 0);
    const totalBookings = allMetrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
    const totalConversions = allMetrics.reduce((sum, m) => sum + (m.conversions || 0), 0);
    const totalReach = allMetrics.reduce((sum, m) => sum + (m.reach || 0), 0);
    const totalMessages = allMetrics.reduce((sum, m) => sum + (m.messages || 0), 0);

    const cpc = totalClicks > 0 ? totalSpend / totalClicks : 0;
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0;
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
      totalMessages,
    };
  }, [allMetrics]);

  const chartData = useMemo(() => {
    const grouped: Record<string, { date: string; spend: number; clicks: number; bookings: number; impressions: number }> = {};
    
    allMetrics.forEach(m => {
      const date = m.period_start;
      if (!grouped[date]) {
        grouped[date] = { date, spend: 0, clicks: 0, bookings: 0, impressions: 0 };
      }
      grouped[date].spend += m.spend || 0;
      grouped[date].clicks += m.clicks || 0;
      grouped[date].bookings += m.bookings || 0;
      grouped[date].impressions += m.impressions || 0;
    });

    return Object.values(grouped)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-12);
  }, [allMetrics]);

  const statusDistribution = useMemo(() => {
    const counts = campaigns.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(counts).map(([status, count]) => ({
      name: statusConfig[status]?.label || status,
      value: count,
      status
    }));
  }, [campaigns]);

  const topCampaigns = useMemo(() => {
    return campaigns
      .map(campaign => {
        const metrics = allMetrics.filter(m => m.campaign_id === campaign.id);
        const totalSpend = metrics.reduce((sum, m) => sum + (m.spend || 0), 0);
        const totalBookings = metrics.reduce((sum, m) => sum + (m.bookings || 0), 0);
        const roas = totalSpend > 0 ? (totalBookings * 200) / totalSpend : 0;
        return { ...campaign, totalSpend, totalBookings, roas };
      })
      .sort((a, b) => b.roas - a.roas)
      .slice(0, 5);
  }, [campaigns, allMetrics]);

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
        alertsList.push({ campaign, issue: `CPC ${cpc.toFixed(2)} PLN`, severity: 'critical' });
      } else if (cpc > KPI_TARGETS.cpc) {
        alertsList.push({ campaign, issue: `CPC ${cpc.toFixed(2)} PLN`, severity: 'warning' });
      }
      
      if (totalSpend > 100 && roas < KPI_TARGETS.roas * 0.5) {
        alertsList.push({ campaign, issue: `ROAS ${roas.toFixed(2)}x`, severity: 'critical' });
      }
    });
    
    return alertsList.slice(0, 5);
  }, [campaigns, allMetrics]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data with Zod
    const validationResult = campaignSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
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
    
    // Validate metrics form data with Zod
    const validationResult = campaignMetricsSchema.safeParse(metricsForm);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

    if (!selectedCampaign) {
      toast.error('Wybierz kampanię');
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
            <h1 className="text-3xl font-bold text-foreground">Kampanie</h1>
            <p className="text-muted-foreground">Zarządzaj kampaniami Facebook Ads</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/roi-calculator')}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Kalkulator ROI
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
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

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">ROAS</p>
                  <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.roas.toFixed(2)}x</p>
                </div>
                <div className={`p-2 rounded-lg ${aggregatedKPIs.roas >= KPI_TARGETS.roas ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  {aggregatedKPIs.roas >= KPI_TARGETS.roas ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-400" />
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Target: {KPI_TARGETS.roas}x</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">CPC</p>
                  <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.cpc.toFixed(2)} zł</p>
                </div>
                <MousePointer className="h-5 w-5 text-amber-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Target: max {KPI_TARGETS.cpc} zł</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">CTR</p>
                  <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.ctr.toFixed(2)}%</p>
                </div>
                <Target className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Target: min {KPI_TARGETS.ctr}%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Rezerwacje</p>
                  <p className="text-2xl font-bold text-foreground">{aggregatedKPIs.totalBookings}</p>
                </div>
                <Calendar className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Łącznie</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border-violet-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Wydatki</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(aggregatedKPIs.totalSpend)}</p>
                </div>
                <DollarSign className="h-5 w-5 text-violet-400" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Łącznie</p>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="font-semibold text-foreground">Wymagają uwagi</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {alerts.map((alert, idx) => (
                  <Badge 
                    key={idx} 
                    variant="outline" 
                    className={alert.severity === 'critical' ? 'border-red-500/50 text-red-400' : 'border-amber-500/50 text-amber-400'}
                  >
                    {alert.campaign.name}: {alert.issue}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="overview">Przegląd</TabsTrigger>
            <TabsTrigger value="campaigns">Kampanie ({campaigns.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analityka</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Performance Chart */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Wydajność w czasie</CardTitle>
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
                        <Line type="monotone" dataKey="spend" name="Wydatki" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="bookings" name="Rezerwacje" stroke={CHART_COLORS[2]} strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      Brak danych do wyświetlenia
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Status kampanii</CardTitle>
                </CardHeader>
                <CardContent>
                  {statusDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={statusDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {statusDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.status === 'active' ? '#10b981' : entry.status === 'paused' ? '#f59e0b' : entry.status === 'completed' ? '#3b82f6' : '#71717a'}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      Brak kampanii
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center">
                    {statusDistribution.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.status === 'active' ? '#10b981' : item.status === 'paused' ? '#f59e0b' : item.status === 'completed' ? '#3b82f6' : '#71717a' }}
                        />
                        <span className="text-muted-foreground">{item.name} ({item.value})</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Campaigns */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Top 5 kampanii (ROAS)</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('campaigns')}>
                    Zobacz wszystkie <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCampaigns.map((campaign, idx) => (
                    <div 
                      key={campaign.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                      onClick={() => handleOpenMetrics(campaign)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.clients?.salon_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-right">
                          <p className="text-muted-foreground">ROAS</p>
                          <p className="font-semibold text-emerald-400">{campaign.roas.toFixed(2)}x</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Rezerwacje</p>
                          <p className="font-semibold">{campaign.totalBookings}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Wydatki</p>
                          <p className="font-semibold">{formatCurrency(campaign.totalSpend)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {topCampaigns.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">Brak kampanii z metrykami</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj kampanii..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
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

            {/* Campaigns Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCampaigns.map((campaign) => {
                  const kpis = getCampaignKPIs(campaign.id);
                  const config = statusConfig[campaign.status] || statusConfig.draft;
                  
                  return (
                    <Card key={campaign.id} className="group hover:border-primary/30 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">{campaign.clients?.salon_name}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenMetrics(campaign)}>
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Metryki
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edytuj
                              </DropdownMenuItem>
                              {campaign.clients?.facebook_page && (
                                <DropdownMenuItem onClick={() => window.open(campaign.clients!.facebook_page!, '_blank')}>
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Facebook
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Usuń
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className={config.bg}>
                            {config.label}
                          </Badge>
                          {campaign.budget && (
                            <Badge variant="outline" className="bg-secondary/50">
                              {formatCurrency(campaign.budget)}
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 rounded-lg bg-secondary/30">
                            <p className="text-xs text-muted-foreground">ROAS</p>
                            <p className={`font-semibold ${kpis.roas >= KPI_TARGETS.roas ? 'text-emerald-400' : kpis.roas > 0 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                              {kpis.roas > 0 ? `${kpis.roas.toFixed(2)}x` : '-'}
                            </p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary/30">
                            <p className="text-xs text-muted-foreground">CPC</p>
                            <p className={`font-semibold ${kpis.cpc <= KPI_TARGETS.cpc ? 'text-emerald-400' : kpis.cpc > 0 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                              {kpis.cpc > 0 ? `${kpis.cpc.toFixed(2)} zł` : '-'}
                            </p>
                          </div>
                          <div className="p-2 rounded-lg bg-secondary/30">
                            <p className="text-xs text-muted-foreground">Rez.</p>
                            <p className="font-semibold text-foreground">
                              {kpis.bookings > 0 ? kpis.bookings : '-'}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{format(new Date(campaign.start_date), 'd MMM yyyy', { locale: pl })}</span>
                          {campaign.end_date && (
                            <span>do {format(new Date(campaign.end_date), 'd MMM yyyy', { locale: pl })}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {filteredCampaigns.map((campaign) => {
                      const kpis = getCampaignKPIs(campaign.id);
                      const config = statusConfig[campaign.status] || statusConfig.draft;
                      
                      return (
                        <div key={campaign.id} className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="font-medium text-foreground">{campaign.name}</h3>
                              <p className="text-sm text-muted-foreground">{campaign.clients?.salon_name}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <Badge variant="outline" className={config.bg}>{config.label}</Badge>
                            <div className="text-right w-20">
                              <p className="text-xs text-muted-foreground">ROAS</p>
                              <p className="font-semibold">{kpis.roas > 0 ? `${kpis.roas.toFixed(2)}x` : '-'}</p>
                            </div>
                            <div className="text-right w-20">
                              <p className="text-xs text-muted-foreground">Wydatki</p>
                              <p className="font-semibold">{kpis.spend > 0 ? formatCurrency(kpis.spend) : '-'}</p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenMetrics(campaign)}>Metryki</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleEdit(campaign)}>Edytuj</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-destructive">Usuń</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredCampaigns.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-1">Brak kampanii</h3>
                  <p className="text-muted-foreground mb-4">Dodaj pierwszą kampanię, aby rozpocząć</p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nowa kampania
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Wydatki vs Rezerwacje</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
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
                        <Bar dataKey="spend" name="Wydatki (PLN)" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="bookings" name="Rezerwacje" fill={CHART_COLORS[2]} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Brak danych
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kliknięcia vs Wyświetlenia</CardTitle>
                </CardHeader>
                <CardContent>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
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
                        <Line type="monotone" dataKey="clicks" name="Kliknięcia" stroke={CHART_COLORS[1]} strokeWidth={2} />
                        <Line type="monotone" dataKey="impressions" name="Wyświetlenia" stroke={CHART_COLORS[3]} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      Brak danych
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{aggregatedKPIs.totalImpressions.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Wyświetlenia</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{aggregatedKPIs.totalReach.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Zasięg</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MousePointer className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{aggregatedKPIs.totalClicks.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Kliknięcia</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{aggregatedKPIs.totalMessages.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Wiadomości</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Zap className="h-5 w-5 mx-auto text-muted-foreground mb-2" />
                  <p className="text-2xl font-bold">{aggregatedKPIs.totalConversions}</p>
                  <p className="text-xs text-muted-foreground">Konwersje</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Metrics Dialog */}
        <Dialog open={metricsDialogOpen} onOpenChange={setMetricsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Metryki: {selectedCampaign?.name}</DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleAddMetrics} className="space-y-4 border-b pb-4 mb-4">
              <h4 className="font-medium">Dodaj metryki</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Od *</Label>
                  <Input type="date" value={metricsForm.period_start} onChange={(e) => setMetricsForm(p => ({ ...p, period_start: e.target.value }))} />
                </div>
                <div>
                  <Label>Do *</Label>
                  <Input type="date" value={metricsForm.period_end} onChange={(e) => setMetricsForm(p => ({ ...p, period_end: e.target.value }))} />
                </div>
                <div>
                  <Label>Wyświetlenia</Label>
                  <Input type="number" value={metricsForm.impressions} onChange={(e) => setMetricsForm(p => ({ ...p, impressions: e.target.value }))} />
                </div>
                <div>
                  <Label>Zasięg</Label>
                  <Input type="number" value={metricsForm.reach} onChange={(e) => setMetricsForm(p => ({ ...p, reach: e.target.value }))} />
                </div>
                <div>
                  <Label>Kliknięcia</Label>
                  <Input type="number" value={metricsForm.clicks} onChange={(e) => setMetricsForm(p => ({ ...p, clicks: e.target.value }))} />
                </div>
                <div>
                  <Label>Wydatki (PLN)</Label>
                  <Input type="number" step="0.01" value={metricsForm.spend} onChange={(e) => setMetricsForm(p => ({ ...p, spend: e.target.value }))} />
                </div>
                <div>
                  <Label>Konwersje</Label>
                  <Input type="number" value={metricsForm.conversions} onChange={(e) => setMetricsForm(p => ({ ...p, conversions: e.target.value }))} />
                </div>
                <div>
                  <Label>Rezerwacje</Label>
                  <Input type="number" value={metricsForm.bookings} onChange={(e) => setMetricsForm(p => ({ ...p, bookings: e.target.value }))} />
                </div>
                <div>
                  <Label>Wiadomości</Label>
                  <Input type="number" value={metricsForm.messages} onChange={(e) => setMetricsForm(p => ({ ...p, messages: e.target.value }))} />
                </div>
              </div>
              <Button type="submit" size="sm">Dodaj metryki</Button>
            </form>

            <div className="space-y-2">
              <h4 className="font-medium">Historia metryk</h4>
              {campaignMetrics.length > 0 ? (
                <div className="space-y-2">
                  {campaignMetrics.map((m) => (
                    <div key={m.id} className="p-3 rounded-lg bg-secondary/30 text-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{format(new Date(m.period_start), 'd MMM', { locale: pl })} - {format(new Date(m.period_end), 'd MMM yyyy', { locale: pl })}</span>
                        <span className="text-muted-foreground">{formatCurrency(m.spend)}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                        <span>Wyśw.: {m.impressions?.toLocaleString()}</span>
                        <span>Klik.: {m.clicks}</span>
                        <span>Rez.: {m.bookings}</span>
                        <span>Wiad.: {m.messages}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">Brak metryk</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

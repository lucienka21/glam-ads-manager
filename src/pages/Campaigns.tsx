import { useState, useEffect } from 'react';
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
  Eye,
  BarChart3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export default function Campaigns() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [metricsDialogOpen, setMetricsDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campaignMetrics, setCampaignMetrics] = useState<CampaignMetrics[]>([]);
  
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
      .select('*, clients(salon_name)')
      .order('created_at', { ascending: false });

    if (campaignsError) {
      toast.error('Błąd ładowania kampanii');
      console.error(campaignsError);
    } else {
      setCampaigns(campaignsData || []);
    }

    // Fetch clients for dropdown
    const { data: clientsData } = await supabase
      .from('clients')
      .select('id, salon_name')
      .eq('status', 'active')
      .order('salon_name');
    
    setClients(clientsData || []);
    setLoading(false);
  };

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
    
    // Fetch metrics for this campaign
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
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
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <DollarSign className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(stats.totalBudget)}</p>
                  <p className="text-xs text-muted-foreground">Łączny budżet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj po nazwie lub kliencie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              <SelectItem value="active">Aktywne</SelectItem>
              <SelectItem value="paused">Wstrzymane</SelectItem>
              <SelectItem value="completed">Zakończone</SelectItem>
              <SelectItem value="draft">Szkice</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Campaigns List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">Brak kampanii</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                        <Badge className={statusColors[campaign.status]}>
                          {statusLabels[campaign.status]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {campaign.clients?.salon_name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {format(new Date(campaign.start_date), 'd MMM yyyy', { locale: pl })}
                          {campaign.end_date && (
                            <span> → {format(new Date(campaign.end_date), 'd MMM yyyy', { locale: pl })}</span>
                          )}
                        </div>
                        {campaign.objective && (
                          <div className="flex items-center gap-1">
                            <Target className="w-3.5 h-3.5" />
                            {campaign.objective}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {campaign.budget && (
                        <div className="text-right">
                          <p className="font-semibold text-primary">{formatCurrency(campaign.budget)}</p>
                          <p className="text-xs text-muted-foreground">budżet</p>
                        </div>
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
                          <DropdownMenuItem onClick={() => navigate(`/clients/${campaign.client_id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Zobacz klienta
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleEdit(campaign)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edytuj
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(campaign.id)} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Metrics Dialog */}
        <Dialog open={metricsDialogOpen} onOpenChange={setMetricsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Metryki: {selectedCampaign?.name}</DialogTitle>
            </DialogHeader>
            
            {/* Add new metrics form */}
            <form onSubmit={handleAddMetrics} className="space-y-4 p-4 bg-secondary/30 rounded-lg">
              <h4 className="text-sm font-medium">Dodaj nowy okres</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Od</Label>
                  <Input
                    type="date"
                    value={metricsForm.period_start}
                    onChange={(e) => setMetricsForm({ ...metricsForm, period_start: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Do</Label>
                  <Input
                    type="date"
                    value={metricsForm.period_end}
                    onChange={(e) => setMetricsForm({ ...metricsForm, period_end: e.target.value })}
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
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Zasięg</Label>
                  <Input
                    type="number"
                    value={metricsForm.reach}
                    onChange={(e) => setMetricsForm({ ...metricsForm, reach: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Kliknięcia</Label>
                  <Input
                    type="number"
                    value={metricsForm.clicks}
                    onChange={(e) => setMetricsForm({ ...metricsForm, clicks: e.target.value })}
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
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Rezerwacje</Label>
                  <Input
                    type="number"
                    value={metricsForm.bookings}
                    onChange={(e) => setMetricsForm({ ...metricsForm, bookings: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label className="text-xs">Wiadomości</Label>
                  <Input
                    type="number"
                    value={metricsForm.messages}
                    onChange={(e) => setMetricsForm({ ...metricsForm, messages: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary/90">
                <Plus className="w-3 h-3 mr-1" />
                Dodaj metryki
              </Button>
            </form>

            {/* Existing metrics */}
            <div className="space-y-3 mt-4">
              <h4 className="text-sm font-medium">Historia metryk</h4>
              {campaignMetrics.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Brak metryk</p>
              ) : (
                campaignMetrics.map((m) => (
                  <Card key={m.id} className="border-border/50">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          {format(new Date(m.period_start), 'd MMM', { locale: pl })} - {format(new Date(m.period_end), 'd MMM yyyy', { locale: pl })}
                        </span>
                        <span className="text-sm font-semibold text-primary">{formatCurrency(m.spend)}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Wyśw.:</span> {m.impressions?.toLocaleString() || 0}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Zasięg:</span> {m.reach?.toLocaleString() || 0}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Klik.:</span> {m.clicks || 0}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rez.:</span> {m.bookings || 0}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { format, formatDistanceToNow, isPast, isToday, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  MoreVertical,
  Pencil,
  Trash2,
  UserPlus,
  Loader2,
  Send,
  Clock,
  CalendarDays,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface Lead {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  // New fields for tracking
  cold_email_sent: boolean | null;
  cold_email_date: string | null;
  follow_up_count: number | null;
  last_follow_up_date: string | null;
  next_follow_up_date: string | null;
  last_contact_date: string | null;
  response: string | null;
  response_date: string | null;
  priority: string | null;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  follow_up: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  meeting_scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  converted: 'bg-green-500/20 text-green-400 border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
  no_response: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

const statusLabels: Record<string, string> = {
  new: 'Nowy',
  contacted: 'Skontaktowano',
  follow_up: 'Follow-up',
  meeting_scheduled: 'Spotkanie',
  converted: 'Skonwertowany',
  lost: 'Utracony',
  no_response: 'Brak odpowiedzi',
};

const priorityColors: Record<string, string> = {
  low: 'bg-zinc-500/20 text-zinc-400',
  medium: 'bg-blue-500/20 text-blue-400',
  high: 'bg-pink-500/20 text-pink-400',
};

const priorityLabels: Record<string, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

export default function Leads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    salon_name: '',
    owner_name: '',
    city: '',
    phone: '',
    email: '',
    instagram: '',
    source: '',
    status: 'new',
    notes: '',
    cold_email_sent: false,
    cold_email_date: '',
    follow_up_count: 0,
    last_follow_up_date: '',
    next_follow_up_date: '',
    last_contact_date: '',
    response: '',
    response_date: '',
    priority: 'medium',
  });

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd ładowania leadów');
      console.error(error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.salon_name) {
      toast.error('Nazwa salonu jest wymagana');
      return;
    }

    const dataToSave = {
      ...formData,
      cold_email_date: formData.cold_email_date || null,
      last_follow_up_date: formData.last_follow_up_date || null,
      next_follow_up_date: formData.next_follow_up_date || null,
      last_contact_date: formData.last_contact_date || null,
      response_date: formData.response_date || null,
    };

    if (editingLead) {
      const { error } = await supabase
        .from('leads')
        .update(dataToSave)
        .eq('id', editingLead.id);

      if (error) {
        toast.error('Błąd aktualizacji leada');
      } else {
        toast.success('Lead zaktualizowany');
        fetchLeads();
      }
    } else {
      const { error } = await supabase
        .from('leads')
        .insert({ ...dataToSave, created_by: user?.id });

      if (error) {
        toast.error('Błąd dodawania leada');
      } else {
        toast.success('Lead dodany');
        fetchLeads();
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego leada?')) return;

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Błąd usuwania leada');
    } else {
      toast.success('Lead usunięty');
      fetchLeads();
    }
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setFormData({
      salon_name: lead.salon_name,
      owner_name: lead.owner_name || '',
      city: lead.city || '',
      phone: lead.phone || '',
      email: lead.email || '',
      instagram: lead.instagram || '',
      source: lead.source || '',
      status: lead.status,
      notes: lead.notes || '',
      cold_email_sent: lead.cold_email_sent || false,
      cold_email_date: lead.cold_email_date || '',
      follow_up_count: lead.follow_up_count || 0,
      last_follow_up_date: lead.last_follow_up_date || '',
      next_follow_up_date: lead.next_follow_up_date || '',
      last_contact_date: lead.last_contact_date || '',
      response: lead.response || '',
      response_date: lead.response_date || '',
      priority: lead.priority || 'medium',
    });
    setIsDialogOpen(true);
  };

  const handleMarkEmailSent = async (lead: Lead) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const { error } = await supabase
      .from('leads')
      .update({ 
        cold_email_sent: true, 
        cold_email_date: today,
        last_contact_date: today,
        status: 'contacted'
      })
      .eq('id', lead.id);

    if (error) {
      toast.error('Błąd aktualizacji');
    } else {
      toast.success('Oznaczono jako wysłany');
      fetchLeads();
    }
  };

  const handleAddFollowUp = async (lead: Lead) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const nextFollowUp = format(addDays(new Date(), 3), 'yyyy-MM-dd');
    const { error } = await supabase
      .from('leads')
      .update({ 
        follow_up_count: (lead.follow_up_count || 0) + 1,
        last_follow_up_date: today,
        next_follow_up_date: nextFollowUp,
        last_contact_date: today,
        status: 'follow_up'
      })
      .eq('id', lead.id);

    if (error) {
      toast.error('Błąd aktualizacji');
    } else {
      toast.success('Follow-up dodany');
      fetchLeads();
    }
  };

  const resetForm = () => {
    setEditingLead(null);
    setFormData({
      salon_name: '',
      owner_name: '',
      city: '',
      phone: '',
      email: '',
      instagram: '',
      source: '',
      status: 'new',
      notes: '',
      cold_email_sent: false,
      cold_email_date: '',
      follow_up_count: 0,
      last_follow_up_date: '',
      next_follow_up_date: '',
      last_contact_date: '',
      response: '',
      response_date: '',
      priority: 'medium',
    });
  };

  // Filter leads based on tab and filters
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.salon_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.city?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
    
    // Tab filters
    let matchesTab = true;
    if (activeTab === 'pending_email') {
      matchesTab = !lead.cold_email_sent;
    } else if (activeTab === 'awaiting_response') {
      matchesTab = lead.cold_email_sent === true && !lead.response && lead.status !== 'converted' && lead.status !== 'lost';
    } else if (activeTab === 'follow_up_due') {
      matchesTab = lead.next_follow_up_date ? isPast(new Date(lead.next_follow_up_date)) || isToday(new Date(lead.next_follow_up_date)) : false;
    } else if (activeTab === 'responded') {
      matchesTab = !!lead.response;
    }
    
    return matchesSearch && matchesStatus && matchesPriority && matchesTab;
  });

  // Stats
  const stats = {
    total: leads.length,
    pendingEmail: leads.filter(l => !l.cold_email_sent).length,
    awaitingResponse: leads.filter(l => l.cold_email_sent && !l.response && l.status !== 'converted' && l.status !== 'lost').length,
    followUpDue: leads.filter(l => l.next_follow_up_date && (isPast(new Date(l.next_follow_up_date)) || isToday(new Date(l.next_follow_up_date)))).length,
    responded: leads.filter(l => !!l.response).length,
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leady</h1>
            <p className="text-muted-foreground text-sm">Śledzenie cold maili i follow-upów</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLead ? 'Edytuj lead' : 'Nowy lead'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Dane podstawowe</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Nazwa salonu *</Label>
                      <Input
                        value={formData.salon_name}
                        onChange={(e) => setFormData({ ...formData, salon_name: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label>Właściciel</Label>
                      <Input
                        value={formData.owner_name}
                        onChange={(e) => setFormData({ ...formData, owner_name: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Miasto</Label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Instagram</Label>
                      <Input
                        value={formData.instagram}
                        onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                        placeholder="@nazwasalonu"
                        className="form-input-elegant"
                      />
                    </div>
                  </div>
                </div>

                {/* Status & Priority */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Status i priorytet</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Status</Label>
                      <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                        <SelectTrigger className="form-input-elegant">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(statusLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priorytet</Label>
                      <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                        <SelectTrigger className="form-input-elegant">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(priorityLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Źródło</Label>
                      <Input
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        placeholder="np. Instagram"
                        className="form-input-elegant"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Tracking */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Śledzenie cold maili</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex items-center space-x-2">
                      <Checkbox
                        id="cold_email_sent"
                        checked={formData.cold_email_sent}
                        onCheckedChange={(checked) => setFormData({ ...formData, cold_email_sent: checked as boolean })}
                      />
                      <Label htmlFor="cold_email_sent" className="cursor-pointer">Cold email wysłany</Label>
                    </div>
                    <div>
                      <Label>Data wysłania maila</Label>
                      <Input
                        type="date"
                        value={formData.cold_email_date}
                        onChange={(e) => setFormData({ ...formData, cold_email_date: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Ostatni kontakt</Label>
                      <Input
                        type="date"
                        value={formData.last_contact_date}
                        onChange={(e) => setFormData({ ...formData, last_contact_date: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                  </div>
                </div>

                {/* Follow-ups */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Follow-upy</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Liczba follow-upów</Label>
                      <Input
                        type="number"
                        min="0"
                        value={formData.follow_up_count}
                        onChange={(e) => setFormData({ ...formData, follow_up_count: parseInt(e.target.value) || 0 })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Ostatni follow-up</Label>
                      <Input
                        type="date"
                        value={formData.last_follow_up_date}
                        onChange={(e) => setFormData({ ...formData, last_follow_up_date: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                    <div>
                      <Label>Następny follow-up</Label>
                      <Input
                        type="date"
                        value={formData.next_follow_up_date}
                        onChange={(e) => setFormData({ ...formData, next_follow_up_date: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                  </div>
                </div>

                {/* Response */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Odpowiedź</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Treść odpowiedzi</Label>
                      <Textarea
                        value={formData.response}
                        onChange={(e) => setFormData({ ...formData, response: e.target.value })}
                        className="form-input-elegant"
                        rows={2}
                        placeholder="Odpowiedź od leada..."
                      />
                    </div>
                    <div>
                      <Label>Data odpowiedzi</Label>
                      <Input
                        type="date"
                        value={formData.response_date}
                        onChange={(e) => setFormData({ ...formData, response_date: e.target.value })}
                        className="form-input-elegant"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label>Notatki</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="form-input-elegant"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {editingLead ? 'Zapisz zmiany' : 'Dodaj lead'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <UserPlus className="w-4 h-4 text-blue-400" />
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
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Send className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pendingEmail}</p>
                  <p className="text-xs text-muted-foreground">Do wysłania</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Clock className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.awaitingResponse}</p>
                  <p className="text-xs text-muted-foreground">Czekam na odp.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <AlertCircle className="w-4 h-4 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.followUpDue}</p>
                  <p className="text-xs text-muted-foreground">Follow-up!</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.responded}</p>
                  <p className="text-xs text-muted-foreground">Odpowiedzi</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="all">Wszystkie</TabsTrigger>
            <TabsTrigger value="pending_email" className="relative">
              Do wysłania
              {stats.pendingEmail > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-yellow-500/20 text-yellow-400 rounded-full">
                  {stats.pendingEmail}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="awaiting_response">Czekam na odp.</TabsTrigger>
            <TabsTrigger value="follow_up_due" className="relative">
              Follow-up
              {stats.followUpDue > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] bg-pink-500/20 text-pink-400 rounded-full">
                  {stats.followUpDue}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="responded">Odpowiedzi</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj po nazwie, właścicielu lub mieście..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 form-input-elegant"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] form-input-elegant">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[150px] form-input-elegant">
              <SelectValue placeholder="Priorytet" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              {Object.entries(priorityLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Leads Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Brak leadów</p>
            <p className="text-sm text-muted-foreground/70">Dodaj pierwszego leada klikając przycisk powyżej</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div className="p-4 border-b border-border/30">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">{lead.salon_name}</h3>
                          {lead.priority && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${priorityColors[lead.priority]}`}>
                              {priorityLabels[lead.priority]}
                            </span>
                          )}
                        </div>
                        {lead.owner_name && (
                          <p className="text-sm text-muted-foreground truncate">{lead.owner_name}</p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(lead)}>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edytuj
                          </DropdownMenuItem>
                          {!lead.cold_email_sent && (
                            <DropdownMenuItem onClick={() => handleMarkEmailSent(lead)}>
                              <Send className="w-4 h-4 mr-2" />
                              Oznacz email wysłany
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleAddFollowUp(lead)}>
                            <ArrowUpRight className="w-4 h-4 mr-2" />
                            Dodaj follow-up
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(lead.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </Badge>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="p-4 space-y-2 text-sm border-b border-border/30">
                    {lead.city && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{lead.city}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                    )}
                    {lead.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 shrink-0" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                    {lead.instagram && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Instagram className="w-3.5 h-3.5 shrink-0" />
                        <span>{lead.instagram}</span>
                      </div>
                    )}
                  </div>

                  {/* Tracking Info */}
                  <div className="p-4 space-y-3 bg-secondary/20">
                    {/* Cold Email Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Send className={`w-3.5 h-3.5 ${lead.cold_email_sent ? 'text-green-400' : 'text-muted-foreground'}`} />
                        <span className="text-xs text-muted-foreground">Cold email</span>
                      </div>
                      {lead.cold_email_sent ? (
                        <span className="text-xs text-green-400">
                          {lead.cold_email_date && format(new Date(lead.cold_email_date), 'd MMM', { locale: pl })}
                        </span>
                      ) : (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 text-xs text-yellow-400 hover:text-yellow-300"
                          onClick={() => handleMarkEmailSent(lead)}
                        >
                          Wyślij
                        </Button>
                      )}
                    </div>

                    {/* Follow-ups */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Follow-upy</span>
                      </div>
                      <span className="text-xs font-medium">{lead.follow_up_count || 0}</span>
                    </div>

                    {/* Next Follow-up */}
                    {lead.next_follow_up_date && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarDays className={`w-3.5 h-3.5 ${isPast(new Date(lead.next_follow_up_date)) || isToday(new Date(lead.next_follow_up_date)) ? 'text-pink-400' : 'text-muted-foreground'}`} />
                          <span className="text-xs text-muted-foreground">Następny FU</span>
                        </div>
                        <span className={`text-xs ${isPast(new Date(lead.next_follow_up_date)) || isToday(new Date(lead.next_follow_up_date)) ? 'text-pink-400 font-medium' : ''}`}>
                          {format(new Date(lead.next_follow_up_date), 'd MMM', { locale: pl })}
                        </span>
                      </div>
                    )}

                    {/* Response */}
                    {lead.response && (
                      <div className="pt-2 border-t border-border/30">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-green-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{lead.response}</p>
                            {lead.response_date && (
                              <p className="text-[10px] text-muted-foreground/60 mt-1">
                                {format(new Date(lead.response_date), 'd MMM yyyy', { locale: pl })}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Last Contact */}
                    {lead.last_contact_date && (
                      <div className="text-[10px] text-muted-foreground/60 pt-2 border-t border-border/30">
                        Ostatni kontakt: {formatDistanceToNow(new Date(lead.last_contact_date), { locale: pl, addSuffix: true })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

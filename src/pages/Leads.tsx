import { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  meeting_scheduled: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  converted: 'bg-green-500/20 text-green-400 border-green-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabels: Record<string, string> = {
  new: 'Nowy',
  contacted: 'Skontaktowano',
  meeting_scheduled: 'Spotkanie',
  converted: 'Skonwertowany',
  lost: 'Utracony',
};

export default function Leads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
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

    if (editingLead) {
      const { error } = await supabase
        .from('leads')
        .update(formData)
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
        .insert({ ...formData, created_by: user?.id });

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
    });
    setIsDialogOpen(true);
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
    });
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.salon_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
      lead.city?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Leady</h1>
            <p className="text-muted-foreground text-sm">Zarządzaj potencjalnymi klientami</p>
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
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingLead ? 'Edytuj lead' : 'Nowy lead'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>Nazwa salonu *</Label>
                    <Input
                      value={formData.salon_name}
                      onChange={(e) => setFormData({ ...formData, salon_name: e.target.value })}
                      className="form-input-elegant"
                    />
                  </div>
                  <div>
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
                  <div>
                    <Label>Źródło</Label>
                    <Input
                      value={formData.source}
                      onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                      placeholder="np. cold email, polecenie"
                      className="form-input-elegant"
                    />
                  </div>
                  <div className="col-span-2">
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
                  <div className="col-span-2">
                    <Label>Notatki</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="form-input-elegant"
                      rows={3}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {editingLead ? 'Zapisz zmiany' : 'Dodaj lead'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

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
            <SelectTrigger className="w-[180px] form-input-elegant">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie</SelectItem>
              {Object.entries(statusLabels).map(([value, label]) => (
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{lead.salon_name}</CardTitle>
                      {lead.owner_name && (
                        <p className="text-sm text-muted-foreground truncate">{lead.owner_name}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(lead)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
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
                  <Badge className={`w-fit ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {lead.city && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lead.city}</span>
                    </div>
                  )}
                  {lead.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{lead.phone}</span>
                    </div>
                  )}
                  {lead.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{lead.email}</span>
                    </div>
                  )}
                  {lead.instagram && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{lead.instagram}</span>
                    </div>
                  )}
                  {lead.source && (
                    <div className="text-xs text-muted-foreground/70 pt-2 border-t border-border/50">
                      Źródło: {lead.source}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

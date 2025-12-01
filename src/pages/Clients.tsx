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
  Building2,
  Loader2,
  Calendar,
  DollarSign
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export default function Clients() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [formData, setFormData] = useState({
    salon_name: '',
    owner_name: '',
    city: '',
    phone: '',
    email: '',
    instagram: '',
    facebook_page: '',
    status: 'active',
    contract_start_date: '',
    monthly_budget: '',
    notes: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd ładowania klientów');
      console.error(error);
    } else {
      setClients(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.salon_name) {
      toast.error('Nazwa salonu jest wymagana');
      return;
    }

    const submitData = {
      salon_name: formData.salon_name,
      owner_name: formData.owner_name || null,
      city: formData.city || null,
      phone: formData.phone || null,
      email: formData.email || null,
      instagram: formData.instagram || null,
      facebook_page: formData.facebook_page || null,
      status: formData.status,
      contract_start_date: formData.contract_start_date || null,
      monthly_budget: formData.monthly_budget ? parseFloat(formData.monthly_budget) : null,
      notes: formData.notes || null,
    };

    if (editingClient) {
      const { error } = await supabase
        .from('clients')
        .update(submitData)
        .eq('id', editingClient.id);

      if (error) {
        toast.error('Błąd aktualizacji klienta');
      } else {
        toast.success('Klient zaktualizowany');
        fetchClients();
      }
    } else {
      const { error } = await supabase
        .from('clients')
        .insert({ ...submitData, created_by: user?.id });

      if (error) {
        toast.error('Błąd dodawania klienta');
      } else {
        toast.success('Klient dodany');
        fetchClients();
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć tego klienta?')) return;

    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Błąd usuwania klienta');
    } else {
      toast.success('Klient usunięty');
      fetchClients();
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setFormData({
      salon_name: client.salon_name,
      owner_name: client.owner_name || '',
      city: client.city || '',
      phone: client.phone || '',
      email: client.email || '',
      instagram: client.instagram || '',
      facebook_page: client.facebook_page || '',
      status: client.status,
      contract_start_date: client.contract_start_date || '',
      monthly_budget: client.monthly_budget?.toString() || '',
      notes: client.notes || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingClient(null);
    setFormData({
      salon_name: '',
      owner_name: '',
      city: '',
      phone: '',
      email: '',
      instagram: '',
      facebook_page: '',
      status: 'active',
      contract_start_date: '',
      monthly_budget: '',
      notes: '',
    });
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.salon_name.toLowerCase().includes(search.toLowerCase()) ||
      client.owner_name?.toLowerCase().includes(search.toLowerCase()) ||
      client.city?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <h1 className="text-2xl font-bold text-foreground">Klienci</h1>
            <p className="text-muted-foreground text-sm">Zarządzaj aktywnymi klientami</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj klienta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingClient ? 'Edytuj klienta' : 'Nowy klient'}</DialogTitle>
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
                    <Label>Facebook</Label>
                    <Input
                      value={formData.facebook_page}
                      onChange={(e) => setFormData({ ...formData, facebook_page: e.target.value })}
                      className="form-input-elegant"
                    />
                  </div>
                  <div>
                    <Label>Data rozpoczęcia</Label>
                    <Input
                      type="date"
                      value={formData.contract_start_date}
                      onChange={(e) => setFormData({ ...formData, contract_start_date: e.target.value })}
                      className="form-input-elegant"
                    />
                  </div>
                  <div>
                    <Label>Budżet miesięczny (PLN)</Label>
                    <Input
                      type="number"
                      value={formData.monthly_budget}
                      onChange={(e) => setFormData({ ...formData, monthly_budget: e.target.value })}
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
                  {editingClient ? 'Zapisz zmiany' : 'Dodaj klienta'}
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

        {/* Clients Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Brak klientów</p>
            <p className="text-sm text-muted-foreground/70">Dodaj pierwszego klienta klikając przycisk powyżej</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card key={client.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base truncate">{client.salon_name}</CardTitle>
                      {client.owner_name && (
                        <p className="text-sm text-muted-foreground truncate">{client.owner_name}</p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(client)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(client.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge className={`w-fit ${statusColors[client.status]}`}>
                    {statusLabels[client.status]}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {client.city && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{client.city}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.instagram && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{client.instagram}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    {client.monthly_budget && (
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <DollarSign className="w-3 h-3" />
                        <span>{formatCurrency(client.monthly_budget)}/mies.</span>
                      </div>
                    )}
                    {client.contract_start_date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>od {new Date(client.contract_start_date).toLocaleDateString('pl-PL')}</span>
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

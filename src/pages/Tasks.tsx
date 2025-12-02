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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  Plus, 
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
  Users,
  User,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  assigned_to: string | null;
  created_by: string | null;
  is_agency_task: boolean;
  completed_at: string | null;
  created_at: string;
}

interface Employee {
  id: string;
  email: string | null;
  full_name: string | null;
}

const statusColors: Record<string, string> = {
  todo: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const statusLabels: Record<string, string> = {
  todo: 'Do zrobienia',
  in_progress: 'W trakcie',
  completed: 'Ukończone',
};

const priorityColors: Record<string, string> = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
};

const priorityLabels: Record<string, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

export default function Tasks() {
  const { user } = useAuth();
  const { isSzef } = useUserRole();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState('my-tasks');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assigned_to: '',
    is_agency_task: false,
  });

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, email, full_name')
      .order('full_name');
    
    setEmployees(data || []);
  };

  const fetchTasks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Błąd ładowania zadań');
      console.error(error);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title) {
      toast.error('Tytuł zadania jest wymagany');
      return;
    }

    const submitData = {
      title: formData.title,
      description: formData.description || null,
      status: formData.status,
      priority: formData.priority,
      due_date: formData.due_date || null,
      assigned_to: formData.assigned_to || null,
      is_agency_task: formData.is_agency_task,
      created_by: user?.id,
    };

    if (editingTask) {
      const { error } = await supabase
        .from('tasks')
        .update(submitData)
        .eq('id', editingTask.id);

      if (error) {
        toast.error('Błąd aktualizacji zadania');
      } else {
        toast.success('Zadanie zaktualizowane');
        fetchTasks();
      }
    } else {
      const { error } = await supabase
        .from('tasks')
        .insert(submitData);

      if (error) {
        toast.error('Błąd dodawania zadania');
      } else {
        toast.success('Zadanie dodane');
        fetchTasks();
      }
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć to zadanie?')) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Błąd usuwania zadania');
    } else {
      toast.success('Zadanie usunięte');
      fetchTasks();
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    const updateData: any = { status: newStatus };
    if (newStatus === 'completed') {
      updateData.completed_at = new Date().toISOString();
    } else if (newStatus !== 'completed') {
      updateData.completed_at = null;
    }

    const { error } = await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId);

    if (error) {
      toast.error('Błąd aktualizacji statusu');
    } else {
      toast.success('Status zaktualizowany');
      fetchTasks();
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority,
      due_date: task.due_date || '',
      assigned_to: task.assigned_to || '',
      is_agency_task: task.is_agency_task,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      due_date: '',
      assigned_to: '',
      is_agency_task: false,
    });
  };

  const myTasks = tasks.filter(t => t.assigned_to === user?.id);
  const agencyTasks = tasks.filter(t => t.is_agency_task);
  const allTasks = tasks;

  const renderTaskCard = (task: Task) => {
    const assignedEmployee = employees.find(e => e.id === task.assigned_to);
    const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'completed';

    return (
      <Card key={task.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.status === 'completed'}
                onCheckedChange={(checked) => 
                  handleStatusChange(task.id, checked ? 'completed' : 'todo')
                }
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <CardTitle className={`text-base ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </CardTitle>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={statusColors[task.status]}>
                    {statusLabels[task.status]}
                  </Badge>
                  <Badge className={priorityColors[task.priority]}>
                    {priorityLabels[task.priority]}
                  </Badge>
                  {task.is_agency_task && (
                    <Badge variant="outline" className="gap-1">
                      <Users className="w-3 h-3" />
                      Agencyjne
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleEdit(task)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edytuj
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleDelete(task.id)}
                  className="text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Usuń
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-2">
          {assignedEmployee && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              <span>{assignedEmployee.full_name || assignedEmployee.email}</span>
            </div>
          )}
          {task.due_date && (
            <div className={`flex items-center gap-2 text-sm ${isOverdue ? 'text-red-400' : 'text-muted-foreground'}`}>
              {isOverdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
              <span>{format(new Date(task.due_date), 'd MMMM yyyy', { locale: pl })}</span>
              {isOverdue && <span className="text-xs">(Zaległe)</span>}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Zadania</h1>
            <p className="text-muted-foreground text-sm">Zarządzaj zadaniami zespołu</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Nowe zadanie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTask ? 'Edytuj zadanie' : 'Nowe zadanie'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Tytuł *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input-elegant"
                  />
                </div>
                <div>
                  <Label>Opis</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-input-elegant"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <div>
                  <Label>Termin</Label>
                  <Input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                    className="form-input-elegant"
                  />
                </div>
                <div>
                  <Label>Przypisz do</Label>
                  <Select value={formData.assigned_to} onValueChange={(v) => setFormData({ ...formData, assigned_to: v })}>
                    <SelectTrigger className="form-input-elegant">
                      <SelectValue placeholder="Wybierz osobę" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Nie przypisane</SelectItem>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.full_name || emp.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {isSzef && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="is_agency_task"
                      checked={formData.is_agency_task}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, is_agency_task: checked as boolean })
                      }
                    />
                    <Label htmlFor="is_agency_task" className="cursor-pointer">
                      Zadanie agencyjne (widoczne dla wszystkich)
                    </Label>
                  </div>
                )}
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {editingTask ? 'Zapisz zmiany' : 'Dodaj zadanie'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tasks Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="my-tasks" className="gap-2">
              <User className="w-4 h-4" />
              Moje zadania ({myTasks.length})
            </TabsTrigger>
            <TabsTrigger value="agency-tasks" className="gap-2">
              <Users className="w-4 h-4" />
              Agencyjne ({agencyTasks.length})
            </TabsTrigger>
            {isSzef && (
              <TabsTrigger value="all-tasks" className="gap-2">
                Wszystkie ({allTasks.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="my-tasks" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : myTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak przypisanych zadań</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {myTasks.map(renderTaskCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="agency-tasks" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : agencyTasks.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak zadań agencyjnych</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {agencyTasks.map(renderTaskCard)}
              </div>
            )}
          </TabsContent>

          {isSzef && (
            <TabsContent value="all-tasks" className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : allTasks.length === 0 ? (
                <div className="text-center py-12">
                  <Circle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Brak zadań</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {allTasks.map(renderTaskCard)}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </AppLayout>
  );
}

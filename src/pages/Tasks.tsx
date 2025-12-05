import { useEffect, useMemo, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { taskSchema } from '@/lib/validationSchemas';
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
import { notifyTaskCompleted, notifyTaskAssigned, processMentions } from '@/lib/notifications';
import { renderMentions } from '@/components/ui/Mention';
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
  Loader2,
  MessageSquare,
  Send,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TaskRow {
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
  completed_by: string | null;
  created_at: string;
  updated_at: string;
  client_id: string | null;
}

interface Employee {
  id: string;
  email: string | null;
  full_name: string | null;
}

interface Client {
  id: string;
  salon_name: string;
}

interface TaskCommentRow {
  id: string;
  task_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  author_name?: string;
  user?: {
    email: string | null;
    full_name: string | null;
  } | null;
}

const statusLabels: Record<string, string> = {
  todo: 'Do zrobienia',
  in_progress: 'W trakcie',
  completed: 'Ukończone',
};

const priorityLabels: Record<string, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

const statusColors: Record<string, string> = {
  todo: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
  in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const priorityColors: Record<string, string> = {
  low: 'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
};

const UNASSIGNED_VALUE = 'unassigned';

function safeFormat(dateString: string | null, pattern: string) {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return '';
    return format(d, pattern, { locale: pl });
  } catch (e) {
    console.error('Date format error in Tasks page', { dateString, e });
    return '';
  }
}

export default function Tasks() {
  const { user } = useAuth();
  const { isSzef } = useUserRole();

  const [tasks, setTasks] = useState<TaskRow[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskRow | null>(null);
  const [activeTab, setActiveTab] = useState<'my' | 'agency' | 'team' | 'history'>('my');
  const [userFilter, setUserFilter] = useState<string>('all');

const [formData, setFormData] = useState({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  due_date: '',
  assigned_to: UNASSIGNED_VALUE,
  is_agency_task: false,
  client_id: '',
});

  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskRow | null>(null);
  const [comments, setComments] = useState<TaskCommentRow[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [taskComments, setTaskComments] = useState<Record<string, TaskCommentRow[]>>({});

  // ---------- DATA LOADING ----------

  useEffect(() => {
    void loadInitialData();
    
    // Subscribe to task changes for real-time notifications
    if (!user) return;
    
    const channel = supabase
      .channel('task-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tasks',
          filter: `assigned_to=eq.${user.id}`,
        },
        (payload) => {
          const newTask = payload.new as TaskRow;
          // Only show notification if the task was created by someone else
          if (newTask.created_by !== user.id) {
            toast.info(`Nowe zadanie przypisane: "${newTask.title}"`, {
              duration: 5000,
            });
            void loadInitialData();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [tasksRes, employeesRes, clientsRes] = await Promise.all([
        supabase.from('tasks').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('id, email, full_name').order('full_name'),
        supabase.from('clients').select('id, salon_name').order('salon_name'),
      ]);

      if (tasksRes.error) {
        console.error('Error loading tasks', tasksRes.error);
        toast.error('Błąd ładowania zadań');
      } else {
        setTasks(tasksRes.data || []);
        // Load last comment for each task
        void loadTaskComments(tasksRes.data || []);
      }

      if (employeesRes.error) {
        console.error('Error loading employees', employeesRes.error);
      } else {
        setEmployees(employeesRes.data || []);
      }
      
      if (clientsRes.error) {
        console.error('Error loading clients', clientsRes.error);
      } else {
        setClients(clientsRes.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadTaskComments = async (tasksList: TaskRow[]) => {
    const taskIds = tasksList.map(t => t.id);
    if (taskIds.length === 0) return;

    try {
      const { data, error } = await supabase
        .from('task_comments')
        .select('id, task_id, user_id, comment, created_at, updated_at')
        .in('task_id', taskIds)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading task comments', error);
        return;
      }

      // Group comments by task_id (only keep last comment per task)
      const commentsByTask: Record<string, TaskCommentRow[]> = {};
      const userIds = new Set<string>();

      (data || []).forEach((c: any) => {
        if (!commentsByTask[c.task_id]) {
          commentsByTask[c.task_id] = [];
        }
        commentsByTask[c.task_id].push(c);
        userIds.add(c.user_id);
      });

      // Load profiles for comment authors
      if (userIds.size > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, email')
          .in('id', Array.from(userIds));

        const profilesById = Object.fromEntries(
          (profilesData || []).map(p => [p.id, { full_name: p.full_name, email: p.email }])
        );

        // Map profiles to comments
        Object.keys(commentsByTask).forEach(taskId => {
          commentsByTask[taskId] = commentsByTask[taskId].map(c => ({
            ...c,
            author_name: profilesById[c.user_id]?.full_name || profilesById[c.user_id]?.email || 'Nieznany'
          }));
        });
      }

      setTaskComments(commentsByTask);
    } catch (err) {
      console.error('Unexpected error loading task comments', err);
    }
  };

  // ---------- TASK CRUD ----------

const openNewTaskDialog = () => {
  setEditingTask(null);
  setFormData({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    due_date: '',
    assigned_to: UNASSIGNED_VALUE,
    is_agency_task: false,
    client_id: '',
  });
  setIsTaskDialogOpen(true);
};

const openEditTaskDialog = (task: TaskRow) => {
  setEditingTask(task);
  setFormData({
    title: task.title,
    description: task.description || '',
    status: task.status,
    priority: task.priority,
    due_date: task.due_date || '',
    assigned_to: task.assigned_to || UNASSIGNED_VALUE,
    is_agency_task: task.is_agency_task,
    client_id: task.client_id || '',
  });
  setIsTaskDialogOpen(true);
};

  const handleSaveTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('Musisz być zalogowany, aby zarządzać zadaniami');
      return;
    }

    // Validate form data with Zod
    const dataToValidate = {
      ...formData,
      assigned_to: formData.assigned_to === UNASSIGNED_VALUE ? null : formData.assigned_to || null,
      client_id: formData.client_id || null,
    };
    
    const validationResult = taskSchema.safeParse(dataToValidate);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast.error(firstError.message);
      return;
    }

const payload = {
  title: formData.title.trim(),
  description: formData.description.trim() || null,
  status: formData.status,
  priority: formData.priority,
  due_date: formData.due_date || null,
  assigned_to:
    formData.assigned_to === UNASSIGNED_VALUE
      ? null
      : formData.assigned_to || null,
  is_agency_task: formData.is_agency_task,
  created_by: editingTask?.created_by || user.id,
  client_id: formData.client_id || null,
};

    try {
      if (editingTask) {
        const { error } = await supabase
          .from('tasks')
          .update(payload)
          .eq('id', editingTask.id);

        if (error) {
          console.error('Error updating task', error);
          toast.error('Błąd aktualizacji zadania: ' + error.message);
        } else {
          toast.success('Zadanie zaktualizowane');
          void loadInitialData();
          setIsTaskDialogOpen(false);
        }
      } else {
        console.log('Attempting to insert task with payload:', { ...payload, created_by: user.id });
        const { data, error } = await supabase.from('tasks').insert({ ...payload, created_by: user.id }).select();

        if (error) {
          console.error('Error creating task', error);
          toast.error('Błąd dodawania zadania: ' + error.message);
        } else {
          console.log('Task created successfully:', data);
          const newTask = data?.[0];
          
          // Send notification if task is assigned to someone
          if (payload.assigned_to && payload.assigned_to !== user.id && newTask) {
            const currentUserProfile = employees.find(e => e.id === user.id);
            const assignerName = currentUserProfile?.full_name || currentUserProfile?.email || 'Użytkownik';
            const assignedEmployee = employees.find(e => e.id === payload.assigned_to);
            const assignedName = assignedEmployee?.full_name || assignedEmployee?.email || 'użytkownika';
            
            await notifyTaskAssigned(
              newTask.id,
              formData.title,
              payload.assigned_to,
              assignerName,
              user.id
            );
            
            toast.success(`Zadanie "${formData.title}" przypisane do ${assignedName}`);
          } else {
            toast.success('Zadanie dodane');
          }
          
          void loadInitialData();
          setIsTaskDialogOpen(false);
        }
      }
    } catch (err: any) {
      console.error('Unexpected error saving task', err);
      toast.error('Nieoczekiwany błąd przy zapisie zadania');
    }
  };

  const handleDeleteTask = async (task: TaskRow) => {
    if (!confirm('Czy na pewno chcesz usunąć to zadanie?')) return;

    try {
      const { error } = await supabase.from('tasks').delete().eq('id', task.id);
      if (error) {
        console.error('Error deleting task', error);
        toast.error('Błąd usuwania zadania: ' + error.message);
      } else {
        toast.success('Zadanie usunięte');
        void loadInitialData();
      }
    } catch (err) {
      console.error('Unexpected error deleting task', err);
      toast.error('Nieoczekiwany błąd usuwania zadania');
    }
  };

  const handleToggleCompleted = async (task: TaskRow, completed: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          status: completed ? 'completed' : 'todo',
          completed_at: completed ? new Date().toISOString() : null,
          completed_by: completed ? user.id : null,
        })
        .eq('id', task.id);

      if (error) {
        console.error('Error updating task status', error);
        toast.error('Błąd aktualizacji statusu');
      } else {
        toast.success(completed ? 'Zadanie ukończone' : 'Zadanie wznowione');
        
        // Send notification when task is completed by someone other than creator/assignee
        if (completed) {
          const currentUserProfile = employees.find(e => e.id === user.id);
          const completedByName = currentUserProfile?.full_name || currentUserProfile?.email || 'Użytkownik';
          
          await notifyTaskCompleted(
            task.id,
            task.title,
            user.id,
            completedByName,
            task.created_by,
            task.assigned_to
          );
        }
        
        void loadInitialData();
      }
    } catch (err) {
      console.error('Unexpected error updating status', err);
      toast.error('Nieoczekiwany błąd aktualizacji statusu');
    }
  };

  // ---------- COMMENTS ----------

  const openComments = async (task: TaskRow) => {
    setSelectedTask(task);
    setIsCommentsDialogOpen(true);
    setComments([]);
    setNewComment('');
    setEditingCommentId(null);
    setEditingCommentText('');
    await loadComments(task.id);
  };

  const loadComments = async (taskId: string) => {
    setCommentsLoading(true);
    try {
      const { data, error } = await supabase
        .from('task_comments')
        .select(
          'id, task_id, user_id, comment, created_at, updated_at'
        )
        .eq('task_id', taskId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading comments', error);
        toast.error('Błąd ładowania komentarzy');
      } else {
        // osobno dociągamy autorów, żeby uniknąć problemów z typami relacji
        const userIds = Array.from(new Set((data || []).map((c) => c.user_id)));
        let profilesById: Record<string, { full_name: string | null; email: string | null }> = {};

        if (userIds.length) {
          const { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', userIds);

          if (profilesError) {
            console.error('Error loading comment authors', profilesError);
          } else {
            profilesById = Object.fromEntries(
              (profilesData || []).map((p) => [p.id, { full_name: p.full_name, email: p.email }])
            );
          }
        }

        const mapped: TaskCommentRow[] = (data || []).map((c: any) => ({
          id: c.id,
          task_id: c.task_id,
          user_id: c.user_id,
          comment: c.comment,
          created_at: c.created_at,
          updated_at: c.updated_at,
          user: profilesById[c.user_id] || null,
        }));

        setComments(mapped);
      }
    } catch (err) {
      console.error('Unexpected error loading comments', err);
      toast.error('Nieoczekiwany błąd ładowania komentarzy');
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!user?.id || !selectedTask) return;
    const text = newComment.trim();
    if (!text) return;

    try {
      const { error } = await supabase.from('task_comments').insert({
        task_id: selectedTask.id,
        user_id: user.id,
        comment: text,
      });

      if (error) {
        console.error('Error adding comment', error);
        toast.error('Błąd dodawania komentarza: ' + error.message);
      } else {
        // Process mentions in task comment
        const profiles = employees.map(e => ({ id: e.id, full_name: e.full_name, email: e.email }));
        await processMentions(
          text,
          profiles,
          user.id,
          `komentarzu do zadania "${selectedTask.title}"`,
          'task_comment',
          selectedTask.id
        );
        
        setNewComment('');
        await loadComments(selectedTask.id);
      }
    } catch (err) {
      console.error('Unexpected error adding comment', err);
      toast.error('Nieoczekiwany błąd dodawania komentarza');
    }
  };

  const handleStartEditComment = (comment: TaskCommentRow) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.comment);
  };

  const handleSaveComment = async () => {
    if (!editingCommentId || !editingCommentText.trim() || !selectedTask) return;

    try {
      const { error } = await supabase
        .from('task_comments')
        .update({ comment: editingCommentText.trim() })
        .eq('id', editingCommentId);

      if (error) {
        console.error('Error updating comment', error);
        toast.error('Błąd aktualizacji komentarza: ' + error.message);
      } else {
        setEditingCommentId(null);
        setEditingCommentText('');
        await loadComments(selectedTask.id);
      }
    } catch (err) {
      console.error('Unexpected error updating comment', err);
      toast.error('Nieoczekiwany błąd aktualizacji komentarza');
    }
  };

  const handleDeleteComment = async (comment: TaskCommentRow) => {
    if (!selectedTask) return;
    if (!confirm('Czy na pewno chcesz usunąć ten komentarz?')) return;

    try {
      const { error } = await supabase.from('task_comments').delete().eq('id', comment.id);
      if (error) {
        console.error('Error deleting comment', error);
        toast.error('Błąd usuwania komentarza: ' + error.message);
      } else {
        await loadComments(selectedTask.id);
      }
    } catch (err) {
      console.error('Unexpected error deleting comment', err);
      toast.error('Nieoczekiwany błąd usuwania komentarza');
    }
  };

  // ---------- DERIVED LISTS ----------

  const activeTasks = useMemo(
    () => tasks.filter((t) => t.status !== 'completed'),
    [tasks]
  );

  // Get szef user IDs to filter them out for pracownik history view
  const szefUserIds = useMemo(() => {
    // We'll need to fetch this from user_roles
    return new Set<string>();
  }, []);

  const completedTasks = useMemo(() => {
    const completed = tasks.filter((t) => t.status === 'completed');
    // If not szef, filter out szef's tasks from history
    if (!isSzef) {
      return completed.filter((t) => {
        // Show: own tasks, agency tasks, other pracownik tasks
        // Hide: szef's non-agency personal tasks
        if (t.is_agency_task) return true;
        if (t.assigned_to === user?.id || t.created_by === user?.id) return true;
        // For other tasks, show them (we'll filter szef tasks via allUsers filter)
        return true;
      });
    }
    return completed;
  }, [tasks, isSzef, user?.id]);

  const myTasks = useMemo(
    () => activeTasks.filter((t) => 
      t.assigned_to === user?.id || 
      (t.created_by === user?.id && !t.is_agency_task && !t.assigned_to)
    ),
    [activeTasks, user?.id]
  );

  const agencyTasks = useMemo(
    () => activeTasks.filter((t) => t.is_agency_task),
    [activeTasks]
  );

  const teamTasks = useMemo(() => {
    if (userFilter === 'all') return activeTasks;
    return activeTasks.filter(
      (t) => t.assigned_to === userFilter || t.created_by === userFilter
    );
  }, [activeTasks, userFilter]);

  const filteredHistoryTasks = useMemo(() => {
    if (userFilter === 'all') return completedTasks;
    return completedTasks.filter(
      (t) => t.assigned_to === userFilter || t.created_by === userFilter
    );
  }, [completedTasks, userFilter]);

  const allUsers = useMemo(() => {
    const userMap = new Map<string, string>();
    tasks.forEach((task) => {
      if (task.assigned_to) {
        const emp = employees.find(e => e.id === task.assigned_to);
        if (emp) userMap.set(task.assigned_to, emp.full_name || emp.email || 'Nieznany');
      }
      if (task.created_by) {
        const emp = employees.find(e => e.id === task.created_by);
        if (emp) userMap.set(task.created_by, emp.full_name || emp.email || 'Nieznany');
      }
    });
    return Array.from(userMap.entries()).map(([id, name]) => ({ id, name }));
  }, [tasks, employees]);

  const visibleTasks = (() => {
    switch (activeTab) {
      case 'agency':
        return agencyTasks;
      case 'team':
        return teamTasks;
      case 'history':
        return filteredHistoryTasks;
      case 'my':
      default:
        return myTasks;
    }
  })();

  // ---------- RENDER HELPERS ----------

  const renderTaskCard = (task: TaskRow) => {
    const assignedEmployee = employees.find((e) => e.id === task.assigned_to);
    const creatorEmployee = employees.find((e) => e.id === task.created_by);
    const completerEmployee = employees.find((e) => e.id === task.completed_by);
    const isOverdue =
      task.due_date &&
      task.status !== 'completed' &&
      new Date(task.due_date).getTime() < new Date().getTime();

    return (
      <Card key={task.id} className="border-border/50 bg-card/80 hover:bg-card transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              {activeTab !== 'history' && (
                <Checkbox
                  checked={task.status === 'completed'}
                  onCheckedChange={(checked) =>
                    handleToggleCompleted(task, Boolean(checked))
                  }
                  className="mt-1"
                />
              )}
              <div className="flex-1 min-w-0">
                <CardTitle
                  className={`text-base ${
                    task.status === 'completed'
                      ? 'line-through text-muted-foreground'
                      : ''
                  }`}
                >
                  {task.title}
                </CardTitle>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {activeTab !== 'history' && (
                    <Badge className={statusColors[task.status] || statusColors.todo}>
                      {statusLabels[task.status] || task.status}
                    </Badge>
                  )}
                  <Badge
                    className={priorityColors[task.priority] || priorityColors.medium}
                  >
                    {priorityLabels[task.priority] || task.priority}
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
                <DropdownMenuItem onClick={() => openComments(task)}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Komentarze
                </DropdownMenuItem>
                {activeTab !== 'history' && (
                  <DropdownMenuItem onClick={() => openEditTaskDialog(task)}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edytuj
                  </DropdownMenuItem>
                )}
                {activeTab !== 'history' && (
                  <DropdownMenuItem
                    onClick={() => handleDeleteTask(task)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Usuń
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {/* Task metadata with better styling */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-pink-400/80">
              <div className="w-5 h-5 rounded-full bg-pink-500/20 flex items-center justify-center">
                <User className="w-3 h-3 text-pink-400" />
              </div>
              <span className="font-medium">{creatorEmployee?.full_name || creatorEmployee?.email || 'Nieznany'}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{safeFormat(task.created_at, 'dd.MM.yyyy HH:mm')}</span>
            </div>
            
            {assignedEmployee && (
              <div className="flex items-center gap-1.5 text-blue-400/80">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <User className="w-3 h-3 text-blue-400" />
                </div>
                <span className="text-muted-foreground">→</span>
                <span className="font-medium">{assignedEmployee.full_name || assignedEmployee.email}</span>
              </div>
            )}
          </div>
          
          {task.status === 'completed' && task.completed_by && task.completed_at && (
            <div className="flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Ukończone przez {completerEmployee?.full_name || completerEmployee?.email || 'Nieznany'}</span>
              <span className="text-emerald-400/60">•</span>
              <span className="text-emerald-400/60">{safeFormat(task.completed_at, 'dd.MM.yyyy HH:mm')}</span>
            </div>
          )}
          {task.due_date && (
            <div
              className={`flex items-center gap-2 text-sm ${
                isOverdue ? 'text-red-400' : 'text-muted-foreground'
              }`}
            >
              {isOverdue ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Clock className="w-3.5 h-3.5" />
              )}
              <span>
                {safeFormat(task.due_date, 'd MMMM yyyy') || 'Nieprawidłowa data'}
              </span>
              {isOverdue && <span className="text-xs">(Zaległe)</span>}
            </div>
          )}
          {taskComments[task.id] && taskComments[task.id].length > 0 && (
            <div className="flex items-start gap-2 border-t border-pink-500/20 pt-2 mt-2 bg-gradient-to-r from-pink-500/5 to-transparent -mx-4 px-4 pb-1">
              <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0 text-pink-400" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-pink-400 mb-0.5">
                  {taskComments[task.id][0].author_name} 
                  <span className="ml-1 text-pink-400/60">({taskComments[task.id].length} {taskComments[task.id].length === 1 ? 'komentarz' : 'komentarzy'})</span>
                </p>
                <p className="text-xs line-clamp-2 text-foreground/80">
                  {taskComments[task.id][0].comment}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // ---------- MAIN RENDER ----------

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Zadania</h1>
            <p className="text-muted-foreground text-sm">
              Zarządzaj zadaniami swoimi i zespołu
            </p>
          </div>
          <Dialog
            open={isTaskDialogOpen}
            onOpenChange={(open) => {
              setIsTaskDialogOpen(open);
              if (!open) setEditingTask(null);
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90" onClick={openNewTaskDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Nowe zadanie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingTask ? 'Edytuj zadanie' : 'Nowe zadanie'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSaveTask} className="space-y-4">
                <div>
                  <Label>Tytuł *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="form-input-elegant"
                  />
                </div>
                <div>
                  <Label>Opis</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="form-input-elegant"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, status: v }))
                      }
                    >
                      <SelectTrigger className="form-input-elegant">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todo">Do zrobienia</SelectItem>
                        <SelectItem value="in_progress">W trakcie</SelectItem>
                        <SelectItem value="completed">Ukończone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Priorytet</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(v) =>
                        setFormData((prev) => ({ ...prev, priority: v }))
                      }
                    >
                      <SelectTrigger className="form-input-elegant">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Niski</SelectItem>
                        <SelectItem value="medium">Średni</SelectItem>
                        <SelectItem value="high">Wysoki</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Termin</Label>
                  <Input
                    type="date"
                    value={formData.due_date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, due_date: e.target.value }))
                    }
                    className="form-input-elegant"
                  />
                </div>
                <div>
                  <Label>Klient (opcjonalnie)</Label>
                  <Select
                    value={formData.client_id}
                    onValueChange={(v) =>
                      setFormData((prev) => ({ ...prev, client_id: v === 'none' ? '' : v }))
                    }
                  >
                    <SelectTrigger className="form-input-elegant">
                      <SelectValue placeholder="Wybierz klienta" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Brak klienta</SelectItem>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.salon_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
<Label>Przypisz do</Label>
<Select
  value={formData.assigned_to}
  onValueChange={(v) =>
    setFormData((prev) => ({ ...prev, assigned_to: v }))
  }
>
  <SelectTrigger className="form-input-elegant">
    <SelectValue placeholder="Wybierz osobę" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value={UNASSIGNED_VALUE}>Nie przypisane</SelectItem>
    {isSzef ? (
      // Szef can assign to anyone
      employees.map((emp) => (
        <SelectItem key={emp.id} value={emp.id}>
          {emp.full_name || emp.email}
        </SelectItem>
      ))
    ) : (
      // Pracownik can only assign to themselves
      <SelectItem value={user?.id || ''}>
        {employees.find(e => e.id === user?.id)?.full_name || 
         employees.find(e => e.id === user?.id)?.email || 
         'Ja'}
      </SelectItem>
    )}
  </SelectContent>
</Select>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="is_agency_task"
                    checked={formData.is_agency_task}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_agency_task: Boolean(checked),
                      }))
                    }
                  />
                  <Label htmlFor="is_agency_task" className="cursor-pointer">
                    Zadanie agencyjne (widoczne dla wszystkich)
                  </Label>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  {editingTask ? 'Zapisz zmiany' : 'Dodaj zadanie'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="my" className="gap-2">
                <User className="w-4 h-4" />
                Moje ({myTasks.length})
              </TabsTrigger>
              <TabsTrigger value="agency" className="gap-2">
                <Users className="w-4 h-4" />
                Agencyjne ({agencyTasks.length})
              </TabsTrigger>
              {isSzef && (
                <TabsTrigger value="team" className="gap-2">
                  <Users className="w-4 h-4" />
                  Zespół ({teamTasks.length})
                </TabsTrigger>
              )}
              <TabsTrigger value="history" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Historia ({completedTasks.length})
              </TabsTrigger>
            </TabsList>

            {/* User filter - visible for team and history tabs */}
            {(activeTab === 'history' || (activeTab === 'team' && isSzef)) && (
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">Filtruj:</Label>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-48 bg-card border-border">
                    <SelectValue placeholder="Wszyscy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszyscy użytkownicy</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.full_name || emp.email || 'Nieznany'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <TabsContent value="my" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : myTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak zadań w tym widoku</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {myTasks.map(renderTaskCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="agency" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : agencyTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak zadań w tym widoku</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {agencyTasks.map(renderTaskCard)}
              </div>
            )}
          </TabsContent>

          {isSzef && (
            <TabsContent value="team" className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : teamTasks.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Brak zadań w tym widoku</p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {teamTasks.map(renderTaskCard)}
                </div>
              )}
            </TabsContent>
          )}

          <TabsContent value="history" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredHistoryTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Brak ukończonych zadań</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredHistoryTasks.map(renderTaskCard)}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Comments dialog */}
        <Dialog
          open={isCommentsDialogOpen}
          onOpenChange={(open) => {
            setIsCommentsDialogOpen(open);
            if (!open) {
              setSelectedTask(null);
              setComments([]);
              setNewComment('');
              setEditingCommentId(null);
              setEditingCommentText('');
            }
          }}
        >
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Komentarze – {selectedTask?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {commentsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Brak komentarzy</p>
                  </div>
                ) : (
                  comments.map((comment) => {
                    const isOwn = comment.user_id === user?.id;
                    const author =
                      comment.user?.full_name ||
                      comment.user?.email ||
                      'Użytkownik';
                    const dateLabel =
                      safeFormat(comment.created_at, 'd MMMM yyyy, HH:mm') || '';

                    return (
                       <Card
                        key={comment.id}
                        className="p-4 bg-gradient-to-br from-pink-500/5 to-rose-500/5 border-pink-500/20 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 flex items-center justify-center">
                              <User className="w-4 h-4 text-pink-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{author}</p>
                              <p className="text-xs text-pink-400/70">
                                {dateLabel}
                                {comment.updated_at !== comment.created_at &&
                                  ' (edytowany)'}
                              </p>
                            </div>
                          </div>
                          {isOwn && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleStartEditComment(comment)}
                                >
                                  <Pencil className="w-4 h-4 mr-2" />
                                  Edytuj
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteComment(comment)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Usuń
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                        {editingCommentId === comment.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingCommentText}
                              onChange={(e) =>
                                setEditingCommentText(e.target.value)
                              }
                              className="form-input-elegant"
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveComment}>
                                Zapisz
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingCommentId(null);
                                  setEditingCommentText('');
                                }}
                              >
                                Anuluj
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap text-foreground leading-relaxed">
                            {renderMentions(comment.comment)}
                          </p>
                        )}
                      </Card>
                    );
                  })
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <Label>Dodaj komentarz</Label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Wpisz komentarz..."
                  className="form-input-elegant"
                  rows={3}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || !selectedTask}
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Wyślij komentarz
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Receipt, FileSignature, Presentation, TrendingUp, 
  Loader2, AlertCircle, CalendarDays, User, Users, Target, 
  CheckCircle, Briefcase, Activity, ChevronRight, ArrowUpRight,
  MessageSquare, Clock, Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { supabase } from "@/integrations/supabase/client";
import { isToday, formatDistanceToNow, format } from "date-fns";
import { pl } from "date-fns/locale";
import { AnnouncementBanner } from "@/components/dashboard/AnnouncementBanner";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SalesFunnel } from "@/components/dashboard/SalesFunnel";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeadReminder {
  id: string;
  salon_name: string;
  owner_name: string | null;
  next_follow_up_date: string;
  follow_up_count: number;
  status: string;
}

interface RecentActivity {
  id: string;
  type: 'document' | 'task' | 'lead' | 'client';
  title: string;
  description: string;
  created_at: string;
  user_name?: string;
}

interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  totalClients: number;
  activeTasks: number;
  completedTasks: number;
  conversionRate: number;
  thisWeekLeads: number;
  thisWeekClients: number;
  thisMonthDocuments: number;
  pipelineValue: number;
}

const generators = [
  { title: "Raporty", icon: FileText, url: "/report-generator", color: "bg-pink-500/20 text-pink-400" },
  { title: "Faktury", icon: Receipt, url: "/invoice-generator", color: "bg-emerald-500/20 text-emerald-400" },
  { title: "Umowy", icon: FileSignature, url: "/contract-generator", color: "bg-blue-500/20 text-blue-400" },
  { title: "Prezentacje", icon: Presentation, url: "/presentation-generator", color: "bg-purple-500/20 text-purple-400" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getStats, loading, userId } = useCloudDocumentHistory();
  const [followUpReminders, setFollowUpReminders] = useState<LeadReminder[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeLeads: 0,
    totalClients: 0,
    activeTasks: 0,
    completedTasks: 0,
    conversionRate: 0,
    thisWeekLeads: 0,
    thisWeekClients: 0,
    thisMonthDocuments: 0,
    pipelineValue: 0,
  });
  
  const docStats = getStats(userId);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      
      const [remindersRes, leadsRes, clientsRes, tasksRes, docsRes, profilesRes] = await Promise.all([
        supabase
          .from('leads')
          .select('id, salon_name, owner_name, next_follow_up_date, follow_up_count, status')
          .not('next_follow_up_date', 'is', null)
          .lte('next_follow_up_date', today)
          .not('status', 'in', '("converted","lost")')
          .order('next_follow_up_date', { ascending: true })
          .limit(5),
        supabase.from('leads').select('id, status, created_at'),
        supabase.from('clients').select('id, created_at, monthly_budget'),
        supabase.from('tasks').select('id, status, title, created_at, completed_at'),
        supabase.from('documents').select('id, title, type, created_at, created_by').order('created_at', { ascending: false }).limit(10),
        supabase.from('profiles').select('id, full_name, email'),
      ]);

      if (remindersRes.data) {
        setFollowUpReminders(remindersRes.data as LeadReminder[]);
      }

      // Build recent activity
      const activities: RecentActivity[] = [];
      const profiles = profilesRes.data || [];
      const profileMap = new Map(profiles.map(p => [p.id, p.full_name || p.email?.split('@')[0] || 'Użytkownik']));

      if (docsRes.data) {
        docsRes.data.slice(0, 5).forEach(doc => {
          activities.push({
            id: doc.id,
            type: 'document',
            title: doc.title,
            description: `Utworzono ${doc.type === 'report' ? 'raport' : doc.type === 'invoice' ? 'fakturę' : doc.type === 'contract' ? 'umowę' : 'prezentację'}`,
            created_at: doc.created_at,
            user_name: profileMap.get(doc.created_by || '') || undefined,
          });
        });
      }

      if (tasksRes.data) {
        tasksRes.data
          .filter(t => t.completed_at)
          .slice(0, 3)
          .forEach(task => {
            activities.push({
              id: task.id,
              type: 'task',
              title: task.title,
              description: 'Zadanie ukończone',
              created_at: task.completed_at!,
            });
          });
      }

      activities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecentActivity(activities.slice(0, 8));

      const leads = leadsRes.data || [];
      const clients = clientsRes.data || [];
      const tasks = tasksRes.data || [];
      const docs = docsRes.data || [];
      
      const activeLeads = leads.filter(l => !['converted', 'lost'].includes(l.status)).length;
      const convertedLeads = leads.filter(l => l.status === 'converted').length;
      const thisWeekLeads = leads.filter(l => new Date(l.created_at) >= new Date(weekAgo)).length;
      const thisWeekClients = clients.filter(c => new Date(c.created_at) >= new Date(weekAgo)).length;
      const thisMonthDocuments = docs.filter(d => new Date(d.created_at) >= new Date(monthAgo)).length;
      const activeTasks = tasks.filter(t => t.status !== 'done').length;
      const completedTasks = tasks.filter(t => t.status === 'done').length;
      const pipelineValue = clients.reduce((sum, c) => sum + (c.monthly_budget || 0), 0);

      setStats({
        totalLeads: leads.length,
        activeLeads,
        totalClients: clients.length,
        activeTasks,
        completedTasks,
        conversionRate: leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0,
        thisWeekLeads,
        thisWeekClients,
        thisMonthDocuments,
        pipelineValue,
      });

      setLoadingData(false);
    };

    fetchData();
  }, []);

  if (loading || loadingData) {
    return (
      <AppLayout>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-5 max-w-[1600px] mx-auto">
        {/* Announcements - TOP PRIORITY */}
        <AnnouncementBanner />

        {/* Follow-up Reminders - IMPORTANT */}
        {followUpReminders.length > 0 && (
          <Card className="border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-pink-500/5 to-transparent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/20 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Follow-upy do wykonania</h3>
                    <p className="text-xs text-muted-foreground">{followUpReminders.length} leadów czeka na kontakt</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate("/leads")} className="text-pink-400 hover:text-pink-300">
                  Zobacz wszystkie <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {followUpReminders.slice(0, 3).map((lead) => (
                  <div 
                    key={lead.id}
                    className="flex items-center gap-3 bg-background/60 rounded-lg p-3 cursor-pointer hover:bg-background/80 transition-colors border border-border/30"
                    onClick={() => navigate(`/leads/${lead.id}`)}
                  >
                    <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{lead.salon_name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="text-pink-400">
                          {isToday(new Date(lead.next_follow_up_date)) ? "Dzisiaj" : formatDistanceToNow(new Date(lead.next_follow_up_date), { locale: pl, addSuffix: true })}
                        </span>
                        <span>•</span>
                        <span>FU #{(lead.follow_up_count || 0) + 1}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard 
            label="Aktywne leady" 
            value={stats.activeLeads} 
            icon={Users} 
            trend={stats.thisWeekLeads > 0 ? `+${stats.thisWeekLeads} tydzień` : undefined}
            onClick={() => navigate("/leads")}
          />
          <StatCard 
            label="Klienci" 
            value={stats.totalClients} 
            icon={Briefcase} 
            trend={stats.thisWeekClients > 0 ? `+${stats.thisWeekClients} tydzień` : undefined}
            onClick={() => navigate("/clients")}
          />
          <StatCard 
            label="Konwersja" 
            value={`${stats.conversionRate}%`} 
            icon={Target}
          />
          <StatCard 
            label="Zadania" 
            value={stats.activeTasks} 
            icon={CheckCircle} 
            trend={`${stats.completedTasks} ukończonych`}
            onClick={() => navigate("/tasks")}
          />
          <StatCard 
            label="Dokumenty" 
            value={docStats.total} 
            icon={FileText}
            trend={stats.thisMonthDocuments > 0 ? `+${stats.thisMonthDocuments} miesiąc` : undefined}
            onClick={() => navigate("/history")}
          />
          <StatCard 
            label="Pipeline" 
            value={`${Math.round(stats.pipelineValue / 1000)}k`} 
            icon={TrendingUp}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left - Charts */}
          <div className="lg:col-span-2 space-y-5">
            {/* Performance Chart */}
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold text-foreground">Aktywność (7 dni)</h3>
                  </div>
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                      <span className="text-muted-foreground">Leady</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Dokumenty</span>
                    </div>
                  </div>
                </div>
                <PerformanceChart />
              </CardContent>
            </Card>

            {/* Funnel + Generators */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Sales Funnel */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Lejek sprzedaży
                    </h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/funnel")} className="text-xs">
                      Szczegóły <ArrowUpRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  <SalesFunnel />
                </CardContent>
              </Card>

              {/* Quick Generators */}
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Generatory</h3>
                    <Button variant="ghost" size="sm" onClick={() => navigate("/history")} className="text-xs">
                      Historia <Clock className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {generators.map((gen) => (
                      <button
                        key={gen.title}
                        onClick={() => navigate(gen.url)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left group"
                      >
                        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", gen.color)}>
                          <gen.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-foreground">{gen.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {gen.url.includes("report") ? docStats.reports :
                             gen.url.includes("invoice") ? docStats.invoices :
                             gen.url.includes("contract") ? docStats.contracts :
                             docStats.presentations} utworzonych
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right - Activity */}
          <div className="space-y-5">
            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Ostatnia aktywność
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/team")} className="text-xs">
                    Zespół <ArrowUpRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
                <ScrollArea className="h-[320px] pr-2">
                  <div className="space-y-3">
                    {recentActivity.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">Brak aktywności</p>
                    ) : (
                      recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            activity.type === 'document' ? "bg-pink-500/20 text-pink-400" :
                            activity.type === 'task' ? "bg-emerald-500/20 text-emerald-400" :
                            "bg-blue-500/20 text-blue-400"
                          )}>
                            {activity.type === 'document' ? <FileText className="w-4 h-4" /> :
                             activity.type === 'task' ? <CheckCircle className="w-4 h-4" /> :
                             <Users className="w-4 h-4" />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {activity.user_name && (
                                <span className="text-xs text-muted-foreground/70">{activity.user_name}</span>
                              )}
                              <span className="text-xs text-muted-foreground/50">
                                {formatDistanceToNow(new Date(activity.created_at), { locale: pl, addSuffix: true })}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">Szybkie akcje</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate("/leads")} className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Nowy lead
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/tasks")} className="justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Nowe zadanie
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/calendar")} className="justify-start">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Kalendarz
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate("/monthly-report")} className="justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Raport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Simple stat card component
function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  onClick 
}: { 
  label: string; 
  value: string | number; 
  icon: React.ElementType; 
  trend?: string;
  onClick?: () => void;
}) {
  return (
    <Card 
      className={cn(
        "border-border/50 transition-all",
        onClick && "cursor-pointer hover:border-primary/30 hover:bg-secondary/30"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          {trend && (
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
              {trend}
            </span>
          )}
        </div>
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Receipt, FileSignature, Presentation, TrendingUp, Sparkles, 
  Loader2, AlertCircle, ArrowRight, CalendarDays, User, Users, Target, 
  CheckCircle, Briefcase, Activity, Clock, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { supabase } from "@/integrations/supabase/client";
import { isToday, formatDistanceToNow, subDays } from "date-fns";
import { pl } from "date-fns/locale";
import { AnnouncementBanner } from "@/components/dashboard/AnnouncementBanner";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { GeneratorCard } from "@/components/dashboard/GeneratorCard";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface LeadReminder {
  id: string;
  salon_name: string;
  owner_name: string | null;
  next_follow_up_date: string;
  follow_up_count: number;
  status: string;
}

interface DashboardStats {
  totalLeads: number;
  activeLeads: number;
  totalClients: number;
  activeTasks: number;
  conversionRate: number;
  thisWeekLeads: number;
  thisWeekClients: number;
  lastWeekLeads: number;
}

const generators = [
  {
    title: "Raporty kampanii",
    description: "Profesjonalne raporty Facebook Ads z wykresami i AI",
    icon: FileText,
    url: "/report-generator",
    gradient: "from-pink-500/80 to-rose-600/80",
  },
  {
    title: "Faktury",
    description: "Eleganckie faktury VAT dla klientów",
    icon: Receipt,
    url: "/invoice-generator",
    gradient: "from-emerald-500/80 to-teal-600/80",
  },
  {
    title: "Umowy",
    description: "Umowy współpracy i kontrakty",
    icon: FileSignature,
    url: "/contract-generator",
    gradient: "from-blue-500/80 to-indigo-600/80",
  },
  {
    title: "Prezentacje",
    description: "Cold email slides dla prospektów",
    icon: Presentation,
    url: "/presentation-generator",
    gradient: "from-purple-500/80 to-violet-600/80",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getStats, loading, userId } = useCloudDocumentHistory();
  const [followUpReminders, setFollowUpReminders] = useState<LeadReminder[]>([]);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [crmStats, setCrmStats] = useState<DashboardStats>({
    totalLeads: 0,
    activeLeads: 0,
    totalClients: 0,
    activeTasks: 0,
    conversionRate: 0,
    thisWeekLeads: 0,
    thisWeekClients: 0,
    lastWeekLeads: 0,
  });
  
  const docStats = getStats(userId);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingReminders(true);
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = subDays(new Date(), 7).toISOString();
      const twoWeeksAgo = subDays(new Date(), 14).toISOString();
      
      const [remindersRes, leadsRes, clientsRes, tasksRes] = await Promise.all([
        supabase
          .from('leads')
          .select('id, salon_name, owner_name, next_follow_up_date, follow_up_count, status')
          .not('next_follow_up_date', 'is', null)
          .lte('next_follow_up_date', today)
          .not('status', 'in', '("converted","lost")')
          .order('next_follow_up_date', { ascending: true })
          .limit(5),
        supabase
          .from('leads')
          .select('id, status, created_at'),
        supabase
          .from('clients')
          .select('id, created_at'),
        supabase
          .from('tasks')
          .select('id, status')
          .neq('status', 'done'),
      ]);

      if (remindersRes.data) {
        setFollowUpReminders(remindersRes.data as LeadReminder[]);
      }

      const leads = leadsRes.data || [];
      const clients = clientsRes.data || [];
      const tasks = tasksRes.data || [];
      
      const activeLeads = leads.filter(l => !['converted', 'lost'].includes(l.status)).length;
      const convertedLeads = leads.filter(l => l.status === 'converted').length;
      const thisWeekLeads = leads.filter(l => new Date(l.created_at) >= new Date(weekAgo)).length;
      const lastWeekLeads = leads.filter(l => {
        const date = new Date(l.created_at);
        return date >= new Date(twoWeeksAgo) && date < new Date(weekAgo);
      }).length;
      const thisWeekClients = clients.filter(c => new Date(c.created_at) >= new Date(weekAgo)).length;

      setCrmStats({
        totalLeads: leads.length,
        activeLeads,
        totalClients: clients.length,
        activeTasks: tasks.length,
        conversionRate: leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0,
        thisWeekLeads,
        thisWeekClients,
        lastWeekLeads,
      });

      setLoadingReminders(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </AppLayout>
    );
  }

  const leadsTrend = crmStats.lastWeekLeads > 0 
    ? Math.round(((crmStats.thisWeekLeads - crmStats.lastWeekLeads) / crmStats.lastWeekLeads) * 100)
    : crmStats.thisWeekLeads > 0 ? 100 : 0;

  return (
    <AppLayout>
      <div className="p-4 lg:p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Aurine Agency CRM</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
              Witaj, {user?.email?.split('@')[0] || 'użytkowniku'}
            </h1>
            <p className="text-muted-foreground">
              Przegląd działalności i narzędzia
            </p>
          </div>
        </div>

        {/* Follow-up Reminders Alert */}
        {followUpReminders.length > 0 && (
          <Card className="border-pink-500/30 bg-gradient-to-r from-pink-500/10 to-transparent overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Follow-upy do wykonania
                    </h3>
                    <p className="text-xs text-muted-foreground">{followUpReminders.length} oczekujących</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10"
                  onClick={() => navigate("/leads")}
                >
                  Zobacz wszystkie
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid gap-2">
                {followUpReminders.slice(0, 3).map((lead) => (
                  <div 
                    key={lead.id}
                    className="flex items-center justify-between bg-background/50 rounded-lg px-3 py-2 cursor-pointer hover:bg-background/70 transition-colors border border-border/30"
                    onClick={() => navigate("/leads")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-pink-400" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{lead.salon_name}</p>
                        {lead.owner_name && (
                          <p className="text-xs text-muted-foreground">{lead.owner_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground bg-muted px-2 py-0.5 rounded">
                        FU #{(lead.follow_up_count || 0) + 1}
                      </span>
                      <div className="flex items-center gap-1 text-pink-400">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>
                          {isToday(new Date(lead.next_follow_up_date)) 
                            ? "Dzisiaj" 
                            : formatDistanceToNow(new Date(lead.next_follow_up_date), { locale: pl, addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatsCard
            title="Aktywne leady"
            value={crmStats.activeLeads}
            icon={Users}
            color="blue"
            trend={leadsTrend !== 0 ? { value: Math.abs(leadsTrend), isPositive: leadsTrend > 0 } : undefined}
            onClick={() => navigate("/leads")}
          />
          <StatsCard
            title="Klienci"
            value={crmStats.totalClients}
            icon={Briefcase}
            color="emerald"
            onClick={() => navigate("/clients")}
          />
          <StatsCard
            title="Konwersja"
            value={`${crmStats.conversionRate}%`}
            icon={Target}
            color="pink"
          />
          <StatsCard
            title="Zadania"
            value={crmStats.activeTasks}
            subtitle="do zrobienia"
            icon={CheckCircle}
            color="orange"
            onClick={() => navigate("/tasks")}
          />
          <StatsCard
            title="Ten tydzień"
            value={`+${crmStats.thisWeekLeads}`}
            subtitle="nowych leadów"
            icon={Activity}
            color="purple"
          />
          <StatsCard
            title="Dokumenty"
            value={docStats.total}
            subtitle="wygenerowanych"
            icon={TrendingUp}
            color="cyan"
            onClick={() => navigate("/history")}
          />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Chart & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Aktywność (7 dni)
                  </CardTitle>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-pink-500" />
                      <span className="text-muted-foreground">Leady</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-muted-foreground">Dokumenty</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-muted-foreground">Zadania</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PerformanceChart />
              </CardContent>
            </Card>

            {/* Generators */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Generatory dokumentów</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate("/history")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Historia
                  <Clock className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {generators.map((gen) => (
                  <GeneratorCard
                    key={gen.title}
                    title={gen.title}
                    description={gen.description}
                    icon={gen.icon}
                    url={gen.url}
                    gradient={gen.gradient}
                    count={
                      gen.url.includes("report") ? docStats.reports :
                      gen.url.includes("invoice") ? docStats.invoices :
                      gen.url.includes("contract") ? docStats.contracts :
                      docStats.presentations
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Szybkie akcje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <QuickActions />
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Ostatnia aktywność
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => navigate("/team")}
                    className="text-muted-foreground hover:text-foreground text-xs"
                  >
                    Zespół
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ogłoszenia</CardTitle>
              </CardHeader>
              <CardContent>
                <AnnouncementBanner />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

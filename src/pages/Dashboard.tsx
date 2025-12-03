import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileText, Receipt, FileSignature, Presentation, Clock, TrendingUp, Sparkles, 
  Loader2, AlertCircle, ArrowRight, CalendarDays, User, Users, Target, 
  CheckCircle, MessageSquare, Briefcase, Activity, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCloudDocumentHistory } from "@/hooks/useCloudDocumentHistory";
import { supabase } from "@/integrations/supabase/client";
import { format, isPast, isToday, formatDistanceToNow, subDays } from "date-fns";
import { pl } from "date-fns/locale";
import { AnnouncementBanner } from "@/components/dashboard/AnnouncementBanner";
import { SalesFunnel } from "@/components/dashboard/SalesFunnel";
import { useAuth } from "@/hooks/useAuth";

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
}

const generators = [
  {
    title: "Raporty",
    description: "Raporty kampanii Facebook Ads",
    icon: FileText,
    url: "/report-generator",
    color: "from-pink-500 to-rose-600",
    shadowColor: "shadow-pink-500/20",
  },
  {
    title: "Faktury",
    description: "Faktury dla klientów",
    icon: Receipt,
    url: "/invoice-generator",
    color: "from-emerald-500 to-teal-600",
    shadowColor: "shadow-emerald-500/20",
  },
  {
    title: "Umowy",
    description: "Umowy współpracy",
    icon: FileSignature,
    url: "/contract-generator",
    color: "from-blue-500 to-indigo-600",
    shadowColor: "shadow-blue-500/20",
  },
  {
    title: "Prezentacje",
    description: "Prezentacje cold email",
    icon: Presentation,
    url: "/presentation-generator",
    color: "from-purple-500 to-violet-600",
    shadowColor: "shadow-purple-500/20",
  },
];

const typeLabels: Record<string, string> = {
  report: "Raport",
  invoice: "Faktura",
  contract: "Umowa",
  presentation: "Prezentacja",
};

const typeColors: Record<string, string> = {
  report: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  invoice: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  contract: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  presentation: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getRecentDocuments, getStats, loading, userId } = useCloudDocumentHistory();
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
  });
  
  const recentDocs = getRecentDocuments(6, userId);
  const docStats = getStats(userId);

  // Fetch CRM stats and reminders
  useEffect(() => {
    const fetchData = async () => {
      setLoadingReminders(true);
      const today = new Date().toISOString().split('T')[0];
      const weekAgo = subDays(new Date(), 7).toISOString();
      
      // Parallel fetch for better performance
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

      // Calculate stats
      const leads = leadsRes.data || [];
      const clients = clientsRes.data || [];
      const tasks = tasksRes.data || [];
      
      const activeLeads = leads.filter(l => !['converted', 'lost'].includes(l.status)).length;
      const convertedLeads = leads.filter(l => l.status === 'converted').length;
      const thisWeekLeads = leads.filter(l => new Date(l.created_at) >= new Date(weekAgo)).length;
      const thisWeekClients = clients.filter(c => new Date(c.created_at) >= new Date(weekAgo)).length;

      setCrmStats({
        totalLeads: leads.length,
        activeLeads,
        totalClients: clients.length,
        activeTasks: tasks.length,
        conversionRate: leads.length > 0 ? Math.round((convertedLeads / leads.length) * 100) : 0,
        thisWeekLeads,
        thisWeekClients,
      });

      setLoadingReminders(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="text-xs uppercase tracking-wider text-pink-400 font-medium">Aurine Agency</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Witaj, {user?.email?.split('@')[0] || 'użytkowniku'}!
            </h1>
            <p className="text-muted-foreground text-sm">
              Przegląd Twojego CRM i narzędzi
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/leads')} className="border-border/50">
              <Users className="w-4 h-4 mr-2" />
              Leady
            </Button>
            <Button onClick={() => navigate('/clients')} className="bg-primary hover:bg-primary/90">
              <Briefcase className="w-4 h-4 mr-2" />
              Klienci
            </Button>
          </div>
        </div>

        {/* Follow-up Reminders Alert */}
        {followUpReminders.length > 0 && (
          <Card className="border-pink-500/30 bg-pink-500/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-pink-400" />
                  <h3 className="font-semibold text-pink-400">
                    Follow-upy do wykonania ({followUpReminders.length})
                  </h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-pink-400 hover:text-pink-300 hover:bg-pink-500/10"
                  onClick={() => navigate("/leads")}
                >
                  Zobacz wszystkie
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-2">
                {followUpReminders.map((lead) => (
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
                      <span className="text-muted-foreground">
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

        {/* Announcements Section */}
        <Card className="border-border/50 bg-card/80">
          <CardContent className="p-4">
            <AnnouncementBanner />
          </CardContent>
        </Card>

        {/* CRM Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Leady</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{crmStats.activeLeads}</p>
              <p className="text-xs text-muted-foreground">aktywnych</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Briefcase className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Klienci</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{crmStats.totalClients}</p>
              <p className="text-xs text-muted-foreground">łącznie</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Konwersja</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{crmStats.conversionRate}%</p>
              <p className="text-xs text-muted-foreground">lead→klient</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-orange-400 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Zadania</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{crmStats.activeTasks}</p>
              <p className="text-xs text-muted-foreground">do zrobienia</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Ten tydzień</span>
              </div>
              <p className="text-2xl font-bold text-foreground">+{crmStats.thisWeekLeads}</p>
              <p className="text-xs text-muted-foreground">nowych leadów</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Dokumenty</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{docStats.total}</p>
              <p className="text-xs text-muted-foreground">wygenerowanych</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales Funnel - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SalesFunnel />
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Document Stats */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-pink-400" />
                  Dokumenty wg typu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-pink-400" />
                    <span className="text-sm text-muted-foreground">Raporty</span>
                  </div>
                  <span className="font-medium text-foreground">{docStats.reports}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-muted-foreground">Faktury</span>
                  </div>
                  <span className="font-medium text-foreground">{docStats.invoices}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSignature className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-muted-foreground">Umowy</span>
                  </div>
                  <span className="font-medium text-foreground">{docStats.contracts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Presentation className="w-4 h-4 text-purple-400" />
                    <span className="text-sm text-muted-foreground">Prezentacje</span>
                  </div>
                  <span className="font-medium text-foreground">{docStats.presentations}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Szybki dostęp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50"
                  onClick={() => navigate('/tasks')}
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-orange-400" />
                  Moje zadania ({crmStats.activeTasks})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50"
                  onClick={() => navigate('/funnel')}
                >
                  <TrendingUp className="w-4 h-4 mr-2 text-pink-400" />
                  Lejek sprzedażowy
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50"
                  onClick={() => navigate('/team')}
                >
                  <Users className="w-4 h-4 mr-2 text-blue-400" />
                  Zespół
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50"
                  onClick={() => navigate('/history')}
                >
                  <Clock className="w-4 h-4 mr-2 text-purple-400" />
                  Historia dokumentów
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Generators Grid */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Generatory dokumentów</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {generators.map((gen) => (
              <button
                key={gen.title}
                onClick={() => navigate(gen.url)}
                className={`group relative bg-card/80 border border-border/50 rounded-xl p-5 text-left transition-all hover:border-primary/30 hover:shadow-lg ${gen.shadowColor}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gen.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform`}>
                  <gen.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{gen.title}</h3>
                <p className="text-sm text-muted-foreground">{gen.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Ostatnie dokumenty</h2>
            {recentDocs.length > 0 && (
              <Button variant="ghost" size="sm" onClick={() => navigate("/history")}>
                Zobacz wszystkie
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
          
          {recentDocs.length === 0 ? (
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-8 text-center">
                <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Brak dokumentów w historii</p>
                <p className="text-sm text-muted-foreground/60 mt-1">Wygenerowane dokumenty pojawią się tutaj</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDocs.map((doc) => (
                <Card
                  key={doc.id}
                  className="border-border/50 bg-card/80 overflow-hidden hover:border-primary/30 transition-colors cursor-pointer group"
                  onClick={() => {
                    const urls: Record<string, string> = {
                      report: "/report-generator",
                      invoice: "/invoice-generator",
                      contract: "/contract-generator",
                      presentation: "/presentation-generator",
                    };
                    navigate(urls[doc.type]);
                  }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] bg-secondary/50 relative overflow-hidden flex items-center justify-center p-2">
                    {doc.thumbnail ? (
                      <img 
                        src={doc.thumbnail} 
                        alt={doc.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className={`w-12 h-12 rounded-xl ${typeColors[doc.type]} border flex items-center justify-center`}>
                        {doc.type === "report" && <FileText className="w-6 h-6" />}
                        {doc.type === "invoice" && <Receipt className="w-6 h-6" />}
                        {doc.type === "contract" && <FileSignature className="w-6 h-6" />}
                        {doc.type === "presentation" && <Presentation className="w-6 h-6" />}
                      </div>
                    )}
                  </div>
                  
                  {/* Info */}
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeColors[doc.type]}`}>
                        {typeLabels[doc.type]}
                      </span>
                    </div>
                    <h3 className="font-medium text-foreground truncate">{doc.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{doc.subtitle}</p>
                    <p className="text-xs text-muted-foreground/60 mt-2">
                      {format(new Date(doc.createdAt), "d MMMM yyyy, HH:mm", { locale: pl })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

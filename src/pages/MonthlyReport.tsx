import { useState, useEffect, useRef } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, Download, FileText, Users, Briefcase, Target, TrendingUp, 
  TrendingDown, CheckCircle, Clock, DollarSign, Activity, Calendar,
  ChevronLeft, ChevronRight, Loader2, Save, History
} from 'lucide-react';
import { format, startOfMonth, endOfMonth, subMonths, addMonths } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';

interface MonthlyStats {
  // Leads
  newLeads: number;
  convertedLeads: number;
  lostLeads: number;
  activeLeads: number;
  conversionRate: number;
  leadSources: Record<string, number>;
  
  // Clients
  newClients: number;
  totalClients: number;
  totalMonthlyBudget: number;
  
  // Tasks
  tasksCreated: number;
  tasksCompleted: number;
  taskCompletionRate: number;
  
  // Documents
  reportsGenerated: number;
  invoicesGenerated: number;
  contractsGenerated: number;
  presentationsGenerated: number;
  totalDocuments: number;
  
  // Team
  teamMessages: number;
  activeUsers: number;
  
  // Pipeline
  pipelineValue: number;
  avgDaysToConversion: number;
}

interface SavedReport {
  id: string;
  month: number;
  year: number;
  data: MonthlyStats;
  created_at: string;
}

const AVG_CLIENT_VALUE = 2000;

export default function MonthlyReport() {
  const { user } = useAuth();
  const reportRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [savedReports, setSavedReports] = useState<SavedReport[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    fetchStats();
    fetchSavedReports();
  }, [currentDate]);

  const fetchSavedReports = async () => {
    const { data } = await supabase
      .from('monthly_reports')
      .select('*')
      .order('year', { ascending: false })
      .order('month', { ascending: false });
    
    if (data) {
      setSavedReports(data.map(d => ({
        ...d,
        data: d.data as unknown as MonthlyStats
      })));
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startStr = monthStart.toISOString();
    const endStr = monthEnd.toISOString();

    try {
      const [leadsRes, clientsRes, tasksRes, docsRes, messagesRes, profilesRes] = await Promise.all([
        supabase.from('leads').select('id, status, source, created_at, updated_at'),
        supabase.from('clients').select('id, monthly_budget, created_at'),
        supabase.from('tasks').select('id, status, created_at, completed_at'),
        supabase.from('documents').select('id, type, created_at'),
        supabase.from('team_messages').select('id, created_at'),
        supabase.from('profiles').select('id, last_seen_at'),
      ]);

      const leads = leadsRes.data || [];
      const clients = clientsRes.data || [];
      const tasks = tasksRes.data || [];
      const docs = docsRes.data || [];
      const messages = messagesRes.data || [];
      const profiles = profilesRes.data || [];

      // Filter by month
      const monthLeads = leads.filter(l => new Date(l.created_at) >= monthStart && new Date(l.created_at) <= monthEnd);
      const monthClients = clients.filter(c => new Date(c.created_at) >= monthStart && new Date(c.created_at) <= monthEnd);
      const monthTasks = tasks.filter(t => new Date(t.created_at) >= monthStart && new Date(t.created_at) <= monthEnd);
      const monthDocs = docs.filter(d => new Date(d.created_at) >= monthStart && new Date(d.created_at) <= monthEnd);
      const monthMessages = messages.filter(m => new Date(m.created_at) >= monthStart && new Date(m.created_at) <= monthEnd);

      const convertedLeads = leads.filter(l => l.status === 'converted' && new Date(l.updated_at) >= monthStart && new Date(l.updated_at) <= monthEnd).length;
      const lostLeads = leads.filter(l => l.status === 'lost' && new Date(l.updated_at) >= monthStart && new Date(l.updated_at) <= monthEnd).length;
      const activeLeads = leads.filter(l => !['converted', 'lost'].includes(l.status)).length;

      // Lead sources
      const leadSources: Record<string, number> = {};
      monthLeads.forEach(l => {
        const source = l.source || 'Nieznane';
        leadSources[source] = (leadSources[source] || 0) + 1;
      });

      // Tasks
      const completedTasks = monthTasks.filter(t => t.status === 'done').length;

      // Documents by type
      const reportsDocs = monthDocs.filter(d => d.type === 'report').length;
      const invoicesDocs = monthDocs.filter(d => d.type === 'invoice').length;
      const contractsDocs = monthDocs.filter(d => d.type === 'contract').length;
      const presentationsDocs = monthDocs.filter(d => d.type === 'presentation').length;

      // Active users (seen in last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const activeUsers = profiles.filter(p => p.last_seen_at && new Date(p.last_seen_at) >= weekAgo).length;

      // Pipeline value
      const pipelineValue = activeLeads * (convertedLeads > 0 && monthLeads.length > 0 ? convertedLeads / monthLeads.length : 0.1) * AVG_CLIENT_VALUE;

      // Total monthly budget from clients
      const totalMonthlyBudget = clients.reduce((sum, c) => sum + (c.monthly_budget || 0), 0);

      setStats({
        newLeads: monthLeads.length,
        convertedLeads,
        lostLeads,
        activeLeads,
        conversionRate: monthLeads.length > 0 ? Math.round((convertedLeads / monthLeads.length) * 100) : 0,
        leadSources,
        newClients: monthClients.length,
        totalClients: clients.length,
        totalMonthlyBudget,
        tasksCreated: monthTasks.length,
        tasksCompleted: completedTasks,
        taskCompletionRate: monthTasks.length > 0 ? Math.round((completedTasks / monthTasks.length) * 100) : 0,
        reportsGenerated: reportsDocs,
        invoicesGenerated: invoicesDocs,
        contractsGenerated: contractsDocs,
        presentationsGenerated: presentationsDocs,
        totalDocuments: monthDocs.length,
        teamMessages: monthMessages.length,
        activeUsers,
        pipelineValue: Math.round(pipelineValue),
        avgDaysToConversion: 14, // Placeholder - would need more complex calculation
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Błąd podczas pobierania danych');
    }
    
    setLoading(false);
  };

  const handleSaveReport = async () => {
    if (!stats) return;

    // Check if report exists
    const { data: existing } = await supabase
      .from('monthly_reports')
      .select('id')
      .eq('month', month)
      .eq('year', year)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('monthly_reports')
        .update({ data: JSON.parse(JSON.stringify(stats)) })
        .eq('id', existing.id);
      
      if (error) {
        toast.error('Błąd podczas aktualizacji raportu');
        return;
      }
    } else {
      const { error } = await supabase.from('monthly_reports').insert([{
        month,
        year,
        data: JSON.parse(JSON.stringify(stats)),
        created_by: user?.id,
      }]);
      
      if (error) {
        toast.error('Błąd podczas zapisywania raportu');
        return;
      }
    }
    toast.success('Raport zapisany');
    fetchSavedReports();
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setGenerating(true);

    try {
      const dataUrl = await htmlToImage.toPng(reportRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0a0a0a',
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`raport-${format(currentDate, 'yyyy-MM')}.pdf`);
      toast.success('PDF wygenerowany');
    } catch (error) {
      console.error('PDF error:', error);
      toast.error('Błąd podczas generowania PDF');
    }

    setGenerating(false);
  };

  const loadSavedReport = (report: SavedReport) => {
    setCurrentDate(new Date(report.year, report.month - 1));
    setStats(report.data);
    setShowHistory(false);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6 flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-pink-400" />
              Podsumowanie miesiąca
            </h1>
            <p className="text-muted-foreground text-sm">Kompleksowy raport aktywności agencji</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowHistory(!showHistory)} className="border-border/50">
              <History className="w-4 h-4 mr-2" />
              Historia
            </Button>
            <Button variant="outline" onClick={handleSaveReport} className="border-border/50">
              <Save className="w-4 h-4 mr-2" />
              Zapisz
            </Button>
            <Button onClick={handleExportPDF} disabled={generating} className="bg-primary hover:bg-primary/90">
              {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Pobierz PDF
            </Button>
          </div>
        </div>

        {/* Month Navigation */}
        <Card className="border-border/50 bg-card/80">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">
                  {format(currentDate, 'LLLL yyyy', { locale: pl })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {format(startOfMonth(currentDate), 'd')} - {format(endOfMonth(currentDate), 'd MMMM', { locale: pl })}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                disabled={currentDate >= new Date()}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History Sidebar */}
        {showHistory && (
          <Card className="border-border/50 bg-card/80">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Zapisane raporty</CardTitle>
            </CardHeader>
            <CardContent>
              {savedReports.length === 0 ? (
                <p className="text-sm text-muted-foreground">Brak zapisanych raportów</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {savedReports.map((report) => (
                    <Button
                      key={report.id}
                      variant="outline"
                      size="sm"
                      onClick={() => loadSavedReport(report)}
                      className="justify-start border-border/50"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      {format(new Date(report.year, report.month - 1), 'MMM yyyy', { locale: pl })}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Report Content */}
        {stats && (
          <div ref={reportRef} className="space-y-6 bg-background p-6 rounded-xl">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Nowe leady</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.newLeads}</p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-green-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-green-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Konwersje</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.convertedLeads}</p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 bg-gradient-to-br from-pink-500/10 to-pink-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-pink-400 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Konwersja</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.conversionRate}%</p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Nowi klienci</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.newClients}</p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Dokumenty</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalDocuments}</p>
                </CardContent>
              </Card>
              
              <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-orange-400 mb-1">
                    <Activity className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">Zadania</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stats.tasksCompleted}/{stats.tasksCreated}</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Sections */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Leads Section */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    Leady
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Nowe</span>
                    <span className="font-medium text-blue-400">{stats.newLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Skonwertowane</span>
                    <span className="font-medium text-green-400">{stats.convertedLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Utracone</span>
                    <span className="font-medium text-red-400">{stats.lostLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Aktywne w pipeline</span>
                    <span className="font-medium text-foreground">{stats.activeLeads}</span>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground mb-2">Źródła leadów:</p>
                    {Object.entries(stats.leadSources).slice(0, 4).map(([source, count]) => (
                      <div key={source} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{source}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pipeline & Revenue */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    Pipeline & Przychody
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Łącznie klientów</span>
                    <span className="font-medium text-foreground">{stats.totalClients}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Budżet miesięczny</span>
                    <span className="font-medium text-emerald-400">{stats.totalMonthlyBudget.toLocaleString()} PLN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Potencjał pipeline</span>
                    <span className="font-medium text-pink-400">{stats.pipelineValue.toLocaleString()} PLN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Śr. czas konwersji</span>
                    <span className="font-medium text-foreground">{stats.avgDaysToConversion} dni</span>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="text-center p-3 bg-gradient-to-r from-emerald-500/10 to-pink-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Prognoza przychodu</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {(stats.totalMonthlyBudget + stats.pipelineValue).toLocaleString()} PLN
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents & Tasks */}
              <Card className="border-border/50 bg-card/80">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    Dokumenty & Zadania
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Raporty</span>
                    <span className="font-medium text-pink-400">{stats.reportsGenerated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Faktury</span>
                    <span className="font-medium text-emerald-400">{stats.invoicesGenerated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Umowy</span>
                    <span className="font-medium text-blue-400">{stats.contractsGenerated}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Prezentacje</span>
                    <span className="font-medium text-purple-400">{stats.presentationsGenerated}</span>
                  </div>
                  <div className="pt-2 border-t border-border/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Zadania utworzone</span>
                      <span className="font-medium">{stats.tasksCreated}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Zadania ukończone</span>
                      <span className="font-medium text-green-400">{stats.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Realizacja zadań</span>
                      <span className="font-medium text-orange-400">{stats.taskCompletionRate}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Activity */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Aktywność zespołu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <p className="text-3xl font-bold text-cyan-400">{stats.activeUsers}</p>
                    <p className="text-sm text-muted-foreground">aktywnych użytkowników</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <p className="text-3xl font-bold text-blue-400">{stats.teamMessages}</p>
                    <p className="text-sm text-muted-foreground">wiadomości w chacie</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <p className="text-3xl font-bold text-purple-400">{stats.totalDocuments}</p>
                    <p className="text-sm text-muted-foreground">dokumentów</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/30 rounded-lg">
                    <p className="text-3xl font-bold text-green-400">{stats.tasksCompleted}</p>
                    <p className="text-sm text-muted-foreground">zadań ukończonych</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/30">
              <p>Raport wygenerowany: {format(new Date(), 'd MMMM yyyy, HH:mm', { locale: pl })}</p>
              <p className="mt-1">Aurine Agency • CRM System</p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

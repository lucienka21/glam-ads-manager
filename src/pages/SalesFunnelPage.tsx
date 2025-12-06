import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  Users, 
  Target,
  CheckCircle, 
  XCircle,
  ArrowRight,
  Loader2,
  Clock,
  DollarSign,
  Flame,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Copy,
  ArrowDown,
  CalendarDays,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, subDays, isToday, isPast, isFuture } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';

interface LeadSummary {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  priority: string | null;
  next_follow_up_date: string | null;
  phone: string | null;
  email: string | null;
}

interface FunnelStage {
  key: string;
  label: string;
  count: number;
  leads: LeadSummary[];
  color: string;
  bgColor: string;
}

const AVG_CLIENT_VALUE = 2000;

export default function SalesFunnelPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<LeadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgDaysToConvert, setAvgDaysToConvert] = useState(0);
  const [weeklyConverted, setWeeklyConverted] = useState(0);
  const [weeklyNew, setWeeklyNew] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: leadsData, error } = await supabase
        .from('leads')
        .select('id, salon_name, owner_name, city, status, created_at, updated_at, priority, next_follow_up_date, phone, email')
        .order('updated_at', { ascending: false });

      if (!error && leadsData) {
        const weekAgo = subDays(new Date(), 7);
        let thisWeekNew = 0;
        let thisWeekConverted = 0;
        let totalDays = 0;
        let convertedCount = 0;

        leadsData.forEach((lead) => {
          if (new Date(lead.created_at) >= weekAgo) thisWeekNew++;
          if (lead.status === 'converted' && new Date(lead.updated_at) >= weekAgo) thisWeekConverted++;
          if (lead.status === 'converted') {
            totalDays += differenceInDays(new Date(lead.updated_at), new Date(lead.created_at));
            convertedCount++;
          }
        });

        setLeads(leadsData);
        setWeeklyNew(thisWeekNew);
        setWeeklyConverted(thisWeekConverted);
        setAvgDaysToConvert(convertedCount > 0 ? Math.round(totalDays / convertedCount) : 0);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Build funnel stages
  const stages: FunnelStage[] = [
    { 
      key: 'new', 
      label: 'Nowe', 
      count: 0, 
      leads: [],
      color: 'text-blue-400',
      bgColor: 'from-blue-500 to-blue-600'
    },
    { 
      key: 'contacted', 
      label: 'Skontaktowano', 
      count: 0, 
      leads: [],
      color: 'text-amber-400',
      bgColor: 'from-amber-500 to-orange-500'
    },
    { 
      key: 'follow_up', 
      label: 'Follow-up', 
      count: 0, 
      leads: [],
      color: 'text-orange-400',
      bgColor: 'from-orange-500 to-red-500'
    },
    { 
      key: 'rozmowa', 
      label: 'Rozmowa', 
      count: 0, 
      leads: [],
      color: 'text-pink-400',
      bgColor: 'from-pink-500 to-rose-500'
    },
    { 
      key: 'no_response', 
      label: 'Brak odpowiedzi', 
      count: 0, 
      leads: [],
      color: 'text-zinc-400',
      bgColor: 'from-zinc-500 to-zinc-600'
    },
  ];

  leads.forEach(lead => {
    let status = lead.status;
    if (status === 'meeting_scheduled') status = 'rozmowa';
    const stage = stages.find(s => s.key === status);
    if (stage) {
      stage.count++;
      stage.leads.push(lead);
    }
  });

  const activeTotal = stages.reduce((sum, s) => sum + s.count, 0);
  const convertedCount = leads.filter(l => l.status === 'converted').length;
  const lostCount = leads.filter(l => l.status === 'lost').length;
  const totalLeads = leads.length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;
  const pipelineValue = stages.filter(s => ['rozmowa', 'follow_up'].includes(s.key))
    .reduce((sum, s) => sum + s.count, 0) * AVG_CLIENT_VALUE * (conversionRate / 100);

  // Urgent follow-ups
  const today = new Date();
  const urgentFollowUps = leads.filter(lead => {
    if (!lead.next_follow_up_date) return false;
    if (lead.status === 'converted' || lead.status === 'lost') return false;
    const followUpDate = new Date(lead.next_follow_up_date);
    return isPast(followUpDate) || isToday(followUpDate);
  }).slice(0, 5);

  // Hot leads (in rozmowa or high priority)
  const hotLeads = leads.filter(lead => 
    lead.status === 'rozmowa' || lead.priority === 'high'
  ).slice(0, 5);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID skopiowane');
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              Lejek Sprzedażowy
            </h1>
            <p className="text-muted-foreground mt-1">Wizualizacja procesu pozyskiwania klientów</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/leads')} className="border-border/50">
              <Users className="w-4 h-4 mr-2" />
              Lista leadów
            </Button>
            <Button onClick={() => navigate('/leads')} className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0">
              <UserPlus className="w-4 h-4 mr-2" />
              Dodaj lead
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeTotal}</p>
                  <p className="text-xs text-muted-foreground">Aktywne leady</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{convertedCount}</p>
                  <p className="text-xs text-muted-foreground">Skonwertowane</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-400">{conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Konwersja</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{avgDaysToConvert}</p>
                  <p className="text-xs text-muted-foreground">Dni do konwersji</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-violet-500/10 to-violet-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{(pipelineValue / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-muted-foreground">Wartość pipeline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Funnel */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="border-b border-border/50 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                  Przepływ leadów
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Funnel Visualization */}
                <div className="relative space-y-2">
                  {stages.map((stage, index) => {
                    const widthPercent = 100 - (index * 15);
                    const maxCount = Math.max(...stages.map(s => s.count), 1);
                    const fillPercent = (stage.count / maxCount) * 100;
                    
                    return (
                      <div key={stage.key} className="relative">
                        <div 
                          className="relative mx-auto transition-all duration-300 cursor-pointer group"
                          style={{ width: `${widthPercent}%` }}
                          onClick={() => navigate('/leads')}
                        >
                          <div className={`bg-gradient-to-r ${stage.bgColor} rounded-xl p-4 flex items-center justify-between group-hover:scale-[1.02] transition-transform shadow-lg`}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-bold text-white">
                                {stage.count}
                              </div>
                              <div>
                                <p className="font-semibold text-white">{stage.label}</p>
                                <p className="text-xs text-white/70">
                                  {activeTotal > 0 ? Math.round((stage.count / activeTotal) * 100) : 0}% aktywnych
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                        {index < stages.length - 1 && (
                          <div className="flex justify-center py-1">
                            <ArrowDown className="w-4 h-4 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                  <div 
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 cursor-pointer hover:bg-green-500/15 transition-all group"
                    onClick={() => navigate('/clients')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="font-medium text-foreground">Klienci</p>
                          <p className="text-xs text-muted-foreground">Skonwertowane</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-400">{convertedCount}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="font-medium text-foreground">Utracone</p>
                          <p className="text-xs text-muted-foreground">Nie zamknięte</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-red-400">{lostCount}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-pink-400" />
                  Ten tydzień
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-3xl font-bold text-blue-400">+{weeklyNew}</p>
                    <p className="text-sm text-muted-foreground">Nowe leady</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-3xl font-bold text-green-400">+{weeklyConverted}</p>
                    <p className="text-sm text-muted-foreground">Konwersje</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                    <p className={`text-3xl font-bold ${weeklyConverted >= weeklyNew ? 'text-green-400' : 'text-amber-400'}`}>
                      {weeklyConverted - weeklyNew >= 0 ? '+' : ''}{weeklyConverted - weeklyNew}
                    </p>
                    <p className="text-sm text-muted-foreground">Bilans netto</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4">
            {/* Urgent Follow-ups */}
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-red-500/10 to-orange-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  Pilne follow-upy
                  {urgentFollowUps.length > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {urgentFollowUps.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {urgentFollowUps.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    Brak zaległych follow-upów
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {urgentFollowUps.map((lead) => (
                      <div 
                        key={lead.id}
                        className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{lead.salon_name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                          </div>
                          <Badge variant="outline" className="text-red-400 border-red-500/30 shrink-0">
                            {lead.next_follow_up_date && format(new Date(lead.next_follow_up_date), 'd MMM', { locale: pl })}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-2">
                          {lead.phone && (
                            <a href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded bg-secondary/50 hover:bg-secondary">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                            </a>
                          )}
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} onClick={(e) => e.stopPropagation()} className="p-1.5 rounded bg-secondary/50 hover:bg-secondary">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hot Leads */}
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-orange-500/10 to-amber-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Hot Leads
                  {hotLeads.length > 0 && (
                    <Badge className="ml-auto bg-orange-500/20 text-orange-400 border-orange-500/30">
                      {hotLeads.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {hotLeads.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    Brak gorących leadów
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {hotLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate">{lead.salon_name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                              {lead.priority === 'high' && (
                                <Badge variant="outline" className="text-pink-400 border-pink-500/30 text-xs px-1.5">
                                  Priorytet
                                </Badge>
                              )}
                            </div>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); copyId(lead.id); }}
                            className="p-1.5 rounded hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-border/50 bg-gradient-to-br from-pink-500/5 to-rose-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Wskazówka dnia</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leady w statusie "Rozmowa" mają najwyższy potencjał konwersji. 
                      Skontaktuj się z nimi w ciągu 24h.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

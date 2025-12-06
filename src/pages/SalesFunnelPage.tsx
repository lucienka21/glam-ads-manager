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
  Zap,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle,
  Calendar,
  ChevronRight,
  Sparkles,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { format, differenceInDays, subDays } from 'date-fns';
import { pl } from 'date-fns/locale';

interface FunnelData {
  new: number;
  contacted: number;
  follow_up: number;
  rozmowa: number;
  no_response: number;
  converted: number;
  lost: number;
}

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

const AVG_CLIENT_VALUE = 2000;

const stages = [
  { key: 'new', label: 'Nowe leady', shortLabel: 'Nowe', icon: Sparkles, gradient: 'from-blue-500 to-cyan-500' },
  { key: 'contacted', label: 'Skontaktowano', shortLabel: 'Kontakt', icon: Mail, gradient: 'from-amber-500 to-orange-500' },
  { key: 'follow_up', label: 'Follow-up', shortLabel: 'Follow-up', icon: MessageSquare, gradient: 'from-orange-500 to-red-500' },
  { key: 'rozmowa', label: 'Rozmowa', shortLabel: 'Rozmowa', icon: Phone, gradient: 'from-purple-500 to-pink-500' },
  { key: 'no_response', label: 'Brak odpowiedzi', shortLabel: 'Brak odp.', icon: AlertCircle, gradient: 'from-zinc-500 to-zinc-600' },
];

export default function SalesFunnelPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<FunnelData>({
    new: 0, contacted: 0, follow_up: 0, rozmowa: 0, no_response: 0, converted: 0, lost: 0,
  });
  const [hotLeads, setHotLeads] = useState<LeadSummary[]>([]);
  const [urgentFollowUps, setUrgentFollowUps] = useState<LeadSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [avgDaysToConvert, setAvgDaysToConvert] = useState(0);
  const [weeklyConverted, setWeeklyConverted] = useState(0);
  const [weeklyNew, setWeeklyNew] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('id, salon_name, owner_name, city, status, created_at, updated_at, priority, next_follow_up_date, phone, email');

      if (!error && leads) {
        const counts: FunnelData = { new: 0, contacted: 0, follow_up: 0, rozmowa: 0, no_response: 0, converted: 0, lost: 0 };
        const weekAgo = subDays(new Date(), 7);
        let thisWeekNew = 0;
        let thisWeekConverted = 0;
        let totalDays = 0;
        let convertedCount = 0;

        const hot: LeadSummary[] = [];
        const urgent: LeadSummary[] = [];
        const today = new Date();

        leads.forEach((lead) => {
          let status = lead.status;
          if (status === 'meeting_scheduled') status = 'rozmowa';
          if (status in counts) counts[status as keyof FunnelData]++;

          if (new Date(lead.created_at) >= weekAgo) thisWeekNew++;
          if (status === 'converted' && new Date(lead.updated_at) >= weekAgo) thisWeekConverted++;
          if (status === 'converted') {
            totalDays += differenceInDays(new Date(lead.updated_at), new Date(lead.created_at));
            convertedCount++;
          }

          // Hot leads: in rozmowa stage or high priority
          if (status === 'rozmowa' || lead.priority === 'high') {
            hot.push({ ...lead, status });
          }

          // Urgent follow-ups: overdue or today
          if (lead.next_follow_up_date) {
            const followUpDate = new Date(lead.next_follow_up_date);
            if (followUpDate <= today && status !== 'converted' && status !== 'lost') {
              urgent.push({ ...lead, status });
            }
          }
        });

        setData(counts);
        setHotLeads(hot.slice(0, 5));
        setUrgentFollowUps(urgent.slice(0, 5));
        setWeeklyNew(thisWeekNew);
        setWeeklyConverted(thisWeekConverted);
        setAvgDaysToConvert(convertedCount > 0 ? Math.round(totalDays / convertedCount) : 0);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const activeTotal = data.new + data.contacted + data.follow_up + data.rozmowa + data.no_response;
  const totalLeads = activeTotal + data.converted + data.lost;
  const conversionRate = totalLeads > 0 ? Math.round((data.converted / totalLeads) * 100) : 0;
  const pipelineValue = (data.rozmowa + data.follow_up) * AVG_CLIENT_VALUE * (conversionRate / 100);

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
            <p className="text-muted-foreground mt-1">Śledź postępy i zamykaj więcej klientów</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/leads')} className="border-border/50">
              <Users className="w-4 h-4 mr-2" />
              Zarządzaj leadami
            </Button>
            <Button onClick={() => navigate('/leads')} className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0">
              <Zap className="w-4 h-4 mr-2" />
              Dodaj lead
            </Button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aktywne leady</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{activeTotal}</p>
                  <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{weeklyNew} ten tydzień
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Konwersja</p>
                  <p className="text-3xl font-bold text-green-400 mt-1">{conversionRate}%</p>
                  <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {data.converted} klientów
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Śr. czas konwersji</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{avgDaysToConvert}</p>
                  <p className="text-xs text-muted-foreground mt-1">dni do zamknięcia</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wartość pipeline</p>
                  <p className="text-3xl font-bold text-pink-400 mt-1">{(pipelineValue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-muted-foreground mt-1">PLN potencjalnie</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-pink-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Funnel Visualization */}
          <div className="lg:col-span-2 space-y-4">
            {/* Visual Funnel */}
            <Card className="border-border/50 bg-card/80 overflow-hidden">
              <CardHeader className="pb-2 border-b border-border/50">
                <CardTitle className="text-lg font-semibold">Etapy sprzedaży</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative py-6 px-4">
                  {/* Funnel stages */}
                  {stages.map((stage, index) => {
                    const count = data[stage.key as keyof FunnelData];
                    const maxWidth = 100 - (index * 12);
                    const Icon = stage.icon;

                    return (
                      <div 
                        key={stage.key} 
                        className="relative mb-3 last:mb-0 cursor-pointer group"
                        onClick={() => navigate('/leads')}
                      >
                        <div 
                          className={`relative mx-auto transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-lg rounded-xl overflow-hidden`}
                          style={{ width: `${maxWidth}%` }}
                        >
                          <div className={`bg-gradient-to-r ${stage.gradient} p-4 flex items-center justify-between`}>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-semibold text-sm">{stage.label}</p>
                                <p className="text-white/70 text-xs">
                                  {totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0}% wszystkich
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-3xl font-bold text-white">{count}</span>
                              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Results row */}
                  <div className="grid grid-cols-2 gap-4 mt-6 px-4">
                    <div 
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 cursor-pointer hover:bg-green-500/15 transition-all"
                      onClick={() => navigate('/clients')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-6 h-6 text-green-400" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Skonwertowane</p>
                            <p className="text-xs text-muted-foreground">Nowi klienci</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-green-400">{data.converted}</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <XCircle className="w-6 h-6 text-red-400" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Utracone</p>
                            <p className="text-xs text-muted-foreground">Nie zamknięte</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-red-400">{data.lost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" />
                  Wyniki tego tygodnia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-3xl font-bold text-blue-400">{weeklyNew}</p>
                    <p className="text-sm text-muted-foreground mt-1">Nowe leady</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-3xl font-bold text-green-400">{weeklyConverted}</p>
                    <p className="text-sm text-muted-foreground mt-1">Konwersje</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                    <div className="flex items-center justify-center gap-1">
                      {weeklyConverted >= weeklyNew ? (
                        <TrendingUp className="w-5 h-5 text-green-400" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-400" />
                      )}
                      <p className={`text-3xl font-bold ${weeklyConverted >= weeklyNew ? 'text-green-400' : 'text-red-400'}`}>
                        {weeklyConverted - weeklyNew >= 0 ? '+' : ''}{weeklyConverted - weeklyNew}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Bilans netto</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Action Items */}
          <div className="space-y-4">
            {/* Hot Leads */}
            <Card className="border-border/50 bg-card/80 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-orange-500/10 to-red-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  Hot Leads
                  {hotLeads.length > 0 && (
                    <span className="ml-auto text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                      {hotLeads.length}
                    </span>
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
                        className="p-4 hover:bg-secondary/30 cursor-pointer transition-colors flex items-center justify-between"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                            {lead.salon_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{lead.salon_name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Urgent Follow-ups */}
            <Card className="border-border/50 bg-card/80 overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-red-500/10 to-pink-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  Pilne follow-upy
                  {urgentFollowUps.length > 0 && (
                    <span className="ml-auto text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                      {urgentFollowUps.length}
                    </span>
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
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-foreground">{lead.salon_name}</p>
                          <span className="text-xs text-red-400">
                            {lead.next_follow_up_date && format(new Date(lead.next_follow_up_date), 'd MMM', { locale: pl })}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {lead.phone && (
                            <a 
                              href={`tel:${lead.phone}`} 
                              className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="w-3 h-3 inline mr-1" />
                              Zadzwoń
                            </a>
                          )}
                          {lead.email && (
                            <a 
                              href={`mailto:${lead.email}`} 
                              className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded hover:bg-green-500/20 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail className="w-3 h-3 inline mr-1" />
                              Email
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border-border/50 bg-gradient-to-br from-pink-500/5 to-rose-500/5 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Wskazówka dnia</p>
                    <p className="text-xs text-muted-foreground">
                      {data.follow_up > data.rozmowa 
                        ? "Masz więcej follow-upów niż rozmów. Skup się na umawianiu spotkań!"
                        : data.no_response > 3
                        ? "Wiele leadów bez odpowiedzi. Spróbuj innego kanału kontaktu."
                        : "Świetna praca! Kontynuuj budowanie relacji z leadami."}
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, subDays, isToday, isPast } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';
import {
  Loader2, Target, Users, TrendingUp, CheckCircle, XCircle,
  ArrowRight, Clock, DollarSign, Flame, Phone, Mail, Copy,
  ChevronRight, UserPlus, Calendar, AlertCircle, Zap,
  ArrowDown, MessageSquare, Building2
} from 'lucide-react';

interface Lead {
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
  industry: string | null;
}

const statusConfig: Record<string, { label: string; color: string; bgGradient: string }> = {
  new: { label: 'Nowy', color: 'text-blue-400', bgGradient: 'from-blue-500 to-blue-600' },
  contacted: { label: 'Kontakt', color: 'text-cyan-400', bgGradient: 'from-cyan-500 to-cyan-600' },
  follow_up: { label: 'Follow-up', color: 'text-amber-400', bgGradient: 'from-amber-500 to-orange-500' },
  rozmowa: { label: 'Rozmowa', color: 'text-pink-400', bgGradient: 'from-pink-500 to-rose-500' },
  no_response: { label: 'Brak odp.', color: 'text-zinc-400', bgGradient: 'from-zinc-500 to-zinc-600' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'Wysoki', color: 'bg-red-500/20 text-red-400' },
  medium: { label: 'Średni', color: 'bg-amber-500/20 text-amber-400' },
  low: { label: 'Niski', color: 'bg-zinc-500/20 text-zinc-400' },
};

const AVG_CLIENT_VALUE = 2500;

export default function SalesFunnelPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  };

  const stages = Object.keys(statusConfig).map(key => {
    const config = statusConfig[key];
    const stageLeads = leads.filter(l => l.status === key);
    return {
      key,
      label: config.label,
      color: config.color,
      bgGradient: config.bgGradient,
      count: stageLeads.length,
      leads: stageLeads,
    };
  });

  const totalActive = stages.reduce((sum, s) => sum + s.count, 0);
  const converted = leads.filter(l => l.status === 'converted');
  const lost = leads.filter(l => l.status === 'lost');
  const conversionRate = leads.length > 0 ? Math.round((converted.length / leads.length) * 100) : 0;

  const weekAgo = subDays(new Date(), 7);
  const weeklyNew = leads.filter(l => new Date(l.created_at) >= weekAgo).length;
  const weeklyConverted = converted.filter(l => new Date(l.updated_at) >= weekAgo).length;

  const avgDaysToConvert = converted.length > 0
    ? Math.round(converted.reduce((sum, l) => sum + differenceInDays(new Date(l.updated_at), new Date(l.created_at)), 0) / converted.length)
    : 0;

  const pipelineValue = stages
    .filter(s => ['rozmowa', 'follow_up'].includes(s.key))
    .reduce((sum, s) => sum + s.count, 0) * AVG_CLIENT_VALUE * (conversionRate / 100);

  const urgentFollowUps = leads.filter(l => {
    if (!l.next_follow_up_date || ['converted', 'lost'].includes(l.status)) return false;
    const date = new Date(l.next_follow_up_date);
    return isPast(date) || isToday(date);
  }).slice(0, 6);

  const hotLeads = leads.filter(l => 
    (l.status === 'rozmowa' || l.priority === 'high') && !['converted', 'lost'].includes(l.status)
  ).slice(0, 6);

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('ID skopiowane');
  };

  const selectedLeads = selectedStage 
    ? stages.find(s => s.key === selectedStage)?.leads || []
    : [];

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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/25">
                <Target className="w-6 h-6 text-white" />
              </div>
              Lejek Sprzedażowy
            </h1>
            <p className="text-muted-foreground mt-2">Wizualizacja procesu pozyskiwania klientów</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/leads')}>
              <Users className="w-4 h-4 mr-2" />
              Wszystkie leady
            </Button>
            <Button 
              onClick={() => navigate('/leads')}
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0 shadow-lg shadow-pink-500/25"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Dodaj lead
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5 hover:from-blue-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalActive}</p>
                  <p className="text-xs text-muted-foreground">Aktywne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5 hover:from-green-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{converted.length}</p>
                  <p className="text-xs text-muted-foreground">Konwersje</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5 hover:from-pink-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-400">{conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Konwersja</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5 hover:from-amber-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{avgDaysToConvert}</p>
                  <p className="text-xs text-muted-foreground">Dni śr.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-violet-500/10 to-violet-600/5 hover:from-violet-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{Math.round(pipelineValue / 1000)}k</p>
                  <p className="text-xs text-muted-foreground">Pipeline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-600/5 hover:from-red-500/15 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">{lost.length}</p>
                  <p className="text-xs text-muted-foreground">Utracone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Funnel Visualization */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-gradient-to-r from-pink-500/5 to-transparent">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                  Lejek konwersji
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {stages.map((stage, index) => {
                    const widthPercent = Math.max(30, 100 - (index * 14));
                    const isSelected = selectedStage === stage.key;
                    
                    return (
                      <div key={stage.key}>
                        <div 
                          className={`relative mx-auto transition-all duration-300 cursor-pointer group ${isSelected ? 'scale-[1.02]' : ''}`}
                          style={{ width: `${widthPercent}%` }}
                          onClick={() => setSelectedStage(isSelected ? null : stage.key)}
                        >
                          <div className={`bg-gradient-to-r ${stage.bgGradient} rounded-xl p-4 flex items-center justify-between shadow-lg transition-all ${isSelected ? 'ring-2 ring-white/30 shadow-xl' : 'group-hover:shadow-xl'}`}>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white text-xl backdrop-blur-sm">
                                {stage.count}
                              </div>
                              <div>
                                <p className="font-semibold text-white text-lg">{stage.label}</p>
                                <p className="text-sm text-white/70">
                                  {totalActive > 0 ? Math.round((stage.count / totalActive) * 100) : 0}% aktywnych
                                </p>
                              </div>
                            </div>
                            <ChevronRight className={`w-6 h-6 text-white/50 transition-all ${isSelected ? 'rotate-90 text-white' : 'group-hover:text-white'}`} />
                          </div>
                        </div>
                        {index < stages.length - 1 && (
                          <div className="flex justify-center py-2">
                            <ArrowDown className="w-5 h-5 text-muted-foreground/40" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Results Row */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                  <div 
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 cursor-pointer hover:bg-green-500/15 transition-all group"
                    onClick={() => navigate('/clients')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-7 h-7 text-green-400" />
                        <div>
                          <p className="font-semibold text-foreground">Klienci</p>
                          <p className="text-xs text-muted-foreground">Skonwertowane</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-green-400">{converted.length}</span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-7 h-7 text-red-400" />
                        <div>
                          <p className="font-semibold text-foreground">Utracone</p>
                          <p className="text-xs text-muted-foreground">Nie zamknięte</p>
                        </div>
                      </div>
                      <span className="text-3xl font-bold text-red-400">{lost.length}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Stage Details */}
            {selectedStage && selectedLeads.length > 0 && (
              <Card className="border-border/50 mt-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    {statusConfig[selectedStage]?.label} ({selectedLeads.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedLeads.slice(0, 10).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{lead.salon_name}</p>
                            <p className="text-sm text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {lead.priority && (
                            <Badge className={priorityConfig[lead.priority]?.color || ''}>
                              {priorityConfig[lead.priority]?.label}
                            </Badge>
                          )}
                          <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); copyId(lead.id); }}>
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Weekly Performance */}
            <Card className="border-border/50 mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Ten tydzień
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-3xl font-bold text-blue-400">+{weeklyNew}</p>
                    <p className="text-sm text-muted-foreground mt-1">Nowe leady</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <p className="text-3xl font-bold text-green-400">+{weeklyConverted}</p>
                    <p className="text-sm text-muted-foreground mt-1">Konwersje</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                    <p className={`text-3xl font-bold ${weeklyConverted >= weeklyNew ? 'text-green-400' : 'text-amber-400'}`}>
                      {weeklyConverted - weeklyNew >= 0 ? '+' : ''}{weeklyConverted - weeklyNew}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Bilans</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Urgent Follow-ups */}
            <Card className="border-red-500/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-red-500/10 to-orange-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    Pilne follow-upy
                  </div>
                  {urgentFollowUps.length > 0 && (
                    <Badge variant="destructive">{urgentFollowUps.length}</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {urgentFollowUps.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-400/50" />
                    Wszystko na bieżąco!
                  </div>
                ) : (
                  <div className="divide-y divide-border/50">
                    {urgentFollowUps.map((lead) => (
                      <div 
                        key={lead.id}
                        className="p-4 hover:bg-red-500/5 cursor-pointer transition-colors"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{lead.salon_name}</p>
                            <p className="text-xs text-red-400">
                              {isToday(new Date(lead.next_follow_up_date!)) ? 'Dzisiaj' : 'Zaległe'}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Hot Leads */}
            <Card className="border-orange-500/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border-b border-border/50">
                <CardTitle className="text-base flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-400" />
                    Gorące leady
                  </div>
                  {hotLeads.length > 0 && (
                    <Badge className="bg-orange-500/20 text-orange-400">{hotLeads.length}</Badge>
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
                        className="p-4 hover:bg-orange-500/5 cursor-pointer transition-colors"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Flame className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{lead.salon_name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                          </div>
                          {lead.priority === 'high' && (
                            <Badge className="bg-red-500/20 text-red-400 text-[10px]">Wysoki</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Tip */}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Tip dnia</p>
                    <p className="text-sm text-muted-foreground">
                      {conversionRate < 10 
                        ? "Skup się na jakości leadów. Lepiej mieć mniej, ale bardziej zaangażowanych potencjalnych klientów."
                        : avgDaysToConvert > 14
                        ? "Skróć czas konwersji poprzez szybsze follow-upy. Pierwszy kontakt w ciągu 24h zwiększa szanse o 60%."
                        : urgentFollowUps.length > 3
                        ? "Masz zaległe follow-upy! Regularny kontakt buduje zaufanie i zwiększa konwersję."
                        : "Świetna robota! Utrzymuj tempo i monitoruj gorące leady."
                      }
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

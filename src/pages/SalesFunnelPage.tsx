import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, subDays, isToday, isPast, addDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';
import {
  Loader2, Target, Users, TrendingUp, CheckCircle, XCircle,
  Clock, DollarSign, Flame, Phone, Mail, ChevronRight, 
  Calendar, AlertCircle, Building2, ArrowRight, Eye
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
  cold_email_sent: boolean | null;
  cold_email_date: string | null;
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string }> = {
  new: { label: 'Nowy', color: 'text-blue-400', bgColor: 'bg-blue-500' },
  contacted: { label: 'Kontakt', color: 'text-cyan-400', bgColor: 'bg-cyan-500' },
  follow_up: { label: 'Follow-up', color: 'text-amber-400', bgColor: 'bg-amber-500' },
  rozmowa: { label: 'Rozmowa', color: 'text-pink-400', bgColor: 'bg-pink-500' },
  no_response: { label: 'Brak odp.', color: 'text-zinc-400', bgColor: 'bg-zinc-500' },
};

const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'Wysoki', color: 'text-red-400' },
  medium: { label: 'Średni', color: 'text-amber-400' },
  low: { label: 'Niski', color: 'text-zinc-400' },
};

const AVG_CLIENT_VALUE = 2500;

export default function SalesFunnelPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

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

  // Calculate funnel stages
  const funnelData = useMemo(() => {
    const activeLeads = leads.filter(l => !['converted', 'lost'].includes(l.status));
    const stages = Object.entries(statusConfig).map(([key, config]) => {
      const count = activeLeads.filter(l => l.status === key).length;
      return { key, ...config, count };
    });
    return stages;
  }, [leads]);

  // KPIs
  const kpis = useMemo(() => {
    const total = leads.length;
    const converted = leads.filter(l => l.status === 'converted');
    const lost = leads.filter(l => l.status === 'lost');
    const active = leads.filter(l => !['converted', 'lost'].includes(l.status));
    
    const weekAgo = subDays(new Date(), 7);
    const weeklyNew = leads.filter(l => new Date(l.created_at) >= weekAgo).length;
    const weeklyConverted = converted.filter(l => new Date(l.updated_at) >= weekAgo).length;

    const conversionRate = total > 0 ? Math.round((converted.length / total) * 100) : 0;
    const avgDays = converted.length > 0
      ? Math.round(converted.reduce((sum, l) => 
          sum + differenceInDays(new Date(l.updated_at), new Date(l.created_at)), 0) / converted.length)
      : 0;

    const pipelineValue = active
      .filter(l => ['rozmowa', 'follow_up'].includes(l.status))
      .length * AVG_CLIENT_VALUE * (conversionRate / 100);

    return {
      total,
      active: active.length,
      converted: converted.length,
      lost: lost.length,
      conversionRate,
      avgDays,
      pipelineValue,
      weeklyNew,
      weeklyConverted,
    };
  }, [leads]);

  // Hot leads and urgent follow-ups
  const hotLeads = useMemo(() => {
    return leads
      .filter(l => (l.priority === 'high' || l.status === 'rozmowa') && !['converted', 'lost'].includes(l.status))
      .slice(0, 5);
  }, [leads]);

  const urgentFollowUps = useMemo(() => {
    return leads.filter(l => {
      if (!l.next_follow_up_date || ['converted', 'lost'].includes(l.status)) return false;
      const date = new Date(l.next_follow_up_date);
      return isPast(date) || isToday(date);
    }).slice(0, 5);
  }, [leads]);

  // Total funnel count for percentage
  const totalInFunnel = funnelData.reduce((sum, s) => sum + s.count, 0);

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
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white border-0"
            >
              <Target className="w-4 h-4 mr-2" />
              Nowy lead
            </Button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{kpis.active}</p>
                  <p className="text-xs text-muted-foreground">Aktywne</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{kpis.converted}</p>
                  <p className="text-xs text-muted-foreground">Konwersje</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-pink-500/10 to-pink-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-pink-400">{kpis.conversionRate}%</p>
                  <p className="text-xs text-muted-foreground">Konwersja</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-amber-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{kpis.avgDays}</p>
                  <p className="text-xs text-muted-foreground">Dni śr.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-violet-500/10 to-violet-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.round(kpis.pipelineValue / 1000)}k</p>
                  <p className="text-xs text-muted-foreground">Pipeline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-500/10 to-red-600/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-400">{kpis.lost}</p>
                  <p className="text-xs text-muted-foreground">Utracone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Funnel Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-pink-400" />
                  Lejek konwersji
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {funnelData.map((stage, index) => {
                    const percentage = totalInFunnel > 0 ? Math.round((stage.count / totalInFunnel) * 100) : 0;
                    
                    return (
                      <div 
                        key={stage.key}
                        className="group cursor-pointer"
                        onClick={() => navigate('/leads')}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${stage.bgColor}`} />
                            <span className="font-medium">{stage.label}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{percentage}%</span>
                            <span className="text-lg font-bold">{stage.count}</span>
                          </div>
                        </div>
                        <Progress 
                          value={percentage} 
                          className="h-8 bg-secondary/50"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Conversion Results */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                  <div 
                    className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 cursor-pointer hover:bg-green-500/15 transition-all"
                    onClick={() => navigate('/clients')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="font-medium">Klienci</p>
                          <p className="text-xs text-muted-foreground">Skonwertowani</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-green-400">{kpis.converted}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="font-medium">Utracone</p>
                          <p className="text-xs text-muted-foreground">Nie zamknięte</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-red-400">{kpis.lost}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Stats */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Ten tydzień
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <p className="text-3xl font-bold text-blue-400">+{kpis.weeklyNew}</p>
                    <p className="text-sm text-muted-foreground mt-1">Nowe leady</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <p className="text-3xl font-bold text-green-400">+{kpis.weeklyConverted}</p>
                    <p className="text-sm text-muted-foreground mt-1">Konwersje</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Urgent Follow-ups */}
            <Card className="border-border/50 border-l-4 border-l-amber-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  Pilne follow-upy
                  {urgentFollowUps.length > 0 && (
                    <Badge variant="secondary" className="ml-auto bg-amber-500/20 text-amber-400">
                      {urgentFollowUps.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {urgentFollowUps.length > 0 ? (
                  <div className="space-y-2">
                    {urgentFollowUps.map(lead => (
                      <div 
                        key={lead.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{lead.salon_name}</p>
                            <p className="text-xs text-muted-foreground">{lead.city || 'Brak miasta'}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Brak pilnych follow-upów</p>
                )}
              </CardContent>
            </Card>

            {/* Hot Leads */}
            <Card className="border-border/50 border-l-4 border-l-pink-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Flame className="w-4 h-4 text-pink-400" />
                  Hot Leads
                  {hotLeads.length > 0 && (
                    <Badge variant="secondary" className="ml-auto bg-pink-500/20 text-pink-400">
                      {hotLeads.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {hotLeads.length > 0 ? (
                  <div className="space-y-2">
                    {hotLeads.map(lead => (
                      <div 
                        key={lead.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all"
                        onClick={() => navigate(`/leads/${lead.id}`)}
                      >
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-pink-400" />
                          <div>
                            <p className="font-medium text-sm">{lead.salon_name}</p>
                            <p className="text-xs text-muted-foreground">
                              {lead.priority === 'high' ? 'Wysoki priorytet' : 'Rozmowa'}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">Brak hot leadów</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Szybkie akcje</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/leads')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Zobacz wszystkie leady
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/clients')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Lista klientów
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/auto-followups')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Auto follow-upy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

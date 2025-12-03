import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingDown, 
  Users, 
  Mail, 
  MessageSquare, 
  Phone, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
  Target,
  Clock,
  TrendingUp,
  Calendar,
  DollarSign,
  BarChart3,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
}

interface FunnelMetrics {
  avgDaysInFunnel: number;
  thisWeekConverted: number;
  thisWeekNew: number;
  conversionTrend: number;
  potentialValue: number;
}

const stages = [
  { key: 'new', label: 'Nowe leady', icon: Users, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', borderColor: 'border-blue-500/30' },
  { key: 'contacted', label: 'Skontaktowano', icon: Mail, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/30' },
  { key: 'follow_up', label: 'Follow-up', icon: MessageSquare, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400', borderColor: 'border-orange-500/30' },
  { key: 'rozmowa', label: 'Rozmowa', icon: Phone, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400', borderColor: 'border-purple-500/30' },
  { key: 'no_response', label: 'Brak odpowiedzi', icon: AlertCircle, color: 'from-zinc-500 to-zinc-600', bgColor: 'bg-zinc-500/10', textColor: 'text-zinc-400', borderColor: 'border-zinc-500/30' },
  { key: 'converted', label: 'Skonwertowane', icon: CheckCircle, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10', textColor: 'text-green-400', borderColor: 'border-green-500/30' },
  { key: 'lost', label: 'Utracone', icon: XCircle, color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10', textColor: 'text-red-400', borderColor: 'border-red-500/30' },
];

const AVG_CLIENT_VALUE = 2000; // średnia wartość klienta miesięcznie

export default function SalesFunnelPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<FunnelData>({
    new: 0,
    contacted: 0,
    follow_up: 0,
    rozmowa: 0,
    no_response: 0,
    converted: 0,
    lost: 0,
  });
  const [leadsByStatus, setLeadsByStatus] = useState<Record<string, LeadSummary[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<FunnelMetrics>({
    avgDaysInFunnel: 0,
    thisWeekConverted: 0,
    thisWeekNew: 0,
    conversionTrend: 0,
    potentialValue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('id, salon_name, owner_name, city, status, created_at, updated_at, priority');

      if (!error && leads) {
        const counts: FunnelData = {
          new: 0,
          contacted: 0,
          follow_up: 0,
          rozmowa: 0,
          no_response: 0,
          converted: 0,
          lost: 0,
        };

        const byStatus: Record<string, LeadSummary[]> = {};
        const weekAgo = subDays(new Date(), 7);
        let thisWeekNew = 0;
        let thisWeekConverted = 0;
        let totalDaysInFunnel = 0;
        let convertedCount = 0;

        leads.forEach((lead) => {
          let status = lead.status;
          if (status === 'meeting_scheduled') status = 'rozmowa';
          
          if (status in counts) {
            counts[status as keyof FunnelData]++;
          }
          
          if (!byStatus[status]) byStatus[status] = [];
          byStatus[status].push({ ...lead, status });

          // Track weekly metrics
          if (new Date(lead.created_at) >= weekAgo) {
            thisWeekNew++;
          }
          if (status === 'converted' && new Date(lead.updated_at) >= weekAgo) {
            thisWeekConverted++;
          }
          if (status === 'converted') {
            const daysInFunnel = differenceInDays(new Date(lead.updated_at), new Date(lead.created_at));
            totalDaysInFunnel += daysInFunnel;
            convertedCount++;
          }
        });

        // Calculate potential pipeline value (leads in rozmowa stage * conversion rate * avg value)
        const conversionRate = counts.new > 0 ? counts.converted / counts.new : 0;
        const potentialValue = (counts.rozmowa + counts.follow_up) * conversionRate * AVG_CLIENT_VALUE;

        setData(counts);
        setLeadsByStatus(byStatus);
        setMetrics({
          avgDaysInFunnel: convertedCount > 0 ? Math.round(totalDaysInFunnel / convertedCount) : 0,
          thisWeekConverted,
          thisWeekNew,
          conversionTrend: thisWeekConverted - thisWeekNew,
          potentialValue: Math.round(potentialValue),
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const activeTotal = data.new + data.contacted + data.follow_up + data.rozmowa + data.no_response;
  const maxCount = Math.max(...Object.values(data), 1);
  const conversionRate = data.new > 0 ? Math.round((data.converted / data.new) * 100) : 0;
  const lossRate = data.new > 0 ? Math.round((data.lost / data.new) * 100) : 0;

  // Calculate stage-to-stage conversion rates
  const getStageConversion = (fromKey: string, toKey: string): number => {
    const fromValue = data[fromKey as keyof FunnelData];
    const toValue = data[toKey as keyof FunnelData];
    if (fromValue === 0) return 0;
    return Math.round((toValue / fromValue) * 100);
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
              <TrendingDown className="w-6 h-6 text-pink-400" />
              Lejek sprzedażowy
            </h1>
            <p className="text-muted-foreground text-sm">Szczegółowa analiza procesu sprzedaży</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/leads')} className="border-border/50">
              <Users className="w-4 h-4 mr-2" />
              Zarządzaj leadami
            </Button>
            <Button onClick={() => navigate('/leads')} className="bg-primary hover:bg-primary/90">
              Dodaj lead
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Aktywne</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{activeTotal}</p>
              <p className="text-xs text-muted-foreground">leadów w pipeline</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Klienci</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{data.converted}</p>
              <p className="text-xs text-muted-foreground">skonwertowanych</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-pink-400 mb-1">
                <Target className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Konwersja</span>
              </div>
              <p className="text-2xl font-bold text-pink-400">{conversionRate}%</p>
              <p className="text-xs text-muted-foreground">lead → klient</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-400 mb-1">
                <XCircle className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Utrata</span>
              </div>
              <p className="text-2xl font-bold text-red-400">{lossRate}%</p>
              <p className="text-xs text-muted-foreground">{data.lost} utraconych</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Śr. czas</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{metrics.avgDaysInFunnel}</p>
              <p className="text-xs text-muted-foreground">dni do konwersji</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider">Potencjał</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{(metrics.potentialValue / 1000).toFixed(1)}k</p>
              <p className="text-xs text-muted-foreground">PLN/mies. w pipeline</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-pink-400" />
              Aktywność tego tygodnia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-3xl font-bold text-blue-400">{metrics.thisWeekNew}</p>
                <p className="text-sm text-muted-foreground">nowych leadów</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <p className="text-3xl font-bold text-green-400">{metrics.thisWeekConverted}</p>
                <p className="text-sm text-muted-foreground">konwersji</p>
              </div>
              <div className="text-center p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
                <div className="flex items-center justify-center gap-1">
                  {metrics.conversionTrend >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                  <p className={`text-3xl font-bold ${metrics.conversionTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrics.conversionTrend >= 0 ? '+' : ''}{metrics.conversionTrend}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">bilans tyg.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Visual Funnel - Main */}
          <Card className="border-border/50 bg-card/80 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-pink-400" />
                Etapy lejka
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {stages.map((stage, index) => {
                const count = data[stage.key as keyof FunnelData];
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                const fromNewRate = index === 0 
                  ? 100 
                  : data.new > 0 
                    ? Math.round((count / data.new) * 100) 
                    : 0;
                const isSelected = selectedStage === stage.key;
                const leads = leadsByStatus[stage.key] || [];

                return (
                  <div 
                    key={stage.key} 
                    className={`group cursor-pointer transition-all rounded-xl p-4 border ${
                      isSelected 
                        ? `${stage.bgColor} ${stage.borderColor}` 
                        : 'border-transparent hover:bg-secondary/30'
                    }`}
                    onClick={() => setSelectedStage(isSelected ? null : stage.key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg ${stage.bgColor} flex items-center justify-center border ${stage.borderColor}`}>
                          <stage.icon className={`w-5 h-5 ${stage.textColor}`} />
                        </div>
                        <div>
                          <span className="text-sm font-medium text-foreground">{stage.label}</span>
                          {stage.key !== 'new' && stage.key !== 'converted' && stage.key !== 'lost' && (
                            <p className="text-xs text-muted-foreground">{fromNewRate}% z nowych</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-foreground">{count}</span>
                        <p className="text-xs text-muted-foreground">
                          {stage.key === 'converted' && count > 0 && `≈ ${count * AVG_CLIENT_VALUE} PLN/mies.`}
                          {stage.key !== 'converted' && 'leadów'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-3 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${stage.color} transition-all duration-700 rounded-full`}
                        style={{ width: `${Math.max(percentage, count > 0 ? 5 : 0)}%` }}
                      />
                    </div>

                    {/* Expanded leads list */}
                    {isSelected && leads.length > 0 && (
                      <div className="mt-4 space-y-2 animate-fade-in">
                        {leads.slice(0, 5).map((lead) => (
                          <div 
                            key={lead.id}
                            className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70 transition-colors border border-border/30"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/leads/${lead.id}`);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full ${
                                lead.priority === 'high' ? 'bg-red-400' : 
                                lead.priority === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                              }`} />
                              <div>
                                <p className="text-sm font-medium text-foreground">{lead.salon_name}</p>
                                {lead.owner_name && (
                                  <p className="text-xs text-muted-foreground">{lead.owner_name}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              {lead.city && (
                                <span className="text-xs text-muted-foreground">{lead.city}</span>
                              )}
                              <p className="text-xs text-muted-foreground/60">
                                {format(new Date(lead.created_at), 'd MMM', { locale: pl })}
                              </p>
                            </div>
                          </div>
                        ))}
                        {leads.length > 5 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="w-full text-muted-foreground"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/leads');
                            }}
                          >
                            Zobacz wszystkie ({leads.length})
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Side Panel - Conversion Rates & Actions */}
          <div className="space-y-6">
            {/* Stage-to-Stage Conversion */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Konwersja między etapami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <span className="text-sm text-muted-foreground">Nowe → Kontakt</span>
                  <span className="font-medium text-yellow-400">{getStageConversion('new', 'contacted')}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <span className="text-sm text-muted-foreground">Kontakt → Follow-up</span>
                  <span className="font-medium text-orange-400">{getStageConversion('contacted', 'follow_up')}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <span className="text-sm text-muted-foreground">Follow-up → Rozmowa</span>
                  <span className="font-medium text-purple-400">{getStageConversion('follow_up', 'rozmowa')}%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <span className="text-sm text-muted-foreground">Rozmowa → Klient</span>
                  <span className="font-medium text-green-400">{getStageConversion('rozmowa', 'converted')}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Szybkie akcje</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30"
                  onClick={() => navigate('/leads')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Nowe leady ({data.new})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30"
                  onClick={() => navigate('/leads')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Do follow-up ({data.follow_up})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30"
                  onClick={() => navigate('/leads')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Rozmowy ({data.rozmowa})
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-border/50 hover:bg-zinc-500/10 hover:text-zinc-400 hover:border-zinc-500/30"
                  onClick={() => navigate('/leads')}
                >
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Brak odpowiedzi ({data.no_response})
                </Button>
              </CardContent>
            </Card>

            {/* Pipeline Value */}
            <Card className="border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-purple-500/10">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Potencjalna wartość pipeline</p>
                <p className="text-3xl font-bold text-pink-400">{metrics.potentialValue.toLocaleString()} PLN</p>
                <p className="text-xs text-muted-foreground mt-1">miesięcznie (przy konwersji {conversionRate}%)</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conversion Flow Visual */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Przepływ konwersji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {stages.slice(0, 4).map((stage, i) => (
                <div key={stage.key} className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-6 py-3 rounded-xl ${stage.bgColor} border ${stage.borderColor} text-center min-w-[120px]`}>
                    <p className={`text-2xl font-bold ${stage.textColor}`}>
                      {data[stage.key as keyof FunnelData]}
                    </p>
                    <p className="text-xs text-muted-foreground">{stage.label}</p>
                  </div>
                  {i < 3 && (
                    <div className="flex flex-col items-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {getStageConversion(stages[i].key, stages[i + 1].key)}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2 flex-shrink-0">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-center min-w-[120px]">
                <p className="text-2xl font-bold text-green-400">{data.converted}</p>
                <p className="text-xs text-muted-foreground">Klienci</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

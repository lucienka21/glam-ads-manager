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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
}

const stages = [
  { key: 'new', label: 'Nowe leady', icon: Users, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400' },
  { key: 'contacted', label: 'Skontaktowano', icon: Mail, color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400' },
  { key: 'follow_up', label: 'Follow-up', icon: MessageSquare, color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400' },
  { key: 'rozmowa', label: 'Rozmowa', icon: Phone, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-500/10', textColor: 'text-purple-400' },
  { key: 'no_response', label: 'Brak odpowiedzi', icon: AlertCircle, color: 'from-zinc-500 to-zinc-600', bgColor: 'bg-zinc-500/10', textColor: 'text-zinc-400' },
  { key: 'converted', label: 'Skonwertowane', icon: CheckCircle, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500/10', textColor: 'text-green-400' },
  { key: 'lost', label: 'Utracone', icon: XCircle, color: 'from-red-500 to-red-600', bgColor: 'bg-red-500/10', textColor: 'text-red-400' },
];

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

  useEffect(() => {
    const fetchData = async () => {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('id, salon_name, owner_name, city, status');

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

        leads.forEach((lead) => {
          // Map old status to new
          let status = lead.status;
          if (status === 'meeting_scheduled') status = 'rozmowa';
          
          if (status in counts) {
            counts[status as keyof FunnelData]++;
          }
          
          if (!byStatus[status]) byStatus[status] = [];
          byStatus[status].push({ ...lead, status });
        });

        setData(counts);
        setLeadsByStatus(byStatus);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const activeTotal = data.new + data.contacted + data.follow_up + data.rozmowa + data.no_response;
  const maxCount = Math.max(...Object.values(data), 1);
  const conversionRate = data.new > 0 ? Math.round((data.converted / data.new) * 100) : 0;

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
            <p className="text-muted-foreground text-sm">Wizualizacja procesu sprzedaży</p>
          </div>
          <Button onClick={() => navigate('/leads')} className="bg-primary hover:bg-primary/90">
            Zobacz wszystkie leady
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Aktywne leady</p>
              <p className="text-3xl font-bold text-foreground mt-1">{activeTotal}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Skonwertowane</p>
              <p className="text-3xl font-bold text-green-400 mt-1">{data.converted}</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Konwersja</p>
              <p className="text-3xl font-bold text-pink-400 mt-1">{conversionRate}%</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Utracone</p>
              <p className="text-3xl font-bold text-red-400 mt-1">{data.lost}</p>
            </CardContent>
          </Card>
        </div>

        {/* Visual Funnel */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Etapy lejka</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stages.map((stage, index) => {
              const count = data[stage.key as keyof FunnelData];
              const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
              const convRate = index === 0 
                ? 100 
                : data.new > 0 
                  ? Math.round((count / data.new) * 100) 
                  : 0;
              const isSelected = selectedStage === stage.key;

              return (
                <div 
                  key={stage.key} 
                  className={`group cursor-pointer transition-all rounded-lg p-3 ${isSelected ? 'bg-zinc-800/50 ring-1 ring-pink-500/30' : 'hover:bg-zinc-800/30'}`}
                  onClick={() => setSelectedStage(isSelected ? null : stage.key)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${stage.bgColor} flex items-center justify-center`}>
                        <stage.icon className={`w-5 h-5 ${stage.textColor}`} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">{stage.label}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {stage.key !== 'new' && stage.key !== 'converted' && stage.key !== 'lost' && (
                            <span>{convRate}% z nowych</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-foreground">{count}</span>
                      <span className="text-sm text-muted-foreground ml-1">leadów</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-3 bg-zinc-800/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${stage.color} transition-all duration-700 rounded-full`}
                      style={{ width: `${Math.max(percentage, count > 0 ? 5 : 0)}%` }}
                    />
                  </div>

                  {/* Expanded leads list */}
                  {isSelected && leadsByStatus[stage.key]?.length > 0 && (
                    <div className="mt-4 space-y-2 animate-fade-in">
                      {leadsByStatus[stage.key].slice(0, 5).map((lead) => (
                        <div 
                          key={lead.id}
                          className="flex items-center justify-between p-2 bg-zinc-900/50 rounded-lg hover:bg-zinc-900 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/leads/${lead.id}`);
                          }}
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{lead.salon_name}</p>
                            {lead.owner_name && (
                              <p className="text-xs text-muted-foreground">{lead.owner_name}</p>
                            )}
                          </div>
                          {lead.city && (
                            <span className="text-xs text-muted-foreground">{lead.city}</span>
                          )}
                        </div>
                      ))}
                      {leadsByStatus[stage.key].length > 5 && (
                        <p className="text-xs text-center text-muted-foreground pt-2">
                          + {leadsByStatus[stage.key].length - 5} więcej
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Conversion Flow */}
        <Card className="border-border/50 bg-card/80">
          <CardHeader>
            <CardTitle className="text-lg">Przepływ konwersji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
              {stages.slice(0, 4).map((stage, i) => (
                <div key={stage.key} className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-4 py-2 rounded-lg ${stage.bgColor} text-center min-w-[100px]`}>
                    <p className={`text-lg font-bold ${stage.textColor}`}>
                      {data[stage.key as keyof FunnelData]}
                    </p>
                    <p className="text-xs text-muted-foreground">{stage.label}</p>
                  </div>
                  {i < 3 && (
                    <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
              <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="px-4 py-2 rounded-lg bg-green-500/10 text-center min-w-[100px]">
                <p className="text-lg font-bold text-green-400">{data.converted}</p>
                <p className="text-xs text-muted-foreground">Klienci</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

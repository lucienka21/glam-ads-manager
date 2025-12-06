import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { 
  ArrowLeft,
  Phone, 
  Mail, 
  MapPin, 
  Instagram,
  Facebook,
  Calendar,
  FileText,
  Loader2,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { LeadInteractionTimeline } from '@/components/leads/LeadInteractionTimeline';

interface Lead {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  facebook_page: string | null;
  status: string;
  priority: string | null;
  source: string | null;
  notes: string | null;
  response: string | null;
  response_date: string | null;
  cold_email_sent: boolean | null;
  cold_email_date: string | null;
  sms_follow_up_sent: boolean | null;
  sms_follow_up_date: string | null;
  email_follow_up_1_sent: boolean | null;
  email_follow_up_1_date: string | null;
  email_follow_up_2_sent: boolean | null;
  email_follow_up_2_date: string | null;
  email_template: string | null;
  email_from: string | null;
  created_at: string;
  last_contact_date: string | null;
  next_follow_up_date: string | null;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  contacted: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  qualified: 'bg-green-500/20 text-green-400 border-green-500/30',
  converted: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  lost: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const statusLabels: Record<string, string> = {
  new: 'Nowy',
  contacted: 'Kontaktowany',
  qualified: 'Zakwalifikowany',
  converted: 'Przekonwertowany',
  lost: 'Utracony',
};

const priorityColors: Record<string, string> = {
  low: 'bg-zinc-500/20 text-zinc-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-red-500/20 text-red-400',
};

const priorityLabels: Record<string, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

export default function LeadProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLeadData();
    }
  }, [id]);

  const fetchLeadData = async () => {
    setLoading(true);
    
    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (leadError) {
      toast.error('Nie znaleziono leada');
      navigate('/leads');
      return;
    }
    setLead(leadData);
    setLoading(false);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }

  if (!lead) return null;

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-2"
          onClick={() => navigate('/leads')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Powrót do leadów
        </Button>

        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Lead Info Card */}
          <Card className="flex-1 border-border/50 bg-card/80">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{lead.salon_name}</CardTitle>
                  {lead.owner_name && (
                    <p className="text-muted-foreground mt-1">{lead.owner_name}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge className={statusColors[lead.status]}>
                    {statusLabels[lead.status]}
                  </Badge>
                  {lead.priority && (
                    <Badge className={priorityColors[lead.priority]}>
                      {priorityLabels[lead.priority]}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {lead.city && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{lead.city}</span>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{lead.email}</span>
                  </div>
                )}
                {lead.instagram && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Instagram className="w-4 h-4" />
                    <span>{lead.instagram}</span>
                  </div>
                )}
                {lead.facebook_page && (
                  <a 
                    href={lead.facebook_page.startsWith('http') ? lead.facebook_page : `https://facebook.com/${lead.facebook_page}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                    <span className="truncate">{lead.facebook_page}</span>
                  </a>
                )}
                {lead.source && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>{lead.source}</span>
                  </div>
                )}
              </div>

              {/* Email Details */}
              {(lead.email_template || lead.email_from) && (
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-3 text-sm">Szczegóły email</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {lead.email_template && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{lead.email_template}</span>
                      </div>
                    )}
                    {lead.email_from && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Send className="w-4 h-4" />
                        <span className="text-sm">{lead.email_from}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {lead.notes && (
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-2 text-sm">Notatki</h4>
                  <p className="text-sm text-muted-foreground">{lead.notes}</p>
                </div>
              )}

              {lead.response && (
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-2 text-sm">Odpowiedź</h4>
                  <p className="text-sm text-muted-foreground">{lead.response}</p>
                  {lead.response_date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(lead.response_date), 'd MMMM yyyy', { locale: pl })}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="lg:w-96 space-y-4">
            {/* Follow-up Sequence */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Sekwencja follow-up
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 py-2">
                {[
                  { sent: lead.cold_email_sent, date: lead.cold_email_date, label: 'Cold Email' },
                  { sent: lead.sms_follow_up_sent, date: lead.sms_follow_up_date, label: 'SMS Follow-up' },
                  { sent: lead.email_follow_up_1_sent, date: lead.email_follow_up_1_date, label: 'Email FU #1' },
                  { sent: lead.email_follow_up_2_sent, date: lead.email_follow_up_2_date, label: 'Email FU #2' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {step.sent ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground shrink-0" />
                    )}
                    <span className="text-sm flex-1">{step.label}</span>
                    {step.date && (
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(step.date), 'd MMM', { locale: pl })}
                      </span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 space-y-3">
                {lead.last_contact_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">Ostatni kontakt</p>
                      <p className="font-medium">{format(new Date(lead.last_contact_date), 'd MMMM yyyy', { locale: pl })}</p>
                    </div>
                  </div>
                )}
                {lead.next_follow_up_date && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-muted-foreground text-xs">Następny follow-up</p>
                      <p className="font-medium text-primary">{format(new Date(lead.next_follow_up_date), 'd MMMM yyyy', { locale: pl })}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm pt-3 border-t border-border/50">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-xs">Utworzono</p>
                    <p className="font-medium">{format(new Date(lead.created_at), 'd MMMM yyyy', { locale: pl })}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact History Timeline - Full Width Below */}
        <LeadInteractionTimeline leadId={lead.id} />
      </div>
    </AppLayout>
  );
}

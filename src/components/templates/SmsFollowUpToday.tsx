import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Phone, Copy, Check, User, MapPin, Loader2, RefreshCw } from 'lucide-react';
import { declineCityToLocative, declineNameToVocative, formatPhoneNumber } from '@/lib/polishDeclension';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface Lead {
  id: string;
  salon_name: string;
  owner_name: string | null;
  city: string | null;
  phone: string | null;
  sms_follow_up_date: string | null;
}

interface SmsTemplate {
  id: string;
  template_name: string;
  content: string;
}

export function SmsFollowUpToday() {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [templates, setTemplates] = useState<SmsTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedPhoneId, setCopiedPhoneId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const today = format(new Date(), 'yyyy-MM-dd');
      
      const [leadsRes, templatesRes] = await Promise.all([
        supabase
          .from('leads')
          .select('id, salon_name, owner_name, city, phone, sms_follow_up_date')
          .eq('sms_follow_up_date', today)
          .not('phone', 'is', null)
          .order('salon_name'),
        supabase
          .from('sms_templates')
          .select('*')
          .order('template_name')
      ]);

      setLeads(leadsRes.data || []);
      setTemplates(templatesRes.data || []);
      
      // Auto-select first template if available
      if (templatesRes.data && templatesRes.data.length > 0 && !selectedTemplate) {
        setSelectedTemplate(templatesRes.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilledTemplate = (lead: Lead): string => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return '';

    let content = template.content;
    
    // Replace placeholders with declined/formatted values
    const ownerFirstName = lead.owner_name?.split(' ')[0] || '';
    const declinedName = declineNameToVocative(ownerFirstName);
    const declinedCity = lead.city ? declineCityToLocative(lead.city) : '';
    
    content = content.replace(/{imie}/gi, declinedName);
    content = content.replace(/{salon}/gi, lead.salon_name || '');
    content = content.replace(/{miasto}/gi, declinedCity);
    content = content.replace(/{owner_name}/gi, declinedName);
    content = content.replace(/{salon_name}/gi, lead.salon_name || '');
    content = content.replace(/{city}/gi, declinedCity);

    return content;
  };

  const copyMessage = async (lead: Lead) => {
    const message = getFilledTemplate(lead);
    await navigator.clipboard.writeText(message);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Skopiowano", description: "Wiadomość skopiowana do schowka" });
  };

  const copyPhone = async (lead: Lead) => {
    if (!lead.phone) return;
    const formatted = formatPhoneNumber(lead.phone);
    await navigator.clipboard.writeText(formatted.replace(/\s/g, ''));
    setCopiedPhoneId(lead.id);
    setTimeout(() => setCopiedPhoneId(null), 2000);
    toast({ title: "Skopiowano", description: "Numer telefonu skopiowany" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Template selector */}
      <div className="flex items-center gap-4">
        <div className="flex-1 max-w-xs">
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz szablon SMS" />
            </SelectTrigger>
            <SelectContent>
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.template_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="icon" onClick={fetchData}>
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Badge variant="secondary" className="gap-1">
          <MessageSquare className="w-3 h-3" />
          {leads.length} na dziś
        </Badge>
      </div>

      {templates.length === 0 && (
        <Card className="border-dashed border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-yellow-500 opacity-50" />
            <p className="text-muted-foreground">
              Brak szablonów SMS. Najpierw utwórz szablon w zakładce "Szablony SMS".
            </p>
          </CardContent>
        </Card>
      )}

      {leads.length === 0 && templates.length > 0 && (
        <Card className="border-dashed border-border/50">
          <CardContent className="p-8 text-center">
            <Check className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-50" />
            <p className="text-muted-foreground">
              Brak leadów z SMS follow-up zaplanowanym na dziś.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Leads list */}
      <div className="grid gap-4">
        {leads.map(lead => (
          <Card key={lead.id} className="hover:shadow-lg transition-all border-border/50 bg-card/80 hover:border-green-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-green-400" />
                    {lead.salon_name}
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    {lead.owner_name && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {lead.owner_name}
                      </span>
                    )}
                    {lead.city && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {lead.city}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-green-500/30 hover:bg-green-500/10"
                    onClick={() => copyPhone(lead)}
                  >
                    {copiedPhoneId === lead.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Phone className="w-4 h-4" />
                    )}
                    {formatPhoneNumber(lead.phone || '')}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedTemplate ? (
                <>
                  <Textarea
                    value={getFilledTemplate(lead)}
                    readOnly
                    className="min-h-[100px] bg-muted/30 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {getFilledTemplate(lead).length} znaków • {Math.ceil(getFilledTemplate(lead).length / 160)} SMS
                    </span>
                    <Button
                      size="sm"
                      className="gap-2 bg-green-600 hover:bg-green-700"
                      onClick={() => copyMessage(lead)}
                    >
                      {copiedId === lead.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Skopiowano
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopiuj wiadomość
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  Wybierz szablon SMS, aby zobaczyć wypełnioną wiadomość
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  Sparkles,
  Loader2,
  Target,
  Users,
  FileText,
  Copy,
  Image as ImageIcon,
  Wand2,
  CheckCircle2,
  Lightbulb,
  DollarSign,
} from 'lucide-react';

interface Client {
  id: string;
  salon_name: string;
  city: string | null;
  industry: string | null;
  monthly_budget: number | null;
}

interface CampaignData {
  strategy?: {
    objective: string;
    targetAudience: string;
    budget_allocation: string;
    timeline: string;
  };
  adSets?: Array<{
    name: string;
    audience: string;
    placement: string;
  }>;
  posts?: Array<{
    type: string;
    headline: string;
    primaryText: string;
    description: string;
    cta: string;
    imageIdea: string;
  }>;
  copyVariants?: Array<{
    style: string;
    text: string;
  }>;
  recommendations?: string[];
  rawContent?: string;
}

const objectives = [
  'Generowanie leadów',
  'Rezerwacje online',
  'Świadomość marki',
  'Ruch na stronie',
  'Wiadomości',
];

const industries = [
  'Fryzjerstwo',
  'Kosmetyka',
  'Paznokcie',
  'Spa & Wellness',
  'Barber',
  'Makijaż',
  'Brwi i rzęsy',
];

export default function CampaignGenerator() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  
  const [formData, setFormData] = useState({
    clientName: '',
    industry: '',
    city: '',
    budget: '',
    objective: '',
    targetAudience: '',
    services: '',
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase
      .from('clients')
      .select('id, salon_name, city, industry, monthly_budget')
      .order('salon_name');
    setClients(data || []);
  };

  const handleClientSelect = (clientId: string) => {
    setSelectedClient(clientId);
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setFormData(prev => ({
        ...prev,
        clientName: client.salon_name,
        city: client.city || '',
        industry: client.industry || '',
        budget: client.monthly_budget?.toString() || '',
      }));
    }
  };

  const generateCampaign = async () => {
    if (!formData.clientName || !formData.industry) {
      toast.error('Wypełnij nazwę klienta i branżę');
      return;
    }

    setLoading(true);
    setCampaign(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-campaign', {
        body: formData,
      });

      if (error) throw error;

      if (data?.campaign) {
        setCampaign(data.campaign);
        toast.success('Kampania wygenerowana!');
      }
    } catch (err: any) {
      console.error('Error generating campaign:', err);
      toast.error(err.message || 'Błąd generowania kampanii');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Skopiowano do schowka');
  };

  const styleLabels: Record<string, string> = {
    emotional: 'Emocjonalny',
    benefit: 'Korzyści',
    urgency: 'Pilność',
    social_proof: 'Dowód społeczny',
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Generator Kampanii AI
            </h1>
            <p className="text-muted-foreground text-sm">
              Generuj strategie, posty i teksty reklamowe
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <Card className="lg:col-span-1 bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Dane kampanii</CardTitle>
              <CardDescription>Wypełnij informacje o kliencie</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Wybierz klienta (opcjonalnie)</Label>
                <Select value={selectedClient} onValueChange={handleClientSelect}>
                  <SelectTrigger className="form-input-elegant">
                    <SelectValue placeholder="Wybierz z listy..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.salon_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Nazwa salonu *</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="np. Beauty Studio"
                  className="form-input-elegant"
                />
              </div>

              <div>
                <Label>Branża *</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(v) => setFormData(prev => ({ ...prev, industry: v }))}
                >
                  <SelectTrigger className="form-input-elegant">
                    <SelectValue placeholder="Wybierz branżę" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map(ind => (
                      <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Miasto</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="np. Warszawa"
                  className="form-input-elegant"
                />
              </div>

              <div>
                <Label>Budżet miesięczny (PLN)</Label>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                  placeholder="np. 2000"
                  className="form-input-elegant"
                />
              </div>

              <div>
                <Label>Cel kampanii</Label>
                <Select 
                  value={formData.objective} 
                  onValueChange={(v) => setFormData(prev => ({ ...prev, objective: v }))}
                >
                  <SelectTrigger className="form-input-elegant">
                    <SelectValue placeholder="Wybierz cel" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives.map(obj => (
                      <SelectItem key={obj} value={obj}>{obj}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Grupa docelowa</Label>
                <Textarea
                  value={formData.targetAudience}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                  placeholder="np. Kobiety 25-45 lat, zainteresowane pielęgnacją..."
                  className="form-input-elegant"
                  rows={2}
                />
              </div>

              <div>
                <Label>Główne usługi</Label>
                <Textarea
                  value={formData.services}
                  onChange={(e) => setFormData(prev => ({ ...prev, services: e.target.value }))}
                  placeholder="np. Manicure, pedicure, stylizacja paznokci..."
                  className="form-input-elegant"
                  rows={2}
                />
              </div>

              <Button 
                onClick={generateCampaign} 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generowanie...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generuj kampanię
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="lg:col-span-2">
            {loading && (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-12 flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                  <p className="text-muted-foreground">AI generuje strategię kampanii...</p>
                  <p className="text-sm text-muted-foreground/70">To może zająć do 30 sekund</p>
                </CardContent>
              </Card>
            )}

            {!loading && !campaign && (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-16 h-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Wygeneruj kampanię AI
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Wypełnij formularz po lewej stronie i kliknij "Generuj kampanię", 
                    aby otrzymać kompletną strategię z postami i tekstami.
                  </p>
                </CardContent>
              </Card>
            )}

            {campaign && !campaign.rawContent && (
              <Tabs defaultValue="strategy" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-muted/30">
                  <TabsTrigger value="strategy" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="hidden sm:inline">Strategia</span>
                  </TabsTrigger>
                  <TabsTrigger value="adsets" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="hidden sm:inline">Zestawy</span>
                  </TabsTrigger>
                  <TabsTrigger value="posts" className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Posty</span>
                  </TabsTrigger>
                  <TabsTrigger value="copy" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Teksty</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="strategy" className="mt-4 space-y-4">
                  {campaign.strategy && (
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="w-5 h-5 text-primary" />
                          Strategia kampanii
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="text-muted-foreground">Cel</Label>
                          <p className="text-foreground">{campaign.strategy.objective}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Grupa docelowa</Label>
                          <p className="text-foreground">{campaign.strategy.targetAudience}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Podział budżetu</Label>
                          <p className="text-foreground">{campaign.strategy.budget_allocation}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground">Harmonogram</Label>
                          <p className="text-foreground">{campaign.strategy.timeline}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {campaign.recommendations && campaign.recommendations.length > 0 && (
                    <Card className="bg-card/50 border-border/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-yellow-500" />
                          Rekomendacje
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {campaign.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                              <span className="text-foreground text-sm">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="adsets" className="mt-4 space-y-4">
                  {campaign.adSets?.map((adSet, idx) => (
                    <Card key={idx} className="bg-card/50 border-border/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {adSet.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <Label className="text-muted-foreground text-xs">Odbiorcy</Label>
                          <p className="text-foreground text-sm">{adSet.audience}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-xs">Umiejscowienie</Label>
                          <p className="text-foreground text-sm">{adSet.placement}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="posts" className="mt-4 space-y-4">
                  {campaign.posts?.map((post, idx) => (
                    <Card key={idx} className="bg-card/50 border-border/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-primary" />
                            Post {idx + 1}
                          </CardTitle>
                          <Badge variant="outline">{post.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <Label className="text-muted-foreground text-xs">Nagłówek</Label>
                          <p className="text-foreground font-medium">{post.headline}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-xs">Tekst główny</Label>
                          <p className="text-foreground text-sm">{post.primaryText}</p>
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-xs">Opis</Label>
                          <p className="text-foreground text-sm">{post.description}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-primary/20 text-primary">{post.cta}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(`${post.headline}\n\n${post.primaryText}\n\n${post.description}`)}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Kopiuj
                          </Button>
                        </div>
                        <div className="pt-2 border-t border-border/50">
                          <Label className="text-muted-foreground text-xs">Pomysł na grafikę</Label>
                          <p className="text-foreground text-sm italic">{post.imageIdea}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="copy" className="mt-4 space-y-4">
                  {campaign.copyVariants?.map((variant, idx) => (
                    <Card key={idx} className="bg-card/50 border-border/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            Wariant {idx + 1}
                          </CardTitle>
                          <Badge variant="outline">
                            {styleLabels[variant.style] || variant.style}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground whitespace-pre-wrap">{variant.text}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-3"
                          onClick={() => copyToClipboard(variant.text)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Kopiuj tekst
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            )}

            {campaign?.rawContent && (
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Wygenerowana kampania</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm text-foreground">
                    {campaign.rawContent}
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MessageSquare, Plus, MoreVertical, Edit, Trash2, Copy, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface SmsTemplate {
  id: string;
  template_name: string;
  content: string;
  created_by: string | null;
  created_at: string;
}

const placeholders = [
  { key: '{imie}', desc: 'Imię właściciela' },
  { key: '{salon}', desc: 'Nazwa salonu' },
  { key: '{miasto}', desc: 'Miasto' },
];

export default function SmsTemplates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<SmsTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SmsTemplate | null>(null);
  const [formData, setFormData] = useState({
    template_name: '',
    content: '',
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('sms_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTemplates(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.template_name || !formData.content) {
      toast.error('Wypełnij wszystkie pola');
      return;
    }

    if (editingTemplate) {
      const { error } = await supabase
        .from('sms_templates')
        .update({
          template_name: formData.template_name,
          content: formData.content,
        })
        .eq('id', editingTemplate.id);

      if (error) {
        toast.error('Błąd podczas aktualizacji');
      } else {
        toast.success('Szablon zaktualizowany');
      }
    } else {
      const { error } = await supabase.from('sms_templates').insert({
        template_name: formData.template_name,
        content: formData.content,
        created_by: user?.id,
      });

      if (error) {
        toast.error('Błąd podczas dodawania');
      } else {
        toast.success('Szablon dodany');
      }
    }

    setIsAddDialogOpen(false);
    setEditingTemplate(null);
    setFormData({ template_name: '', content: '' });
    fetchTemplates();
  };

  const handleEdit = (template: SmsTemplate) => {
    setEditingTemplate(template);
    setFormData({
      template_name: template.template_name,
      content: template.content,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('sms_templates').delete().eq('id', id);
    if (error) {
      toast.error('Błąd podczas usuwania');
    } else {
      toast.success('Szablon usunięty');
      fetchTemplates();
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Skopiowano do schowka');
  };

  const insertPlaceholder = (placeholder: string) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content + placeholder,
    }));
  };

  const charCount = formData.content.length;
  const smsCount = Math.ceil(charCount / 160) || 1;

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
              <MessageSquare className="w-6 h-6 text-green-400" />
              Szablony SMS
            </h1>
            <p className="text-muted-foreground text-sm">Zarządzaj szablonami wiadomości SMS</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
            setIsAddDialogOpen(open);
            if (!open) {
              setEditingTemplate(null);
              setFormData({ template_name: '', content: '' });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Nowy szablon
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingTemplate ? 'Edytuj szablon' : 'Nowy szablon SMS'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nazwa szablonu</label>
                  <Input
                    placeholder="np. Follow-up po rozmowie"
                    value={formData.template_name}
                    onChange={(e) => setFormData({ ...formData, template_name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-muted-foreground">Treść wiadomości</label>
                    <span className={`text-xs ${charCount > 160 ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                      {charCount}/160 ({smsCount} SMS)
                    </span>
                  </div>
                  <Textarea
                    placeholder="Cześć {imie}, dziękuję za rozmowę..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={5}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Wstaw placeholder</label>
                  <div className="flex flex-wrap gap-2">
                    {placeholders.map((p) => (
                      <Button
                        key={p.key}
                        variant="outline"
                        size="sm"
                        onClick={() => insertPlaceholder(p.key)}
                        className="text-xs"
                      >
                        {p.key}
                        <span className="text-muted-foreground ml-1">({p.desc})</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {formData.content && (
                  <div className="p-3 bg-secondary/50 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Podgląd:</p>
                    <p className="text-sm">{formData.content}</p>
                  </div>
                )}

                <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700">
                  {editingTemplate ? 'Zapisz zmiany' : 'Dodaj szablon'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">Brak szablonów SMS</p>
              <p className="text-muted-foreground mb-4">Dodaj pierwszy szablon, aby przyspieszyć komunikację z leadami</p>
              <Button onClick={() => setIsAddDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj szablon
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="border-border/50 bg-card/80 hover:border-green-500/30 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-medium">{template.template_name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCopy(template.content)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Kopiuj treść
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(template)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(template.id)}
                          className="text-red-400 focus:text-red-400"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Usuń
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{template.content}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{template.content.length} znaków</span>
                    <span>{format(new Date(template.created_at), 'd MMM yyyy', { locale: pl })}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

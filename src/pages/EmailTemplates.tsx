import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Mail } from 'lucide-react';
import { emailTemplateSchema } from '@/lib/validationSchemas';

interface EmailTemplate {
  id: string;
  template_name: string;
  subject: string;
  body: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export default function EmailTemplates() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [formData, setFormData] = useState({
    template_name: '',
    subject: '',
    body: ''
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('template_name');

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się pobrać szablonów",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data with Zod
    const validationResult = emailTemplateSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Błąd walidacji",
        description: firstError.message,
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingTemplate) {
        const { error } = await supabase
          .from('email_templates')
          .update({
            template_name: formData.template_name,
            subject: formData.subject,
            body: formData.body
          })
          .eq('id', editingTemplate.id);

        if (error) throw error;

        toast({
          title: "Sukces",
          description: "Szablon został zaktualizowany"
        });
      } else {
        const { error } = await supabase
          .from('email_templates')
          .insert({
            template_name: formData.template_name,
            subject: formData.subject,
            body: formData.body,
            created_by: user?.id
          });

        if (error) throw error;

        toast({
          title: "Sukces",
          description: "Szablon został utworzony"
        });
      }

      setIsDialogOpen(false);
      setEditingTemplate(null);
      setFormData({ template_name: '', subject: '', body: '' });
      fetchTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się zapisać szablonu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten szablon?')) return;

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sukces",
        description: "Szablon został usunięty"
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Błąd",
        description: "Nie udało się usunąć szablonu",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setFormData({
      template_name: template.template_name,
      subject: template.subject,
      body: template.body
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingTemplate(null);
    setFormData({ template_name: '', subject: '', body: '' });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">Ładowanie...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
            Szablony Cold Maili
          </h1>
          <p className="text-muted-foreground">
            Zarządzaj szablonami wiadomości email dla leadów
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Nowy szablon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingTemplate ? 'Edytuj szablon' : 'Nowy szablon'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="template_name">Nazwa szablonu</Label>
                <Input
                  id="template_name"
                  value={formData.template_name}
                  onChange={(e) => setFormData({ ...formData, template_name: e.target.value })}
                  placeholder="np. szablon1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="subject">Temat wiadomości</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Temat email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="body">Treść wiadomości</Label>
                <Textarea
                  id="body"
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  placeholder="Treść email..."
                  rows={10}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button type="submit">
                  {editingTemplate ? 'Zapisz zmiany' : 'Utwórz szablon'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {templates.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Brak szablonów. Utwórz pierwszy szablon email.</p>
          </Card>
        ) : (
          templates.map((template) => (
            <Card key={template.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{template.template_name}</h3>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Temat: {template.subject}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.body}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => openEditDialog(template)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      </div>
    </AppLayout>
  );
}

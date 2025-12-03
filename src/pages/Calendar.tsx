import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Phone, MessageSquare, Users, CheckCircle, Star, Loader2, Trash2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import { toast } from 'sonner';

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  start_date: string;
  end_date: string | null;
  all_day: boolean;
  lead_id: string | null;
  client_id: string | null;
  color: string;
  created_by: string;
}

interface Lead {
  id: string;
  salon_name: string;
  next_follow_up_date: string | null;
}

interface Client {
  id: string;
  salon_name: string;
}

const eventTypes = [
  { value: 'follow_up', label: 'Follow-up', icon: MessageSquare, color: 'bg-orange-500' },
  { value: 'meeting', label: 'Spotkanie', icon: Users, color: 'bg-purple-500' },
  { value: 'call', label: 'Rozmowa', icon: Phone, color: 'bg-blue-500' },
  { value: 'task', label: 'Zadanie', icon: CheckCircle, color: 'bg-green-500' },
  { value: 'custom', label: 'Własne', icon: Star, color: 'bg-pink-500' },
];

const colorOptions = [
  { value: 'pink', label: 'Różowy', class: 'bg-pink-500' },
  { value: 'blue', label: 'Niebieski', class: 'bg-blue-500' },
  { value: 'green', label: 'Zielony', class: 'bg-green-500' },
  { value: 'orange', label: 'Pomarańczowy', class: 'bg-orange-500' },
  { value: 'purple', label: 'Fioletowy', class: 'bg-purple-500' },
];

export default function Calendar() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_type: 'custom',
    start_date: '',
    start_time: '09:00',
    end_time: '10:00',
    all_day: false,
    lead_id: 'none',
    client_id: 'none',
    color: 'pink',
  });

  useEffect(() => {
    fetchData();
  }, [currentMonth]);

  const fetchData = async () => {
    setLoading(true);
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    const [eventsRes, leadsRes, clientsRes] = await Promise.all([
      supabase
        .from('calendar_events')
        .select('*')
        .gte('start_date', monthStart.toISOString())
        .lte('start_date', monthEnd.toISOString())
        .order('start_date', { ascending: true }),
      supabase
        .from('leads')
        .select('id, salon_name, next_follow_up_date')
        .not('status', 'in', '("converted","lost")'),
      supabase
        .from('clients')
        .select('id, salon_name'),
    ]);

    if (eventsRes.data) {
      // Add follow-up events from leads
      const leadFollowUps: CalendarEvent[] = (leadsRes.data || [])
        .filter(lead => lead.next_follow_up_date)
        .map(lead => ({
          id: `lead-${lead.id}`,
          title: `Follow-up: ${lead.salon_name}`,
          description: null,
          event_type: 'follow_up',
          start_date: lead.next_follow_up_date!,
          end_date: null,
          all_day: true,
          lead_id: lead.id,
          client_id: null,
          color: 'orange',
          created_by: '',
        }));

      setEvents([...eventsRes.data, ...leadFollowUps]);
    }
    if (leadsRes.data) setLeads(leadsRes.data);
    if (clientsRes.data) setClients(clientsRes.data);
    setLoading(false);
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.start_date || !user) {
      toast.error('Wypełnij wymagane pola (tytuł i data)');
      return;
    }

    setSubmitting(true);

    const startDateTime = newEvent.all_day 
      ? `${newEvent.start_date}T00:00:00`
      : `${newEvent.start_date}T${newEvent.start_time}:00`;
    
    const endDateTime = newEvent.all_day
      ? null
      : `${newEvent.start_date}T${newEvent.end_time}:00`;

    const eventData = {
      title: newEvent.title,
      description: newEvent.description || null,
      event_type: newEvent.event_type,
      start_date: startDateTime,
      end_date: endDateTime,
      all_day: newEvent.all_day,
      lead_id: newEvent.lead_id !== 'none' ? newEvent.lead_id : null,
      client_id: newEvent.client_id !== 'none' ? newEvent.client_id : null,
      color: newEvent.color,
      created_by: user.id,
    };

    const { error } = await supabase.from('calendar_events').insert(eventData);

    if (error) {
      console.error('Calendar event error:', error);
      toast.error('Błąd podczas dodawania wydarzenia');
    } else {
      toast.success('Wydarzenie dodane');
      setIsAddDialogOpen(false);
      setNewEvent({
        title: '',
        description: '',
        event_type: 'custom',
        start_date: '',
        start_time: '09:00',
        end_time: '10:00',
        all_day: false,
        lead_id: 'none',
        client_id: 'none',
        color: 'pink',
      });
      fetchData();
    }
    setSubmitting(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (eventId.startsWith('lead-')) {
      toast.error('Nie można usunąć automatycznych follow-upów');
      return;
    }

    const { error } = await supabase.from('calendar_events').delete().eq('id', eventId);
    if (error) {
      toast.error('Błąd podczas usuwania');
    } else {
      toast.success('Wydarzenie usunięte');
      fetchData();
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.start_date);
      return isSameDay(eventDate, day);
    });
  };

  const getEventColor = (event: CalendarEvent) => {
    const colorMap: Record<string, string> = {
      pink: 'bg-pink-500/20 border-pink-500/50 text-pink-400',
      blue: 'bg-blue-500/20 border-blue-500/50 text-blue-400',
      green: 'bg-green-500/20 border-green-500/50 text-green-400',
      orange: 'bg-orange-500/20 border-orange-500/50 text-orange-400',
      purple: 'bg-purple-500/20 border-purple-500/50 text-purple-400',
    };
    return colorMap[event.color] || colorMap.pink;
  };

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setNewEvent(prev => ({
      ...prev,
      start_date: format(day, 'yyyy-MM-dd'),
    }));
  };

  const getClientName = (clientId: string | null) => {
    if (!clientId) return null;
    const client = clients.find(c => c.id === clientId);
    return client?.salon_name;
  };

  const getLeadName = (leadId: string | null) => {
    if (!leadId) return null;
    const lead = leads.find(l => l.id === leadId);
    return lead?.salon_name;
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
              <CalendarIcon className="w-6 h-6 text-pink-400" />
              Kalendarz
            </h1>
            <p className="text-muted-foreground text-sm">Planuj spotkania, rozmowy i follow-upy</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Dodaj wydarzenie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Nowe wydarzenie</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  placeholder="Tytuł wydarzenia *"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Opis (opcjonalnie)"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  rows={2}
                />
                <Select value={newEvent.event_type} onValueChange={(v) => setNewEvent({ ...newEvent, event_type: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Typ wydarzenia" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className="w-4 h-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="date"
                  value={newEvent.start_date}
                  onChange={(e) => setNewEvent({ ...newEvent, start_date: e.target.value })}
                />
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={newEvent.all_day}
                      onChange={(e) => setNewEvent({ ...newEvent, all_day: e.target.checked })}
                      className="rounded"
                    />
                    Cały dzień
                  </label>
                </div>
                {!newEvent.all_day && (
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="time"
                      value={newEvent.start_time}
                      onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                    />
                    <Input
                      type="time"
                      value={newEvent.end_time}
                      onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                    />
                  </div>
                )}
                <Select value={newEvent.client_id} onValueChange={(v) => setNewEvent({ ...newEvent, client_id: v, lead_id: 'none' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Powiąż z klientem (opcjonalnie)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Brak klienta</SelectItem>
                    {clients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>{client.salon_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={newEvent.lead_id} onValueChange={(v) => setNewEvent({ ...newEvent, lead_id: v, client_id: 'none' })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Powiąż z leadem (opcjonalnie)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Brak leada</SelectItem>
                    {leads.map((lead) => (
                      <SelectItem key={lead.id} value={lead.id}>{lead.salon_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setNewEvent({ ...newEvent, color: color.value })}
                      className={`w-8 h-8 rounded-full ${color.class} ${newEvent.color === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`}
                    />
                  ))}
                </div>
                <Button onClick={handleAddEvent} className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Dodaj wydarzenie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <Card className="lg:col-span-3 border-border/50 bg-card/80">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <CardTitle className="text-xl">
                  {format(currentMonth, 'LLLL yyyy', { locale: pl })}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'].map((day) => (
                  <div key={day} className="text-center text-xs text-muted-foreground font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month start */}
                {Array.from({ length: (days[0].getDay() + 6) % 7 }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                
                {days.map((day) => {
                  const dayEvents = getEventsForDay(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <div
                      key={day.toISOString()}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square p-1 border rounded-lg cursor-pointer transition-all overflow-hidden ${
                        isToday(day)
                          ? 'bg-pink-500/20 border-pink-500/50'
                          : isSelected
                          ? 'bg-secondary border-primary/50'
                          : 'border-border/30 hover:border-border/60 hover:bg-secondary/30'
                      }`}
                    >
                      <div className={`text-xs font-medium mb-0.5 ${isToday(day) ? 'text-pink-400' : 'text-foreground'}`}>
                        {format(day, 'd')}
                      </div>
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`text-[10px] px-1 py-0.5 rounded truncate border ${getEventColor(event)}`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-[10px] text-muted-foreground text-center">
                            +{dayEvents.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <div className="space-y-4">
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: pl }) : 'Wybierz dzień'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-2">
                    {getEventsForDay(selectedDate).length === 0 ? (
                      <p className="text-sm text-muted-foreground">Brak wydarzeń</p>
                    ) : (
                      getEventsForDay(selectedDate).map((event) => (
                        <div
                          key={event.id}
                          className={`p-3 rounded-lg border ${getEventColor(event)}`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">{event.title}</p>
                              {event.description && (
                                <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                              )}
                              {!event.all_day && event.end_date && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {format(parseISO(event.start_date), 'HH:mm')} - {format(parseISO(event.end_date), 'HH:mm')}
                                </p>
                              )}
                              {event.client_id && (
                                <p className="text-xs text-blue-400 mt-1">
                                  Klient: {getClientName(event.client_id)}
                                </p>
                              )}
                              {event.lead_id && !event.id.startsWith('lead-') && (
                                <p className="text-xs text-orange-400 mt-1">
                                  Lead: {getLeadName(event.lead_id)}
                                </p>
                              )}
                            </div>
                            {!event.id.startsWith('lead-') && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      onClick={() => setIsAddDialogOpen(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Dodaj wydarzenie
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Kliknij na dzień, aby zobaczyć wydarzenia</p>
                )}
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="border-border/50 bg-card/80">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {eventTypes.map((type) => (
                  <div key={type.value} className="flex items-center gap-2 text-sm">
                    <div className={`w-3 h-3 rounded-full ${type.color}`} />
                    <type.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{type.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

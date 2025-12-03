import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Settings as SettingsIcon, Bell, Volume2, Moon, Sun, Monitor, Save } from 'lucide-react';

interface AppSettings {
  notificationSound: boolean;
  notificationVolume: number;
  soundType: string;
  theme: string;
  compactMode: boolean;
  showStatusIndicators: boolean;
  autoRefreshInterval: number;
  defaultLeadView: 'list' | 'kanban';
}

const defaultSettings: AppSettings = {
  notificationSound: true,
  notificationVolume: 50,
  soundType: 'default',
  theme: 'dark',
  compactMode: false,
  showStatusIndicators: true,
  autoRefreshInterval: 30,
  defaultLeadView: 'list',
};

const soundOptions = [
  { value: 'default', label: 'Domyślny' },
  { value: 'chime', label: 'Dzwonek' },
  { value: 'pop', label: 'Pop' },
  { value: 'ding', label: 'Ding' },
];

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('app_settings');
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
  }, []);

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    setHasChanges(false);
    toast.success('Ustawienia zapisane');
    
    // Dispatch event for other components to react
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: settings }));
  };

  const playTestSound = () => {
    const audio = new Audio();
    const soundUrl = getSoundUrl(settings.soundType);
    audio.src = soundUrl;
    audio.volume = settings.notificationVolume / 100;
    audio.play().catch(() => {
      // Fallback to Web Audio API beep
      playBeep(settings.notificationVolume / 100, settings.soundType);
    });
  };

  const getSoundUrl = (type: string) => {
    // Using data URLs for sounds (simple beeps)
    return '';
  };

  const playBeep = (volume: number, type: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different sound types
      const frequencies: Record<string, number> = {
        default: 800,
        chime: 1200,
        pop: 600,
        ding: 1000,
      };
      
      oscillator.frequency.value = frequencies[type] || 800;
      oscillator.type = type === 'chime' ? 'sine' : type === 'pop' ? 'triangle' : 'square';
      
      gainNode.gain.setValueAtTime(volume * 0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.error('Could not play sound:', e);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <SettingsIcon className="w-6 h-6 text-pink-400" />
              Ustawienia
            </h1>
            <p className="text-muted-foreground mt-1">Dostosuj aplikację do swoich preferencji</p>
          </div>
          {hasChanges && (
            <Button onClick={saveSettings} className="bg-pink-500 hover:bg-pink-600">
              <Save className="w-4 h-4 mr-2" />
              Zapisz zmiany
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Notification Settings */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-pink-400" />
                Powiadomienia
              </CardTitle>
              <CardDescription>Ustawienia dźwięków i powiadomień</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dźwięki powiadomień</Label>
                  <p className="text-xs text-muted-foreground">Odtwarzaj dźwięk przy nowych powiadomieniach</p>
                </div>
                <Switch
                  checked={settings.notificationSound}
                  onCheckedChange={(checked) => updateSetting('notificationSound', checked)}
                />
              </div>

              {settings.notificationSound && (
                <>
                  <div className="space-y-3">
                    <Label>Rodzaj dźwięku</Label>
                    <Select
                      value={settings.soundType}
                      onValueChange={(value) => updateSetting('soundType', value)}
                    >
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {soundOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Głośność</Label>
                      <span className="text-sm text-muted-foreground">{settings.notificationVolume}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <Slider
                        value={[settings.notificationVolume]}
                        onValueChange={([value]) => updateSetting('notificationVolume', value)}
                        max={100}
                        step={5}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <Button variant="outline" onClick={playTestSound} className="w-full">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Testuj dźwięk
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Monitor className="w-5 h-5 text-pink-400" />
                Wygląd
              </CardTitle>
              <CardDescription>Personalizuj wygląd interfejsu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Motyw</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Ciemny
                      </div>
                    </SelectItem>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Jasny
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4" />
                        Systemowy
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tryb kompaktowy</Label>
                  <p className="text-xs text-muted-foreground">Zmniejsz odstępy między elementami</p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Wskaźniki statusu</Label>
                  <p className="text-xs text-muted-foreground">Pokaż statusy online/offline</p>
                </div>
                <Switch
                  checked={settings.showStatusIndicators}
                  onCheckedChange={(checked) => updateSetting('showStatusIndicators', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Behavior Settings */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg">Zachowanie</CardTitle>
              <CardDescription>Dostosuj działanie aplikacji</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Domyślny widok leadów</Label>
                <Select
                  value={settings.defaultLeadView}
                  onValueChange={(value: 'list' | 'kanban') => updateSetting('defaultLeadView', value)}
                >
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="list">Lista</SelectItem>
                    <SelectItem value="kanban">Kanban</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Automatyczne odświeżanie</Label>
                  <span className="text-sm text-muted-foreground">{settings.autoRefreshInterval}s</span>
                </div>
                <Slider
                  value={[settings.autoRefreshInterval]}
                  onValueChange={([value]) => updateSetting('autoRefreshInterval', value)}
                  min={10}
                  max={120}
                  step={10}
                />
                <p className="text-xs text-muted-foreground">
                  Częstotliwość odświeżania danych w tle
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

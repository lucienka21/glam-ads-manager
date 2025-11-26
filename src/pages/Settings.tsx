import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Ustawienia</h1>
        <p className="text-muted-foreground mt-2">Zarządzaj konfiguracją systemu</p>
      </div>

      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-2xl">⚙️</span>
          </div>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Panel ustawień</h2>
          <p className="text-muted-foreground">
            Wkrótce dostępne będą opcje konfiguracji profilu, integracji i preferencji.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;

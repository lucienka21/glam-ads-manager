import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const clients = [
    {
      name: "Spa Paradise",
      type: "Spa & Wellness",
      activeKampanii: 3,
      budget: "12,500 zł/mies.",
      roi: "5.8x",
      status: "Aktywny",
    },
    {
      name: "Beauty Salon Luna",
      type: "Salon piękności",
      activeKampanii: 2,
      budget: "8,200 zł/mies.",
      roi: "4.9x",
      status: "Aktywny",
    },
    {
      name: "Nails Studio Pro",
      type: "Studio paznokci",
      activeKampanii: 2,
      budget: "6,800 zł/mies.",
      roi: "4.2x",
      status: "Aktywny",
    },
    {
      name: "Hair & Beauty Center",
      type: "Salon fryzjerski",
      activeKampanii: 1,
      budget: "4,500 zł/mies.",
      roi: "3.8x",
      status: "Pauza",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Klienci</h1>
          <p className="text-muted-foreground mt-2">Zarządzaj bazą klientów beauty</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4 mr-2" />
          Dodaj klienta
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="Szukaj klientów..." 
            className="pl-10"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client, index) => (
          <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                client.status === "Aktywny" 
                  ? "bg-success/10 text-success" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {client.status}
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-2xl font-bold text-foreground">{client.activeKampanii}</p>
                <p className="text-xs text-muted-foreground">Kampanie</p>
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {client.roi}
                </p>
                <p className="text-xs text-muted-foreground">ROI</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{client.budget}</p>
                <p className="text-xs text-muted-foreground">Budżet</p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6">
              Zobacz szczegóły
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;

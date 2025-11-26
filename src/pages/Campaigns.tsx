import { Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Campaigns = () => {
  const campaigns = [
    {
      name: "Beauty Salon Luna - Spring Promo",
      client: "Salon Luna",
      status: "Aktywna",
      reach: "125,340",
      clicks: "4,021",
      ctr: "3.21%",
      spent: "2,450 zł",
      conversions: 156,
    },
    {
      name: "Nails Studio - New Services Launch",
      client: "Nails Studio Pro",
      status: "Aktywna",
      reach: "89,230",
      clicks: "2,498",
      ctr: "2.80%",
      spent: "1,820 zł",
      conversions: 94,
    },
    {
      name: "Spa Paradise - Valentine's Special",
      client: "Spa Paradise",
      status: "Zakończona",
      reach: "210,590",
      clicks: "8,634",
      ctr: "4.10%",
      spent: "4,200 zł",
      conversions: 278,
    },
    {
      name: "Hair & Beauty - Summer Collection",
      client: "Hair & Beauty Center",
      status: "Planowana",
      reach: "-",
      clicks: "-",
      ctr: "-",
      spent: "0 zł",
      conversions: 0,
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kampanie</h1>
          <p className="text-muted-foreground mt-2">Monitoruj efektywność kampanii Facebook Ads</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtruj
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Nowa kampania
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <Card key={index} className="p-6 hover:shadow-elegant transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{campaign.name}</h3>
                <p className="text-sm text-muted-foreground">{campaign.client}</p>
              </div>
              <Badge 
                className={
                  campaign.status === "Aktywna" 
                    ? "bg-success/10 text-success hover:bg-success/20" 
                    : campaign.status === "Planowana"
                    ? "bg-accent/10 text-accent-foreground hover:bg-accent/20"
                    : "bg-muted text-muted-foreground"
                }
              >
                {campaign.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              <div>
                <p className="text-2xl font-bold text-foreground">{campaign.reach}</p>
                <p className="text-xs text-muted-foreground mt-1">Zasięg</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{campaign.clicks}</p>
                <p className="text-xs text-muted-foreground mt-1">Kliknięcia</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{campaign.ctr}</p>
                <p className="text-xs text-muted-foreground mt-1">CTR</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{campaign.conversions}</p>
                <p className="text-xs text-muted-foreground mt-1">Konwersje</p>
              </div>
              <div>
                <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {campaign.spent}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Wydane</p>
              </div>
              <div className="flex items-center">
                <Button variant="outline" className="w-full">
                  Szczegóły
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;

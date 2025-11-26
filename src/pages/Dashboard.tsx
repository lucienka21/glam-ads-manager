import { TrendingUp, Users, Target, DollarSign } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      title: "Całkowity zasięg",
      value: "1.2M",
      change: "+15% vs. ostatni miesiąc",
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "Aktywni klienci",
      value: "24",
      change: "+3 nowi w tym miesiącu",
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Kampanie w toku",
      value: "18",
      change: "5 zakończonych w tym tygodniu",
      icon: Target,
      trend: "up" as const,
    },
    {
      title: "ROI średnie",
      value: "4.2x",
      change: "+0.5x vs. ostatni kwartał",
      icon: DollarSign,
      trend: "up" as const,
    },
  ];

  const recentCampaigns = [
    { name: "Beauty Salon Luna - Spring Promo", client: "Salon Luna", status: "Aktywna", reach: "125K", ctr: "3.2%" },
    { name: "Nails Studio - New Services", client: "Nails Studio Pro", status: "Aktywna", reach: "89K", ctr: "2.8%" },
    { name: "Spa Paradise - Valentine's", client: "Spa Paradise", status: "Zakończona", reach: "210K", ctr: "4.1%" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Przegląd wydajności twoich kampanii</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Ostatnie kampanie</h2>
          <div className="space-y-4">
            {recentCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{campaign.name}</p>
                  <p className="text-sm text-muted-foreground">{campaign.client}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{campaign.reach}</p>
                    <p className="text-xs text-muted-foreground">zasięg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success">{campaign.ctr}</p>
                    <p className="text-xs text-muted-foreground">CTR</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "Aktywna" 
                      ? "bg-success/10 text-success" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Top klienci wg ROI</h2>
          <div className="space-y-4">
            {[
              { name: "Spa Paradise", roi: "5.8x", spend: "12,500 zł" },
              { name: "Beauty Salon Luna", roi: "4.9x", spend: "8,200 zł" },
              { name: "Nails Studio Pro", roi: "4.2x", spend: "6,800 zł" },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg border border-border/50">
                <div>
                  <p className="font-medium text-foreground">{client.name}</p>
                  <p className="text-sm text-muted-foreground">Wydane: {client.spend}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {client.roi}
                  </p>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

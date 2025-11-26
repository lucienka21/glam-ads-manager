import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
}

const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card className="p-6 hover:shadow-elegant transition-all duration-300 border-border/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-foreground">{value}</h3>
          <p className={`text-sm mt-2 flex items-center gap-1 ${
            trend === "up" ? "text-success" : "text-destructive"
          }`}>
            {trend === "up" ? "↑" : "↓"} {change}
          </p>
        </div>
        <div className="bg-gradient-primary p-3 rounded-xl">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;

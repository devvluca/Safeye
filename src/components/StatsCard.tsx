import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("bg-gradient-glass backdrop-blur-md border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          {title}
        </CardTitle>
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold text-foreground mb-2 tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
          {trend && (
            <span className={cn(
              "text-xs font-medium px-2 py-1 rounded-lg",
              trend.isPositive 
                ? "text-success bg-success/10" 
                : "text-danger bg-danger/10"
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
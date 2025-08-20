import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  status: "atento" | "sonolento" | "alerta";
  eyesClosedTime: number;
  lastAlert?: {
    time: string;
    type: string;
  };
}

export function StatusCard({ status, eyesClosedTime, lastAlert }: StatusCardProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "atento":
        return {
          color: "success",
          icon: Eye,
          label: "Atento",
          description: "Motorista em estado normal",
          bgClass: "bg-success",
          glowClass: "shadow-[0_0_30px_hsl(var(--success)/0.3)]",
          animation: "animate-pulse-success"
        };
      case "sonolento":
        return {
          color: "warning",
          icon: EyeOff,
          label: "Sonolento", 
          description: "Atenção: sinais de sonolência",
          bgClass: "bg-warning",
          glowClass: "shadow-[0_0_30px_hsl(var(--warning)/0.3)]",
          animation: "animate-float"
        };
      case "alerta":
        return {
          color: "danger",
          icon: AlertTriangle,
          label: "Alerta Disparado",
          description: "Intervenção necessária",
          bgClass: "bg-danger",
          glowClass: "shadow-[0_0_30px_hsl(var(--danger)/0.4)]",
          animation: "animate-pulse-danger"
        };
      default:
        return {
          color: "muted",
          icon: Eye,
          label: "Desconhecido",
          description: "",
          bgClass: "bg-muted",
          glowClass: "",
          animation: ""
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Card className="bg-gradient-glass backdrop-blur-md border border-border/50 shadow-elevated overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <div className={cn(
              "w-20 h-20 aspect-square rounded-full flex items-center justify-center text-white backdrop-blur-sm",
              config.bgClass,
              config.glowClass,
              config.animation
            )}>
              <Icon className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2 tracking-tight">{config.label}</h3>
              <p className="text-muted-foreground text-lg">{config.description}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-sm font-medium px-4 py-2 rounded-xl backdrop-blur-sm",
              `bg-${config.color}/10 text-${config.color} border-${config.color}/30`
            )}
          >
            {config.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gradient-primary backdrop-blur-sm rounded-2xl p-6 border border-border/20">
            <div className="text-3xl font-bold text-foreground mb-2">
              {eyesClosedTime}s
            </div>
            <div className="text-muted-foreground">
              Olhos fechados
            </div>
          </div>
          
          {lastAlert && (
            <div className="bg-gradient-primary backdrop-blur-sm rounded-2xl p-6 border border-border/20">
              <div className="text-lg font-medium text-foreground mb-1">
                {lastAlert.time}
              </div>
              <div className="text-muted-foreground">
                Último: {lastAlert.type}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
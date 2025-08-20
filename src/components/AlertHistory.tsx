import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Clock, AlertTriangle, Volume2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertEvent {
  id: string;
  timestamp: string;
  duration: number;
  action: "buzzer" | "led" | "notification";
  severity: "low" | "medium" | "high";
}

interface AlertHistoryProps {
  events: AlertEvent[];
}

export function AlertHistory({ events }: AlertHistoryProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "buzzer":
        return Volume2;
      case "led":
        return Lightbulb;
      case "notification":
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "muted";
    }
  };

  const exportCSV = () => {
    const headers = ["Data/Hora", "Duração (s)", "Ação", "Severidade"];
    const csvContent = [
      headers.join(","),
      ...events.map(event => [
        event.timestamp,
        event.duration,
        event.action,
        event.severity
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "historico_alertas.csv";
    link.click();
  };

  return (
    <Card className="bg-gradient-glass backdrop-blur-md border border-border/50 shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-foreground tracking-tight">
            Histórico de Eventos
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportCSV}
            className="gap-2 bg-primary/10 border-primary/30 hover:bg-primary/20 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
          {events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Nenhum evento registrado hoje</p>
            </div>
          ) : (
            events.map((event) => {
              const ActionIcon = getActionIcon(event.action);
              const severityColor = getSeverityColor(event.severity);
              
              return (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 bg-gradient-primary backdrop-blur-sm rounded-xl border border-border/20 hover:bg-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm",
                      `bg-${severityColor}/15 border border-${severityColor}/30`
                    )}>
                      <ActionIcon className={cn("w-5 h-5", `text-${severityColor}`)} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {event.timestamp}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Duração: {event.duration}s
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline"
                      className={cn(
                        "text-xs px-3 py-1 rounded-lg",
                        `bg-${severityColor}/10 text-${severityColor} border-${severityColor}/30`
                      )}
                    >
                      {event.action}
                    </Badge>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
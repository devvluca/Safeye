import { StatusCard } from "@/components/StatusCard";
import { StatsCard } from "@/components/StatsCard";
import { AlertHistory } from "@/components/AlertHistory";
import { Chart } from "@/components/Chart";
import { Clock, Target, AlertTriangle, Eye } from "lucide-react";

// Mock data - em produção viria de uma API
const mockStatus = {
  status: "atento" as const,
  eyesClosedTime: 0,
  lastAlert: {
    time: "14:32",
    type: "LED"
  }
};

const mockEvents = [
  {
    id: "1",
    timestamp: "2024-08-19 14:32",
    duration: 5,
    action: "led" as const,
    severity: "medium" as const
  },
  {
    id: "2", 
    timestamp: "2024-08-19 13:15",
    duration: 8,
    action: "buzzer" as const,
    severity: "high" as const
  },
  {
    id: "3",
    timestamp: "2024-08-19 12:45",
    duration: 3,
    action: "notification" as const,
    severity: "low" as const
  }
];

const mockAttentionData = [
  { time: "08:00", attention: 95, drowsiness: 5 },
  { time: "09:00", attention: 92, drowsiness: 8 },
  { time: "10:00", attention: 98, drowsiness: 2 },
  { time: "11:00", attention: 85, drowsiness: 15 },
  { time: "12:00", attention: 78, drowsiness: 22 },
  { time: "13:00", attention: 88, drowsiness: 12 },
  { time: "14:00", attention: 94, drowsiness: 6 },
];

const mockAlertsData = [
  { hour: "08h", alerts: 0 },
  { hour: "09h", alerts: 1 },
  { hour: "10h", alerts: 0 },
  { hour: "11h", alerts: 2 },
  { hour: "12h", alerts: 4 },
  { hour: "13h", alerts: 1 },
  { hour: "14h", alerts: 1 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitoramento em tempo real do estado do motorista
        </p>
      </div>

      {/* Status Principal */}
      <StatusCard {...mockStatus} />

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tempo de Atenção"
          value="7h 32min"
          description="Sessão atual"
          icon={Clock}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Precisão"
          value="94%"
          description="Taxa de detecção"
          icon={Target}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Alertas Hoje"
          value="8"
          description="Total de alertas"
          icon={AlertTriangle}
          trend={{ value: 15, isPositive: false }}
        />
        <StatsCard
          title="Olhos Fechados"
          value="2.1%"
          description="% do tempo total"
          icon={Eye}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      {/* Gráficos */}
      <Chart attentionData={mockAttentionData} alertsData={mockAlertsData} />

      {/* Histórico */}
      <AlertHistory events={mockEvents} />
    </div>
  );
}
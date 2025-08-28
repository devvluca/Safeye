import { StatusCard } from "@/components/StatusCard";
import { StatsCard } from "@/components/StatsCard";
import { AlertHistory } from "@/components/AlertHistory";
import { Chart } from "@/components/Chart";
import { Clock, Target, AlertTriangle, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";


function getStatusFromTelemetria(ultimo?: any) {
  if (!ultimo) return { status: "atento" as const, eyesClosedTime: 0, lastAlert: undefined };
  if (ultimo.alertaativo) {
    return {
      status: "alerta" as const,
      eyesClosedTime: ultimo.tempofechado,
      lastAlert: { time: new Date(ultimo.created_at).toLocaleTimeString(), type: "Alerta" }
    };
  }
  if (ultimo.olhofechado) {
    return {
      status: "sonolento" as const,
      eyesClosedTime: ultimo.tempofechado,
      lastAlert: undefined
    };
  }
  return { status: "atento" as const, eyesClosedTime: 0, lastAlert: undefined };
}

export default function Dashboard() {
  const [telemetria, setTelemetria] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('telemetria_oculos')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setTelemetria(data);
    }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // Status principal
  const ultimo = telemetria[0];
  const statusCard = getStatusFromTelemetria(ultimo);

  // Estatísticas
  const totalAlertas = telemetria.filter(t => t.alertaativo).length;
  const olhosFechados = telemetria.filter(t => t.olhofechado).length;
  const tempoTotal = telemetria.length * 2; // cada registro = 2s
  const tempoOlhosFechados = telemetria.filter(t => t.olhofechado).length * 2;
  const olhosFechadosPercent = tempoTotal ? ((tempoOlhosFechados / tempoTotal) * 100).toFixed(1) : '0';

  // Gráficos (exemplo simples)
  const attentionData = telemetria.slice(0, 20).reverse().map((t, i) => ({
    time: new Date(t.created_at).toLocaleTimeString(),
    attention: t.olhofechado ? 100 - t.tempofechado / 20 : 100,
    drowsiness: t.olhofechado ? t.tempofechado / 20 : 0
  }));
  const alertsData = telemetria.slice(0, 20).reverse().map((t, i) => ({
    hour: new Date(t.created_at).toLocaleTimeString(),
    alerts: t.alertaativo ? 1 : 0
  }));

  // Histórico de alertas
  const alertEvents = telemetria.filter(t => t.alertaativo).map((t, i) => ({
    id: t.id.toString(),
    timestamp: new Date(t.created_at).toLocaleString(),
    duration: t.tempofechado,
    action: "buzzer" as const,
    severity: "high" as const
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitoramento em tempo real do estado do motorista
        </p>
      </div>

      {/* Status Principal */}
      <StatusCard {...statusCard} />

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tempo de Atenção"
          value={tempoTotal ? `${Math.floor((tempoTotal-tempoOlhosFechados)/60)}m` : '0m'}
          description="Sessão atual"
          icon={Clock}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Precisão"
          value="-"
          description="Taxa de detecção"
          icon={Target}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Alertas Hoje"
          value={totalAlertas.toString()}
          description="Total de alertas"
          icon={AlertTriangle}
          trend={{ value: 0, isPositive: false }}
        />
        <StatsCard
          title="Olhos Fechados"
          value={`${olhosFechadosPercent}%`}
          description="% do tempo total"
          icon={Eye}
          trend={{ value: 0, isPositive: false }}
        />
      </div>

      {/* Gráficos */}
      <Chart attentionData={attentionData} alertsData={alertsData} />

      {/* Histórico */}
      <AlertHistory events={alertEvents} />
    </div>
  );
}
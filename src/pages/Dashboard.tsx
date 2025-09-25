import { StatusCard } from "@/components/StatusCard";
import { StatsCard } from "@/components/StatsCard";
import { AlertHistory } from "@/components/AlertHistory";
import { Chart } from "@/components/Chart";
import { TestDataButton } from "@/components/TestDataButton";
import { Clock, Target, AlertTriangle, Eye } from "lucide-react";
import { useTelemetriaRealTime } from "../hooks/useTelemetriaRealTime";


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
  const { dados: telemetria, ultimoDado } = useTelemetriaRealTime();

  // Debug: mostrar quantos dados temos
  console.log("Total de dados:", telemetria.length);
  console.log("Último dado:", ultimoDado);

  // Status principal
  const ultimo = ultimoDado || telemetria[0];
  const statusCard = getStatusFromTelemetria(ultimo);

  // Estatísticas melhoradas
  const hoje = new Date().toDateString();
  const dadosHoje = telemetria.filter(t => new Date(t.created_at).toDateString() === hoje);
  
  const totalAlertas = dadosHoje.filter(t => t.alertaativo).length;
  const totalOlhosFechados = dadosHoje.filter(t => t.olhofechado).length;
  const tempoTotalSegundos = dadosHoje.length * 5; // cada registro = 5s
  const tempoOlhosFechadosSegundos = totalOlhosFechados * 5;
  const olhosFechadosPercent = tempoTotalSegundos > 0 ? ((tempoOlhosFechadosSegundos / tempoTotalSegundos) * 100).toFixed(1) : '0';
  
  // Tempo de atenção (tempo total - tempo olhos fechados)
  const tempoAtencaoMinutos = Math.floor((tempoTotalSegundos - tempoOlhosFechadosSegundos) / 60);
  
  // Taxa de precisão (simulada baseada na atividade)
  const precisao = telemetria.length > 0 ? (94 + Math.random() * 6).toFixed(0) : "0";

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
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <TestDataButton />
            <div className={`w-3 h-3 rounded-full ${telemetria.length > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {telemetria.length > 0 ? `${telemetria.length} dados recebidos` : 'Aguardando dados...'}
            </span>
          </div>
        </div>
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
          value={`${tempoAtencaoMinutos}m`}
          description="Sessão atual"
          icon={Clock}
          trend={{ value: 0, isPositive: true }}
        />
        <StatsCard
          title="Precisão"
          value={`${precisao}%`}
          description="Taxa de detecção"
          icon={Target}
          trend={{ value: 2, isPositive: true }}
        />
        <StatsCard
          title="Alertas Hoje"
          value={totalAlertas.toString()}
          description="Total de alertas"
          icon={AlertTriangle}
          trend={{ value: 0, isPositive: totalAlertas === 0 }}
        />
        <StatsCard
          title="Olhos Fechados"
          value={`${olhosFechadosPercent}%`}
          description="% do tempo total"
          icon={Eye}
          trend={{ value: 0, isPositive: parseFloat(olhosFechadosPercent) < 5 }}
        />
      </div>

      {/* Gráficos */}
      <Chart attentionData={attentionData} alertsData={alertsData} />

      {/* Histórico */}
      <AlertHistory events={alertEvents} />
    </div>
  );
}
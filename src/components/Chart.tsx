import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface ChartData {
  time: string;
  attention: number;
  drowsiness: number;
}

interface AlertsData {
  hour: string;
  alerts: number;
}

interface ChartProps {
  attentionData: ChartData[];
  alertsData: AlertsData[];
}

export function Chart({ attentionData, alertsData }: ChartProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-gradient-glass backdrop-blur-md border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground tracking-tight">
            Atenção vs. Sonolência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={attentionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)"
                }}
              />
              <Line 
                type="monotone" 
                dataKey="attention" 
                stroke="hsl(var(--success))" 
                strokeWidth={3}
                name="Atenção"
                dot={{ fill: "hsl(var(--success))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--success))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="drowsiness" 
                stroke="hsl(var(--warning))" 
                strokeWidth={3}
                name="Sonolência"
                dot={{ fill: "hsl(var(--warning))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "hsl(var(--warning))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-glass backdrop-blur-md border border-border/50 shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground tracking-tight">
            Alertas por Hora
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={alertsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "12px",
                  backdropFilter: "blur(12px)"
                }}
              />
              <Bar 
                dataKey="alerts" 
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
                name="Alertas"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
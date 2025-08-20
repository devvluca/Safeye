import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Volume2, Bell, Settings as SettingsIcon, Smartphone } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Personalize o comportamento do sistema de monitoramento
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Alertas */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Configurações de Alerta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Alertas Sonoros</Label>
                <p className="text-sm text-muted-foreground">Ativar buzzer quando detectar sonolência</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Alertas Visuais</Label>
                <p className="text-sm text-muted-foreground">Ativar LEDs de alerta</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Sensibilidade (tempo antes do alerta)</Label>
              <Slider
                defaultValue={[5]}
                max={15}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1s</span>
                <span>5s (atual)</span>
                <span>15s</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Intensidade do Buzzer</Label>
              <Slider
                defaultValue={[75]}
                max={100}
                min={20}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Baixo</span>
                <span>75% (atual)</span>
                <span>Alto</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Notificar Central</Label>
                <p className="text-sm text-muted-foreground">Enviar alertas para central de monitoramento</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Notificar Familiar</Label>
                <p className="text-sm text-muted-foreground">Enviar SMS em caso de emergência</p>
              </div>
              <Switch />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="emergency-contact">Contato de Emergência</Label>
              <Input
                id="emergency-contact"
                placeholder="(11) 99999-9999"
                defaultValue="+55 11 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency-email">Email de Emergência</Label>
              <Input
                id="emergency-email"
                type="email"
                placeholder="contato@exemplo.com"
                defaultValue="emergencia@empresa.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sistema */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="w-5 h-5" />
              Configurações do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="device-name">Nome do Dispositivo</Label>
              <Input
                id="device-name"
                placeholder="Veículo 001"
                defaultValue="Caminhão Mercedes - ABC1234"
              />
            </div>

            <div className="space-y-2">
              <Label>Frequência de Atualização</Label>
              <Select defaultValue="1s">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1s">1 segundo</SelectItem>
                  <SelectItem value="2s">2 segundos</SelectItem>
                  <SelectItem value="5s">5 segundos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Tema da Interface</Label>
              <Select defaultValue="light">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Dispositivo */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Informações do Dispositivo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-foreground">Status</div>
                <div className="text-success">Conectado</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Versão</div>
                <div className="text-muted-foreground">v2.1.4</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Bateria</div>
                <div className="text-muted-foreground">87%</div>
              </div>
              <div>
                <div className="font-medium text-foreground">Sinal GPS</div>
                <div className="text-success">Forte</div>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Reiniciar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Calibrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancelar</Button>
        <Button>Salvar Configurações</Button>
      </div>
    </div>
  );
}
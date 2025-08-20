import { Shield, Wifi, WifiOff, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import safeyeLogo from "@/assets/safeye-logo.png";

import React from "react";

export function Header({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  return (
    <header className="bg-gradient-glass backdrop-blur-md border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Botão de menu só no mobile */}
          <button
            className="md:hidden mr-2 p-2 rounded-lg hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={onOpenSidebar}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <img src={safeyeLogo} alt="Safeye Monitor" className="w-14 h-14 object-contain" />
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Safeye</h1>
            <p className="text-sm text-muted-foreground">Sistema de Monitoramento</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-success/10 text-success border-success/30 px-3 py-1">
            <Wifi className="w-3 h-3 mr-2" />
            Online
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 px-3 py-1">
            <Shield className="w-3 h-3 mr-2" />
            Ativo
          </Badge>
        </div>
      </div>
    </header>
  );
}
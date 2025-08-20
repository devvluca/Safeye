
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import React from "react";


const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Settings, label: "Configurações", path: "/settings" },
];


type SidebarProps = {
  open?: boolean;
  onClose?: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  // Sidebar desktop
  const sidebarContent = (
    <nav className="flex-1 p-6">
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                  "hover:bg-primary/10 hover:text-primary hover:shadow-glow hover:translate-x-1",
                  isActive
                    ? "bg-primary/15 text-primary shadow-glow border border-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
              onClick={onClose}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-medium tracking-wide">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Sidebar desktop */}
      <aside className="hidden md:flex w-72 bg-gradient-glass backdrop-blur-md border-r border-border/50 flex-col">
        {sidebarContent}
      </aside>
      {/* Sidebar mobile (drawer) */}
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="md:hidden p-0 w-full rounded-t-2xl bg-gradient-glass shadow-2xl flex-col border-t border-border/50">
          <div className="flex justify-end p-4">
            <DrawerClose asChild>
              <button aria-label="Fechar menu" className="text-2xl">×</button>
            </DrawerClose>
          </div>
          {sidebarContent}
        </DrawerContent>
      </Drawer>
    </>
  );
}
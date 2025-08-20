import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-3xl font-bold mb-4">404 - Página não encontrada</h1>
      <p className="text-muted-foreground">A página que você procura não existe.</p>
    </div>
  );
}

// src/lib/arduinoApi.ts
// Serviço para comunicação com Arduino via API HTTP

export type ArduinoStatus = {
  connected: boolean;
  attention: number; // porcentagem
  drowsiness: number; // porcentagem
  lastAlert?: string;
  eyesClosedTime?: number;
};

// URL base da API do Arduino (ajuste conforme necessário)
const ARDUINO_API_BASE = import.meta.env.VITE_ARDUINO_API_URL || "http://localhost:8080";

export async function getArduinoStatus(): Promise<ArduinoStatus> {
  // Em produção, faça a requisição real:
  // const res = await fetch(`${ARDUINO_API_BASE}/status`);
  // return await res.json();

  // Mock para desenvolvimento
  return {
    connected: true,
    attention: 92,
    drowsiness: 8,
    lastAlert: "buzzer",
    eyesClosedTime: 0,
  };
}

export async function sendArduinoCommand(command: string, payload?: any): Promise<{ success: boolean }> {
  // Em produção, envie o comando real:
  // const res = await fetch(`${ARDUINO_API_BASE}/command`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ command, payload }),
  // });
  // return await res.json();

  // Mock para desenvolvimento
  return { success: true };
}

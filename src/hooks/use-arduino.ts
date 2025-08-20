import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getArduinoStatus, sendArduinoCommand, ArduinoStatus } from "@/lib/arduinoApi";

export function useArduinoStatus() {
  return useQuery<ArduinoStatus>({
    queryKey: ["arduino-status"],
    queryFn: getArduinoStatus,
    refetchInterval: 2000, // Atualiza a cada 2s
  });
}

export function useSendArduinoCommand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { command: string; payload?: any }) =>
      sendArduinoCommand(data.command, data.payload),
    onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ["arduino-status"] });
    },
  });
}

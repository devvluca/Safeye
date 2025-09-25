import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface TelemetriaData {
  id: number;
  olhofechado: boolean;
  tempofechado: number;
  alertaativo: boolean;
  created_at: string;
}

export function useTelemetriaRealTime() {
  const [dados, setDados] = useState<TelemetriaData[]>([]);
  const [ultimoDado, setUltimoDado] = useState<TelemetriaData | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Função para buscar dados periodicamente
    const fetchData = async () => {
      const { data } = await supabase
        .from('telemetria_oculos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (data) {
        setDados(data);
        setUltimoDado(data[0] || null);
      }
    };

    fetchData(); // Busca inicial
    intervalId = setInterval(fetchData, 1000); // Atualiza a cada 1s

    // Escuta realtime (opcional, pode remover se quiser só polling)
    const subscription = supabase
      .channel('telemetria_channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'telemetria_oculos'
        },
        (payload) => {
          const novoDado = payload.new as TelemetriaData;
          setDados(prev => [novoDado, ...prev.slice(0, 49)]);
          setUltimoDado(novoDado);
        }
      )
      .subscribe();

    return () => {
      clearInterval(intervalId);
      subscription.unsubscribe();
    };
  }, []);

  return { dados, ultimoDado };
}
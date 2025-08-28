import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Telemetria {
  id: number;
  olhofechado: boolean;
  tempofechado: number;
  alertaativo: boolean;
  created_at: string;
}

export function TelemetriaTable() {
  const [dados, setDados] = useState<Telemetria[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('telemetria_oculos')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setDados(data);
    }
    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">Olho Fechado</th>
            <th className="border px-2 py-1">Tempo Fechado (ms)</th>
            <th className="border px-2 py-1">Alerta Ativo</th>
            <th className="border px-2 py-1">Data</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item) => (
            <tr key={item.id}>
              <td className="border px-2 py-1">{item.olhofechado ? 'Sim' : 'Não'}</td>
              <td className="border px-2 py-1">{item.tempofechado}</td>
              <td className="border px-2 py-1">{item.alertaativo ? 'Sim' : 'Não'}</td>
              <td className="border px-2 py-1">{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

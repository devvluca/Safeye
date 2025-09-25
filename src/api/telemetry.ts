// src/api/telemetry.ts
import { supabase } from '../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('telemetria_oculos')
      .insert([{
        olhofechado: data.olhoFechado,
        tempofechado: data.tempoFechado,
        alertaativo: data.alertaAtivo
      }]);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
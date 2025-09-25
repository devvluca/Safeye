import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';

export function TestDataButton() {
  const [enviando, setEnviando] = useState(false);

  const enviarDadosTeste = async () => {
    setEnviando(true);
    try {
      // Simular dados do óculos
      const dadosTeste = {
        olhofechado: Math.random() > 0.7, // 30% chance de olho fechado
        tempofechado: Math.floor(Math.random() * 3000), // 0-3000ms
        alertaativo: Math.random() > 0.9, // 10% chance de alerta
      };

      const { error } = await supabase
        .from('telemetria_oculos')
        .insert([dadosTeste]);

      if (error) {
        console.error('Erro ao inserir dados teste:', error);
        alert('Erro ao inserir dados: ' + error.message);
      } else {
        console.log('✅ Dados teste inseridos:', dadosTeste);
        alert('Dados teste inseridos com sucesso!');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro: ' + error);
    }
    setEnviando(false);
  };

  return (
    <Button 
      onClick={enviarDadosTeste} 
      disabled={enviando}
      variant="outline"
      size="sm"
    >
      {enviando ? 'Enviando...' : '🧪 Enviar Dados Teste'}
    </Button>
  );
}
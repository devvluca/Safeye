import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<SEU-PROJETO>.supabase.co'; // Substitua pelo seu URL
const supabaseKey = '<SUA-CHAVE-ANON>'; // Substitua pela sua chave anon
export const supabase = createClient(supabaseUrl, supabaseKey);

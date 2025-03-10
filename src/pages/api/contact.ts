import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// Desactiva el prerender para esta ruta (es una API)
export const prerender = false;

/**
 * (Opcional) Función auxiliar para crear la tabla "contacts" si no existe.
 * Ten en cuenta que esto requiere privilegios suficientes en tu proyecto
 * de Supabase y la extensión "uuid-ossp" o "pgcrypto" para usar uuid_generate_v4().
 * Si prefieres crear la tabla desde el panel de Supabase, puedes eliminar esta función.
 */
async function ensureContactsTable(supabase: SupabaseClient) {
  try {
    // Verifica si la tabla existe
    const { error: tableCheckError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1);

    // Supabase suele devolver error code 'PGRST204' si la tabla no existe
    if (tableCheckError && tableCheckError.code === 'PGRST204') {
      // Usar un RPC (función remota) para ejecutar SQL. Debes tener creada la función 'execute_sql' en tu proyecto.
      const { error: createError } = await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS contacts (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            full_name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (createError) {
        console.error('Error creating contacts table:', createError);
      }
    }
  } catch (error) {
    console.error('Error ensuring contacts table exists:', error);
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Extrae el cuerpo JSON del request
    const { fullName, email, subject, message } = await request.json();

    // Validación simple
    if (!fullName || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'Todos los campos son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Crea el cliente de Supabase
    // Nota: si prefieres mantener las variables privadas solo en el servidor,
    // puedes quitar el prefijo "PUBLIC_". Lo importante es que coincidan
    // con las definidas en Vercel.
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // (Opcional) Crea la tabla si no existe
    await ensureContactsTable(supabase);

    // Inserta el nuevo contacto en la tabla "contacts"
    const { data, error } = await supabase
      .from('contacts')
      .insert([{ 
        full_name: fullName, 
        email, 
        subject, 
        message 
      }])
      .select();

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, contact: data?.[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding contact message:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error agregando mensaje de contacto.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

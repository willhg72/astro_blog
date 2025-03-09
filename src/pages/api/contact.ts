import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export const prerender = false;

// Helper function to create contacts table if it doesn't exist
async function ensureContactsTable(supabase: SupabaseClient) {
  try {
    // Check if the contacts table exists
    const { error: tableCheckError } = await supabase
      .from('contacts')
      .select('*')
      .limit(1);
    
    // If the table doesn't exist, create it
    if (tableCheckError && tableCheckError.code === 'PGRST204') {
      // Use SQL to create the table
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

// POST endpoint to add a new contact message
export const POST: APIRoute = async ({ request }) => {
  try {
    const { fullName, email, subject, message } = await request.json();
    
    if (!fullName || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: 'All fields are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY
    );
    
    // Ensure contacts table exists
    await ensureContactsTable(supabase);
    
    // Add the contact message
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
      JSON.stringify({ success: true, contact: data[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding contact message:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error adding contact message' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
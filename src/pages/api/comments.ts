import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

export const prerender = false;

// Helper function to create comments table if it doesn't exist
async function ensureCommentsTable(supabase: SupabaseClient) {
  try {
    // Check if the comments table exists
    const { error: tableCheckError } = await supabase
      .from('comments')
      .select('*')
      .limit(1);
    
    // If the table doesn't exist, create it
    if (tableCheckError && tableCheckError.code === 'PGRST204') {
      // Use SQL to create the table
      const { error: createError } = await supabase.rpc('execute_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS comments (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            post_id TEXT NOT NULL,
            email TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (createError) {
        console.error('Error creating comments table:', createError);
      }
    }
  } catch (error) {
    console.error('Error ensuring comments table exists:', error);
  }
}

// GET endpoint to fetch comments for a post
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const postId = url.searchParams.get('postId');
    
    if (!postId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Post ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Ensure comments table exists
    await ensureCommentsTable(supabase);
    
    // Fetch comments for the post
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, comments: data || [] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching comments' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// POST endpoint to add a new comment
export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Received comment submission request');
    
    // Log the raw request body for debugging
    const rawBody = await request.text();
    console.log('Raw request body:', rawBody);
    
    // Parse the JSON manually
    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const { postId, email, content } = body;
    console.log('Parsed data:', { postId, email, content });
    
    if (!postId || !email || !content) {
      const missingFields = [];
      if (!postId) missingFields.push('postId');
      if (!email) missingFields.push('email');
      if (!content) missingFields.push('content');
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY
    );
    
    // Ensure comments table exists
    await ensureCommentsTable(supabase);
    
    // Add the comment
    const { data, error } = await supabase
      .from('comments')
      .insert([{ post_id: postId, email, content }])
      .select();
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, comment: data[0] }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error adding comment' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
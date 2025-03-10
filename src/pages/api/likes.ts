import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Make sure this is set to false to prevent prerendering
export const prerender = false;

// Helper function to create likes table if it doesn't exist
async function ensureLikesTable(supabase: any) {
  try {
    // Check if the likes table exists
    const { error: tableCheckError } = await supabase
      .from('likes')
      .select('*')
      .limit(1);
    
    // If the table doesn't exist, create it
    if (tableCheckError && tableCheckError.code === 'PGRST204') {
      // Use SQL to create the table
      const { error: createError } = await supabase.rpc('create_likes_table');
      
      if (createError) {
        console.error('Error creating likes table:', createError);
        // Try a different approach if RPC fails
        await supabase.rpc('execute_sql', {
          sql: `
            CREATE TABLE IF NOT EXISTS likes (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              comment_id UUID NOT NULL,
              user_email TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              UNIQUE(comment_id, user_email)
            );
          `
        });
      }
    }
  } catch (error) {
    console.error('Error ensuring likes table exists:', error);
  }
}

// GET endpoint to fetch likes count
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const commentId = url.searchParams.get('commentId');
    
    if (!commentId) {
      return new Response(
        JSON.stringify({ success: false, message: 'Comment ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Ensure likes table exists
    await ensureLikesTable(supabase);
    
    // Count likes for the comment
    const { count, error } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('comment_id', commentId);
    
    if (error && error.code === 'PGRST204') {
      // Table doesn't exist, return 0 likes
      return new Response(
        JSON.stringify({ success: true, likes: 0 }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, likes: count || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching likes:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error fetching likes' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { commentId, email, action } = await request.json();
    
    if (!commentId || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Comment ID and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY
    );
    
    // Ensure likes table exists
    await ensureLikesTable(supabase);
    
    if (action === 'like') {
      // Add like
      const { error } = await supabase
        .from('likes')
        .insert([{ comment_id: commentId, user_email: email }]);
      
      if (error && error.code === '23505') {
        // Unique constraint violation - user already liked this comment
        console.log('User already liked this comment');
      } else if (error) {
        throw error;
      }
    } else {
      // Remove like
      const { error } = await supabase
        .from('likes')
        .delete()
        .match({ comment_id: commentId, user_email: email });
      
      if (error) throw error;
    }
    
    // Get updated like count
    const { count, error: countError } = await supabase
      .from('likes')
      .select('*', { count: 'exact', head: true })
      .eq('comment_id', commentId);
    
    if (countError) throw countError;
    
    return new Response(
      JSON.stringify({ success: true, likes: count || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating likes:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error updating likes' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
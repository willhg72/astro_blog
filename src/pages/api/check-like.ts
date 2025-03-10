import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const commentId = url.searchParams.get('commentId');
    const email = url.searchParams.get('email');
    
    if (!commentId || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Comment ID and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // First, check if the likes table exists
    const { error: tableCheckError } = await supabase
      .from('likes')
      .select('*')
      .limit(1);
    
    // If the table doesn't exist, return false for hasLiked
    if (tableCheckError && tableCheckError.code === 'PGRST204') {
      return new Response(
        JSON.stringify({ success: true, hasLiked: false }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // If the table exists, check if the user has liked the comment
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('comment_id', commentId)
      .eq('user_email', email)
      .maybeSingle();
    
    if (error) throw error;
    
    return new Response(
      JSON.stringify({ success: true, hasLiked: !!data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking like status:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error checking like status' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
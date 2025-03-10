import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, content, postId, parentId } = await request.json();
    
    if (!email || !content || !postId || !parentId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email, content, postId, and parentId are required' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );
    
    // Insert reply without the likes field
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          email,
          content,
          post_id: postId,
          parent_id: parentId,
          created_at: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Reply added successfully',
        reply: data?.[0]
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error adding reply:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error adding reply' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
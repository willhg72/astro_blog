import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false; // Mark as server-rendered

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, content, postId } = body;
    
    // Validate required fields
    if (!email || !content || !postId) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Email, content, and postId are required' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_ANON_KEY
    );
    
    // Insert comment into database - use a text column for post_id instead of UUID
    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          email,
          content,
          // Store post_id as a string instead of trying to convert to UUID
          post_id: String(postId),
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Supabase error code:', error.code);
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Error saving comment'
        }),
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Comment added successfully'
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Server error:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Server error' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
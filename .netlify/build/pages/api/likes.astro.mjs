import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function ensureLikesTable(supabase) {
  try {
    const { error: tableCheckError } = await supabase.from("likes").select("*").limit(1);
    if (tableCheckError && tableCheckError.code === "PGRST204") {
      const { error: createError } = await supabase.rpc("create_likes_table");
      if (createError) {
        console.error("Error creating likes table:", createError);
        await supabase.rpc("execute_sql", {
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
    console.error("Error ensuring likes table exists:", error);
  }
}
const GET = async ({ request, url }) => {
  try {
    const commentId = url.searchParams.get("commentId");
    if (!commentId) {
      return new Response(
        JSON.stringify({ success: false, message: "Comment ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const supabase = createClient(
      undefined                            ,
      undefined                                 
    );
    await ensureLikesTable(supabase);
    const { count, error } = await supabase.from("likes").select("*", { count: "exact", head: true }).eq("comment_id", commentId);
    if (error && error.code === "PGRST204") {
      return new Response(
        JSON.stringify({ success: true, likes: 0 }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    if (error) throw error;
    return new Response(
      JSON.stringify({ success: true, likes: count || 0 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching likes:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error fetching likes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const POST = async ({ request }) => {
  try {
    const { commentId, email, action } = await request.json();
    if (!commentId || !email) {
      return new Response(
        JSON.stringify({ success: false, message: "Comment ID and email are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const supabase = createClient(
      undefined                            ,
      undefined                                 
    );
    await ensureLikesTable(supabase);
    if (action === "like") {
      const { error } = await supabase.from("likes").insert([{ comment_id: commentId, user_email: email }]);
      if (error && error.code === "23505") {
        console.log("User already liked this comment");
      } else if (error) {
        throw error;
      }
    } else {
      const { error } = await supabase.from("likes").delete().match({ comment_id: commentId, user_email: email });
      if (error) throw error;
    }
    const { count, error: countError } = await supabase.from("likes").select("*", { count: "exact", head: true }).eq("comment_id", commentId);
    if (countError) throw countError;
    return new Response(
      JSON.stringify({ success: true, likes: count || 0 }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating likes:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error updating likes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

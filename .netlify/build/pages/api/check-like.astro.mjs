import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request, url }) => {
  try {
    const commentId = url.searchParams.get("commentId");
    const email = url.searchParams.get("email");
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
    const { error: tableCheckError } = await supabase.from("likes").select("*").limit(1);
    if (tableCheckError && tableCheckError.code === "PGRST204") {
      return new Response(
        JSON.stringify({ success: true, hasLiked: false }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    const { data, error } = await supabase.from("likes").select("id").eq("comment_id", commentId).eq("user_email", email).maybeSingle();
    if (error) throw error;
    return new Response(
      JSON.stringify({ success: true, hasLiked: !!data }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error checking like status:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error checking like status" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

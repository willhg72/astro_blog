import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const { email, content, postId, parentId } = await request.json();
    if (!email || !content || !postId || !parentId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email, content, postId, and parentId are required"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const supabase = createClient(
      undefined                            ,
      undefined                                 
    );
    const { data, error } = await supabase.from("comments").insert([
      {
        email,
        content,
        post_id: postId,
        parent_id: parentId,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    ]).select();
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Reply added successfully",
        reply: data?.[0]
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding reply:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding reply" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

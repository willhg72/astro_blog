import { createClient } from '@supabase/supabase-js';
export { renderers } from '../../renderers.mjs';

const prerender = false;
async function ensureContactsTable(supabase) {
  try {
    const { error: tableCheckError } = await supabase.from("contacts").select("*").limit(1);
    if (tableCheckError && tableCheckError.code === "PGRST204") {
      const { error: createError } = await supabase.rpc("execute_sql", {
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
        console.error("Error creating contacts table:", createError);
      }
    }
  } catch (error) {
    console.error("Error ensuring contacts table exists:", error);
  }
}
const POST = async ({ request }) => {
  try {
    const { fullName, email, subject, message } = await request.json();
    if (!fullName || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const supabase = createClient(
      undefined                            ,
      undefined                                 
    );
    await ensureContactsTable(supabase);
    const { data, error } = await supabase.from("contacts").insert([{
      full_name: fullName,
      email,
      subject,
      message
    }]).select();
    if (error) throw error;
    return new Response(
      JSON.stringify({ success: true, contact: data[0] }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error adding contact message:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Error adding contact message" }),
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

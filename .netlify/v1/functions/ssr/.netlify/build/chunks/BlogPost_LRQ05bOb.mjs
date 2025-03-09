import { f as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, a as renderScript, b as renderComponent, d as renderHead, g as renderSlot } from './astro/server_CVwAO8B7.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$FormattedDate, c as $$Footer } from './FormattedDate_4iaKSA64.mjs';
import 'clsx';
import { createClient } from '@supabase/supabase-js';
/* empty css                         */

const $$Astro$1 = createAstro("https://your-netlify-site-name.netlify.app");
const $$Comments = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Comments;
  const { postId } = Astro2.props;
  let comments = [];
  const supabaseUrl = "https://zrxsfjkxujebokrfmiks.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyeHNmamt4dWplYm9rcmZtaWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODgyOTYsImV4cCI6MjA1NzA2NDI5Nn0.NZ4usmwHrgUxBgSgw1V6Txpi_LsKtyh16V5Ri4yGf_k";
  {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      if (postId) {
        const { data, error } = await supabase.from("comments").select("*").eq("post_id", postId).order("created_at", { ascending: false });
        if (!error) comments = data;
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="comments-section" data-astro-cid-jvxsf75u> <h2 data-astro-cid-jvxsf75u>Comentarios (${comments.length})</h2> <div class="comment-form" data-astro-cid-jvxsf75u> <input type="email" placeholder="Tu correo electrónico" class="email-input" required data-astro-cid-jvxsf75u> <textarea placeholder="Escribe tu comentario..." required data-astro-cid-jvxsf75u></textarea> <button class="submit-button"${addAttribute(postId, "data-post-id")} data-astro-cid-jvxsf75u>Publicar comentario</button> </div> <div class="comments-list" data-astro-cid-jvxsf75u> ${comments.length > 0 ? comments.map((comment) => renderTemplate`<div class="comment-item" data-astro-cid-jvxsf75u> <div class="comment-header" data-astro-cid-jvxsf75u> <span class="comment-author" data-astro-cid-jvxsf75u>${comment.email.split("@")[0]}</span> <span class="comment-date" data-astro-cid-jvxsf75u>${new Date(comment.created_at).toLocaleDateString()}</span> </div> <p class="comment-content" data-astro-cid-jvxsf75u>${comment.content}</p> <div class="comment-actions" data-astro-cid-jvxsf75u> <button class="comment-action-button like-button"${addAttribute(comment.id, "data-comment-id")} data-astro-cid-jvxsf75u> <span class="like-count" data-astro-cid-jvxsf75u>0</span> Me gusta
</button> <button class="comment-action-button reply-button"${addAttribute(comment.id, "data-comment-id")} data-astro-cid-jvxsf75u>
Responder
</button> </div> <div${addAttribute(`replies-${comment.id}`, "id")} class="replies-container" data-astro-cid-jvxsf75u></div> <div${addAttribute(`reply-form-${comment.id}`, "id")} class="reply-form-container" style="display: none;" data-astro-cid-jvxsf75u> <form class="reply-form" data-astro-cid-jvxsf75u> <input type="hidden" name="parentId"${addAttribute(comment.id, "value")} data-astro-cid-jvxsf75u> <input type="hidden" name="postId"${addAttribute(postId, "value")} data-astro-cid-jvxsf75u> <input type="email" name="email" class="comment-input" placeholder="Tu correo electrónico" required data-astro-cid-jvxsf75u> <textarea name="content" class="comment-textarea" placeholder="Escribe tu respuesta..." required data-astro-cid-jvxsf75u></textarea> <div class="comment-button-container" data-astro-cid-jvxsf75u> <button type="button" class="cancel-reply-button" data-astro-cid-jvxsf75u>Cancelar</button> <button type="submit" class="comment-submit-button" data-astro-cid-jvxsf75u>Responder</button> </div> </form> </div> </div>`) : renderTemplate`<p data-astro-cid-jvxsf75u>No hay comentarios aún. ¡Sé el primero en comentar!</p>`} </div> </div>  ${renderScript($$result, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/components/Comments.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/components/Comments.astro", void 0);

const $$Astro = createAstro("https://your-netlify-site-name.netlify.app");
const $$BlogPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogPost;
  const { title, description, pubDate, updatedDate, heroImage, hideComments = false } = Astro2.props;
  const currentPath = Astro2.url.pathname.split("/").filter(Boolean).pop();
  const isHomePage = Astro2.url.pathname === "/";
  const formattedPubDate = pubDate instanceof Date ? pubDate : pubDate ? new Date(pubDate) : null;
  const formattedUpdatedDate = updatedDate instanceof Date ? updatedDate : updatedDate ? new Date(updatedDate) : null;
  return renderTemplate`<html lang="en" data-astro-cid-bvzihdzo> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": description, "data-astro-cid-bvzihdzo": true })}${renderHead()}</head> <body data-astro-cid-bvzihdzo> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-bvzihdzo": true })} <main data-astro-cid-bvzihdzo> <article data-astro-cid-bvzihdzo> <div class="hero-image" data-astro-cid-bvzihdzo> ${heroImage && renderTemplate`<img${addAttribute(1020, "width")}${addAttribute(510, "height")}${addAttribute(heroImage, "src")} alt="" data-astro-cid-bvzihdzo>`} </div> <div class="prose" data-astro-cid-bvzihdzo> ${!isHomePage && renderTemplate`<div class="title" data-astro-cid-bvzihdzo> <div class="date" data-astro-cid-bvzihdzo> ${formattedPubDate && renderTemplate`${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": formattedPubDate, "data-astro-cid-bvzihdzo": true })}`} ${formattedUpdatedDate && renderTemplate`<div class="last-updated-on" data-astro-cid-bvzihdzo>
Last updated on ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": formattedUpdatedDate, "data-astro-cid-bvzihdzo": true })} </div>`} </div> <h1 data-astro-cid-bvzihdzo>${title}</h1> <hr data-astro-cid-bvzihdzo> </div>`} ${renderSlot($$result, $$slots["default"])}  ${!isHomePage && currentPath !== "about" && renderTemplate`<div class="comments-container" data-astro-cid-bvzihdzo> ${renderComponent($$result, "Comments", $$Comments, { "postId": currentPath || "", "data-astro-cid-bvzihdzo": true })} </div>`} </div> </article> </main> ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-bvzihdzo": true })} </body></html>`;
}, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/layouts/BlogPost.astro", void 0);

export { $$BlogPost as $ };

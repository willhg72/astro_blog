import { c as createComponent, r as renderTemplate, b as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CVwAO8B7.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_LRQ05bOb.mjs';
import { g as getCollection } from '../chunks/_astro_content_BRP6AC5N.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  await getCollection("blog");
  return renderTemplate`${renderComponent($$result, "BlogPost", $$BlogPost, { "title": "Blog de Sistemas Operativos", "description": "Blog sobre conceptos y tecnolog\xEDas de sistemas operativos", "pubDate": /* @__PURE__ */ new Date("2023-01-01"), "heroImage": "/home-hero.jpg", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="home-container" data-astro-cid-j7pv25f6> <div class="intro-section" data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>Blog de Sistemas Operativos</h1> <p class="description" data-astro-cid-j7pv25f6>
Bienvenido a mi blog sobre sistemas operativos. Aquí encontrarás artículos sobre conceptos fundamentales,
        comparativas entre diferentes sistemas, tutoriales y más.
</p> <div class="featured-content" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Sobre este blog</h2> <p data-astro-cid-j7pv25f6>
Este blog está dedicado a explorar el fascinante mundo de los sistemas operativos.
          Desde los conceptos básicos hasta temas avanzados, nuestro objetivo es proporcionar
          información clara y útil para estudiantes, profesionales y entusiastas de la informática.
</p> <h2 data-astro-cid-j7pv25f6>Temas que cubrimos</h2> <ul data-astro-cid-j7pv25f6> <li data-astro-cid-j7pv25f6>Fundamentos de sistemas operativos</li> <li data-astro-cid-j7pv25f6>Gestión de procesos y memoria</li> <li data-astro-cid-j7pv25f6>Sistemas de archivos</li> <li data-astro-cid-j7pv25f6>Seguridad en sistemas operativos</li> <li data-astro-cid-j7pv25f6>Comparativas entre Windows, Linux, macOS y otros</li> </ul> </div> </div> <div class="posts-section" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Últimas publicaciones</h2> <div class="posts-grid" data-astro-cid-j7pv25f6> <div class="post-card" data-astro-cid-j7pv25f6> <a href="/blog/gestion-procesos-so" class="post-link" data-astro-cid-j7pv25f6> <div class="post-image-container" data-astro-cid-j7pv25f6> <img src="/images/process-management.jpg" alt="Gestión de procesos" class="post-image" data-astro-cid-j7pv25f6> </div> <h3 class="post-title" data-astro-cid-j7pv25f6>Gestión del Núcleo y los Procesos de los Sistemas Operativos</h3> <p class="post-description" data-astro-cid-j7pv25f6>Una exploración detallada de la gestión de procesos en sistemas operativos, incluyendo estados, planificación y mecanismos de control.</p> <div class="read-more" data-astro-cid-j7pv25f6>Leer más →</div> </a> </div> <div class="post-card" data-astro-cid-j7pv25f6> <a href="/blog/coordinacion-sincronizacion-procesos" class="post-link" data-astro-cid-j7pv25f6> <div class="post-image-container" data-astro-cid-j7pv25f6> <img src="/images/process-coodination.jpg" alt="Sincronización de procesos" class="post-image" data-astro-cid-j7pv25f6> </div> <h3 class="post-title" data-astro-cid-j7pv25f6>Coordinación y Sincronización de Procesos</h3> <p class="post-description" data-astro-cid-j7pv25f6>Análisis de los mecanismos de sincronización y coordinación entre procesos en sistemas operativos modernos.</p> <div class="read-more" data-astro-cid-j7pv25f6>Leer más →</div> </a> </div> </div> </div> </div> ` })} `;
}, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/pages/index.astro", void 0);

const $$file = "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

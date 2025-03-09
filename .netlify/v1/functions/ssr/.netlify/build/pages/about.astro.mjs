import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderScript, b as renderComponent } from '../chunks/astro/server_CVwAO8B7.mjs';
import 'kleur/colors';
import { $ as $$BlogPost } from '../chunks/BlogPost_LRQ05bOb.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$ContactMe = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="contact-form" data-astro-cid-uesty5gv> <h2 data-astro-cid-uesty5gv>Contáctame</h2> <div class="form-group" data-astro-cid-uesty5gv> <label for="fullName" data-astro-cid-uesty5gv>Nombre completo</label> <input type="text" id="fullName" placeholder="Tu nombre completo" required data-astro-cid-uesty5gv> </div> <div class="form-group" data-astro-cid-uesty5gv> <label for="email" data-astro-cid-uesty5gv>Correo electrónico</label> <input type="email" id="email" placeholder="tu@email.com" required data-astro-cid-uesty5gv> </div> <div class="form-group" data-astro-cid-uesty5gv> <label for="subject" data-astro-cid-uesty5gv>Asunto</label> <input type="text" id="subject" placeholder="Asunto del mensaje" required data-astro-cid-uesty5gv> </div> <div class="form-group" data-astro-cid-uesty5gv> <label for="message" data-astro-cid-uesty5gv>Mensaje</label> <textarea id="message" placeholder="Escribe tu mensaje aquí..." rows="5" required data-astro-cid-uesty5gv></textarea> </div> <button class="submit-button" type="button" data-astro-cid-uesty5gv>Enviar mensaje</button> <div id="status-message" class="status-message" data-astro-cid-uesty5gv></div> </div>  ${renderScript($$result, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/components/ContactMe.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/components/ContactMe.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BlogPost, { "title": "Sobre M\xED", "description": "Informaci\xF3n sobre el autor del blog", "pubDate": /* @__PURE__ */ new Date("March 8, 2025"), "heroImage": "/about-hero.jpg", "hideComments": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2>Perfil Profesional</h2> <p>
Como líder orientado a resultados en el desarrollo de software, me destaco en mejorar la eficiencia de los procesos tecnológicos a través de soluciones innovadoras de automatización. Mi experiencia incluye competencia en Python junto con herramientas de IA y no-code (Jotform, Airtable, Zapier, Make, Chat GPT).
</p> <p>
Mi compromiso y visión integradora son aspectos clave de mi enfoque. Cuando me enfrento a cualquier desafío, soy hábil en orquestar soluciones efectivas que impulsan el avance tecnológico.
</p> <h2>Educación</h2> <p>
Actualmente estoy cursando la materia de Sistemas Operativos, donde estoy profundizando mis conocimientos sobre la arquitectura y funcionamiento de los sistemas que hacen posible la computación moderna.
</p> <h2>Habilidades Técnicas</h2> <ul> <li><strong>Lenguajes de Programación:</strong> Python</li> <li><strong>Herramientas No-Code:</strong> Jotform, Airtable, Zapier, Make</li> <li><strong>Inteligencia Artificial:</strong> Implementación de soluciones con Chat GPT</li> <li><strong>Automatización:</strong> Diseño e implementación de flujos de trabajo automatizados</li> </ul> <h2>Enfoque Profesional</h2> <p>
Mi filosofía profesional se centra en la búsqueda constante de la eficiencia a través de la tecnología. Creo firmemente que la automatización inteligente no solo optimiza procesos, sino que también libera el potencial humano para tareas más creativas y estratégicas.
</p> <p>
Este blog representa mi interés en compartir conocimientos sobre sistemas operativos, un componente fundamental en la infraestructura tecnológica que hace posible todas las innovaciones en las que trabajo diariamente.
</p> <h2>Contacto</h2> ${renderComponent($$result2, "ContactMe", $$ContactMe, {})} ` })}`;
}, "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/pages/about.astro", void 0);

const $$file = "D:/William/Universidad/Recorrido 1/Sistemas Operativos/Actividad 2/Blog/project/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

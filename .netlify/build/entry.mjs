import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_Cm6cKMF_.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/check-like.astro.mjs');
const _page3 = () => import('./pages/api/comments.astro.mjs');
const _page4 = () => import('./pages/api/contact.astro.mjs');
const _page5 = () => import('./pages/api/likes.astro.mjs');
const _page6 = () => import('./pages/api/replies.astro.mjs');
const _page7 = () => import('./pages/blog.astro.mjs');
const _page8 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page9 = () => import('./pages/rss.xml.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/check-like.ts", _page2],
    ["src/pages/api/comments.ts", _page3],
    ["src/pages/api/contact.ts", _page4],
    ["src/pages/api/likes.ts", _page5],
    ["src/pages/api/replies.ts", _page6],
    ["src/pages/blog/index.astro", _page7],
    ["src/pages/blog/[...slug].astro", _page8],
    ["src/pages/rss.xml.js", _page9],
    ["src/pages/index.astro", _page10]
]);
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: undefined
});
const _args = {
    "middlewareSecret": "dec75d9c-4508-4f97-b1b8-ad72d2ea7b7b"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };

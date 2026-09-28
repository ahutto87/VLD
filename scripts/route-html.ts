/**
 * Vite build plugin that writes a static HTML file for every client route.
 *
 * GitHub Pages only answers 200 for files that exist, so without this a
 * direct visit to /subscribe was served from 404.html with an HTTP 404 and the
 * homepage's <head>. After the build it writes a copy of index.html per route
 * in pagePaths (dist/subscribe.html, dist/terms-of-service.html, ...) with
 * that page's title, description, canonical and Open Graph tags from
 * src/utils/seo.ts, for crawlers and link previews (Facebook, WhatsApp,
 * iMessage) that don't run JavaScript. GitHub Pages serves /subscribe from
 * subscribe.html without a redirect. It also writes 404.html, the SPA
 * fallback for any other URL (formerly the postbuild step in package.json).
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { Plugin } from 'vite';
import { generateSEOTags, pagePaths } from '../src/utils/seo.ts';
import type { PageKey } from '../src/utils/seo.ts';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const attributesOf = (tag: string): Record<string, string> =>
  Object.fromEntries([...tag.matchAll(/([\w:.-]+)="([^"]*)"/g)].map(([, name, value]) => [name.toLowerCase(), value]));

const withAttribute = (tag: string, name: string, value: string) => {
  const attribute = ` ${name}="${escapeHtml(value)}"`;
  const existing = new RegExp(`\\s${name}="[^"]*"`);
  // Function replacers, so a "$350" in a description isn't read as a replacement pattern
  return existing.test(tag)
    ? tag.replace(existing, () => attribute)
    : tag.replace(/\s*\/?>$/, (end) => `${attribute}${end}`);
};

// Returns index.html with the <head> tags for one page: tags index.html
// already has are updated in place, missing ones are added before </head>.
export const renderRouteHtml = (indexHtml: string, pageKey: PageKey) => {
  const parts = indexHtml.match(/^([\s\S]*?<head>)([\s\S]*?)(\s*<\/head>[\s\S]*)$/);
  if (!parts) throw new Error('route-html: could not find <head> in index.html');
  const [, beforeHead, originalHead, afterHead] = parts;
  const { title, meta, link } = generateSEOTags(pageKey, 'en');
  const added: string[] = [];

  let head = originalHead.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`);

  const upsert = (
    tagName: 'meta' | 'link',
    attrs: Record<string, string>,
    valueAttr: 'content' | 'href',
    isMatch: (existing: Record<string, string>) => boolean
  ) => {
    let found = false;
    head = head.replace(new RegExp(`<${tagName}\\b[^>]*>`, 'g'), (tag) => {
      if (found || !isMatch(attributesOf(tag))) return tag;
      found = true;
      return withAttribute(tag, valueAttr, attrs[valueAttr]);
    });
    if (!found) {
      const attributes = Object.entries(attrs).map(([name, value]) => `${name}="${escapeHtml(value)}"`);
      added.push(`<${tagName} ${attributes.join(' ')} />`);
    }
  };

  for (const tag of meta) {
    // index.html uses property= for its twitter:* tags, so match either attribute
    const [attr, key] = tag.name !== undefined ? ['name', tag.name] : ['property', tag.property];
    upsert('meta', { [attr]: key, content: tag.content }, 'content', (existing) => existing.name === key || existing.property === key);
  }
  for (const { rel, href, hreflang } of link) {
    upsert('link', hreflang ? { rel, hreflang, href } : { rel, href }, 'href', (existing) => existing.rel === rel && existing.hreflang === hreflang);
  }

  return beforeHead + head + added.map((tag) => `\n    ${tag}`).join('') + afterHead;
};

export const routeHtmlPlugin = (): Plugin => ({
  name: 'route-html',
  apply: 'build',
  async writeBundle({ dir }) {
    if (!dir) throw new Error('route-html: build output directory is not set');
    const indexHtml = await readFile(join(dir, 'index.html'), 'utf8');
    await writeFile(join(dir, '404.html'), indexHtml);

    const written = ['404.html'];
    for (const pageKey of Object.keys(pagePaths) as PageKey[]) {
      const path = pagePaths[pageKey];
      if (path === '/') continue;
      const file = `${path.slice(1)}.html`;
      await mkdir(dirname(join(dir, file)), { recursive: true });
      await writeFile(join(dir, file), renderRouteHtml(indexHtml, pageKey));
      written.push(file);
    }
    console.log(`route-html: wrote ${written.join(', ')}`);
  }
});

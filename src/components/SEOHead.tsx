import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { generateSEOTags } from '../utils/seo';
import type { PageKey } from '../utils/seo';

interface SEOHeadProps {
  pageKey: PageKey;
}

// index.html (and the per-route copies the build writes from it) already has
// these tags for crawlers that don't run JavaScript, so update them in place
// rather than adding a second copy. React 19's built-in <title>/<meta>/<link>
// hoisting would append duplicates next to them instead.
const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  // index.html uses property= for its twitter:* tags, so match either attribute
  let tag = document.head.querySelector(`meta[name="${key}"], meta[property="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const setLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    if (hreflang) tag.setAttribute('hreflang', hreflang);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const SEOHead: React.FC<SEOHeadProps> = ({ pageKey }) => {
  const { i18n } = useTranslation();
  const language = i18n.language === 'es' ? 'es' : 'en';

  useEffect(() => {
    const { title, meta, link } = generateSEOTags(pageKey, language);

    document.title = title;
    document.documentElement.lang = language;
    meta.forEach((tag) => {
      if (tag.name !== undefined) setMeta('name', tag.name, tag.content);
      else setMeta('property', tag.property, tag.content);
    });
    link.forEach(({ rel, href, hreflang }) => setLink(rel, href, hreflang));
  }, [pageKey, language]);

  return null;
};

export default SEOHead;

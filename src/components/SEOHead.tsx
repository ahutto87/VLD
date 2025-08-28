import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { generateSEOTags } from '../utils/seo';
import type { seoConfigs } from '../utils/seo';

interface SEOHeadProps {
  pageKey: keyof typeof seoConfigs;
  customTitle?: string;
  customDescription?: string;
  customKeywords?: string[];
  noindex?: boolean;
  structuredData?: object[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  pageKey,
  customTitle,
  customDescription,
  customKeywords,
  noindex = false,
  structuredData = []
}) => {
  const { i18n } = useTranslation();
  const currentLang = (i18n.language as 'en' | 'es') || 'en';
  
  // Generate SEO tags based on current language and page
  const seoTags = generateSEOTags(pageKey, currentLang);
  
  // Override with custom values if provided
  const finalTitle = customTitle || seoTags.title;
  const finalDescription = customDescription || seoTags.meta.find(m => m.name === 'description')?.content || '';
  const finalKeywords = customKeywords 
    ? customKeywords.join(', ')
    : seoTags.meta.find(m => m.name === 'keywords')?.content || '';

  return (
    <Helmet>
      {/* Basic meta tags */}
      <html lang={currentLang} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      
      {/* Robots directive */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Language and location tags */}
      <meta name="language" content={currentLang} />
      <meta name="geo.region" content="US-TX" />
      <meta name="geo.placename" content="The Woodlands, Texas" />
      <meta name="geo.position" content="30.1588;-95.4892" />
      <meta name="ICBM" content="30.1588, -95.4892" />
      
      {/* Author and copyright */}
      <meta name="author" content="Viomar Güerere (Vio La Doula)" />
      <meta name="copyright" content={`© ${new Date().getFullYear()} Vio La Doula. All rights reserved.`} />
      
      {/* Open Graph tags */}
      {seoTags.meta
        .filter(tag => tag.property?.startsWith('og:'))
        .map((tag, index) => (
          <meta key={`og-${index}`} property={tag.property} content={tag.content} />
        ))}
      
      {/* Twitter Card tags */}
      {seoTags.meta
        .filter(tag => tag.name?.startsWith('twitter:'))
        .map((tag, index) => (
          <meta key={`twitter-${index}`} name={tag.name} content={tag.content} />
        ))}
      
      {/* Canonical and alternate links */}
      {seoTags.link.map((link, index) => (
        <link key={`link-${index}`} {...link} />
      ))}
      
      {/* Additional meta tags for better SEO */}
      <meta name="theme-color" content="#D17D44" />
      <meta name="msapplication-navbutton-color" content="#D17D44" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Favicon and app icons */}
      <link rel="icon" type="image/png" href="/VD_SECONDARY-LOGO_CREAM.png" />
      <link rel="apple-touch-icon" href="/VD_SECONDARY-LOGO_CREAM.png" />
      
      {/* Preload critical resources */}
      <link 
        rel="preload" 
        href="/fonts/Bogart-Light.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous"
      />
      <link 
        rel="preload" 
        href="/watercolor-pattern-2.png" 
        as="image"
      />
      
      {/* Structured data */}
      {structuredData.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
        />
      ))}
      
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
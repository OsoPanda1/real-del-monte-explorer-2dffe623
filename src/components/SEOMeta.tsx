import { useEffect } from 'react';

interface SEOMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'business' | 'event' | 'place';
  jsonLd?: Record<string, unknown>;
  publishedTime?: string;
  author?: string;
}

const DEFAULT_META = {
  title: 'RDM Digital - Real del Monte | Pueblo Mágico',
  description: 'Explora Real del Monte, Hidalgo: historia, cultura, ecoturismo, gastronomía y más. Descubre los mejores lugares, eventos y rutas turísticas.',
  image: '/og-image.jpg',
  siteName: 'RDM Digital',
  siteUrl: 'https://real-del-monte.com',
};

export function SEOMeta({
  title,
  description,
  image,
  url,
  type = 'website',
  jsonLd,
  publishedTime,
  author,
}: SEOMetaProps) {
  const fullTitle = title ? `${title} | ${DEFAULT_META.siteName}` : DEFAULT_META.title;
  const metaDescription = description || DEFAULT_META.description;
  const metaImage = image || DEFAULT_META.image;
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : DEFAULT_META.siteUrl);

  useEffect(() => {
    document.title = fullTitle;

    const getOrCreateMeta = (name: string, isProperty = false): HTMLMetaElement => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      return element;
    };

    getOrCreateMeta('description').content = metaDescription;
    getOrCreateMeta('og:title', true).content = fullTitle;
    getOrCreateMeta('og:description', true).content = metaDescription;
    getOrCreateMeta('og:image', true).content = metaImage;
    getOrCreateMeta('og:type', true).content = type;
    getOrCreateMeta('og:url', true).content = canonicalUrl;
    getOrCreateMeta('og:site_name', true).content = DEFAULT_META.siteName;
    getOrCreateMeta('twitter:card').content = 'summary_large_image';
    getOrCreateMeta('twitter:title').content = fullTitle;
    getOrCreateMeta('twitter:description').content = metaDescription;
    getOrCreateMeta('twitter:image').content = metaImage;

    if (type === 'article') {
      if (publishedTime) getOrCreateMeta('article:published_time', true).content = publishedTime;
      if (author) getOrCreateMeta('article:author', true).content = author;
    }

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    const defaultJsonLd: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: DEFAULT_META.siteName,
      description: metaDescription,
      url: canonicalUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${DEFAULT_META.siteUrl}/buscar?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@type': 'Organization',
        name: DEFAULT_META.siteName,
        logo: { '@type': 'ImageObject', url: metaImage },
      },
    };

    const finalJsonLd = jsonLd ? { ...defaultJsonLd, ...jsonLd } : defaultJsonLd;

    let scriptEl = document.querySelector('script[id="schema-org-jsonld"]') as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'schema-org-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(finalJsonLd);
  }, [fullTitle, metaDescription, metaImage, canonicalUrl, type, jsonLd, publishedTime, author]);

  return null;
}

export const PAGE_SEO = {
  home: {
    title: 'RDM Digital - Descubre Real del Monte',
    description: 'Tu guía completa para explorar Real del Monte, Hidalgo. Historia, cultura, ecoturismo, gastronomía, eventos y más.',
  },
  historia: {
    title: 'Historia de Real del Monte',
    description: 'Descubre la rica historia de Real del Monte, desde la época colonial hasta nuestros días.',
  },
  cultura: {
    title: 'Cultura y Tradiciones - Real del Monte',
    description: 'Explora la cultura y tradiciones del Pueblo Mágico de Real del Monte, Hidalgo.',
  },
  gastronomia: {
    title: 'Gastronomía - Sabores de Real del Monte',
    description: 'Descubre la gastronomía de Real del Monte: el tradicional paste, carnitas y más.',
  },
  rutas: {
    title: 'Rutas Turísticas - Explora Real del Monte',
    description: 'Descubre las mejores rutas de senderismo y caminatas en Real del Monte.',
  },
  ecoturismo: {
    title: 'Ecoturismo - Naturaleza en Real del Monte',
    description: 'Explora la naturaleza de Real del Monte: bosques, miradores y rutas de aventura.',
  },
  eventos: {
    title: 'Eventos y Actividades - Real del Monte',
    description: 'Consulta los próximos eventos, festivales y actividades en Real del Monte.',
  },
  dichos: {
    title: 'Dichos Personificados - Real del Monte',
    description: '47 expresiones tradicionales de Real del Monte. Descubre el rico vocabulario minero del Pueblo Mágico.',
  },
  arte: {
    title: 'Arte y Artesanías - Real del Monte',
    description: 'Descubre el arte local y las artesanías tradicionales de Real del Monte.',
  },
  catalogo: {
    title: 'Directorio de Negocios - RDM Digital',
    description: 'Encuentra restaurantes, hoteles, tiendas y servicios en Real del Monte.',
  },
  comunidad: {
    title: 'Comunidad - Comparte tu Experiencia',
    description: 'Comparte tus fotos, historias y experiencias en Real del Monte.',
  },
  relatos: {
    title: 'Relatos y Leyendas - Real del Monte',
    description: 'Conoce las leyendas y relatos del Pueblo Mágico de Real del Monte.',
  },
  mapa: {
    title: 'Mapa Interactivo - Real del Monte',
    description: 'Explora Real del Monte con nuestro mapa interactivo. Encuentra lugares, negocios y rutas.',
  },
  donar: {
    title: 'Apoya RDM Digital',
    description: 'Apoya el desarrollo de la plataforma turística de Real del Monte con tu donación.',
  },
};

export default SEOMeta;

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = 'Mzansi Prolife Development Institute NPC - Empowering Communities',
  description = 'Mzansi Prolife Development Institute NPC enables and improves the lives of ordinary citizens of South Africa to achieve extraordinary outcomes through community empowerment, skills development, and social change.',
  keywords = 'Mzansi Prolife, Development Institute, NPC, South Africa, Community Development, Skills Development, Social Change, Non-Profit',
  image = '/og-image.jpg',
  url = 'https://mzansiprolife.org',
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Mzansi Prolife Development Institute NPC');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'Mzansi Prolife Development Institute NPC', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional tags
    updateMetaTag('theme-color', '#16a34a'); // Green theme color
    updateMetaTag('msapplication-TileColor', '#16a34a');
  }, [title, description, keywords, image, url, type]);

  return null;
}


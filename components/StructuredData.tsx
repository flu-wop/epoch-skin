export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "name": "Epoch Skin",
        "description": "Premium waxing studio and Organic Skincare in New Orleans",
        "url": "https://epoch-skin.com",
        "telephone": "+1-504-777-4094",
        "email": "kayla@epoch-skin.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New Orleans",
          "addressRegion": "LA",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.9511",
          "longitude": "-90.0715"
        },
        "priceRange": "$$",
        "openingHours": "Mo-Sa 09:00-18:00",
        "image": "https://epoch-skin.com/images/studio.jpg",
        "sameAs": [
          "https://instagram.com/epoch_skin",
          "https://www.facebook.com/people/Epoch-Skin/61586356767825/",
          "https://tiktok.com/@epochskin"
        ]
      },
      {
        "@type": "Organization",
        "name": "Epoch Skin",
        "url": "https://epoch-skin.com",
        "logo": "https://epoch-skin.com/logos/main-logo.png",
        "founder": {
          "@type": "Person",
          "name": "Kayla Ford"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Add to layout.tsx <head>:
<StructuredData />
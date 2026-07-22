'use client';

import { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';

export default function CategoryProducts({
  slug,
  accent,
}: {
  slug: string;
  accent: string;
}) {
  const [products, setProducts] = useState<any[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/categorie/${slug}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (alive) setProducts(d.products ?? []);
      })
      .catch(() => {
        if (alive) setError(true);
      });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (error) {
    return (
      <p
        style={{
          color: '#6a5a42',
          fontStyle: 'italic',
          textAlign: 'center',
          padding: '3rem 1rem',
        }}
      >
        Ceva nu a mers bine, încearcă din nou într-un minut.
      </p>
    );
  }

  if (products === null) {
    return (
      <p
        style={{
          color: `${accent}88`,
          textAlign: 'center',
          padding: '3rem 1rem',
          fontSize: '1.4rem',
          letterSpacing: '0.3em',
        }}
      >
        ✦ ✦ ✦
      </p>
    );
  }

  return <ProductGrid products={products} accent={accent} />;
}

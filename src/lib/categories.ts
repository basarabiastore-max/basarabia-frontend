export type Category = {
  slug: string;
  icon: string;
  nameEn: string;
  nameRo: string;
  accent: string;
  highlight?: boolean;
  kind: 'static' | 'virtual';
};

export const categories: Category[] = [
  { slug: 'special-offer',          icon: '🏷️', nameEn: 'Special Offer!',        nameRo: 'Oferte Speciale',         accent: '#c0392b', highlight: true, kind: 'virtual' },
  { slug: 'new-products',           icon: '✨',  nameEn: 'NEW Products',           nameRo: 'Produse Noi',             accent: '#D4A017', highlight: true, kind: 'virtual' },
  { slug: 'moldavian-products',     icon: '🇲🇩', nameEn: 'Moldavian Products',     nameRo: 'Produse Moldovenești',    accent: '#9b59b6', kind: 'virtual' },
  { slug: 'international-products', icon: '🌍',  nameEn: 'International Products', nameRo: 'Produse Internaționale',  accent: '#1565c0', kind: 'virtual' },
  { slug: 'vegetables-fruits',      icon: '🥦',  nameEn: 'Vegetables & Fruits',    nameRo: 'Legume și Fructe',        accent: '#27ae60', kind: 'static' },
  { slug: 'general-products',       icon: '🛒',  nameEn: 'General Products',       nameRo: 'Produse Generale',        accent: '#7f8c8d', kind: 'static' },
  { slug: 'cans-jars',              icon: '🫙',  nameEn: 'Cans & Jars',            nameRo: 'Conserve și Borcane',     accent: '#e67e22', kind: 'static' },
  { slug: 'spices-flavours',        icon: '🌶️', nameEn: 'Spices & Flavours',      nameRo: 'Condimente și Arome',     accent: '#e74c3c', kind: 'static' },
  { slug: 'tea-coffee',             icon: '☕',  nameEn: 'Tea & Coffee',           nameRo: 'Ceai și Cafea',           accent: '#8B4513', kind: 'static' },
  { slug: 'sweets-snacks',          icon: '🍫',  nameEn: 'Sweets & Snacks',        nameRo: 'Dulciuri și Gustări',     accent: '#e91e8c', kind: 'static' },
  { slug: 'dairy',                  icon: '🧀',  nameEn: 'Dairy',                  nameRo: 'Lactate',                 accent: '#f1c40f', kind: 'static' },
  { slug: 'meat-products',          icon: '🥩',  nameEn: 'Meat Products',          nameRo: 'Produse din Carne',       accent: '#c0392b', kind: 'static' },
  { slug: 'cosmetics-cleaning',     icon: '🧴',  nameEn: 'Cosmetics & Cleaning',   nameRo: 'Cosmetice și Curățenie',  accent: '#16a085', kind: 'static' },
  { slug: 'soft-drinks',            icon: '🥤',  nameEn: 'Soft Drinks',            nameRo: 'Băuturi Răcoritoare',     accent: '#2980b9', kind: 'static' },
  { slug: 'alcohol',                icon: '🍷',  nameEn: 'Alcohol',                nameRo: 'Alcool',                  accent: '#8B1A1A', kind: 'static' },
];

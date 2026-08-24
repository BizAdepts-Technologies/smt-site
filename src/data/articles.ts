export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
}

export const articles: Article[] = [
  { id: '1', slug: 'minimal-kitchens-modern-living', title: 'Minimal Kitchens for Modern Living', category: 'Kitchen Design', date: '2026-08-15', excerpt: 'How thoughtful hardware choices transform kitchen functionality while maintaining clean, minimal aesthetics.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', readTime: '5 min' },
  { id: '2', slug: 'designing-smarter-wardrobes', title: 'Designing Smarter Wardrobes', category: 'Wardrobe Solutions', date: '2026-08-08', excerpt: 'The latest innovations in wardrobe interior systems that maximize storage and improve daily experience.', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80', readTime: '4 min' },
  { id: '3', slug: 'future-flexible-workspaces', title: 'The Future of Flexible Workspaces', category: 'Office Design', date: '2026-07-28', excerpt: 'How sliding systems and modular furniture are redefining the modern office environment.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', readTime: '6 min' },
  { id: '4', slug: 'small-details-transform-furniture', title: 'How Small Details Transform Furniture', category: 'Design Philosophy', date: '2026-07-15', excerpt: 'The invisible engineering behind premium furniture — why hinges, runners and mechanisms matter.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', readTime: '7 min' },
];

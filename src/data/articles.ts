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
  { id: '1', slug: 'minimal-furniture-modern-living', title: 'Invisible Mechanics for Modern Living', category: 'Furniture Design', date: '2026-08-15', excerpt: 'How thoughtful hardware choices transform functionality while maintaining clean, minimal aesthetics.', image: import.meta.env.BASE_URL + 'articles/minimal_modern_living.webp', readTime: '5 min' },
  { id: '2', slug: 'designing-smarter-drawers', title: 'Designing Smarter Drawer Systems', category: 'Cabinet Solutions', date: '2026-08-08', excerpt: 'The latest innovations in runner systems that maximize space and improve daily experience.', image: import.meta.env.BASE_URL + 'articles/smarter_drawer_systems.webp', readTime: '4 min' },
  { id: '3', slug: 'commercial-office-trends', title: 'The Future of Commercial Workspaces', category: 'Commercial Design', date: '2026-07-28', excerpt: 'How intelligent desk systems and smart sliding doors are redefining modern high-traffic offices.', image: import.meta.env.BASE_URL + 'articles/commercial_workspaces.webp', readTime: '6 min' },
  { id: '4', slug: 'impact-of-luxury-fittings', title: 'Architectural Edge Integration', category: 'Design Philosophy', date: '2026-07-15', excerpt: 'The invisible engineering behind architectural aluminium profiles — why precision lines and flawless surfaces matter.', image: import.meta.env.BASE_URL + 'articles/architectural_edge_integration.webp', readTime: '7 min' },
];

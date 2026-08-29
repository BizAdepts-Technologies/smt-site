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
  { id: '1', slug: 'minimal-furniture-modern-living', title: 'Invisible Mechanics for Modern Living', category: 'Furniture Design', date: '2026-08-15', excerpt: 'How thoughtful hardware choices transform functionality while maintaining clean, minimal aesthetics.', image: import.meta.env.BASE_URL + 'luxury_residential.jpeg', readTime: '5 min' },
  { id: '2', slug: 'designing-smarter-drawers', title: 'Designing Smarter Drawer Systems', category: 'Cabinet Solutions', date: '2026-08-08', excerpt: 'The latest innovations in runner systems that maximize space and improve daily experience.', image: import.meta.env.BASE_URL + 'drawer.jpeg', readTime: '4 min' },
  { id: '3', slug: 'commercial-office-trends', title: 'The Future of Commercial Workspaces', category: 'Commercial Design', date: '2026-07-28', excerpt: 'How intelligent desk systems and smart sliding doors are redefining modern high-traffic offices.', image: import.meta.env.BASE_URL + 'offices_commercial.jpeg', readTime: '6 min' },
  { id: '4', slug: 'impact-of-luxury-fittings', title: 'How Soft-Close Technology Transforms Hardware', category: 'Design Philosophy', date: '2026-07-15', excerpt: 'The invisible engineering behind premium hinges — why precision dampers and flawless articulation matter.', image: import.meta.env.BASE_URL + 'silentclose_hinge.jpeg', readTime: '7 min' },
];

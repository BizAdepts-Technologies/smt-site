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
  { id: '1', slug: 'minimal-bathrooms-modern-living', title: 'Minimal Bathrooms for Modern Living', category: 'Bathroom Design', date: '2026-08-15', excerpt: 'How thoughtful plumbing choices transform functionality while maintaining clean, minimal aesthetics.', image: import.meta.env.BASE_URL + 'luxury_residential.jpeg', readTime: '5 min' },
  { id: '2', slug: 'designing-smarter-showers', title: 'Designing Smarter Showers', category: 'Shower Solutions', date: '2026-08-08', excerpt: 'The latest innovations in thermostatic shower systems that maximize relaxation and improve daily experience.', image: import.meta.env.BASE_URL + 'luxury_showers.jpeg', readTime: '4 min' },
  { id: '3', slug: 'commercial-washroom-trends', title: 'The Future of Commercial Washrooms', category: 'Commercial Design', date: '2026-07-28', excerpt: 'How sensor faucets and smart hardware are redefining modern high-traffic hygiene.', image: import.meta.env.BASE_URL + 'commercial_washrooms.jpeg', readTime: '6 min' },
  { id: '4', slug: 'impact-of-luxury-fittings', title: 'How PVD Finishes Transform Hardware', category: 'Design Philosophy', date: '2026-07-15', excerpt: 'The invisible engineering behind premium faucets — why valves, flow channels, and gold finishes matter.', image: import.meta.env.BASE_URL + 'bathroom_hardwares.jpeg', readTime: '7 min' },
];

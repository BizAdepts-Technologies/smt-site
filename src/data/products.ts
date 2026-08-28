export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  benefits: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'silentclose-hinge',
    name: 'SilentClose Hinge',
    category: 'hinges',
    description: 'Advanced soft-closing technology designed to make every movement smoother, quieter and more refined. Engineered for premium cabinetry.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    specs: [
      { label: 'Opening Angle', value: '110°' },
      { label: 'Material', value: 'Nickel-plated Steel' },
      { label: 'Load Capacity', value: '20 kg' },
      { label: 'Finish', value: 'Matte Chrome' },
    ],
    benefits: ['Whisper-quiet closure', 'Adjustable tension', 'Long-lasting durability', 'Easy installation'],
  },
  {
    id: '2',
    slug: 'precision-drawer',
    name: 'Precision Drawer System',
    category: 'drawer-systems',
    description: 'Premium drawer system with full-extension capability and integrated soft-close mechanism for modern kitchen and wardrobe applications.',
    image: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800&q=80',
    specs: [
      { label: 'Extension', value: 'Full' },
      { label: 'Side Height', value: '90mm' },
      { label: 'Load Capacity', value: '40 kg' },
      { label: 'Material', value: 'Galvanized Steel' },
    ],
    benefits: ['Full extension access', 'Integrated damping', 'High load capacity', 'Silent operation'],
  },
  {
    id: '3',
    slug: 'slimline-runner',
    name: 'SlimLine Runner',
    category: 'runner-systems',
    description: 'Ultra-slim undermount runner system that disappears beneath the drawer, providing invisible support and flawless movement.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    specs: [
      { label: 'Type', value: 'Undermount' },
      { label: 'Length Range', value: '250-600mm' },
      { label: 'Load Capacity', value: '30 kg' },
      { label: 'Finish', value: 'Zinc-plated' },
    ],
    benefits: ['Invisible installation', 'Smooth glide', 'Synchronized movement', 'Corrosion resistant'],
  },
  {
    id: '4',
    slug: 'slidex-pro',
    name: 'SlideX Pro',
    category: 'sliding-systems',
    description: 'Professional sliding door system for wardrobes, room dividers and pocket doors with precision track engineering.',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80',
    specs: [
      { label: 'Door Weight', value: 'Up to 80 kg' },
      { label: 'Track Type', value: 'Top-hung' },
      { label: 'Material', value: 'Aluminum Alloy' },
      { label: 'Finish', value: 'Anodized Silver' },
    ],
    benefits: ['Whisper-quiet glide', 'Soft-close option', 'Heavy-duty capacity', 'Minimal maintenance'],
  },
  {
    id: '5',
    slug: 'corner-max',
    name: 'CornerMax Solution',
    category: 'cabinet-interiors',
    description: 'Intelligent corner storage solution that maximizes every inch of cabinet space with smooth pull-out and rotation mechanics.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    specs: [
      { label: 'Rotation', value: '180°' },
      { label: 'Load Capacity', value: '25 kg' },
      { label: 'Material', value: 'Steel + ABS' },
      { label: 'Finish', value: 'Chrome/White' },
    ],
    benefits: ['Maximum space utilization', 'Easy access', 'Smooth rotation', 'Durable construction'],
  },
  {
    id: '6',
    slug: 'lift-assist',
    name: 'LiftAssist Mechanism',
    category: 'furniture-accessories',
    description: 'Gas-spring assisted lift mechanism for overhead cabinets, ensuring safe and effortless opening with adjustable holding force.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    specs: [
      { label: 'Force Range', value: '60-150N' },
      { label: 'Opening Angle', value: '75-107°' },
      { label: 'Material', value: 'Steel + Gas Spring' },
      { label: 'Finish', value: 'Nickel-plated' },
    ],
    benefits: ['Effortless lifting', 'Adjustable force', 'Safe operation', 'Long lifespan'],
  },
];

export const categories = [
  { id: 'fittings', name: 'Plumbing Fittings', description: 'Premium faucets, mixers, and control valves with flawless chrome and gold finishes.', image: import.meta.env.BASE_URL + 'plumbing_fittings.jpeg', count: 24 },
  { id: 'showers', name: 'Luxury Showers', description: 'Rain showers, hand showers, and complete thermostatic shower systems.', image: import.meta.env.BASE_URL + 'luxury_showers.jpeg', count: 18 },
  { id: 'closets', name: 'Premium Closets', description: 'Intelligent water closets, wall-hung toilets, and automated smart bathroom seating.', image: import.meta.env.BASE_URL + 'premium_closets.jpeg', count: 15 },
  { id: 'hardware', name: 'Bathroom Hardware', description: 'Towel rails, robe hooks, soap dispensers, and essential bathroom accessories.', image: import.meta.env.BASE_URL + 'bathroom_hardwares.jpeg', count: 42 },
  { id: 'vanities', name: 'Vanity Units', description: 'Luxury bathroom storage, under-sink cabinets, and pristine washbasin consoles.', image: import.meta.env.BASE_URL + 'vanity_units.jpeg', count: 20 },
  { id: 'washbasins', name: 'Washbasins', description: 'Ceramic, marble, and composite basins for a sophisticated minimalist aesthetic.', image: import.meta.env.BASE_URL + 'washbase.jpeg', count: 16 },
];

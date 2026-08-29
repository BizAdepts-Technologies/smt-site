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
    image: import.meta.env.BASE_URL + 'silentclose_hinge.jpeg',
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
    image: import.meta.env.BASE_URL + 'drawer.jpeg',
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
    image: import.meta.env.BASE_URL + 'drawer.jpeg',
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
    image: import.meta.env.BASE_URL + 'sliding_doors.jpeg',
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
    slug: 'prolock-handles',
    name: 'ProLock Luxury Handles',
    category: 'furniture-accessories',
    description: 'Intelligent handle solutions that provide sleek aesthetics with integrated locking mechanics. Perfect for high-end furniture.',
    image: import.meta.env.BASE_URL + 'prolock_handles.jpeg',
    specs: [
      { label: 'Dimensions', value: '160mm - 320mm' },
      { label: 'Lock Type', value: 'Concealed Magnetic' },
      { label: 'Material', value: 'Stainless Steel' },
      { label: 'Finish', value: 'Brushed Brass/Black' },
    ],
    benefits: ['Seamless design', 'Secure locking', 'Ergonomic grip', 'Durable construction'],
  },
  {
    id: '6',
    slug: 'assembly-practica',
    name: 'Practica Assembly Machinery',
    category: 'assembly-tools',
    description: 'Precision processing and assembly machinery for efficient and flawless installation of advanced drawer systems.',
    image: import.meta.env.BASE_URL + 'assembly_machinery.jpeg',
    specs: [
      { label: 'Operation', value: 'Pneumatic' },
      { label: 'Compatibility', value: 'ArciTech / AvanTech' },
      { label: 'Material', value: 'Industrial Grade Steel' },
      { label: 'Power', value: '220V' },
    ],
    benefits: ['Rapid assembly', 'Error-free pressing', 'Safe operation', 'Long lifespan'],
  },
];

export const categories = [
  { id: 'hinges', name: 'Hinges & Fittings', description: 'Premium soft-closing hinges designed for flawless door articulation.', image: import.meta.env.BASE_URL + 'hinges&fittings.jpeg', count: 24 },
  { id: 'drawers', name: 'Drawer Systems', description: 'Intelligent runner systems and drawer mechanics for smooth, silent operation.', image: import.meta.env.BASE_URL + 'drawer.jpeg', count: 18 },
  { id: 'sliding-doors', name: 'Sliding Door Systems', description: 'Advanced sliding door mechanisms for wardrobes, cabinets and dividers.', image: import.meta.env.BASE_URL + 'sliding_doors.jpeg', count: 15 },
  { id: 'handles', name: 'ProLock Luxury Handles', description: 'Elegant handles and touch-in hardware that provide the perfect finishing touch.', image: import.meta.env.BASE_URL + 'prolock_handles.jpeg', count: 42 },
  { id: 'table-desk', name: 'Table & Desk Systems', description: 'Innovative lift systems and hardware framing for modern office layouts.', image: import.meta.env.BASE_URL + 'table.jpeg', count: 20 },
  { id: 'machinery', name: 'Assembly Machinery', description: 'High-precision processing technology and assembly tools for cabinet makers.', image: import.meta.env.BASE_URL + 'assembly_machinery.jpeg', count: 16 },
];

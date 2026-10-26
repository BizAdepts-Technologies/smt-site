export const companyInfo = {
  name: 'Sahab Al Mabelah',
  fullName: 'Sahab Al Mabelah Trading LLC',
  tagline: 'Premium products and reliable service to the furniture, interior, and construction industries',
  location: 'Muscat, Sultanate of Oman',
  email: 'info@sahabalmabelah.com',
  phone: '+968 2412 3456',
  address: 'Office no:3-C, Vitality logistics, opposite of asian paints warehouse, Muscat, Oman',
  mapLink: 'https://goo.gl/maps/PGNd6KGx9jxMoBRR9',
  founded: '2007',
  founder: 'Mr. Shameem Shah',
  employees: '25',
  markets: 6,
  solutions: 500,
  yearsExperience: new Date().getFullYear() - 2007,
  qualityScore: 99,
};

export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Resources', href: '/resources' },
  { label: 'Contact', href: '/contact' },
];

export interface MegaMenuCategoryItem {
  id: string;
  title: string;
  items: string[];
  image: string;
  href?: string;
}

export interface PartnerBrandMegaMenu {
  id: 'hettich' | 'iblue';
  name: string;
  badge: string;
  tagline: string;
  description: string;
  filterHref: string;
  accentColor: string;
  categories: MegaMenuCategoryItem[];
}

export const megaMenuPartners: PartnerBrandMegaMenu[] = [
  {
    id: 'hettich',
    name: 'Hettich',
    badge: 'German Engineering',
    tagline: 'Precision Furniture Fittings & Architectural Extrusions',
    description: 'World-renowned German fittings, handleless Gola profiles, pro luxury handles, and kitchen storage systems.',
    filterHref: '/products?partner=hettich',
    accentColor: 'gold',
    categories: [
      { id: 'aluminium-profiles', title: 'Aluminium Profiles & Gola', items: ['Gola Handleless Channels', '19mm & 45mm Glass Frames', 'Edge Banding Profiles', 'Curved Shutter Profiles'], image: import.meta.env.BASE_URL + 'hettich_aluminium_profile/aluminium_profiles_category_hero.webp' },
      { id: 'applied-kitchens', title: 'Applied Kitchen Systems HD', items: ['Modern White Glass Suites', 'Handleless Island Suites', 'Flap Wall Cabinets', 'Sliding Wardrobe Applications'], image: import.meta.env.BASE_URL + 'hettich_applied_kitchen_images_HD/01_modern_white_glass_frame_kitchen.jpg' },
      { id: 'door-handles', title: 'Pro Luxury Door Handles', items: ['Pro Luxury Handle 03', 'Pro Luxury Handle 04', 'Inox Brass & Red Copper', 'Architectural Alloy Levers'], image: import.meta.env.BASE_URL + 'hettich_handels/hettich_handles_category_hero.webp' },
      { id: 'furniture-accessories', title: 'Furniture & Storage Accessories', items: ['Tandem Tall Larder Systems', 'Corner Pull-Out Pro Units', 'Slim Pantry Towers', 'In-Drawer Plate Racks'], image: import.meta.env.BASE_URL + 'hettich_accessories/hettich_accessories_hero.webp' },
    ],
  },
  {
    id: 'iblue',
    name: 'iBlue',
    badge: 'Architectural Systems',
    tagline: 'Smart Access, Frameless Glass & Door Hardware',
    description: 'Advanced biometric smart door locks, SUS304 glass patch fittings, hydraulic floor springs, and silent sliding systems.',
    filterHref: '/products?partner=iblue',
    accentColor: 'blue',
    categories: [
      { id: 'smart-access', title: 'Smart Digital Locks', items: ['Biometric Touch X9 Lock', 'Backlit Touch Keypad Access', 'RFID Card & App Control', 'Anti-Pick Concealed Mortise'], image: import.meta.env.BASE_URL + 'iblue_hardware/iblue_smart_lock_x9.jpg' },
      { id: 'glass-systems', title: 'Glass Hardware & Patch Fittings', items: ['SUS304 Patch Fitting Sets', 'Concealed Floor Springs FS-500', '90° Heavy-Duty Shower Hinges', 'Pivot Top & Bottom Sets'], image: import.meta.env.BASE_URL + 'iblue_hardware/iblue_glass_patch_fitting.jpg' },
      { id: 'door-ironmongery', title: 'Architectural Door Ironmongery', items: ['Solid Brass Mortise Handle MH-01', 'Magnetic Silent Latch Systems', 'Concealed Escutcheon Rosettes', 'Stainless Steel Lever Sets'], image: import.meta.env.BASE_URL + 'iblue_hardware/iblue_floor_spring_fs500.jpg' },
      { id: 'sliding-systems', title: 'Sliding & Pocket Door Systems', items: ['Whisper-Glide Glass Sliding SD-80', 'Dual Hydraulic Soft-Close', 'Top-Hung Concealed Tracks', 'Heavy-Duty Glass Rollers'], image: import.meta.env.BASE_URL + 'iblue_hardware/iblue_sliding_system_sd80.jpg' },
    ],
  },
];

export const megaMenuCategories = [
  { id: 'aluminium-profiles', title: 'Aluminium Profiles', items: ['Gola Handleless', 'Frame Profiles', 'Edge Banding', 'Glass Shutters'], image: import.meta.env.BASE_URL + 'hettich_aluminium_profile/aluminium_profiles_category_hero.webp' },
  { id: 'door-handles', title: 'Door Handles', items: ['Hettich Pro Luxury', 'Handle 04', 'Premium Bronze', 'Architectural Alloy'], image: import.meta.env.BASE_URL + 'hettich_handels/hettich_handles_category_hero.webp' },
  { id: 'furniture-accessories', title: 'Storage & Accessories', items: ['Larder Units', 'Pull-Out Baskets', 'Corner Systems', 'Plate Organizers'], image: import.meta.env.BASE_URL + 'hettich_accessories/hettich_accessories_hero.webp' },
];

export const solutions = [
  { id: 'residential', title: 'Luxury Residential', description: 'Transform living spaces with furniture fittings that provide convenient and reliable operation. Usually invisible, but essential.', image: import.meta.env.BASE_URL + 'luxury_residential.webp' },
  { id: 'hospitality', title: 'Hospitality', description: 'Enduring hardware for premium hotels. Built into furniture of all kinds, ensuring whisper-quiet movement and intensive use durability.', image: import.meta.env.BASE_URL + 'hospitality.webp' },
  { id: 'commercial', title: 'Offices & Commercial', description: 'Table and desk systems, intelligent organizers, and sliding solutions designed for high-traffic work environments.', image: import.meta.env.BASE_URL + 'offices_commercial.webp' },
];

export const audienceSegments = [
  { id: 'architects', title: 'Architects', description: 'Design with freedom. Build with confidence. Access technical resources and planning tools for architectural integration.', cta: 'Explore architect resources' },
  { id: 'manufacturers', title: 'Furniture Manufacturers', description: 'Reliable hardware solutions that elevate your product quality and manufacturing efficiency.', cta: 'View manufacturer solutions' },
  { id: 'cabinet-makers', title: 'Cabinet Makers', description: 'Precision fittings that make installation smoother and the finished product exceptional.', cta: 'Explore cabinet solutions' },
  { id: 'designers', title: 'Interior Designers', description: 'Curated solutions that bring your vision to life with hardware that matches your design standards.', cta: 'Designer resources' },
  { id: 'distributors', title: 'Distributors', description: 'Partner with a brand that architects and manufacturers trust across the Middle East.', cta: 'Become a distributor' },
  { id: 'end-customers', title: 'End Customers', description: 'Discover how premium furniture fittings transform your home into a space of quiet luxury.', cta: 'Find a dealer' },
];

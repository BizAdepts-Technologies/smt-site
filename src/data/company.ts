export const companyInfo = {
  name: 'SMT',
  fullName: 'SMT Bath & Plumbing Solutions',
  tagline: 'Premium plumbing fittings and luxury bath solutions',
  location: 'Muscat, Sultanate of Oman',
  email: 'info@smt-oman.com',
  phone: '+968 2412 3456',
  address: 'Building 247, Way 2903, Al Khuwair, Muscat, Oman',
  founded: '2001',
  employees: '120+',
  markets: 40,
  solutions: 500,
  yearsExperience: 25,
  qualityScore: 99,
};

export const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Inspiration', href: '/inspiration' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const megaMenuCategories = [
  { title: 'Fittings', items: ['Basin mixers', 'Bath mixers', 'Bidet mixers'], image: import.meta.env.BASE_URL + 'plumbing_fittings.jpeg' },
  { title: 'Showers', items: ['Rain showers', 'Hand showers', 'Thermostats'], image: import.meta.env.BASE_URL + 'luxury_showers.jpeg' },
  { title: 'Closets', items: ['Wall-hung', 'Floor-standing', 'Smart toilets'], image: import.meta.env.BASE_URL + 'premium_closets.jpeg' },
  { title: 'Hardware', items: ['Towel rails', 'Soap dispensers', 'Robe hooks'], image: import.meta.env.BASE_URL + 'bathroom_hardwares.jpeg' },
  { title: 'Vanities', items: ['Under-sink cabinets', 'Mirrors', 'Consoles'], image: import.meta.env.BASE_URL + 'vanity_units.jpeg' },
  { title: 'Washbasins', items: ['Countertop', 'Under-mount', 'Free-standing'], image: import.meta.env.BASE_URL + 'washbase.jpeg' },
];

export const solutions = [
  { id: 'residential', title: 'Luxury Residential', description: 'Transform master bathrooms into personal spas with thermostatic showers, elegant freestanding tubs, and pristine gold fittings.', image: import.meta.env.BASE_URL + 'luxury_residential.jpeg' },
  { id: 'hospitality', title: 'Hospitality', description: 'Enduring luxury for premium hotels. Our heavy-duty yet elegant hardware withstands intensive use while providing a flawless guest experience.', image: import.meta.env.BASE_URL + 'hospitality.jpeg' },
  { id: 'commercial', title: 'Commercial Washrooms', description: 'Sensor-operated faucets, robust smart closets, and hygienic solutions designed for high-traffic environments.', image: import.meta.env.BASE_URL + 'commercial_washrooms.jpeg' },
];

export const audienceSegments = [
  { id: 'architects', title: 'Architects', description: 'Design with freedom. Build with confidence. Access technical resources and planning tools.', cta: 'Explore architect resources' },
  { id: 'manufacturers', title: 'Furniture Manufacturers', description: 'Reliable hardware solutions that elevate your product quality and manufacturing efficiency.', cta: 'View manufacturer solutions' },
  { id: 'cabinet-makers', title: 'Cabinet Makers', description: 'Precision fittings that make installation smoother and the finished product exceptional.', cta: 'Explore cabinet solutions' },
  { id: 'designers', title: 'Interior Designers', description: 'Curated solutions that bring your vision to life with hardware that matches your design standards.', cta: 'Designer resources' },
  { id: 'distributors', title: 'Distributors', description: 'Partner with a brand that architects and manufacturers trust across the Middle East.', cta: 'Become a distributor' },
  { id: 'end-customers', title: 'End Customers', description: 'Discover how premium furniture fittings transform your home into a space of quiet luxury.', cta: 'Find a dealer' },
];

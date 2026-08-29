export const companyInfo = {
  name: 'SMT',
  fullName: 'Sahab Al Mabelah Trading LLC',
  tagline: 'Premium furniture fittings and intelligent home solutions',
  location: 'Muscat, Sultanate of Oman',
  email: 'info@sahabalmabelah.com',
  phone: '+968 2412 3456',
  address: 'Office no:3-C, Vitality logistics, opposite of asian paints warehouse, Muscat, Oman',
  mapLink: 'https://goo.gl/maps/PGNd6KGx9jxMoBRR9',
  founded: '2007',
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
  { title: 'Hinges', items: ['Sensys', 'Intermat', 'SlideOn'], image: import.meta.env.BASE_URL + 'hinges&fittings.jpeg' },
  { title: 'Drawers', items: ['AvanTech YOU', 'ArciTech', 'InnoTech Atira'], image: import.meta.env.BASE_URL + 'drawer.jpeg' },
  { title: 'Runners', items: ['Actro 5D', 'Quadro', 'Ball Bearing'], image: import.meta.env.BASE_URL + 'drawer.jpeg' },
  { title: 'Sliding Doors', items: ['TopLine', 'SlideLine', 'WingLine'], image: import.meta.env.BASE_URL + 'sliding_doors.jpeg' },
  { title: 'Handles', items: ['ProLock Luxury', 'Touch-in', 'Aluminium Handles'], image: import.meta.env.BASE_URL + 'prolock_handles.jpeg' },
  { title: 'Assembly', items: ['Practica', 'BlueMax', 'Accura'], image: import.meta.env.BASE_URL + 'assembly_machinery.jpeg' },
];

export const solutions = [
  { id: 'residential', title: 'Luxury Residential', description: 'Transform living spaces with furniture fittings that provide convenient and reliable operation. Usually invisible, but essential.', image: import.meta.env.BASE_URL + 'luxury_residential.jpeg' },
  { id: 'hospitality', title: 'Hospitality', description: 'Enduring hardware for premium hotels. Built into furniture of all kinds, ensuring whisper-quiet movement and intensive use durability.', image: import.meta.env.BASE_URL + 'hospitality.jpeg' },
  { id: 'commercial', title: 'Offices & Commercial', description: 'Table and desk systems, intelligent organizers, and sliding solutions designed for high-traffic work environments.', image: import.meta.env.BASE_URL + 'offices_commercial.jpeg' },
];

export const audienceSegments = [
  { id: 'architects', title: 'Architects', description: 'Design with freedom. Build with confidence. Access technical resources and planning tools for architectural integration.', cta: 'Explore architect resources' },
  { id: 'manufacturers', title: 'Furniture Manufacturers', description: 'Reliable hardware solutions that elevate your product quality and manufacturing efficiency.', cta: 'View manufacturer solutions' },
  { id: 'cabinet-makers', title: 'Cabinet Makers', description: 'Precision fittings that make installation smoother and the finished product exceptional.', cta: 'Explore cabinet solutions' },
  { id: 'designers', title: 'Interior Designers', description: 'Curated solutions that bring your vision to life with hardware that matches your design standards.', cta: 'Designer resources' },
  { id: 'distributors', title: 'Distributors', description: 'Partner with a brand that architects and manufacturers trust across the Middle East.', cta: 'Become a distributor' },
  { id: 'end-customers', title: 'End Customers', description: 'Discover how premium furniture fittings transform your home into a space of quiet luxury.', cta: 'Find a dealer' },
];

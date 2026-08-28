export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: string;
  solution: string;
  description: string;
  image: string;
  year: string;
}

export const projects: Project[] = [
  { id: '1', slug: 'al-noor-residence', title: 'Al Noor Residence', location: 'Muscat, Oman', type: 'Residential', solution: 'Complete Bath Fittings + Showers', description: 'Creating unparalleled relaxation spaces through intelligent thermostatic showers and gold finishes in a contemporary Omani villa.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80', year: '2026' },
  { id: '2', slug: 'muscat-business-district', title: 'Muscat Business District Tower', location: 'Muscat, Oman', type: 'Commercial', solution: 'Sensor Faucets + Commercial Closets', description: 'Premium hygienic washroom solutions and automated smart toilets for a landmark commercial development in the heart of Muscat.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80', year: '2025' },
  { id: '3', slug: 'salalah-hospitality', title: 'Salalah Beach Resort', location: 'Salalah, Oman', type: 'Hospitality', solution: 'Freestanding Tubs + Vanity Basins', description: 'Full-spectrum luxury bathroom hardware solutions for a 5-star resort development on the pristine Dhofar coast.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', year: '2025' },
];

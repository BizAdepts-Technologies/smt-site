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
  { id: '1', slug: 'al-noor-residence', title: 'Al Noor Residence', location: 'Muscat, Oman', type: 'Residential', solution: 'Cabinet interiors + sliding systems', description: 'Creating seamless storage through intelligent furniture systems in a contemporary Omani villa.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80', year: '2026' },
  { id: '2', slug: 'muscat-business-district', title: 'Muscat Business District Tower', location: 'Muscat, Oman', type: 'Commercial', solution: 'Office furniture systems', description: 'Premium office furniture solutions for a landmark commercial development in the heart of Muscat.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', year: '2025' },
  { id: '3', slug: 'salalah-hospitality', title: 'Salalah Beach Resort', location: 'Salalah, Oman', type: 'Hospitality', solution: 'Complete furniture fittings', description: 'Full-spectrum furniture hardware solutions for a luxury resort development on the Dhofar coast.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80', year: '2025' },
];

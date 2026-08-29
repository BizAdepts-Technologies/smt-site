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
  { id: '1', slug: 'al-noor-residence', title: 'Al Noor Residence', location: 'Muscat, Oman', type: 'Residential', solution: 'Complete Cabinet Fittings', description: 'Providing unparalleled convenience and invisible precision for a contemporary Omani villa’s kitchen and wardrobe systems.', image: import.meta.env.BASE_URL + 'luxury_residential.jpeg', year: '2026' },
  { id: '2', slug: 'muscat-business-district', title: 'Muscat Business District Tower', location: 'Muscat, Oman', type: 'Commercial', solution: 'Desk Systems + Sliding Doors', description: 'Premium workstation hardware and sliding solutions for a landmark commercial development in the heart of Muscat.', image: import.meta.env.BASE_URL + 'offices_commercial.jpeg', year: '2025' },
  { id: '3', slug: 'salalah-hospitality', title: 'Salalah Beach Resort', location: 'Salalah, Oman', type: 'Hospitality', solution: 'Wardrobe Systems + Hinges', description: 'Full-spectrum luxury furniture hardware solutions for a 5-star resort development on the pristine Dhofar coast.', image: import.meta.env.BASE_URL + 'hospitality.jpeg', year: '2025' },
];

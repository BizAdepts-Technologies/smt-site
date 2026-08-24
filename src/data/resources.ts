export interface Resource {
  id: string;
  title: string;
  type: 'catalogue' | 'technical' | 'installation' | 'cad' | 'brochure' | 'certificate';
  format: string;
  size: string;
  description: string;
  date: string;
}

export const resources: Resource[] = [
  { id: '1', title: 'Furniture Solutions Catalogue 2026', type: 'catalogue', format: 'PDF', size: '18.4 MB', description: 'Complete product catalogue with specifications and applications.', date: '2026-01-15' },
  { id: '2', title: 'Hinge Technical Specifications', type: 'technical', format: 'PDF', size: '4.2 MB', description: 'Detailed technical data for all hinge products.', date: '2026-02-01' },
  { id: '3', title: 'Drawer System Installation Guide', type: 'installation', format: 'PDF', size: '8.7 MB', description: 'Step-by-step installation instructions for drawer systems.', date: '2026-01-20' },
  { id: '4', title: 'CAD Library — Complete Collection', type: 'cad', format: 'DWG / DXF', size: '124 MB', description: '2D and 3D CAD files for architectural planning.', date: '2026-03-01' },
  { id: '5', title: 'Sustainability Report 2025', type: 'brochure', format: 'PDF', size: '6.1 MB', description: 'Environmental commitment and responsible manufacturing.', date: '2026-01-10' },
  { id: '6', title: 'ISO 9001:2015 Certificate', type: 'certificate', format: 'PDF', size: '1.2 MB', description: 'Quality management system certification.', date: '2025-12-01' },
];

export const resourceFilters = [
  { id: 'all', label: 'All Resources' },
  { id: 'catalogue', label: 'Product Catalogues' },
  { id: 'technical', label: 'Technical Documents' },
  { id: 'installation', label: 'Installation Guides' },
  { id: 'cad', label: 'CAD Files' },
  { id: 'brochure', label: 'Brochures' },
  { id: 'certificate', label: 'Certificates' },
];

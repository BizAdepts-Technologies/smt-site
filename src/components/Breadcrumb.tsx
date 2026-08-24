import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  '': 'Home',
  'products': 'Products',
  'product': 'Product',
  'solutions': 'Solutions',
  'inspiration': 'Inspiration',
  'projects': 'Projects',
  'resources': 'Resources',
  'about': 'About',
  'contact': 'Contact',
};

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="pt-28 pb-4 bg-warm-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link to="/" className="text-warm-grey hover:text-rust transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = routeLabels[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <li key={name} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-warm-grey" />
                {isLast ? (
                  <span className="text-charcoal font-medium">{label}</span>
                ) : (
                  <Link to={routeTo} className="text-warm-grey hover:text-rust transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

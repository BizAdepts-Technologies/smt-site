import { Link } from 'react-router-dom';
import { ArrowUp, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-charcoal text-white">
      {/* Brand Statement */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">
            Create the perfect <span className="text-gold">sanctuary.</span>
          </h2>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Collections</h3>
            <ul className="space-y-3">
              {['Fittings', 'Showers', 'Closets', 'Hardware', 'Vanities'].map((item) => (
                <li key={item}>
                  <Link to={`/products`} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Solutions</h3>
            <ul className="space-y-3">
              {['Residential', 'Hospitality', 'Commercial', 'Wellness', 'Spas'].map((item) => (
                <li key={item}>
                  <Link to={`/solutions`} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Company</h3>
            <ul className="space-y-3">
              {['About', 'Projects', 'Inspiration', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Resources</h3>
            <ul className="space-y-3">
              {['Downloads', 'Brochures', 'Technical Data', 'Installation Guides', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link to="/resources" className="text-sm text-white/70 hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-white/50">
            <span>© 2026 SMT Bath Solutions</span>
            <Link to="/" className="hover:text-gold transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-gold transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-gold transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-white/50 hover:text-gold transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/50 hover:text-gold transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-gold transition-colors"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

import { Link } from 'react-router-dom';
import { ArrowUp, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-charcoal text-white">
      {/* Brand Statement */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Let's move furniture <span className="text-rust">forward.</span>
          </h2>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Products</h3>
            <ul className="space-y-3">
              {['Hinges', 'Drawer Systems', 'Runner Systems', 'Sliding Systems', 'Cabinet Interiors'].map((item) => (
                <li key={item}>
                  <Link to={`/products`} className="text-sm text-white/70 hover:text-rust transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Solutions</h3>
            <ul className="space-y-3">
              {['Kitchen', 'Bedroom', 'Living', 'Office', 'Hospitality'].map((item) => (
                <li key={item}>
                  <Link to={`/solutions`} className="text-sm text-white/70 hover:text-rust transition-colors">
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
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-white/70 hover:text-rust transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Resources</h3>
            <ul className="space-y-3">
              {['Downloads', 'Catalogues', 'Technical Support', 'CAD & Planning', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link to="/resources" className="text-sm text-white/70 hover:text-rust transition-colors">
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
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-white/50">
            <span>© 2026 SMT Furniture Solutions</span>
            <Link to="/" className="hover:text-rust transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-rust transition-colors">Terms</Link>
            <Link to="/" className="hover:text-rust transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-rust transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="text-white/50 hover:text-rust transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/50 hover:text-rust transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-rust transition-colors"
          >
            Back to top <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

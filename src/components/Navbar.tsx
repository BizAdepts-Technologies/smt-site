import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import { navLinks, megaMenuCategories } from '../data/company';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
    setSearchOpen(false);
  }, [location]);

  const isHome = location.pathname === '/';
  const navBg = scrolled || !isHome ? 'bg-warm-white/95 backdrop-blur-md border-b border-warm-beige' : 'bg-transparent';
  const textColor = 'text-charcoal';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className={`text-3xl font-extrabold tracking-tight transition-colors duration-300 ${textColor}`}>
                SMT
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.label === 'Products' && setMegaOpen(true)}
                  onMouseLeave={() => link.label === 'Products' && setMegaOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`text-sm font-bold tracking-wide transition-colors duration-300 hover:text-gold ${textColor} ${location.pathname === link.href ? 'text-gold' : ''}`}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className={`p-2 transition-colors duration-300 hover:text-gold ${textColor}`}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <span className={`hidden md:block text-sm font-bold ${textColor}`}>EN</span>
              <Link
                to="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white text-sm font-bold hover:bg-gold-deep transition-colors duration-300"
              >
                Talk to us
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className={`lg:hidden p-2 ${textColor}`}
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {megaOpen && (
          <div
            className="absolute top-full left-0 right-0 bg-warm-white border-b border-warm-beige shadow-lg"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {megaMenuCategories.map((cat) => (
                  <div key={cat.title} className="group cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden mb-3 bg-warm-beige">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-charcoal mb-2 group-hover:text-gold transition-colors">
                      {cat.title}
                    </h3>
                    <ul className="space-y-1">
                      {cat.items.map((item) => (
                        <li key={item} className="text-xs text-warm-grey hover:text-gold transition-colors cursor-pointer">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-warm-beige">
                <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:gap-3 transition-all">
                  View all collections <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6">
              <span className="text-3xl font-extrabold text-charcoal">SMT</span>
              <button onClick={() => setMobileOpen(false)} className="text-charcoal p-2 hover:bg-warm-beige rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center justify-between py-4 border-b border-warm-beige text-charcoal text-2xl font-light hover:text-gold transition-colors"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                  <ChevronRight className="w-5 h-5 text-gold" />
                </Link>
              ))}
            </div>
            <div className="p-6">
              <Link
                to="/contact"
                className="block w-full text-center py-4 bg-gold text-white font-medium hover:bg-gold-deep transition-colors"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-md flex items-start justify-center pt-32">
          <div className="w-full max-w-3xl px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl text-charcoal font-light">What are you looking for?</h2>
              <button onClick={() => setSearchOpen(false)} className="text-charcoal p-2 hover:bg-warm-beige rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search faucets, showers, closets..."
              className="w-full bg-transparent border-b-2 border-warm-beige text-charcoal text-xl py-4 focus:outline-none focus:border-gold placeholder:text-warm-grey"
              autoFocus
            />
            <div className="mt-8">
              <p className="text-warm-grey text-sm mb-4">Popular searches</p>
              <div className="flex flex-wrap gap-3">
                {['Rain showers', 'Thermostatic mixers', 'Wall-mounted basins', 'Smart toilets', 'Gold finish'].map((term) => (
                  <span key={term} className="px-4 py-2 border border-warm-beige text-charcoal text-sm hover:border-gold hover:text-gold transition-colors cursor-pointer bg-warm-white">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

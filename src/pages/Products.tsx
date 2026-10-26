import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import axios from 'axios';
import { products as staticProducts, categories as staticCategories, Product, Category } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <motion.div ref={ref} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export default function Products() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const partnerQuery = searchParams.get('partner');

  const [search, setSearch] = useState('');
  const [activePartner, setActivePartner] = useState<'all' | 'hettich' | 'iblue'>(
    (partnerQuery === 'hettich' || partnerQuery === 'iblue') ? partnerQuery : 'all'
  );
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const [productList, setProductList] = useState<Product[]>(staticProducts);
  const [categoryList, setCategoryList] = useState<Category[]>(staticCategories);

  useEffect(() => {
    if (category) {
      setActiveCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (partnerQuery === 'hettich' || partnerQuery === 'iblue') {
      setActivePartner(partnerQuery);
    } else if (!partnerQuery) {
      setActivePartner('all');
    }
  }, [partnerQuery]);

  // Fetch from backend API with fallback to static data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          axios.get('http://localhost:8000/api/products/'),
          axios.get('http://localhost:8000/api/categories/')
        ]);

        if (catRes.data && catRes.data.length > 0) {
          const cats = catRes.data.map((c: any) => ({
            id: c.slug || String(c.id),
            name: c.name,
            partner: c.partner || 'all',
            description: c.description || '',
            image: c.image || '',
            count: c.products_count ?? c.products?.length ?? 0
          }));
          setCategoryList(cats);
        }

        if (prodRes.data && prodRes.data.length > 0) {
          const prods: Product[] = prodRes.data.map((p: any) => {
            const catSlug = p.category_slug || (catRes.data?.find((c: any) => c.id === p.category)?.slug) || 'other';
            const brandVal = (p.specs || []).find((s: any) => s.label?.toLowerCase() === 'brand')?.value?.toLowerCase();
            const partnerName = brandVal?.includes('iblue') ? 'iblue' : 'hettich';
            return {
              id: String(p.id),
              slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
              name: p.title,
              category: catSlug,
              partner: partnerName,
              description: p.description || '',
              image: p.image ? (p.image.startsWith('http') ? p.image : `http://localhost:8000${p.image}`) : '',
              specs: Array.isArray(p.specs) ? p.specs : [],
              benefits: Array.isArray(p.benefits) ? p.benefits : [],
            };
          });
          setProductList(prods);
        }
      } catch {
        // Fallback to staticProducts
      }
    };
    fetchData();
  }, []);

  const handlePartnerChange = (newPartner: 'all' | 'hettich' | 'iblue') => {
    setActivePartner(newPartner);
    setActiveCategory('all');
    const params = new URLSearchParams(searchParams);
    if (newPartner === 'all') {
      params.delete('partner');
    } else {
      params.set('partner', newPartner);
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearch('');
    setActivePartner('all');
    setActiveCategory('all');
    setSearchParams({});
  };

  // Filter categories shown in tabs based on selected partner
  const visibleCategories = categoryList.filter((c) => {
    if (activePartner === 'all') return true;
    return c.partner === activePartner || c.partner === 'all';
  });

  // Filter products based on search, partner, and category
  const filtered = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.specs && p.specs.some((s) => s.value.toLowerCase().includes(search.toLowerCase())));
    const matchesPartner = activePartner === 'all' || p.partner === activePartner;
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesPartner && matchesCategory;
  });

  return (
    <div className="pt-2 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal tracking-tight">Products</h1>
            <p className="text-warm-grey mt-4 max-w-xl">
              Precision-engineered furniture fittings, architectural aluminium profiles, luxury handles, and smart hardware solutions.
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Partner Filter */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-charcoal mr-2">Partner:</span>
          {[
            { id: 'all', label: 'All Partners' },
            { id: 'hettich', label: 'Hettich' },
            { id: 'iblue', label: 'iBlue' },
          ].map((partner) => (
            <button
              key={partner.id}
              onClick={() => handlePartnerChange(partner.id as 'all' | 'hettich' | 'iblue')}
              className={`px-4 py-2 text-sm border transition-colors ${
                activePartner === partner.id
                  ? 'border-rust bg-rust/5 text-rust font-medium'
                  : 'border-warm-beige bg-white text-warm-grey hover:border-charcoal hover:text-charcoal'
              }`}
            >
              {partner.label}
            </button>
          ))}
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="mt-4 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-2.5 bg-white border border-warm-beige text-charcoal text-sm placeholder:text-warm-grey focus:outline-none focus:border-rust"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm border transition-colors ${
                activeCategory === 'all'
                  ? 'border-rust bg-rust/5 text-rust font-medium'
                  : 'border-warm-beige bg-white text-warm-grey hover:border-charcoal hover:text-charcoal'
              }`}
            >
              All
            </button>
            {visibleCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  activeCategory === c.id
                    ? 'border-rust bg-rust/5 text-rust font-medium'
                    : 'border-warm-beige bg-white text-warm-grey hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Reset Filter */}
        <div className="mt-6 flex items-center justify-between text-xs text-warm-grey px-1">
          <div>
            Showing <strong className="text-charcoal font-semibold">{filtered.length}</strong> products
          </div>
          {(activeCategory !== 'all' || activePartner !== 'all' || search) && (
            <button
              onClick={handleResetFilters}
              className="text-rust hover:underline font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Product Cards Grid - Clean without floating badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filtered.map((product) => (
            <AnimatedSection key={product.id}>
              <motion.div variants={fadeUp} className="h-full">
                <Link
                  to={`/product/${product.slug}`}
                  className="group block h-full bg-white border border-warm-beige hover:border-rust transition-colors flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-warm-beige">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                        <span className="text-xs uppercase tracking-wider font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-rust text-xs font-medium tracking-wider uppercase block">
                        {product.category.replace('-', ' ')}
                      </span>
                      <h3 className="text-lg font-medium text-charcoal mt-1 group-hover:text-rust transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-warm-grey text-xs mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-warm-beige flex items-center justify-between text-xs font-medium text-rust opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white border border-warm-beige mt-8">
            <p className="text-warm-grey text-sm">No products found matching your criteria.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 border border-rust text-rust text-xs uppercase tracking-wider hover:bg-rust hover:text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

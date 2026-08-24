import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products, categories } from '../data/products';
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
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(category || 'all');

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">01 / PRODUCTS</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">Products</h1>
            <p className="text-warm-grey mt-4 max-w-xl">Precision-engineered furniture fittings designed for modern applications.</p>
          </motion.div>
        </AnimatedSection>

        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 bg-white border border-warm-beige text-charcoal focus:outline-none focus:border-rust"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-sm border transition-colors ${activeCategory === 'all' ? 'border-rust text-rust' : 'border-warm-beige text-warm-grey hover:border-charcoal'}`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 text-sm border transition-colors ${activeCategory === c.id ? 'border-rust text-rust' : 'border-warm-beige text-warm-grey hover:border-charcoal'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {filtered.map((product) => (
            <AnimatedSection key={product.id}>
              <motion.div variants={fadeUp}>
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-warm-beige mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="text-rust text-xs font-medium tracking-wider uppercase">{product.category.replace('-', ' ')}</span>
                  <h3 className="text-xl font-medium text-charcoal mt-1 group-hover:text-rust transition-colors">{product.name}</h3>
                  <p className="text-warm-grey text-sm mt-2 line-clamp-2">{product.description}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-sm text-rust font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View product <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-grey">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

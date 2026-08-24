import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { products } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const { ref, isVisible } = useScrollAnimation();

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-2xl text-charcoal">Product not found</h1>
        <Link to="/products" className="text-rust mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-warm-grey hover:text-rust transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="aspect-square overflow-hidden bg-warm-beige">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <span className="text-rust text-sm font-medium tracking-wider uppercase">{product.category.replace('-', ' ')}</span>
            <h1 className="text-4xl md:text-5xl font-light text-charcoal mt-3 tracking-tight">{product.name}</h1>
            <p className="text-warm-grey mt-6 leading-relaxed">{product.description}</p>

            <div className="mt-10">
              <h3 className="text-sm uppercase tracking-wider text-charcoal font-medium mb-4">Key Benefits</h3>
              <div className="space-y-3">
                {product.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-3 text-sm text-charcoal">
                    <span className="w-1.5 h-1.5 bg-rust rounded-full" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm uppercase tracking-wider text-charcoal font-medium mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="p-4 border border-warm-beige">
                    <span className="text-xs text-warm-grey uppercase">{spec.label}</span>
                    <p className="text-charcoal font-medium mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-rust text-white font-medium hover:bg-rust-deep transition-colors">
                Request Information <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal text-charcoal hover:border-rust hover:text-rust transition-colors">
                <Download className="w-4 h-4" /> Technical Sheet
              </button>
            </div>
          </motion.div>
        </div>

        {related.length > 0 && (
          <div className="mt-24" ref={ref}>
            <motion.div initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={fadeUp}>
              <h2 className="text-2xl font-light text-charcoal mb-8">Related Products</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link key={p.id} to={`/product/${p.slug}`} className="group">
                    <div className="aspect-[4/3] overflow-hidden bg-warm-beige mb-4">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <h3 className="text-lg font-medium text-charcoal group-hover:text-rust transition-colors">{p.name}</h3>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

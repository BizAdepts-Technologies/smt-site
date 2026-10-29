import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Package } from 'lucide-react';
import axios from 'axios';
import { products as staticProducts, Product } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function ProductDetail() {
  const { slug } = useParams();
  const [productList, setProductList] = useState<Product[]>(staticProducts);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/products/');
        if (res.data && res.data.length > 0) {
          const prods: Product[] = res.data.map((p: any) => ({
            id: String(p.id),
            product_code: p.product_code || '',
            slug: p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            name: p.title,
            partner: p.partner || 'hettich',
            category: p.category_slug || 'other',
            description: p.description || '',
            image: p.image ? (p.image.startsWith('http') ? p.image : `http://localhost:8000${p.image}`) : '',
            specs: Array.isArray(p.specs) ? p.specs : [],
            benefits: Array.isArray(p.benefits) ? p.benefits : [],
          }));
          setProductList(prods);
        }
      } catch {
        // Fallback to staticProducts
      }
    };
    fetchProducts();
  }, []);

  const product = productList.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="pt-4 pb-20 text-center">
        <h1 className="text-2xl text-charcoal">Product not found</h1>
        <Link to="/products" className="text-rust mt-4 inline-block">Back to products</Link>
      </div>
    );
  }

  const related = productList.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-2 pb-28 bg-[#faf9f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-warm-beige/80 text-xs font-semibold text-charcoal hover:text-rust hover:border-rust shadow-sm transition-all duration-200 mb-5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products Catalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Main Product Showcase Image */}
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="aspect-[4/3] w-full bg-white rounded-3xl border border-warm-beige/80 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden relative group">

              {product.image ? (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                  <Package className="w-16 h-16 mb-2 opacity-50" />
                  <span className="text-xs uppercase tracking-wider font-medium">No Image Available</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details & Specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-7 md:p-10 rounded-3xl border border-warm-beige/80 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
                product.partner === 'iblue'
                  ? 'bg-blue-600/10 text-blue-800 border border-blue-600/20'
                  : 'bg-rust/10 text-rust border border-rust/20'
              }`}>
                <span>{product.partner === 'iblue' ? 'iBlue Hardware' : 'Hettich Germany'}</span>
                <span>/</span>
                <span>{product.category.replace('-', ' ')}</span>
              </div>
              {product.product_code && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200/90 shadow-xs">
                  <span className="text-[10px] uppercase font-sans font-medium text-amber-700 tracking-wider">Item Code:</span>
                  <span>{product.product_code}</span>
                </div>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-charcoal tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-warm-grey mt-4 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>

            {/* Key Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="mt-8 pt-6 border-t border-warm-beige/60">
                <h3 className="text-xs uppercase tracking-widest text-charcoal font-bold mb-3.5">
                  Engineered Advantages
                </h3>
                <div className="space-y-2.5">
                  {product.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3 text-sm text-charcoal/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-rust mt-2 flex-shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Specifications */}
            <div className="mt-8 pt-6 border-t border-warm-beige/60">
              <h3 className="text-xs uppercase tracking-widest text-charcoal font-bold mb-3.5">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.product_code && (
                  <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80">
                    <span className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider block">
                      Product Code / SKU
                    </span>
                    <p className="text-amber-950 font-mono font-bold text-xs mt-1">
                      {product.product_code}
                    </p>
                  </div>
                )}
                {product.specs && product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-3.5 rounded-xl bg-[#f9f8f6] border border-warm-beige/60"
                  >
                    <span className="text-[10px] font-semibold text-warm-grey uppercase tracking-wider block">
                      {spec.label}
                    </span>
                    <p className="text-charcoal font-medium text-xs mt-1">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 mt-8 pt-6 border-t border-warm-beige/60">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-rust text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-rust-deep shadow-sm hover:shadow transition-all duration-200"
              >
                Inquire With Specialist <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => alert(`Technical brochure for ${product.name} is available on request.`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-charcoal/30 text-charcoal text-xs font-semibold uppercase tracking-wider rounded-full hover:border-charcoal hover:bg-charcoal/5 transition-all duration-200"
              >
                <Download className="w-4 h-4" /> Technical Sheet
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24" ref={ref}>
            <motion.div initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={fadeUp}>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-xs uppercase tracking-widest text-rust font-semibold">More from Hettich</span>
                  <h2 className="text-2xl md:text-3xl font-light text-charcoal mt-1">Related Architectural Hardware</h2>
                </div>
                <Link
                  to="/products"
                  className="text-xs font-semibold text-charcoal hover:text-rust transition-colors uppercase tracking-wider inline-flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    className="group bg-white rounded-2xl border border-warm-beige/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden"
                  >
                    <div className="aspect-[16/11] w-full bg-[#f6f5f2] relative overflow-hidden">
                      {p.image ? (
                        <>
                          <img
                            src={p.image}
                            alt={p.name}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400">
                          <Package className="w-8 h-8 mb-1 opacity-50" />
                          <span className="text-[10px] uppercase tracking-wider font-medium">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h3 className="text-sm font-semibold text-charcoal group-hover:text-rust transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <div className="mt-3 pt-2.5 border-t border-warm-beige/50 flex items-center justify-between text-xs font-semibold text-charcoal group-hover:text-rust">
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
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

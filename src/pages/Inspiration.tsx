import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { articles } from '../data/articles';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <motion.div ref={ref} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export default function Inspiration() {
  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">05 / INSPIRATION</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">Furniture inspiration</h1>
            <p className="text-warm-grey mt-4 max-w-xl">Ideas, insights and innovations from the world of premium furniture design.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mt-16">
          {articles.map((article, i) => (
            <AnimatedSection key={article.id}>
              <motion.div variants={fadeUp} className={`group cursor-pointer ${i === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`overflow-hidden bg-warm-beige mb-6 ${i === 0 ? 'aspect-[21/9]' : 'aspect-[16/10]'}`}>
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-rust text-xs font-medium tracking-wider uppercase">{article.category}</span>
                  <span className="text-warm-grey text-xs">{article.date}</span>
                  <span className="text-warm-grey text-xs">{article.readTime} read</span>
                </div>
                <h2 className={`font-medium text-charcoal group-hover:text-rust transition-colors ${i === 0 ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                  {article.title}
                </h2>
                <p className="text-warm-grey mt-3 leading-relaxed">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 mt-4 text-sm text-rust font-medium">
                  Read article <ArrowUpRight className="w-4 h-4" />
                </span>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

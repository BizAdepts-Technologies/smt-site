import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { solutions } from '../data/company';
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

export default function Solutions() {
  const [active, setActive] = useState(0);

  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">02 / SOLUTIONS</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">Solutions for every space.</h1>
            <p className="text-warm-grey mt-4 max-w-xl">Intelligent furniture systems designed for how people actually live and work.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <div className="space-y-3">
            {solutions.map((sol, i) => (
              <button
                key={sol.id}
                onClick={() => setActive(i)}
                className={`w-full text-left p-6 border transition-all ${active === i ? 'border-rust bg-rust/5' : 'border-warm-beige hover:border-charcoal'}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-medium ${active === i ? 'text-rust' : 'text-charcoal'}`}>{sol.title}</h3>
                  <ArrowRight className={`w-5 h-5 transition-all ${active === i ? 'text-rust translate-x-0 opacity-100' : 'text-warm-grey -translate-x-2 opacity-0'}`} />
                </div>
                <p className={`text-sm mt-2 transition-all ${active === i ? 'text-charcoal max-h-20 opacity-100' : 'text-warm-grey max-h-0 opacity-0 overflow-hidden'}`}>
                  {sol.description}
                </p>
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/3] overflow-hidden bg-warm-beige"
          >
            <img src={solutions[active].image} alt={solutions[active].title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-charcoal/80 to-transparent">
              <h3 className="text-white text-2xl font-light">{solutions[active].title}</h3>
              <p className="text-white/80 mt-2 text-sm">{solutions[active].description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

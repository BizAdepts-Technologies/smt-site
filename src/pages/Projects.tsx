import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Tag } from 'lucide-react';
import { projects } from '../data/projects';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <motion.div ref={ref} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">06 / PROJECTS</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">Selected projects</h1>
            <p className="text-warm-grey mt-4 max-w-xl">Real-world applications of SMT furniture solutions across Oman and the Middle East.</p>
          </motion.div>
        </AnimatedSection>

        <div className="mt-16 space-y-20">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id}>
              <motion.div variants={fadeUp} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="aspect-[4/3] overflow-hidden bg-warm-beige">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <span className="text-rust text-xs font-medium tracking-wider uppercase">Case Study</span>
                  <h2 className="text-3xl md:text-4xl font-light text-charcoal mt-3 tracking-tight">{project.title}</h2>
                  <p className="text-warm-grey mt-4 leading-relaxed">{project.description}</p>
                  <div className="grid grid-cols-3 gap-4 mt-8 py-6 border-t border-warm-beige">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-rust mt-0.5" />
                      <div>
                        <span className="text-xs text-warm-grey uppercase block">Location</span>
                        <span className="text-sm text-charcoal">{project.location}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Tag className="w-4 h-4 text-rust mt-0.5" />
                      <div>
                        <span className="text-xs text-warm-grey uppercase block">Type</span>
                        <span className="text-sm text-charcoal">{project.type}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-rust mt-0.5" />
                      <div>
                        <span className="text-xs text-warm-grey uppercase block">Year</span>
                        <span className="text-sm text-charcoal">{project.year}</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 mt-6 text-sm text-rust font-medium hover:gap-3 transition-all cursor-pointer">
                    View project <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

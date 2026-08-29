import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { companyInfo } from '../data/company';

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

export default function About() {
  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">03 / ABOUT</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">
              Built on precision.<br />
              <span className="text-rust">Driven by possibility.</span>
            </h1>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="aspect-[4/3] overflow-hidden bg-warm-beige">
              <img
                src={import.meta.env.BASE_URL + 'offices_commercial.jpeg'}
                alt="SMT headquarters"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatedSection>
          <AnimatedSection>
            <motion.div variants={fadeUp} className="flex flex-col justify-center">
              <h2 className="text-2xl font-light text-charcoal mb-6">Our Story</h2>
              <p className="text-warm-grey leading-relaxed mb-6">
                Founded in {companyInfo.founded} in Muscat, SMT has grown from a local hardware supplier into one of the region's most trusted names in premium furniture fittings. We serve architects, furniture manufacturers, and interior designers across {companyInfo.markets} markets.
              </p>
              <p className="text-warm-grey leading-relaxed mb-6">
                Our mission is simple: to engineer furniture mechanisms that disappear into the background while delivering performance that stands the test of time. Every hinge, runner and sliding system we produce reflects our commitment to precision.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-warm-beige">
                <div>
                  <span className="text-3xl font-light text-charcoal">{companyInfo.employees}</span>
                  <p className="text-warm-grey text-sm mt-1">Team Members</p>
                </div>
                <div>
                  <span className="text-3xl font-light text-charcoal">{companyInfo.markets}+</span>
                  <p className="text-warm-grey text-sm mt-1">Markets Served</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>

        <div className="mt-24">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-3xl font-light text-charcoal mb-12">What we believe</motion.h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality', desc: 'Every product undergoes rigorous testing to ensure it meets our exacting standards before it reaches your project.' },
              { title: 'Innovation', desc: 'We invest continuously in R&D to bring smarter, quieter and more durable mechanisms to market.' },
              { title: 'Partnership', desc: 'We work alongside architects, manufacturers and installers as an extension of their team.' },
            ].map((val) => (
              <AnimatedSection key={val.title}>
                <motion.div variants={fadeUp} className="p-8 border border-warm-beige hover:border-rust transition-colors">
                  <h3 className="text-xl font-medium text-charcoal">{val.title}</h3>
                  <p className="text-warm-grey mt-3 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

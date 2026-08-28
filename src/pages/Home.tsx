import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Download, FileText, Wrench, Ruler, HelpCircle, BookOpen, Users, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Newsletter from '../components/Newsletter';
import { useCounter } from '../hooks/useCounter';
import { categories, products } from '../data/products';
import { articles } from '../data/articles';
import { projects } from '../data/projects';
import { solutions, audienceSegments, companyInfo } from '../data/company';
import { resources, resourceFilters } from '../data/resources';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-12">
      <span className="text-rust text-sm font-medium tracking-wider">{number}</span>
      <h2 className="text-3xl md:text-5xl font-light text-charcoal mt-2 tracking-tight">{title}</h2>
      {subtitle && <p className="text-warm-grey mt-4 max-w-xl">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [resourceFilter, setResourceFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [cookieBanner, setCookieBanner] = useState(true);

  const stats1 = useCounter(companyInfo.yearsExperience);
  const stats2 = useCounter(companyInfo.solutions);
  const stats3 = useCounter(companyInfo.markets);
  const stats4 = useCounter(companyInfo.qualityScore);

  const filteredResources = resourceFilter === 'all' ? resources : resources.filter((r) => r.type === resourceFilter);

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="bg-warm-white">
      {/* HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-white">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Luxury white bathroom interior"
            className="w-full h-full object-cover mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-warm-white/90 via-warm-white/40 to-transparent" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.p variants={fadeUp} className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-6">
              Premium Bath & Plumbing • Muscat, Oman
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-normal text-charcoal leading-[1.1] tracking-tight">
              Elevating the art<br />of the bathroom.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-charcoal/80 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
              Premium plumbing fittings, intelligent showers, and high-end closets for modern luxury spaces.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-10">
              <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-deep transition-colors">
                Explore Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/solutions" className="inline-flex items-center gap-2 px-8 py-4 border border-charcoal/30 text-charcoal font-medium hover:border-gold hover:text-gold transition-colors">
                Our Solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-charcoal/60"
        >
          <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="py-32 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-light text-charcoal tracking-tight leading-[1.1]">
              Pristine flow.<br />
              <span className="text-gold">Impeccable design.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-warm-grey text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
              From a single designer faucet to complete architectural shower systems, our luxury fittings transform the daily rituals of water into unparalleled experiences.
            </motion.p>
          </AnimatedSection>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="01 / COLLECTIONS"
              title="Explore our collections"
              subtitle="Precision-engineered bathroom fittings designed for the most elegant spaces."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id}>
                <motion.div
                  variants={fadeUp}
                  className={`group relative overflow-hidden cursor-pointer bg-white border border-warm-beige flex flex-col h-full`}
                >
                  <div className="aspect-[3/2] overflow-hidden bg-warm-white">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-gold text-xs font-medium tracking-wider">{cat.count} Products</span>
                      <h3 className="text-charcoal text-xl font-medium mt-1">{cat.name}</h3>
                      <p className="text-warm-grey text-sm mt-2 line-clamp-2">{cat.description}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCT */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <motion.div variants={fadeUp} className="relative overflow-hidden bg-warm-beige aspect-square">
                <img
                  src={import.meta.env.BASE_URL + 'plumbing_fittings.jpeg'}
                  alt="Precision Faucet"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <span className="text-gold text-sm font-medium tracking-wider">Featured Fitting</span>
                <h2 className="text-4xl md:text-5xl font-light text-charcoal mt-3 tracking-tight">The Aeterna Faucet</h2>
                <p className="text-gold text-xl mt-2 font-light">Precision you can feel. Elegance you can see.</p>
                <p className="text-warm-grey mt-6 leading-relaxed">Engineered from solid brass and coated in pristine polished chrome, our signature faucet delivers flawlessly smooth water control while standing as a sculptural centerpiece for the modern luxury vanity.</p>
                <div className="mt-8 space-y-3">
                  {['Ceramic disc cartridge', 'Water-saving aerator', 'Solid brass construction', 'PVD premium finish'].map((b) => (
                    <div key={b} className="flex items-center gap-3 text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {b}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-deep transition-colors">
                    Explore Product <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/resources" className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/20 text-charcoal text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                    View Specifications
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SOLUTIONS FOR EVERY SPACE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="02 / ARCHITECTURE"
              title="Solutions for every environment."
            />
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 mt-12 p-8 border border-warm-beige bg-warm-white">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={solutions[activeSolution].image}
                alt={solutions[activeSolution].title}
                className="w-full h-full object-cover transition-opacity duration-500 rounded-sm"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap gap-3 mb-8">
                {solutions.map((sol, i) => (
                  <button
                    key={sol.id}
                    onClick={() => setActiveSolution(i)}
                    className={`px-4 py-2 text-sm border transition-colors ${activeSolution === i
                      ? 'border-gold text-gold bg-gold/5'
                      : 'border-warm-beige text-warm-grey hover:border-charcoal hover:text-charcoal'
                      }`}
                  >
                    {sol.title}
                  </button>
                ))}
              </div>
              <h3 className="text-3xl font-light text-charcoal">{solutions[activeSolution].title}</h3>
              <p className="text-warm-grey mt-4 leading-relaxed">{solutions[activeSolution].description}</p>
              <Link to="/solutions" className="inline-flex items-center gap-2 mt-8 text-gold text-sm font-medium hover:gap-3 transition-all">
                Explore solution <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-32 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="03 / ABOUT"
              title="A heritage of pristine water flow."
            />
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 p-12 bg-white border border-warm-beige">
            {[
              { ref: stats1.ref, value: stats1.count, suffix: '+', label: 'Years of Excellence' },
              { ref: stats2.ref, value: stats2.count, suffix: '+', label: 'Plumbing Solutions' },
              { ref: stats3.ref, value: stats3.count, suffix: '+', label: 'Global Markets' },
              { ref: stats4.ref, value: stats4.count, suffix: '%', label: 'Purity Factor' },
            ].map((stat) => (
              <div key={stat.label} ref={stat.ref} className="text-center">
                <div className="text-5xl md:text-6xl font-light text-charcoal">
                  {stat.value}{stat.suffix}
                </div>
                <p className="text-warm-grey text-sm mt-3 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section className="py-20 bg-white text-charcoal">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-gold text-sm font-medium tracking-wider">04 / TECHNOLOGY</span>
              <h2 className="text-4xl md:text-5xl font-light mt-3 tracking-tight">
                Engineering that disappears.<br />
                <span className="text-warm-grey">Elegance that remains.</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Precision Valves', desc: 'State-of-the-art ceramic discs that guarantee decades of drip-free luxury and flawless temperature control.' },
              { num: '02', title: 'Acoustic Insulation', desc: 'Advanced internal geometries that reduce water noise to a whisper, preserving the tranquility of your bathroom.' },
              { num: '03', title: 'PVD Coating', desc: 'Physical Vapor Deposition creates an ultra-hard, pristine finish that resists scratches and tarnishing endlessly.' },
            ].map((item) => (
              <AnimatedSection key={item.num}>
                <motion.div variants={fadeUp} className="border-t border-warm-beige pt-8">
                  <span className="text-gold text-3xl font-light">{item.num}</span>
                  <h3 className="text-xl font-medium mt-4">{item.title}</h3>
                  <p className="text-warm-grey mt-3 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* INSPIRATION */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="05 / INSPIRATION"
              title="Bathroom inspiration"
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <AnimatedSection key={article.id}>
                <motion.div variants={fadeUp} className="group cursor-pointer p-4 bg-white border border-warm-beige hover:border-gold transition-colors">
                  <div className="aspect-[3/2] overflow-hidden bg-warm-beige mb-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-gold text-xs font-medium tracking-wider">{article.category}</span>
                  <h3 className="text-lg font-medium text-charcoal mt-2 group-hover:text-gold transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-3 text-xs text-warm-grey">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <span className="text-gold text-sm font-medium tracking-wider">06 / CASE STUDY</span>
          </AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 mt-8 items-center">
            <AnimatedSection>
              <motion.div variants={fadeUp} className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <h2 className="text-4xl md:text-5xl font-light text-charcoal tracking-tight">"{projects[0].title}"</h2>
                <p className="text-warm-grey mt-4">{projects[0].location}</p>
                <p className="text-charcoal mt-6 text-lg leading-relaxed">{projects[0].description}</p>
                <div className="grid grid-cols-3 gap-6 mt-8 py-6 border-t border-warm-beige">
                  <div>
                    <span className="text-xs text-warm-grey uppercase tracking-wider">Location</span>
                    <p className="text-charcoal text-sm mt-1">{projects[0].location}</p>
                  </div>
                  <div>
                    <span className="text-xs text-warm-grey uppercase tracking-wider">Project Type</span>
                    <p className="text-charcoal text-sm mt-1">{projects[0].type}</p>
                  </div>
                  <div>
                    <span className="text-xs text-warm-grey uppercase tracking-wider">Solution</span>
                    <p className="text-charcoal text-sm mt-1">{projects[0].solution}</p>
                  </div>
                </div>
                <Link to="/projects" className="inline-flex items-center gap-2 mt-6 text-gold text-sm font-medium hover:gap-3 transition-all">
                  View project <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="07 / SUPPORT"
              title="Everything you need to build better."
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HelpCircle, title: 'Product Support', desc: 'Find the right product for your application.' },
              { icon: FileText, title: 'Technical Resources', desc: 'Access specifications, drawings and documentation.' },
              { icon: Ruler, title: 'CAD & Planning', desc: 'Download planning resources and technical files.' },
              { icon: Wrench, title: 'Installation Support', desc: 'Guides and resources for installers.' },
              { icon: BookOpen, title: 'Product Catalogue', desc: 'Browse our complete product portfolio.' },
              { icon: Users, title: 'Expert Consultation', desc: 'Speak with our technical team.' },
            ].map((service) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  variants={fadeUp}
                  className="group p-8 bg-white border border-warm-beige hover:border-gold transition-colors cursor-pointer"
                >
                  <service.icon className="w-6 h-6 text-gold mb-4" />
                  <h3 className="text-lg font-medium text-charcoal group-hover:text-gold transition-colors">{service.title}</h3>
                  <p className="text-warm-grey text-sm mt-2">{service.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CENTER */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="08 / RESOURCES"
              title="Resources & downloads"
            />
          </AnimatedSection>
          <div className="flex flex-wrap gap-3 mb-10">
            {resourceFilters.map((f) => (
              <button
                key={f.id}
                onClick={() => setResourceFilter(f.id)}
                className={`px-4 py-2 text-sm border transition-colors ${resourceFilter === f.id
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-warm-beige text-warm-grey hover:border-charcoal hover:text-charcoal'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredResources.map((res) => (
              <AnimatedSection key={res.id}>
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-warm-beige hover:border-gold transition-colors group bg-warm-white"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-gold uppercase tracking-wider">{res.type}</span>
                      <span className="text-xs text-warm-grey">{res.format}</span>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal">{res.title}</h3>
                    <p className="text-warm-grey text-sm mt-1">{res.description}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-xs text-warm-grey">{res.size}</span>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-gold transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="py-20 bg-warm-white text-charcoal border-t border-warm-beige">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="09 / AUDIENCE"
              title="Who we work with"
            />
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audienceSegments.map((seg) => (
              <AnimatedSection key={seg.id}>
                <motion.div variants={fadeUp} className="p-8 bg-white border border-warm-beige hover:border-gold transition-colors group cursor-pointer shadow-sm">
                  <span className="text-xs text-gold font-medium uppercase tracking-[0.2em]">{seg.title}</span>
                  <p className="text-warm-grey mt-4 text-sm leading-relaxed">{seg.description}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-sm text-charcoal group-hover:text-gold transition-colors">
                    {seg.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />

      {/* CONTACT CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-light text-charcoal tracking-tight">
              Create the perfect<br /><span className="text-gold">sanctuary.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-warm-grey mt-6 max-w-xl mx-auto">
              Tell us about your project and our team will help you find the right luxury plumbing solutions.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10">
              <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-white font-medium hover:bg-gold-deep transition-colors">
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* TOAST */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-white px-6 py-3 text-sm shadow-lg">
          Demo: Download functionality will be connected to the CMS.
        </div>
      )}

      {/* COOKIE BANNER */}
      {cookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-warm-beige p-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-warm-grey">
              We use cookies to improve your browsing experience and understand how visitors use our website.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setCookieBanner(false)} className="px-5 py-2 bg-rust text-white text-sm font-medium hover:bg-rust-deep transition-colors">
                Accept
              </button>
              <button onClick={() => setCookieBanner(false)} className="px-5 py-2 border border-charcoal text-charcoal text-sm hover:border-rust hover:text-rust transition-colors">
                Manage preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

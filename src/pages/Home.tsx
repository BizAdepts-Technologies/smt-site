import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, FileText, Wrench, Ruler, HelpCircle, BookOpen, Users, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import Newsletter from '../components/Newsletter';
import HeroSlider, { type HeroSlide } from '../components/HeroSlider';
import LatestProductsSection from '../components/LatestProductsSection';
import { useCounter } from '../hooks/useCounter';
import { categories, products } from '../data/products';
import { articles } from '../data/articles';
import { projects } from '../data/projects';
import { solutions, audienceSegments, companyInfo } from '../data/company';
import { resources, resourceFilters } from '../data/resources';
import architectStudioImg from '../assets/collage/architect_studio.jpg';
import studioPhotoshootImg from '../assets/collage/studio_photoshoot.jpg';
import portraitDetailImg from '../assets/collage/portrait_detail.jpg';
import darkStudioWardrobeImg from '../assets/collage/dark_studio_wardrobe.jpg';

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

/* ------------------------------------------------------------------ */
/* Brand statement – editorial collage                                 */
/* ------------------------------------------------------------------ */

// Curated studio photoshoot & architectural assets for the editorial collage
const collageImages = {
  leftBack: architectStudioImg,
  leftFront: studioPhotoshootImg,
  rightBack: portraitDetailImg,
  rightFront: darkStudioWardrobeImg,
};
const GHOST_WORD = 'HETTICH & IBLUE';

function GhostText({ text, className = '' }: { text: string; className?: string }) {
  // SVG text stretched to the box width, so the word always spans edge to edge.
  return (
    <svg viewBox="0 0 1000 170" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <text
        x="500"
        y="140"
        textAnchor="middle"
        textLength="980"
        lengthAdjust="spacingAndGlyphs"
        fontSize="160"
        fontWeight="900"
        fill="currentColor"
        style={{ fontFamily: 'inherit' }}
      >
        {text}
      </text>
    </svg>
  );
}

function CollagePhoto({
  src,
  alt,
  ratio,
  className,
}: {
  src: string;
  alt: string;
  ratio: string;
  className: string;
  delay?: number;
  reduce?: boolean | null;
}) {
  return (
    <div
      className={`overflow-hidden bg-[#ebe6df] shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:scale-[1.02] ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="sync"
        draggable={false}
        className="w-full h-full object-cover object-center block"
      />
    </div>
  );
}

function BrandStatement() {
  const reduce = useReducedMotion();
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.8, delay, ease: 'easeOut' as const },
        };

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:block lg:relative lg:aspect-[961/645]">
          {/* Ghost figure behind the signature */}
          <div className="hidden lg:block absolute left-[48%] top-[11%] w-[33%] text-charcoal/[0.05] pointer-events-none select-none">
            <GhostText text={`${companyInfo.yearsExperience}+`} className="w-full h-auto" />
          </div>

          {/* Statement (top right) */}
          <motion.div
            {...reveal(0.1)}
            className="col-span-2 order-first lg:absolute lg:left-[69%] lg:top-[7%] lg:w-[29%]"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[1.9rem] xl:text-4xl font-light text-charcoal tracking-tight leading-[1.15]">
              Invisible mechanics.
              <br />
              <span className="text-gold">Flawless design.</span>
            </h2>
            <p className="text-warm-grey text-sm leading-relaxed mt-5">
              Whenever a cabinet door opens, a drawer is pulled out or whenever furniture elements move in any other
              way, we are usually behind the movement. Our fittings provide convenient and reliable operation in
              millions of furniture applications.
            </p>
            <Link
              to="/solutions"
              className="inline-block mt-4 text-sm text-warm-grey underline underline-offset-4 decoration-warm-grey/50 hover:text-gold hover:decoration-gold transition-colors"
            >
              Read more
            </Link>
          </motion.div>

          {/* Left pair */}
          <CollagePhoto
            reduce={reduce}
            src={collageImages.leftBack}
            alt="German-engineered wardrobe & furniture movement"
            ratio="220 / 227"
            delay={0.05}
            className="relative lg:absolute lg:left-[16.6%] lg:top-[4.3%] lg:w-[22.9%] translate-y-6 lg:translate-y-0"
          />
          <CollagePhoto
            reduce={reduce}
            src={collageImages.leftFront}
            alt="Studio photoshoot - interior architectural craftsmanship"
            ratio="219 / 261"
            delay={0.2}
            className="relative lg:absolute lg:left-[4.6%] lg:top-[16.6%] lg:w-[22.8%] lg:z-10 -translate-y-0"
          />

          {/* Supporting line (bottom left) */}
          <motion.p
            {...reveal(0.3)}
            className="col-span-2 text-charcoal text-sm leading-relaxed lg:absolute lg:left-[4.6%] lg:top-[66%] lg:w-[26%]"
          >
            From soft-close drawers to full sliding wardrobes, {companyInfo.solutions}+ fitting solutions are built to
            work quietly for years.
          </motion.p>

          {/* Signature stroke (draws itself once) */}
          <motion.svg
            viewBox="0 0 140 70"
            className="hidden lg:block absolute left-[46.5%] top-[21%] w-[12%] text-charcoal"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <motion.path
              d="M6 58 C 14 20, 22 8, 20 30 C 19 46, 30 44, 38 26 C 44 14, 40 44, 52 40 C 62 36, 62 22, 70 34 C 76 44, 88 36, 96 26 C 104 16, 100 40, 112 38 C 122 36, 126 26, 134 24"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={reduce ? undefined : { pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
            />
          </motion.svg>

          {/* Right pair */}
          <CollagePhoto
            reduce={reduce}
            src={collageImages.rightBack}
            alt="Editorial portrait & luxury fittings detail"
            ratio="220 / 227"
            delay={0.15}
            className="relative lg:absolute lg:left-[53%] lg:top-[34%] lg:w-[22.8%]"
          />
          <CollagePhoto
            reduce={reduce}
            src={collageImages.rightFront}
            alt="Dark studio architectural wardrobe installation"
            ratio="219 / 261"
            delay={0.3}
            className="relative lg:absolute lg:left-[64.5%] lg:top-[45.6%] lg:w-[22.8%] lg:z-10 translate-y-6 lg:translate-y-0"
          />
        </div>
      </div>

      {/* Ghost brand word along the bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10 lg:-mt-[11%] pointer-events-none select-none text-gold/[0.07]">
        <GhostText text={GHOST_WORD} className="w-full h-auto" />
      </div>
    </section>
  );
}

const heroSlides: HeroSlide[] = [
  {
    image: import.meta.env.BASE_URL + 'home_hero.webp',
    lines: ['Intelligent', 'functions.', 'Brought to life.'],
    tag: 'Premium furniture fittings',
    text: 'Built into furniture of all kinds, our fittings are usually invisible. But they are no less essential for that.',
    cta: 'Explore collection',
    href: '/products',
    nextLabel: 'Collections',
  },
  {
    image: import.meta.env.BASE_URL + 'hero_slide_movement.webp',
    lines: ['Movement', 'that feels', 'effortless.'],
    tag: 'Collections',
    text: 'Precision-engineered aluminium profiles, luxury handles, and intelligent storage solutions for the most elegant spaces.',
    cta: 'View products',
    href: '/products',
    nextLabel: 'Solutions',
  },
  {
    image: import.meta.env.BASE_URL + 'hero_slide_solutions.webp',
    lines: ['Solutions for', 'every room', 'and workspace.'],
    tag: 'Solutions',
    text: 'From kitchens and wardrobes to offices and hospitality, we fit the function to the space.',
    cta: 'See solutions',
    href: '/solutions',
    nextLabel: 'Projects',
  },
  {
    image: projects[0]?.image ?? import.meta.env.BASE_URL + 'home_hero.webp',
    lines: ['Built into', 'projects across', 'the region.'],
    tag: 'Case study',
    text: projects[0]?.description ?? 'See how our fittings perform in real projects, from first sketch to final install.',
    cta: 'View projects',
    href: '/projects',
    nextLabel: 'Inspiration',
  },
  {
    image: import.meta.env.BASE_URL + 'luxury_hero_bg.webp',
    lines: ['Ideas for', 'better', 'interiors.'],
    tag: 'Inspiration',
    text: 'Guides, specifications and design stories from our technical and design team in Muscat.',
    cta: 'Get in touch',
    href: '/contact',
    nextLabel: 'Intelligent functions',
  },
];

export default function Home() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [resourceFilter, setResourceFilter] = useState('all');
  const [showToast, setShowToast] = useState(false);
  // Cookie banner disabled/hidden by default (can be re-enabled if needed)
  const [cookieBanner, setCookieBanner] = useState(false);

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
      <HeroSlider slides={heroSlides} />

      {/* LATEST PRODUCTS (3D Cube Showcase) */}
      <LatestProductsSection />

      {/* BRAND STATEMENT (editorial collage) */}
      <BrandStatement />

      {/* PRODUCT CATEGORIES */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading
              number="01 / COLLECTIONS"
              title="Explore our collections"
              subtitle="Precision-engineered furniture fittings designed for the most elegant and functional spaces."
            />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.id}>
                <Link to={`/products/${cat.id}`} className="block h-full">
                  <motion.div
                    variants={fadeUp}
                    className={`group relative overflow-hidden cursor-pointer bg-white border border-warm-beige flex flex-col h-full hover:border-gold transition-colors`}
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
                        <h3 className="text-charcoal text-xl font-medium mt-1 group-hover:text-gold transition-colors">{cat.name}</h3>
                        <p className="text-warm-grey text-sm mt-2 line-clamp-2">{cat.description}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
              <motion.div variants={fadeUp} className="relative overflow-hidden bg-warm-beige aspect-[4/3] rounded-sm shadow-md">
                <img
                  src={import.meta.env.BASE_URL + 'das_ideenbuch_2018/sliding-wardrobe-interior.jpg'}
                  alt="Hettich Architectural Sliding Wardrobe & Interior System"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection>
              <motion.div variants={fadeUp}>
                <span className="text-gold text-sm font-medium tracking-wider">Featured Architectural Profile</span>
                <h2 className="text-4xl md:text-5xl font-light text-charcoal mt-3 tracking-tight">Hettich Architectural Sliding Wardrobe Systems</h2>
                <p className="text-gold text-xl mt-2 font-light">Top-running sliding precision. Complete interior organization.</p>
                <p className="text-warm-grey mt-6 leading-relaxed">Engineered with German precision overhead running gear and integrated soft-close dampening, Hettich sliding wardrobe systems transform bedroom spaces with whisper-quiet movement, expansive panoramic openings, and tailor-made interior organizers for modern living.</p>
                <div className="mt-8 space-y-3">
                  {[
                    'TopLine XL whisper-quiet overhead running track',
                    'Concealed floor guides for seamless threshold-free flooring',
                    'Integrated AvanTech YOU internal drawers & illuminated shelves',
                    'Silent System 3-way cushioning (opening, closing & collision)'
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-3 text-sm text-charcoal">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                      {b}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 mt-10">
                  <Link to="/products/wardrobe-systems" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white text-sm font-medium hover:bg-gold-deep transition-colors">
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-charcoal/20 text-charcoal text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                    Request Consultation
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
              title="A heritage of flawless movement."
            />
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 p-12 bg-white border border-warm-beige">
            {[
              { ref: stats1.ref, value: stats1.count, suffix: '+', label: 'Years of Excellence' },
              { ref: stats2.ref, value: stats2.count, suffix: '+', label: 'Fitting Solutions' },
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
              { num: '01', title: 'Intelligent Dampers', desc: 'State-of-the-art soft-close technology that guarantees decades of whisper-quiet luxury and flawless closure.' },
              { num: '02', title: 'Acoustic Insulation', desc: 'Advanced internal geometries that reduce closing noise to a whisper, preserving the tranquility of your space.' },
              { num: '03', title: 'Premium Durability', desc: 'Engineered for intensive use, creating robust mechanisms that resist wear and tear endlessly.' },
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
              title="Design inspiration"
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

      {/* DOWNLOAD CENTER / RESOURCES (Commented out as requested) */}
      {/*
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
      */}

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
              Tell us about your project and our team will help you find the right premium furniture fittings.
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

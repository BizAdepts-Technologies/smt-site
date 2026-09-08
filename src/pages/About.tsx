import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { companyInfo as hardcodedCompanyInfo } from '../data/company';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
  const [companyInfo, setCompanyInfo] = useState<any>(hardcodedCompanyInfo);
  const [paragraphs, setParagraphs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, pRes, catRes] = await Promise.all([
          axios.get('http://localhost:8000/api/company-info/'),
          axios.get('http://localhost:8000/api/about/'),
          axios.get('http://localhost:8000/api/categories/')
        ]);

        if (compRes.data && compRes.data.length > 0) {
          // Map backend fields to frontend names
          const be = compRes.data[0];
          setCompanyInfo({
            ...hardcodedCompanyInfo,
            name: be.name,
            fullName: be.full_name,
            tagline: be.tagline || hardcodedCompanyInfo.tagline,
            location: be.location,
            email: be.email,
            phone: be.phone,
            address: be.address,
            founded: be.founded_year,
            founder: be.founder,
            employees: be.employees_count,
            markets: be.branches_count,
          });
        }

        if (pRes.data) {
          setParagraphs(pRes.data);
        }

        if (catRes.data) {
          setCategories(catRes.data);
        }
      } catch (error) {
        console.error("Error fetching CMS data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

              {paragraphs.length > 0 ? (
                paragraphs.map((p: any) => (
                  <p key={p.id} className="text-warm-grey leading-relaxed mb-6">
                    {p.text}
                  </p>
                ))
              ) : (
                <>
                  <p className="text-warm-grey leading-relaxed mb-6">
                    {companyInfo.fullName} was established in {companyInfo.founded} by {companyInfo.founder}, starting from a small branch with a vision...
                  </p>
                </>
              )}

              <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-warm-beige">
                <div>
                  <span className="text-3xl font-light text-charcoal">~{companyInfo.employees}</span>
                  <p className="text-warm-grey text-sm mt-1">Dedicated Team Members</p>
                </div>
                <div>
                  <span className="text-3xl font-light text-charcoal">{companyInfo.markets}</span>
                  <p className="text-warm-grey text-sm mt-1">Branches Across Oman</p>
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

        <div className="mt-24">
          <AnimatedSection>
            <motion.h2 variants={fadeUp} className="text-3xl font-light text-charcoal mb-12">Our Product Categories</motion.h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(categories.length > 0 ? categories.map(c => c.name) : [
              'Natural Veneer',
              'Glass Patch Fittings',
              'Stainless Steel Handrails',
              'Furniture Fittings',
              'Aluminium Profiles',
              'Door Ironmongery',
              'Hettich Furniture Fittings & Solutions',
            ]).map((category: string) => (
              <AnimatedSection key={category}>
                <motion.div variants={fadeUp} className="p-6 h-full border border-warm-beige hover:border-rust transition-colors flex items-center justify-center text-center bg-white shadow-sm">
                  <h3 className="text-lg font-medium text-charcoal">{category}</h3>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

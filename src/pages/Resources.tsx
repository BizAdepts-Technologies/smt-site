import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Search } from 'lucide-react';
import { resources, resourceFilters } from '../data/resources';
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

export default function Resources() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(false);

  const filtered = resources.filter((r) => {
    const matchesFilter = filter === 'all' || r.type === filter;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDownload = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">08 / RESOURCES</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">Resources & downloads</h1>
            <p className="text-warm-grey mt-4 max-w-xl">Technical documents, catalogues and planning resources for professionals.</p>
          </motion.div>
        </AnimatedSection>

        <div className="mt-12 flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-grey" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-3 bg-white border border-warm-beige text-charcoal focus:outline-none focus:border-rust"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {resourceFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 text-sm border transition-colors ${filter === f.id ? 'border-rust text-rust bg-rust/5' : 'border-warm-beige text-warm-grey hover:border-charcoal'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-4 mt-12">
          {filtered.map((res) => (
            <AnimatedSection key={res.id}>
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between p-6 border border-warm-beige hover:border-rust transition-colors group bg-white">
                <div className="flex-1 flex items-start gap-4">
                  <FileText className="w-8 h-8 text-rust flex-shrink-0 mt-1" />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-rust uppercase tracking-wider">{res.type}</span>
                      <span className="text-xs text-warm-grey">{res.format}</span>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal">{res.title}</h3>
                    <p className="text-warm-grey text-sm mt-1">{res.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-6">
                  <span className="text-xs text-warm-grey whitespace-nowrap">{res.size}</span>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-charcoal text-white text-sm hover:bg-rust transition-colors whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-grey">No resources found matching your criteria.</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-white px-6 py-3 text-sm shadow-lg">
          Demo: Download functionality will be connected to the CMS.
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="py-20 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={fadeUp}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-rust text-sm font-medium tracking-wider">Newsletter</span>
          <h2 className="text-3xl md:text-4xl font-light mt-3 tracking-tight">
            Stay informed
          </h2>
          <p className="text-white/60 mt-4">
            Subscribe for product updates, design inspiration and technical insights.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-rust"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-rust text-white font-medium hover:bg-rust-deep transition-colors flex items-center justify-center gap-2"
              >
                Subscribe <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center justify-center gap-3 text-rust"
            >
              <Check className="w-5 h-5" />
              <span>Thank you for subscribing.</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

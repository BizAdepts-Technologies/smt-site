import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, MapPin, Mail, Phone } from 'lucide-react';
import { companyInfo } from '../data/company';
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

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '', country: '', interest: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20 bg-warm-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <span className="text-rust text-sm font-medium tracking-wider">07 / CONTACT</span>
            <h1 className="text-4xl md:text-6xl font-light text-charcoal mt-3 tracking-tight">
              Let's build something<br /><span className="text-rust">better.</span>
            </h1>
            <p className="text-warm-grey mt-4 max-w-xl">Tell us about your project and our team will help you find the right solution.</p>
          </motion.div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          <AnimatedSection>
            <motion.div variants={fadeUp}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Full Name *</label>
                      <input required type="text" className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Company</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Email *</label>
                      <input required type="email" className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Country</label>
                      <input type="text" className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">I am interested in</label>
                      <select className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust" value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })}>
                        <option value="">Select...</option>
                        <option value="products">Products</option>
                        <option value="consultation">Project consultation</option>
                        <option value="technical">Technical support</option>
                        <option value="distribution">Distribution</option>
                        <option value="general">General enquiry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-warm-grey mb-2 block">Message</label>
                    <textarea rows={5} className="w-full px-4 py-3 bg-white border border-warm-beige focus:outline-none focus:border-rust resize-none" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-4 bg-rust text-white font-medium hover:bg-rust-deep transition-colors">
                    Send Enquiry <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <div className="w-16 h-16 bg-rust/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-rust" />
                  </div>
                  <h2 className="text-3xl font-light text-charcoal">Thank you.</h2>
                  <p className="text-warm-grey mt-4">Your enquiry has been received. Our team will get back to you shortly.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div variants={fadeUp} className="lg:pl-12">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-rust mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-grey block mb-1">Address</span>
                    <p className="text-charcoal">{companyInfo.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-rust mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-grey block mb-1">Email</span>
                    <a href={`mailto:${companyInfo.email}`} className="text-charcoal hover:text-rust transition-colors">{companyInfo.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-rust mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-warm-grey block mb-1">Phone</span>
                    <a href={`tel:${companyInfo.phone}`} className="text-charcoal hover:text-rust transition-colors">{companyInfo.phone}</a>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-charcoal text-white">
                <h3 className="text-xl font-light mb-4">Working Hours</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <p>Sunday — Thursday: 8:00 AM — 5:00 PM</p>
                  <p>Friday — Saturday: Closed</p>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

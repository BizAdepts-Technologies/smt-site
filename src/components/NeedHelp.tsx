import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail, MapPin } from 'lucide-react';
import { companyInfo } from '../data/company';

export default function NeedHelp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-24 left-6 z-50 w-72 bg-white border border-warm-beige shadow-xl"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-charcoal">Need help?</h3>
                <button onClick={() => setOpen(false)} className="text-warm-grey hover:text-charcoal">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-warm-grey mb-4">
                Our team is ready to assist you with product selection, technical questions or project consultation.
              </p>
              <div className="space-y-3">
                <a href={`tel:${companyInfo.phone}`} className="flex items-center gap-3 text-sm text-charcoal hover:text-rust transition-colors">
                  <Phone className="w-4 h-4 text-rust" />
                  {companyInfo.phone}
                </a>
                <a href={`mailto:${companyInfo.email}`} className="flex items-center gap-3 text-sm text-charcoal hover:text-rust transition-colors">
                  <Mail className="w-4 h-4 text-rust" />
                  {companyInfo.email}
                </a>
                <div className="flex items-start gap-3 text-sm text-charcoal">
                  <MapPin className="w-4 h-4 text-rust mt-0.5" />
                  <span className="text-xs">{companyInfo.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-charcoal text-white flex items-center justify-center shadow-lg hover:bg-rust transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Need help?"
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </motion.button>
    </>
  );
}

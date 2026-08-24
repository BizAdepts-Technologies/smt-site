import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warm-white flex items-center justify-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-6"
      >
        <span className="text-rust text-sm font-medium tracking-wider">Error 404</span>
        <h1 className="text-6xl md:text-8xl font-light text-charcoal mt-4 tracking-tight">Page not found</h1>
        <p className="text-warm-grey mt-6 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-rust text-white font-medium hover:bg-rust-deep transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to homepage
        </Link>
      </motion.div>
    </div>
  );
}

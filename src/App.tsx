import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Breadcrumb from './components/Breadcrumb';
import NeedHelp from './components/NeedHelp';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Solutions from './pages/Solutions';
import Inspiration from './pages/Inspiration';
import Projects from './pages/Projects';
import Resources from './pages/Resources';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-warm-white">
      <CustomCursor />
      <LoadingScreen />
      <Navbar />
      <Breadcrumb />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/products/:category" element={<PageTransition><Products /></PageTransition>} />
          <Route path="/product/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
          <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
          <Route path="/solutions/:id" element={<PageTransition><Solutions /></PageTransition>} />
          <Route path="/inspiration" element={<PageTransition><Inspiration /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <AIChat />
      <NeedHelp />
      <BackToTop />
    </div>
  );
}

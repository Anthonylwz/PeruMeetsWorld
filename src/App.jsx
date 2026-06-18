import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';

import CountryDetail from './pages/CountryDetail';
import NextDestinationDetail from './pages/NextDestinationDetail';
import AdminPanel from './pages/AdminPanel';

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const VisitedDestinations = lazy(() => import('./pages/VisitedDestinations'));
const NextDestinations = lazy(() => import('./pages/NextDestinations'));

// Loading Fallback
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary text-white">
    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Page transition — no exit animation (overlay already covers the screen)
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.15, ease: 'easeOut' }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/routes" element={<PageWrapper><RoutesPage /></PageWrapper>} />
        <Route path="/visited" element={<PageWrapper><VisitedDestinations /></PageWrapper>} />
        <Route path="/next" element={<PageWrapper><NextDestinations /></PageWrapper>} />

        {/* Dynamic routes - no PageWrapper so they render instantly with no opacity flash */}
        <Route path="/:slug" element={<CountryDetail />} />
        <Route path="/next/:slug" element={<NextDestinationDetail />} />

        {/* Hidden Admin Route - Remove before production */}
        <Route path="/admin-media" element={<AdminPanel />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow z-10 pt-20 relative">
          <Suspense fallback={<Loader />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;

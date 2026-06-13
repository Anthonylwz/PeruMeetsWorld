import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

// Lazy loaded pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const VisitedDestinations = lazy(() => import('./pages/VisitedDestinations'));
const NextDestinations = lazy(() => import('./pages/NextDestinations'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const NextDestinationDetail = lazy(() => import('./pages/NextDestinationDetail'));

// Loading Fallback
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-primary text-white">
    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        <Navbar />
        <main className="flex-grow z-10 pt-20 relative">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/visited" element={<VisitedDestinations />} />
              <Route path="/next" element={<NextDestinations />} />
              
              {/* Dynamic routes */}
              <Route path="/:slug" element={<CountryDetail />} />
              <Route path="/next/:slug" element={<NextDestinationDetail />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;

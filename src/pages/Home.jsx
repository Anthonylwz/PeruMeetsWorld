import { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Globe } from 'lucide-react';
import CountryModal from '../components/CountryModal';

const Earth3D = lazy(() => import('../components/Earth3D'));
const Map2D = lazy(() => import('../components/Map2D'));

const Home = () => {
  const [viewMode, setViewMode] = useState('3D'); // '3D' or '2D'
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const handleCountryClick = (country) => {
    if (country.visited) {
      navigate(`/${country.slug}`);
    } else if (country.nextDestination) {
      navigate(`/next/${country.slug}`);
    } else {
      setSelectedCountry(country);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden -mt-20">
      {/* Background Map Container */}
      <Suspense fallback={
        <div className="absolute inset-0 bg-primary flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        {viewMode === '3D' ? (
          <Earth3D onCountryClick={handleCountryClick} />
        ) : (
          <Map2D onCountryClick={handleCountryClick} />
        )}
      </Suspense>

      {/* Hero Overlay (non-intrusive) */}
      <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-2xl">
          Explora con <br/> <span className="text-accent">Nosotros</span>
        </h1>
        <p className="text-gray-300 mt-2 max-w-sm drop-shadow-md text-sm md:text-base">
          Gira el mundo, descubre nuestras aventuras y acompáñanos en este viaje sin fin.
        </p>
      </div>

      {/* Map View Toggle */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 glass-panel rounded-full p-1 flex items-center gap-1 shadow-2xl">
        <button
          onClick={() => setViewMode('3D')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            viewMode === '3D' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Globe size={18} /> 3D
        </button>
        <button
          onClick={() => setViewMode('2D')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            viewMode === '2D' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Map size={18} /> 2D
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-10 right-10 z-20 glass-panel p-4 rounded-xl hidden md:block">
        <h4 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Leyenda</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E94560] shadow-[0_0_10px_#E94560]"></span>
            <span className="text-xs text-gray-300">Visitado</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#F39C12] shadow-[0_0_10px_#F39C12]"></span>
            <span className="text-xs text-gray-300">Próximo Destino</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#ffffff]"></span>
            <span className="text-xs text-gray-300">No Visitado</span>
          </div>
        </div>
      </div>

      {/* Modal para países no visitados */}
      {selectedCountry && (
        <CountryModal 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  );
};

export default Home;

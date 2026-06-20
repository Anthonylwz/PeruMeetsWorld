import { useState, useCallback, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Globe } from 'lucide-react';
import CountryModal from '../components/CountryModal';
import Loader from '../components/Loader';
import countriesData from '../data/countries.json';

const Earth3D = lazy(() => import('../components/Earth3D'));
const Map2D = lazy(() => import('../components/Map2D'));

const Home = () => {
  const [viewMode, setViewMode] = useState('3D');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [transitionImage, setTransitionImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const navigate = useNavigate();

  const handleZoomStart = useCallback((point) => {
    const fullCountry = countriesData.find(c => c.slug === point.slug) || point;
    if (!fullCountry.coverImage) return;

    // Preload image
    const img = new Image();
    img.src = fullCountry.coverImage;

    setTransitionImage(fullCountry.coverImage);
    setShowImage(false);

    // Empieza a aparecer la imagen del país lentamente sobre el fondo del globo, dando el efecto Google Earth
    setTimeout(() => setShowImage(true), 600);
  }, []);

  const handleCountryClick = useCallback((country) => {
    if (country.visited) {
      navigate(`/${country.slug}`);
    } else {
      setSelectedCountry(country);
    }

    setTimeout(() => {
      setTransitionImage(null);
      setShowImage(false);
    }, 100);
  }, [navigate]);

  return (
    <div className="h-screen w-full relative overflow-hidden -mt-20">
      {/* Background Map Container */}
      <Suspense fallback={<Loader fullScreen={false} />}>
        {viewMode === '3D' ? (
          <Earth3D onCountryClick={handleCountryClick} onZoomStart={handleZoomStart} />
        ) : (
          <Map2D onCountryClick={handleCountryClick} onZoomStart={handleZoomStart} />
        )}
      </Suspense>

      {/* OVERLAY DE IMAGEN TIPO GOOGLE EARTH */}
      {/* Se superpone al globo pero queda DETRÁS del navbar. Exactamente igual a la web de destino para evitar corte brusco */}
      {transitionImage && (
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: showImage ? 1 : 0,
            transition: 'opacity 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <img
            src={transitionImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transform: showImage ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          {/* Este degradado es el mismo que tiene el hero de CountryDetail y la vista de inicio */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C]/40 via-[#0C0C0C]/80 to-[#0C0C0C]" />
        </div>
      )}

      {/* Hero Overlay (textos de inicio) */}
      <div
        className="absolute bottom-10 left-10 z-20 pointer-events-none"
        style={{
          opacity: transitionImage ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white drop-shadow-2xl">
          Explora con <br /> <span className="text-accent">Nosotros</span>
        </h1>
        <p className="text-gray-300 mt-2 max-w-sm drop-shadow-md text-sm md:text-base">
          Gira el mundo, descubre nuestras aventuras.
        </p>
      </div>

      {/* Map View Toggle */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-20 glass-panel rounded-full p-1 flex items-center gap-1 shadow-2xl"
        style={{
          opacity: transitionImage ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: transitionImage ? 'none' : 'auto',
        }}
      >
        <button
          onClick={() => setViewMode('3D')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === '3D' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
        >
          <Globe size={18} /> 3D
        </button>
        <button
          onClick={() => setViewMode('2D')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === '2D' ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
            }`}
        >
          <Map size={18} /> 2D
        </button>
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-10 right-10 z-20 glass-panel p-4 rounded-xl hidden md:block"
        style={{
          opacity: transitionImage ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <h4 className="text-white text-xs font-bold mb-3 uppercase tracking-wider">Explora</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#E94560] shadow-[0_0_10px_#E94560]"></span>
            <span className="text-xs text-gray-300">Visitado</span>
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

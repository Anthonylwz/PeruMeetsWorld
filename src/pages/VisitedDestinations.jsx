import { useState, useMemo, useEffect } from 'react';
import { Plane, Search, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import countriesData from '../data/countries.json';

const VisitedDestinations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [randomizedVisited, setRandomizedVisited] = useState([]);

  // Mezclar el orden de los países al cargar para que el primero y su fondo sean aleatorios
  useEffect(() => {
    const visited = countriesData.filter(c => c.visited);
    const shuffled = [...visited].sort(() => Math.random() - 0.5);
    setRandomizedVisited(shuffled);
  }, []);

  // Smart search: removes accents and ignores case
  const filteredCountries = useMemo(() => {
    let visited = [...randomizedVisited];
    if (searchTerm.trim() !== '') {
      const normalizedSearch = searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      visited = visited.filter(c => {
        const normalizedName = c.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        return normalizedName.includes(normalizedSearch);
      });
    }
    return visited;
  }, [searchTerm, randomizedVisited]);

  // El fondo siempre es el país sobre el que pasamos el mouse, O el primer país de la lista actual
  const activeCountry = hoveredCountry || filteredCountries[0];

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-white relative overflow-hidden flex flex-col -mt-20">
      
      {/* DYNAMIC FULLSCREEN BACKGROUND */}
      <AnimatePresence>
        {activeCountry && (
          <motion.div 
            key={activeCountry.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <img src={activeCountry.coverImage} className="w-full h-full object-cover" alt="" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay: Removed blur, keeping dark gradient for readability */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-500 bg-gradient-to-b from-[#0C0C0C]/30 via-[#0C0C0C]/70 to-[#0C0C0C]"
      ></div>

      <div className="container mx-auto px-6 lg:px-12 pt-36 pb-20 relative z-10 flex-1 flex flex-col">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 w-full">
          
          <div className="lg:w-2/3">
            <div className="flex items-center gap-3 text-accent font-bold tracking-[0.2em] text-xs uppercase mb-4 drop-shadow-md">
              <span>DESTINOS VISITADOS</span>
              <Plane size={16} />
              <div className="w-12 h-[1px] bg-accent/50"></div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-tight text-white drop-shadow-2xl">
              Lugares que <br/>ya hemos <span className="text-accent font-serif italic font-normal tracking-wide">explorado</span>
            </h1>
          </div>

          {/* LARGE PERMANENT SEARCH BAR (Fills the right space) */}
          <div className="w-full lg:w-1/3">
            <div className="relative w-full group">
              <input 
                type="text" 
                placeholder="Buscar destino..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-14 pr-12 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:bg-white/15 transition-all backdrop-blur-md shadow-2xl"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-accent transition-colors" size={22} />
              
              <AnimatePresence>
                {searchTerm && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* GRID GALLERY (User's requested layout) */}
        <section className="w-full py-4 flex-1">
          {filteredCountries.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCountries.map((country, index) => (
                <motion.div
                  key={country.id}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={() => navigate(`/${country.slug}`)}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative overflow-hidden rounded-3xl bg-white/5 aspect-[4/5] md:aspect-[3/4] cursor-pointer group shadow-2xl border border-white/5 hover:border-accent/50 transition-colors"
                >
                  <motion.img
                    src={country.coverImage}
                    alt={country.name}
                    loading="lazy"
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out"
                  />

                  {/* Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <h2 className="text-3xl font-heading font-black tracking-widest uppercase text-white drop-shadow-md">
                        {country.name}
                      </h2>
                      <p className="text-white/60 text-xs font-bold tracking-widest uppercase mt-2 group-hover:text-accent transition-colors">
                        Explorar Destino
                      </p>
                    </div>
                    
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-white/5 group-hover:bg-accent group-hover:border-accent transition-all group-hover:scale-110">
                      <ArrowRight size={20} className="text-white group-hover:-rotate-45 transition-transform duration-300" />
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center border border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
              <Search size={48} className="text-white/20 mb-4" />
              <p className="text-white/50 text-xl font-medium">No se encontraron destinos con ese nombre.</p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default VisitedDestinations;

import { useState, useEffect } from 'react';
import { X, MapPin, Users, Globe2, Banknote, CloudSun, Info } from 'lucide-react';

const CountryModal = ({ country, onClose }) => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cerrar con ESC
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    // Fetch through Vite proxy → restcountries.com (avoids CORS block)
    const fetchCountryData = async () => {
      try {
        setLoading(true);
        const query = country.id.length === 3
          ? `/api/countries/alpha/${country.id}?fields=flags,capital,region,population,currencies`
          : `/api/countries/name/${encodeURIComponent(country.name)}?fullText=true&fields=flags,capital,region,population,currencies`;

        const response = await fetch(query);
        if (response.ok) {
          const data = await response.json();
          setApiData(Array.isArray(data) ? data[0] : data);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();

    return () => window.removeEventListener('keydown', handleEsc);
  }, [country, onClose]);

  // Si se hace click fuera del modal, se cierra
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-primary/95 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative transform transition-all animate-in zoom-in-95 duration-300">
        
        {/* Header con imagen de bandera o cover */}
        <div className="h-32 bg-secondary relative flex items-center justify-center overflow-hidden">
          {country.coverImage ? (
            <img src={country.coverImage} alt={country.name} className="absolute inset-0 w-full h-full object-cover opacity-50" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary" />
          )}
          
          <div className="relative z-10 flex flex-col items-center">
            {apiData?.flags?.svg && (
              <img src={apiData.flags.svg} alt={`Bandera de ${country.name}`} className="w-16 h-12 object-cover rounded shadow-md border border-white/20 mb-2" />
            )}
            <h2 className="text-2xl font-heading font-bold text-white">{country.name}</h2>
          </div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 text-white p-1.5 rounded-full hover:bg-accent transition-colors z-20"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                {apiData?.capital && (
                  <div className="flex items-start gap-3">
                    <div className="bg-white/5 p-2 rounded-lg text-accent"><MapPin size={18} /></div>
                    <div>
                      <p className="text-xs text-gray-400">Capital</p>
                      <p className="text-sm font-semibold text-white">{apiData.capital[0]}</p>
                    </div>
                  </div>
                )}
                
                {apiData?.region && (
                  <div className="flex items-start gap-3">
                    <div className="bg-white/5 p-2 rounded-lg text-accent"><Globe2 size={18} /></div>
                    <div>
                      <p className="text-xs text-gray-400">Región</p>
                      <p className="text-sm font-semibold text-white">{apiData.region}</p>
                    </div>
                  </div>
                )}
                
                {apiData?.population && (
                  <div className="flex items-start gap-3">
                    <div className="bg-white/5 p-2 rounded-lg text-accent"><Users size={18} /></div>
                    <div>
                      <p className="text-xs text-gray-400">Población</p>
                      <p className="text-sm font-semibold text-white">{apiData.population.toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                {apiData?.currencies && (
                  <div className="flex items-start gap-3">
                    <div className="bg-white/5 p-2 rounded-lg text-accent"><Banknote size={18} /></div>
                    <div>
                      <p className="text-xs text-gray-400">Moneda</p>
                      <p className="text-sm font-semibold text-white">
                        {Object.values(apiData.currencies)[0].name} ({Object.values(apiData.currencies)[0].symbol})
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Información manual extra */}
              {(country.typicalWeather || country.funFacts) && (
                <div className="border-t border-white/10 pt-4 space-y-4">
                  {country.typicalWeather && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm text-gray-400 font-semibold mb-1">
                        <CloudSun size={16} className="text-accent" /> Clima Típico
                      </h4>
                      <p className="text-sm text-gray-200">{country.typicalWeather}</p>
                    </div>
                  )}
                  
                  {country.funFacts && country.funFacts.length > 0 && (
                    <div>
                      <h4 className="flex items-center gap-2 text-sm text-gray-400 font-semibold mb-1">
                        <Info size={16} className="text-accent" /> Curiosidades
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                        {country.funFacts.map((fact, i) => (
                          <li key={i}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="btn-secondary text-sm px-4 py-2">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;

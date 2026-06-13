import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Calendar, ArrowLeft, Heart, Target } from 'lucide-react';
import countriesData from '../data/countries.json';

const NextDestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0);
    const found = countriesData.find(c => c.slug === slug && c.nextDestination);
    if (!found) {
      navigate('/');
      return;
    }
    setCountry(found);
  }, [slug, navigate]);

  if (!country) return <div className="min-h-screen bg-primary"></div>;

  return (
    <div className="bg-primary min-h-screen pb-20">
      
      {/* Hero Principal */}
      <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={country.coverImage} alt={country.name} className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-accent/50 animate-pulse">
            <Target size={16} /> Próximo Destino
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-white drop-shadow-2xl">
            {country.name}
          </h1>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 flex items-center gap-2 mx-auto text-gray-300 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Volver al mapa
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card: Motivo */}
          <div className="glass-panel p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent/20 p-3 rounded-full text-accent">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">¿Por qué {country.name}?</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {country.reason || "Buscando nuevas aventuras y experiencias culturales increíbles."}
            </p>
          </div>

          {/* Card: Detalles */}
          <div className="glass-panel p-8 rounded-3xl space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-sm text-gray-400 font-semibold mb-2 uppercase tracking-wider">
                <Calendar size={18} className="text-accent" /> Fecha Estimada
              </h4>
              <p className="text-2xl font-bold text-white">{country.estimatedDate || "Por definir"}</p>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm text-gray-400 font-semibold mb-3 uppercase tracking-wider">
                <MapPin size={18} className="text-accent" /> Lugares de Interés
              </h4>
              <div className="flex flex-wrap gap-3">
                {country.placesOfInterest?.map((place, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-200 hover:bg-white/10 transition-colors">
                    {place}
                  </span>
                )) || <span className="text-gray-400 italic">Investigando lugares increíbles...</span>}
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default NextDestinationDetail;

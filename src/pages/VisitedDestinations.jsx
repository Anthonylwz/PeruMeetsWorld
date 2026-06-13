import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import countriesData from '../data/countries.json';

const VisitedDestinations = () => {
  const navigate = useNavigate();
  const visited = countriesData.filter(c => c.visited);

  return (
    <div className="min-h-screen bg-primary pt-10 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Destinos Visitados</h1>
          <div className="w-16 h-1 bg-accent rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl">
            Explora los países en los que ya hemos dejado nuestra huella. Fotos, videos y tips basados en nuestras experiencias reales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visited.map((country) => (
            <div 
              key={country.id} 
              onClick={() => navigate(`/${country.slug}`)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border-white/5 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={country.coverImage} 
                  alt={country.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Visitado
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">{country.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin size={16} className="text-accent" />
                  {country.experiences?.length || 0} lugares documentados
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VisitedDestinations;

import { Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import countriesData from '../data/countries.json';

const NextDestinations = () => {
  const navigate = useNavigate();
  const nextDestinations = countriesData.filter(c => c.nextDestination);

  return (
    <div className="min-h-screen bg-primary pt-10 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Próximos Destinos</h1>
          <div className="w-16 h-1 bg-[#F39C12] rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-2xl">
            El mapa es grande y nuestra lista de deseos aún más. Estos son los lugares que estamos planeando descubrir pronto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nextDestinations.map((country) => (
            <div 
              key={country.id} 
              onClick={() => navigate(`/next/${country.slug}`)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-panel border-white/5 hover:border-[#F39C12]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F39C12]/20"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={country.coverImage} 
                  alt={country.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-flex items-center gap-2 text-[#F39C12] text-xs font-bold uppercase tracking-wider mb-2">
                    <Target size={14} /> En la mira
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-white">{country.name}</h3>
                </div>
              </div>
            </div>
          ))}
          
          {nextDestinations.length === 0 && (
            <div className="col-span-full py-20 text-center glass-panel rounded-3xl">
              <Target size={48} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Aún no hay destinos planeados</h3>
              <p className="text-gray-400">Estamos tomando un descanso... o tal vez planeando algo en secreto.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default NextDestinations;

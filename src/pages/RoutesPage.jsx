import { Map } from 'lucide-react';
import { routesData } from '../data/routesData';
import countriesData from '../data/countries.json';
import { useNavigate } from 'react-router-dom';

const RoutesPage = () => {
  const navigate = useNavigate();

  // Merge route data with country info
  const sortedRoutes = routesData.map(r => {
    const countryInfo = countriesData.find(c => c.id === r.id);
    return { ...r, ...countryInfo };
  }).sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-primary pt-10 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6">
            <Map size={32} className="text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Nuestra Ruta</h1>
          <p className="text-gray-400">
            El camino que hemos recorrido hasta ahora. Cada paso ha sido una aventura inolvidable.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Línea vertical conectora */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2 rounded-full hidden md:block"></div>

          <div className="space-y-12 relative">
            {sortedRoutes.map((route, index) => (
              <div key={route.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Contenido */}
                <div className="flex-1 w-full group">
                  <div 
                    onClick={() => route.visited ? navigate(`/${route.slug}`) : null}
                    className={`glass-panel p-2 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105 ${route.visited ? 'cursor-pointer hover:border-accent/50 hover:shadow-accent/20' : ''}`}
                  >
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                      <img src={route.coverImage} alt={route.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <div>
                          <p className="text-accent font-bold text-sm mb-1">Destino {route.order}</p>
                          <h3 className="text-3xl font-heading font-bold text-white">{route.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nodo central */}
                <div className="w-12 h-12 bg-primary border-4 border-accent rounded-full z-10 flex items-center justify-center shadow-[0_0_20px_rgba(233,69,96,0.4)] md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-white font-bold text-sm">{route.order}</span>
                </div>

                {/* Espaciador para alinear alternadamente */}
                <div className="flex-1 hidden md:block"></div>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RoutesPage;

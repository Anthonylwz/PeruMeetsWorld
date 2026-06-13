import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-white/10 pt-16 pb-8 mt-20 relative z-10 backdrop-blur-sm">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-white">PeruMeets<span className="font-light">World</span></h3>
            <p className="text-gray-400 max-w-xs">
              Compartiendo nuestras aventuras y descubrimientos a través del globo. El mundo es un libro y nosotros queremos leer todas sus páginas.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all">
                <FaYoutube size={20} />
              </a>
              <a href="https://github.com/tu-usuario/perumeetsworld" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-accent hover:scale-110 transition-all">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Explorar</h4>
            <ul className="space-y-3">
              <li><Link to="/routes" className="text-gray-400 hover:text-accent transition-colors">Rutas de Viaje</Link></li>
              <li><Link to="/visited" className="text-gray-400 hover:text-accent transition-colors">Destinos Visitados</Link></li>
              <li><Link to="/next" className="text-gray-400 hover:text-accent transition-colors">Próximos Destinos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Nosotros</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-accent transition-colors">Nuestra Historia</Link></li>
              <li><a href="mailto:contacto@perumeetsworld.com" className="text-gray-400 hover:text-accent transition-colors">Contacto</a></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} PeruMeetsWorld. Todos los derechos reservados.
          </p>
          <p className="text-gray-600 text-sm mt-2 md:mt-0">
            Diseñado con ❤️ para exploradores.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

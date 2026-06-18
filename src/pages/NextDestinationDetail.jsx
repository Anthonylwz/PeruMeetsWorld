import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MapPin, Calendar, ArrowLeft, Heart, Target } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SiKick } from 'react-icons/si';
import countriesData from '../data/countries.json';

const NextDestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const country = countriesData.find(c => c.slug === slug && c.nextDestination);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!country) {
      navigate('/');
    }
  }, [country, navigate]);

  if (!country) return <div className="min-h-screen bg-primary"></div>;

  return (
    <div className="bg-primary min-h-screen pb-20 -mt-20">

      {/* Hero Principal — extends behind navbar like Home */}
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

      {/* SECCIÓN Redes Sociales */}
      <div className="container mx-auto px-6 lg:px-12 pb-20 pt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Síguenos en nuestras redes sociales</h2>
          <p className="text-accent mt-2 font-light">Para más contenido y viajes en vivo</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            {
              name: 'YouTube',
              url: 'https://www.youtube.com/@PeruMeetsWorld',
              icon: <FaYoutube size={22} />,
              hoverBorder: 'hover:border-[#FF0000]/50',
              hoverShadow: 'hover:shadow-[#FF0000]/20',
            },
            {
              name: 'Instagram',
              url: 'https://www.instagram.com/perumeetsworld/',
              icon: <FaInstagram size={22} />,
              hoverBorder: 'hover:border-[#E1306C]/50',
              hoverShadow: 'hover:shadow-[#E1306C]/20',
            },
            {
              name: 'TikTok',
              url: 'https://www.tiktok.com/@perumeetsworld',
              icon: <FaTiktok size={20} />,
              hoverBorder: 'hover:border-[#00f2ea]/50',
              hoverShadow: 'hover:shadow-[#00f2ea]/20',
            },
            {
              name: 'Kick',
              url: 'https://kick.com/marinagold',
              icon: <SiKick size={20} />,
              hoverBorder: 'hover:border-[#53FC18]/50',
              hoverShadow: 'hover:shadow-[#53FC18]/20',
            }
          ].map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium transition-all duration-300 hover:-translate-y-1 ${social.hoverBorder} ${social.hoverShadow} group`}
            >
              <div className="text-gray-400 group-hover:text-white transition-colors">
                {social.icon}
              </div>
              {social.name}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
};

export default NextDestinationDetail;

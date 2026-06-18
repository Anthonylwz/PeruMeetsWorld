import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { MapPin, Calendar, ArrowLeft, PlayCircle, Maximize2 } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { SiKick } from 'react-icons/si';
import countriesData from '../data/countries.json';
import ImageViewer from '../components/ImageViewer';

const CountryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const country = countriesData.find(c => c.slug === slug && c.visited);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState(() => {
    if (!country) return '';
    if (country.videoId) return 'youtube';
    if (country.instagramUrl) return 'instagram';
    if (country.tiktokUrl) return 'tiktok';
    return '';
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!country) {
      navigate('/');
    }
  }, [country, navigate]);

  if (!country) return <div className="min-h-screen bg-primary"></div>;

  const photos = country.experiences?.filter(exp => exp.image) || [];
  const videos = country.experiences?.filter(exp => exp.video) || [];

  // Helpers to parse embed URLs
  const getInstagramEmbed = (url) => {
    if (!url) return '';
    const cleanUrl = url.split('?')[0];
    return cleanUrl.endsWith('/') ? `${cleanUrl}embed` : `${cleanUrl}/embed`;
  };

  const getTiktokEmbed = (url) => {
    if (!url) return '';
    // Extract video ID
    const match = url.match(/\/video\/(\d+)/);
    const id = match ? match[1] : url;
    return `https://www.tiktok.com/embed/v2/${id}`;
  };

  const hasMedia = country.videoId || country.instagramUrl || country.tiktokUrl;

  const handleNextMedia = () => {
    if (!country?.experiences || country.experiences.length <= 1) return;
    const currentIndex = country.experiences.findIndex(exp => exp.id === selectedImage?.id);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % country.experiences.length;
    setSelectedImage(country.experiences[nextIndex]);
  };

  const handlePrevMedia = () => {
    if (!country?.experiences || country.experiences.length <= 1) return;
    const currentIndex = country.experiences.findIndex(exp => exp.id === selectedImage?.id);
    if (currentIndex === -1) return;
    const prevIndex = (currentIndex - 1 + country.experiences.length) % country.experiences.length;
    setSelectedImage(country.experiences[prevIndex]);
  };

  return (
    <div className="bg-primary min-h-screen pb-20 -mt-20">

      {/* SECCIÓN 1: Hero Principal — extends behind navbar like Home */}
      <div className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={country.coverImage} alt={country.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/60 to-primary" />
        </div>
        <div className="relative z-10 text-center px-4 animate-in slide-in-from-bottom-10 duration-1000">
          <p className="text-accent font-semibold tracking-widest uppercase mb-4">PeruMeetsWorld en</p>
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



      {/* SECCIÓN 2: Video Principal / Media Center */}
      <div className="container mx-auto px-6 lg:px-12 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Nuestra Experiencia</h2>
        </div>

        {hasMedia ? (
          <div className="max-w-4xl mx-auto">
            {/* Tabs Selector */}
            <div className="flex justify-center gap-4 mb-6">
              {country.videoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${country.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-[#FF0000] hover:border-[#FF0000] hover:shadow-lg hover:shadow-[#FF0000]/20`}
                >
                  <FaYoutube size={16} /> YouTube
                </a>
              )}
              {country.instagramUrl && (
                <button
                  onClick={() => setActiveTab('instagram')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${activeTab === 'instagram'
                      ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white border-transparent shadow-lg'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                    }`}
                >
                  <FaInstagram size={16} /> Instagram
                </button>
              )}
              {country.tiktokUrl && (
                <button
                  onClick={() => setActiveTab('tiktok')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${activeTab === 'tiktok'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-lg shadow-black/40 border-white/20'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                    }`}
                >
                  <FaTiktok size={16} /> TikTok
                </button>
              )}
            </div>

            {/* Media Box */}
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl shadow-accent/5 border border-white/10 bg-black/50 flex items-center justify-center relative min-h-[450px]">
              {activeTab === 'youtube' && country.videoId && (
                <div className="w-full aspect-video">
                  <YouTube
                    videoId={country.videoId}
                    opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0 } }}
                    className="w-full h-full"
                    iframeClassName="w-full h-full"
                  />
                </div>
              )}

              {activeTab === 'instagram' && country.instagramUrl && (
                <div className="w-full flex justify-center py-6 px-4 bg-[#0d0d15]">
                  <iframe
                    src={getInstagramEmbed(country.instagramUrl)}
                    className="w-full max-w-[400px] h-[550px] border-0 rounded-xl shadow-lg"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media"
                  />
                </div>
              )}

              {activeTab === 'tiktok' && country.tiktokUrl && (
                <div className="w-full flex justify-center py-6 px-4 bg-[#0d0d15]">
                  <iframe
                    src={getTiktokEmbed(country.tiktokUrl)}
                    className="w-full max-w-[325px] h-[580px] border-0 rounded-xl shadow-lg"
                    allowFullScreen
                    scrolling="no"
                    allow="encrypted-media; clipboard-write"
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 py-20 flex flex-col items-center justify-center text-center text-gray-400">
            <p className="text-2xl font-bold mb-2">Próximamente</p>
            <p className="text-sm">Estamos preparando esta aventura.</p>
          </div>
        )}
      </div>

      {/* SECCIÓN 4: Galería de Fotos */}
      {photos.length > 0 && (
        <div className="container mx-auto px-6 lg:px-12 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Galería Fotográfica</h2>
              <p className="text-accent mt-2 font-light">Instantes capturados en {country.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((exp) => (
              <div
                key={exp.id}
                className="group cursor-pointer rounded-3xl overflow-hidden relative border border-white/5 bg-black/20 hover:border-accent/40 transition-all duration-500 shadow-xl hover:shadow-accent/20"
                onClick={() => setSelectedImage(exp)}
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#0a0a0f] flex items-center justify-center relative">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  {/* Icono de expandir sutil */}
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent flex flex-col justify-end p-6 md:p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 tracking-wide">{exp.title}</h3>
                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-300 mb-3">
                      <span className="flex items-center gap-1.5 text-accent"><MapPin size={14} /> {exp.location}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={14} /> {exp.date}</span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 5: Momentos en Video */}
      {videos.length > 0 && (
        <div className="container mx-auto px-6 lg:px-12 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white tracking-wide">Momentos en Video</h2>
              <p className="text-accent mt-2 font-light">Revive la experiencia de {country.name}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((exp) => (
              <div
                key={exp.id}
                className="group cursor-pointer rounded-2xl border border-white/10 bg-[#111118] overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
                onClick={() => setSelectedImage(exp)}
              >
                {/* Video thumbnail — fixed height, adapts visually */}
                <div className="relative bg-black overflow-hidden" style={{ height: '320px' }}>
                  <video
                    src={exp.video}
                    preload="metadata"
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-all duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-accent/90 group-hover:border-accent/60 transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <PlayCircle size={32} className="text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                {/* Info bar */}
                <div className="p-5 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{exp.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1 text-accent"><MapPin size={12} /> {exp.location}</span>
                      {exp.date && <span className="flex items-center gap-1"><Calendar size={12} /> {exp.date}</span>}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <PlayCircle size={20} className="text-gray-500 group-hover:text-accent transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 6: Redes Sociales */}
      <div className="container mx-auto px-6 lg:px-12 pb-20 pt-10">
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

      {/* Visor de imágenes */}
      {selectedImage && (
        <ImageViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNext={country.experiences?.length > 1 ? handleNextMedia : null}
          onPrev={country.experiences?.length > 1 ? handlePrevMedia : null}
        />
      )}

    </div>
  );
};

export default CountryDetail;

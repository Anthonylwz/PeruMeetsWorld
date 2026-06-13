import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { MapPin, Users, Globe2, Banknote, Calendar, ArrowLeft } from 'lucide-react';
import { FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import countriesData from '../data/countries.json';
import ImageViewer from '../components/ImageViewer';

const CountryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    window.scrollTo(0,0);
    const found = countriesData.find(c => c.slug === slug && c.visited);
    if (!found) {
      navigate('/');
      return;
    }
    setCountry(found);

    // Set default active tab based on what's available
    if (found.videoId) {
      setActiveTab('youtube');
    } else if (found.instagramUrl) {
      setActiveTab('instagram');
    } else if (found.tiktokUrl) {
      setActiveTab('tiktok');
    }

    const fetchCountryData = async () => {
      try {
        let query = found.id.length === 3 ? `alpha/${found.id}` : `name/${found.name}?fullText=true`;
        const response = await fetch(`https://restcountries.com/v3.1/${query}`);
        if (response.ok) {
          const data = await response.json();
          setApiData(Array.isArray(data) ? data[0] : data);
        }
      } catch (error) {
        console.error("Error fetching country API data", error);
      }
    };
    fetchCountryData();
  }, [slug, navigate]);

  if (!country) return <div className="min-h-screen bg-primary"></div>;

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

  return (
    <div className="bg-primary min-h-screen pb-20">
      
      {/* SECCIÓN 1: Hero Principal */}
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

      {/* SECCIÓN 3: Información Rápida (Rest Countries API) */}
      {apiData && (
        <div className="container mx-auto px-6 lg:px-12 -mt-16 relative z-20 mb-20">
          <div className="glass-panel p-6 md:p-10 rounded-3xl flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {apiData.flags?.svg && <img src={apiData.flags.svg} alt="Bandera" className="w-16 shadow-lg rounded" />}
              <div>
                <p className="text-sm text-gray-400">País</p>
                <p className="font-bold text-white text-lg">{country.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-3 rounded-xl text-accent"><MapPin size={24} /></div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Capital</p>
                <p className="font-semibold text-white">{apiData.capital ? apiData.capital[0] : 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-3 rounded-xl text-accent"><Globe2 size={24} /></div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Región</p>
                <p className="font-semibold text-white">{apiData.region}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white/5 p-3 rounded-xl text-accent"><Banknote size={24} /></div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Moneda</p>
                <p className="font-semibold text-white">
                  {apiData.currencies ? Object.values(apiData.currencies)[0].name : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECCIÓN 2: Video Principal / Media Center */}
      <div className="container mx-auto px-6 lg:px-12 mb-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">Nuestra Experiencia</h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        {hasMedia ? (
          <div className="max-w-4xl mx-auto">
            {/* Tabs Selector */}
            <div className="flex justify-center gap-4 mb-6">
              {country.videoId && (
                <button
                  onClick={() => setActiveTab('youtube')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    activeTab === 'youtube'
                      ? 'bg-[#FF0000] text-white border-[#FF0000] shadow-lg shadow-[#FF0000]/20'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                  }`}
                >
                  <FaYoutube size={16} /> YouTube
                </button>
              )}
              {country.instagramUrl && (
                <button
                  onClick={() => setActiveTab('instagram')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    activeTab === 'instagram'
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
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${
                    activeTab === 'tiktok'
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

      {/* SECCIÓN 4: Galería de Lugares */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white">Galería de Lugares</h2>
            <p className="text-gray-400 mt-2">Los rincones que descubrimos en {country.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {country.experiences?.map((exp) => (
            <div 
              key={exp.id} 
              className="group cursor-pointer rounded-2xl overflow-hidden relative border border-white/10 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20"
              onClick={() => setSelectedImage(exp)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={exp.image} 
                  alt={exp.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-bold text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-300">
                    <span className="flex items-center gap-1 text-accent"><MapPin size={14} /> {exp.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {exp.date}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visor de imágenes */}
      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
      
    </div>
  );
};

export default CountryDetail;

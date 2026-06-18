import { useEffect, useState } from 'react';
import { Globe, Sparkles } from 'lucide-react';
import { FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SiKick } from 'react-icons/si';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@PeruMeetsWorld',
      icon: <FaYoutube size={22} />,
      color: 'from-[#FF0000] to-[#CC0000]',
      hoverBorder: 'hover:border-[#FF0000]/50',
      hoverShadow: 'hover:shadow-[#FF0000]/20',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/perumeetsworld/',
      icon: <FaInstagram size={22} />,
      color: 'from-[#833AB4] via-[#FD1D1D] to-[#F56040]',
      hoverBorder: 'hover:border-[#E1306C]/50',
      hoverShadow: 'hover:shadow-[#E1306C]/20',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@perumeetsworld',
      icon: <FaTiktok size={20} />,
      color: 'from-[#00f2ea] to-[#ff0050]',
      hoverBorder: 'hover:border-[#00f2ea]/50',
      hoverShadow: 'hover:shadow-[#00f2ea]/20',
    },
    {
      name: 'Kick',
      url: 'https://kick.com/marinagold',
      icon: <SiKick size={22} />,
      color: 'from-[#53FC18] to-[#3dd611]',
      hoverBorder: 'hover:border-[#53FC18]/50',
      hoverShadow: 'hover:shadow-[#53FC18]/20',
    },
  ];

  return (
    <div className="min-h-screen bg-primary -mt-20 overflow-hidden">

      {/* ═══════════════════════════════════════════════ */}
      {/* HERO — Cinematic Full-Bleed                    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/drtvfrfpm/image/upload/v1781805082/sxz7vdaxnoptobrqfvcg.jpg"
            alt="Los Dodos viajando"
            className="w-full h-full object-cover"
            style={{
              transform: isVisible ? 'scale(1)' : 'scale(1.1)',
              transition: 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-black/50 to-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-primary/60" />
          {/* Film grain texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
        </div>

        {/* Content */}
        <div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-semibold mb-8 backdrop-blur-sm">
            <Globe size={16} className="animate-spin" style={{ animationDuration: '8s' }} />
            Peruanos recorriendo el mundo
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold text-white mb-6 tracking-tight leading-[0.9]">
            Los <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#FF6B6B] to-[#F39C12]">Dodos</span>
            <span className="inline-block ml-3 animate-bounce" style={{ animationDuration: '2s' }}>🦤</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Somos una pareja peruana viajando por el mundo…
            <br className="hidden md:block" />
            aunque muchos ya nos conocen como los
            <span className="text-accent font-medium"> Señores Gold</span>
          </p>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-white/30">
            <span className="text-xs uppercase tracking-[0.3em] font-medium">Descubre nuestra historia</span>
            <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* STORY — Simple Layout                          */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-widest mb-2">
                <Sparkles size={16} /> Nuestra Historia
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8">
                De Perú al <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#F39C12]">Mundo</span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                  Somos una pareja peruana viajando por el mundo… aunque muchos ya nos conocen como los Señores Gold o los Dodos🦤❤️
                </p>
                <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                  Aquí compartimos viajes caóticos en pareja, comida increíble, cultura, aventuras y lo bonito y no tan bonito de explorar el mundo juntos.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg md:text-xl font-light">
                  Empezamos recorriendo Europa y luego nos vamos al Sudeste Asiático… y esto recién comienza. 🌏
                </p>
                <p className="text-accent font-medium text-lg md:text-xl mt-8">
                  🦤 Súmate a la familia de Doditos y viaja con nosotros.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 group shadow-2xl hover:border-accent/30 transition-all duration-500">
              <div className="aspect-[4/5] relative bg-[#0a0a0f]">
                <img
                  src="https://res.cloudinary.com/drtvfrfpm/image/upload/v1781805082/sxz7vdaxnoptobrqfvcg.jpg"
                  alt="Los Dodos viajando"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-accent/90 rounded-full text-white text-xs font-bold mb-2">📍 Viajeros</span>
                  <p className="text-white font-heading font-bold text-xl">Marina Gold & Caradecristian</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SOCIAL — Links with icon + name (preserved)    */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.25em] mb-6">
              Síguenos en nuestras aventuras
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">
              Encuéntranos en <span className="text-accent">todas partes</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-secondary px-5 py-3 ${social.hoverBorder} ${social.hoverShadow} hover:shadow-lg transition-all duration-300`}
                >
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-20" />
    </div>
  );
};

export default About;

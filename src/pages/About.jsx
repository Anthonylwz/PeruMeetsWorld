import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Real image of the couple */}
        <div className="absolute inset-0">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgfC_ufAXF6-3aWsUY8sH8qiZIF_2ELsSFA&s" alt="Los Dodos" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6">Los Dodos 🦤</h1>
          <p className="text-xl text-gray-200 font-light leading-relaxed">
            Somos una pareja peruana viajando por el mundo… aunque muchos ya nos conocen como los Señores Gold o los Dodos ❤️
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ArrowDown size={32} />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">Descripción</h2>
              <div className="w-16 h-1 bg-accent mb-6 rounded-full"></div>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Somos una pareja peruana viajando por el mundo… aunque muchos ya nos conocen como los Señores Gold o los Dodos🦤❤️
              </p>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Aquí compartimos viajes caóticos en pareja, comida increíble, cultura, aventuras y lo bonito y no tan bonito de explorar el mundo juntos.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                Empezamos recorriendo Europa y luego nos vamos al Sudeste Asiático… y esto recién comienza. 🌏
              </p>
            </div>

            <div className="glass-panel p-6 border-l-4 border-l-accent">
              <h3 className="text-xl font-bold text-white mb-2">¡Únete a la familia!</h3>
              <p className="text-gray-400">🦤 Súmate a la familia de Doditos y viaja con nosotros.</p>
            </div>

            <div className="pt-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Síguenos en nuestras aventuras</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/perumeetsworld/" className="btn-secondary px-4 py-2">
                  <FaInstagram size={20} /> Instagram
                </a>
                <a href="https://www.youtube.com/@PeruMeetsWorld" className="btn-secondary px-4 py-2">
                  <FaYoutube size={20} /> YouTube
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/10 relative z-10 shadow-2xl">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMgfC_ufAXF6-3aWsUY8sH8qiZIF_2ELsSFA&s" alt="Los Dodos" className="w-full h-full object-cover" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#F39C12]/20 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;



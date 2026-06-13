import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Placeholder image from unsplash representing a couple traveling */}
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1522881113593-3932759c9869?auto=format&fit=crop&q=80&w=2000" alt="Nosotros" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6">Nuestra Historia</h1>
          <p className="text-xl text-gray-200 font-light leading-relaxed">
            Dos almas peruanas descubriendo el mundo, una aventura a la vez. No somos guías, somos exploradores compartiendo lo que el mundo nos enseña.
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
              <h2 className="text-3xl font-heading font-bold text-white mb-4">¿Quiénes Somos?</h2>
              <div className="w-16 h-1 bg-accent mb-6 rounded-full"></div>
              <p className="text-gray-300 leading-relaxed text-lg">
                Somos una pareja apasionada por descubrir qué hay más allá de nuestra zona de confort. Nacimos en Perú, un país lleno de cultura, y eso nos impulsó a querer conocer las culturas del resto del mundo.
              </p>
            </div>

            <div className="glass-panel p-6 border-l-4 border-l-accent">
              <h3 className="text-xl font-bold text-white mb-2">Nuestra Misión</h3>
              <p className="text-gray-400">Inspirar a otros a empacar su mochila, dejar los miedos y atreverse a vivir experiencias reales. Mostrar que el mundo es menos aterrador y más asombroso de lo que parece.</p>
            </div>

            <div className="glass-panel p-6 border-l-4 border-l-[#F39C12]">
              <h3 className="text-xl font-bold text-white mb-2">Nuestra Visión</h3>
              <p className="text-gray-400">Crear una comunidad de viajeros donde las fronteras sean solo líneas en un mapa y las conexiones humanas sean el verdadero tesoro del viaje.</p>
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
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000" alt="En la playa" className="w-full h-full object-cover" />
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


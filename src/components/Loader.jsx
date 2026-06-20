import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = true, delay = 250 }) => {
  const [show, setShow] = useState(false);

  // Prevent loader from flashing on incredibly fast loads
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] flex items-center justify-center bg-[#0C0C0C]/95 backdrop-blur-md"
    : "absolute inset-0 w-full h-full flex items-center justify-center bg-[#0C0C0C]/95 backdrop-blur-md";

  return (
    <div className={containerClasses}>
      <style>{`
        @keyframes pan-map {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Massive Container */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        
        {/* Massive Ambient Glow */}
        <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-[60px] animate-pulse"></div>

        {/* Authentic Earth Sphere (HUGE: 256px) */}
        <div className="absolute m-auto w-64 h-64 rounded-full overflow-hidden" 
             style={{
               background: 'radial-gradient(circle at 30% 30%, #1A1A24 0%, #08080C 80%)',
               boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.9), 0 0 50px rgba(233,69,96,0.25), inset 5px 5px 20px rgba(255,255,255,0.1)'
             }}>
          
          {/* Authentic Real World Map Texture (Mathematically perfect 2:1 projection wrap) */}
          <div className="absolute inset-0 h-full w-[400%] flex opacity-50 mix-blend-screen"
               style={{ animation: 'pan-map 35s linear infinite' }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
              alt="World Map Texture" 
              className="w-1/2 h-full object-cover invert" 
              style={{ objectPosition: 'center' }}
            />
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
              alt="World Map Texture" 
              className="w-1/2 h-full object-cover invert" 
              style={{ objectPosition: 'center' }}
            />
          </div>
        </div>

        {/* Orbit Ring (Dashed line tracking the airplane) */}
        <div className="absolute w-80 h-80 rounded-full border-[2px] border-dashed border-accent/40 shadow-[0_0_20px_rgba(233,69,96,0.15)]"></div>

        {/* Orbiting Airplane Container */}
        <motion.div 
          className="absolute inset-0 z-20 w-80 h-80 m-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        >
          {/* Detailed Commercial Jet Silhouette (Scaled up) */}
          <div className="absolute -top-[20px] left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_#e94560]">
            <svg viewBox="0 0 100 100" className="w-10 h-10 fill-accent rotate-90">
              <path d="M49.8,5.4C48.5,5.4,47.4,6.4,47.4,7.7l0,28.6l-33.1,28v4.9l33.1-15.6v23.2l-9.4,7.8v3.6l11.8-3.6l11.8,3.6v-3.6l-9.4-7.8V48.6L85.7,64.2v-4.9l-33.1-28L52.6,7.7C52.6,6.4,51.1,5.4,49.8,5.4z" />
            </svg>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Loader;

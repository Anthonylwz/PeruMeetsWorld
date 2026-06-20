import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Ship, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { routesData } from '../data/routesData';
import countriesData from '../data/countries.json';

const RoutesPage = () => {
  const navigate = useNavigate();
  const globeRef = useRef();
  const [activeStep, setActiveStep] = useState(0);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Merge route data with country info
  const sortedRoutes = useMemo(() => {
    return routesData.map(r => {
      const countryInfo = countriesData.find(c => c.id === r.id);
      return { ...r, ...countryInfo };
    }).sort((a, b) => a.order - b.order);
  }, []);

  // Generate Arcs for flight/boat paths - PROGRESSIVE TIMELINE (Solo el actual)
  const arcsData = useMemo(() => {
    // Si estamos en el último paso, no hay siguiente ruta que dibujar
    if (activeStep >= sortedRoutes.length - 1) return [];
    
    const start = sortedRoutes[activeStep];
    const end = sortedRoutes[activeStep + 1];
    
    return [{
      startLat: start.lat,
      startLng: start.lng,
      endLat: end.lat,
      endLng: end.lng,
      color: start.transportToNext === 'boat' ? ['rgba(77,157,224,0.2)', 'rgba(77,157,224,1)'] : ['rgba(233,69,96,0.2)', 'rgba(233,69,96,1)'],
      transport: start.transportToNext,
      id: `${start.id}-${end.id}`,
      isActive: true
    }];
  }, [sortedRoutes, activeStep]);

  // Mostrar solo los países de la ruta actual (Origen y Destino)
  const visibleCountries = useMemo(() => {
    if (activeStep >= sortedRoutes.length - 1) return [sortedRoutes[activeStep]];
    return [sortedRoutes[activeStep], sortedRoutes[activeStep + 1]];
  }, [sortedRoutes, activeStep]);

  // Handle cinematic camera flying
  useEffect(() => {
    if (globeRef.current && sortedRoutes[activeStep]) {
      const current = sortedRoutes[activeStep];
      // Ajuste de cámara: alejado y desplazado para que el UI no tape el país ni las rutas
      globeRef.current.pointOfView({ 
        lat: current.lat - 5, // Ligeramente arriba
        lng: current.lng - 15, // Desplazar la cámara al oeste, para que el país quede a la derecha (lejos del UI)
        altitude: 2.0 // Un poco más lejos para ver toda la trayectoria
      }, 2500); // 2.5s duration
    }
  }, [activeStep, sortedRoutes]);

  // On mount, set initial POV smoothly
  useEffect(() => {
    if (globeRef.current && sortedRoutes.length > 0) {
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 4 }, 0);
      setTimeout(() => {
        globeRef.current.pointOfView({ 
          lat: sortedRoutes[0].lat - 5, 
          lng: sortedRoutes[0].lng - 15, 
          altitude: 2.0 
        }, 3000);
      }, 500);
    }
  }, [sortedRoutes]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-[#030305] overflow-hidden cursor-grab active:cursor-grabbing z-0">
      
      {/* 3D GLOBE RENDERER */}
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        arcsData={arcsData}
        arcStartLat={d => d.startLat}
        arcStartLng={d => d.startLng}
        arcEndLat={d => d.endLat}
        arcEndLng={d => d.endLng}
        arcColor={d => d.color}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcsTransitionDuration={1000}
        arcStroke={d => d.isActive ? 2 : 0.5}
        
        pointsData={visibleCountries}
        pointLat="lat"
        pointLng="lng"
        pointColor={(d) => sortedRoutes.indexOf(d) === activeStep ? '#E94560' : '#ffffff'}
        pointAltitude={0.05}
        pointRadius={0.3}
        pointsMerge={false}
        
        htmlElementsData={visibleCountries}
        htmlLat="lat"
        htmlLng="lng"
        htmlElement={(d) => {
          const isCurrent = sortedRoutes.indexOf(d) === activeStep;
          const isHome = sortedRoutes.indexOf(d) === 0;
          const el = document.createElement('div');
          
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center -translate-y-1/2 cursor-pointer transition-transform duration-500 ${isCurrent ? 'scale-125' : 'scale-75 opacity-50 hover:opacity-100'}">
              <div class="px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 mb-2 whitespace-nowrap shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                <span class="text-white text-xs font-bold tracking-widest">${d.name}</span>
              </div>
              <div class="relative flex items-center justify-center">
                ${isCurrent ? `<div class="absolute w-10 h-10 bg-accent/30 rounded-full animate-ping"></div>` : ''}
                <div class="w-5 h-5 rounded-full border-[3px] border-black flex items-center justify-center ${isHome ? 'bg-[#4D9DE0]' : 'bg-accent'} shadow-[0_0_20px_rgba(233,69,96,0.8)]"></div>
              </div>
            </div>
          `;
          
          el.onclick = () => setActiveStep(sortedRoutes.indexOf(d));
          return el;
        }}
      />

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030305] to-transparent pointer-events-none"></div>

      {/* OVERLAY: Panel Minimalista Flotante */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 md:left-12 md:-translate-x-0 w-[90%] md:w-[380px] pointer-events-none z-20">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeStep}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-[#08080c]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-5 shadow-[0_30px_60px_rgba(0,0,0,0.9)] pointer-events-auto flex flex-col gap-5"
          >
            {/* Cabecera compacta con miniatura */}
            <div className="flex items-center gap-4">
              <div 
                onClick={() => navigate(`/${sortedRoutes[activeStep].slug}`)}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border border-white/20 cursor-pointer group shadow-lg"
              >
                <img 
                  src={sortedRoutes[activeStep].coverImage} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={sortedRoutes[activeStep].name}
                />
              </div>
              <div className="flex-1">
                <p className="text-accent text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                  {activeStep === 0 ? 'Punto de Partida' : `Destino ${sortedRoutes[activeStep].order}`}
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-white leading-none">
                  {sortedRoutes[activeStep].name}
                </h2>
              </div>
              <button 
                 onClick={() => navigate(`/${sortedRoutes[activeStep].slug}`)}
                 className="p-2 md:p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white"
                 title="Explorar País"
              >
                 <MapPin size={18} className="text-accent" />
              </button>
            </div>

            {/* Próximo Destino (Barra pequeña) */}
            {activeStep < sortedRoutes.length - 1 ? (
              <div 
                className="bg-white/[0.03] rounded-2xl p-3 flex items-center gap-3 border border-white/5 cursor-pointer hover:bg-white/10 transition-all group" 
                onClick={() => setActiveStep(prev => Math.min(sortedRoutes.length - 1, prev + 1))}
              >
                <div className="w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  {sortedRoutes[activeStep].transportToNext === 'boat' ? (
                    <Ship size={16} className="text-[#4D9DE0]" />
                  ) : (
                    <Plane size={16} className="text-accent" style={{ transform: 'rotate(45deg)' }} />
                  )}
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-white/40 uppercase tracking-[0.2em] text-[9px] mb-0.5">Siguiente</p>
                  <p className="text-white font-bold tracking-wide">{sortedRoutes[activeStep + 1].name}</p>
                </div>
                <ChevronRight size={18} className="text-white/30 group-hover:text-white transition-colors" />
              </div>
            ) : (
              <div className="bg-accent/10 rounded-2xl p-3 flex items-center gap-3 border border-accent/20">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div className="flex-1 text-xs">
                  <p className="text-accent font-bold tracking-widest uppercase">Viaje Completado</p>
                </div>
              </div>
            )}

            {/* Controles de Reproducción Minimalistas */}
            <div className="flex items-center justify-between pt-1">
              <button 
                onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all text-white border border-transparent hover:border-white/10"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex gap-1.5 px-2">
                {sortedRoutes.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${i === activeStep ? 'w-6 bg-accent shadow-[0_0_10px_rgba(233,69,96,0.8)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`} 
                  />
                ))}
              </div>
              
              <button 
                onClick={() => setActiveStep(prev => Math.min(sortedRoutes.length - 1, prev + 1))}
                disabled={activeStep === sortedRoutes.length - 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-accent hover:bg-accent/80 disabled:bg-white/5 disabled:opacity-20 transition-all text-white shadow-[0_0_15px_rgba(233,69,96,0.4)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoutesPage;

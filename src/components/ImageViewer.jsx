import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Plus, Minus, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageViewer = ({ image, onClose, onNext, onPrev }) => {
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prevImageId, setPrevImageId] = useState(image?.id);

  if (image && image.id !== prevImageId) {
    setPrevImageId(image.id);
    setScale(1);
    setIsLoaded(false);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  const isVideo = !!image.video;

  const handleZoomIn = () => setScale(s => Math.min(s + 0.3, 4));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.3, 0.5));

  const viewer = (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.97)', zIndex: 9999 }}
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* ── Floating Controls ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 md:p-5" style={{ zIndex: 10001 }}>
        {/* Left: Info */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl rounded-2xl px-4 py-2.5 border border-white/10">
          <span className="text-white font-semibold text-sm truncate max-w-[200px]">{image.title}</span>
          {image.location && (
            <>
              <span className="w-px h-4 bg-white/20" />
              <span className="flex items-center gap-1 text-accent text-xs font-medium">
                <MapPin size={12} /> {image.location}
              </span>
            </>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom controls (images only) */}
          {!isVideo && (
            <div className="flex items-center bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                className="p-3 text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                title="Alejar"
              >
                <Minus size={18} />
              </button>
              <span className="text-white/60 text-xs font-mono w-12 text-center select-none border-x border-white/10">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                className="p-3 text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                title="Acercar"
              >
                <Plus size={18} />
              </button>
            </div>
          )}


          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white/70 hover:text-white hover:bg-red-500/80 hover:border-red-500/50 transition-all active:scale-90"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* ── Media Area ── */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden relative cursor-zoom-out"
        style={{ zIndex: 10000 }}
        onClick={onClose}
      >
        {/* Navigation Arrows */}
        {onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[10002] p-4 rounded-full bg-black/50 hover:bg-accent hover:text-white border border-white/10 hover:border-accent text-white/70 backdrop-blur-md transition-all duration-300 active:scale-95 flex items-center justify-center shadow-lg hover:shadow-accent/30 group/btn cursor-pointer"
            title="Anterior (Flechita Izquierda)"
          >
            <ChevronLeft size={24} className="group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>
        )}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[10002] p-4 rounded-full bg-black/50 hover:bg-accent hover:text-white border border-white/10 hover:border-accent text-white/70 backdrop-blur-md transition-all duration-300 active:scale-95 flex items-center justify-center shadow-lg hover:shadow-accent/30 group/btn cursor-pointer"
            title="Siguiente (Flechita Derecha)"
          >
            <ChevronRight size={24} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        )}

        {isVideo ? (
          <div className="w-full h-full flex items-center justify-center p-6 md:p-12" onClick={onClose}>
            <video
              src={image.video}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
              onLoadedData={() => setIsLoaded(true)}
              className="rounded-xl shadow-2xl"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 md:p-12 overflow-hidden" onClick={onClose}>
            <img
              src={image.image}
              alt={image.title}
              onClick={(e) => e.stopPropagation()}
              onLoad={() => setIsLoaded(true)}
              draggable={false}
              className="select-none rounded-lg"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-out',
                opacity: isLoaded ? 1 : 0,
              }}
            />
          </div>
        )}

        {/* Loading state */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* ── Bottom Info ── */}
      {(image.description || image.date) && (
        <div className="relative px-6 pb-6 pt-2 flex flex-col items-center text-center" style={{ zIndex: 10001 }}>
          {image.description && (
            <p className="text-gray-400 text-sm max-w-xl mb-2 leading-relaxed">{image.description}</p>
          )}
          {image.date && (
            <span className="flex items-center gap-1.5 text-accent/80 text-xs font-medium">
              <Calendar size={12} /> {image.date}
            </span>
          )}
        </div>
      )}
    </div>
  );

  // Use Portal to render outside <main> stacking context so it appears above the navbar
  return createPortal(viewer, document.body);
};

export default ImageViewer;

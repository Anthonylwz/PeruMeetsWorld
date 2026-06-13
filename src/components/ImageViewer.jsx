import { useEffect } from 'react';
import { X, Info } from 'lucide-react';

const ImageViewer = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="text-white/80 text-sm">
          {image.title} - {image.location}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-accent transition-colors" onClick={onClose}><X size={28} /></button>
        </div>
      </div>

      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative">
        <img 
          src={image.image} 
          alt={image.title} 
          className="max-h-full max-w-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500" 
        />
      </div>

      {/* Bottom Bar Info */}
      <div className="p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center text-center">
        <h3 className="text-xl font-heading font-bold text-white mb-2">{image.title}</h3>
        <p className="text-gray-300 text-sm max-w-2xl mb-4">{image.description}</p>
        <div className="flex items-center gap-4 text-xs text-accent font-semibold">
          <span className="flex items-center gap-1"><Info size={14} /> {image.location}</span>
          <span className="w-1 h-1 rounded-full bg-white/50"></span>
          <span>📅 {image.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;

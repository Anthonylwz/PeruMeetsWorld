import { useState } from 'react';
import { Upload, Image as ImageIcon, Trash2, Copy, CheckCircle, Settings, Cloud } from 'lucide-react';
import countriesData from '../data/countries.json';

const AdminPanel = () => {
  // Estados para datos
  const [selectedCountry, setSelectedCountry] = useState(countriesData[0]?.id || '');
  const [mediaType, setMediaType] = useState('image');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [generatedId, setGeneratedId] = useState(() => Math.floor(Math.random() * 10000));

  // Estados de Cloudinary
  const [cloudName, setCloudName] = useState(() => localStorage.getItem('cld_cloud_name') || '');
  const [uploadPreset, setUploadPreset] = useState(() => localStorage.getItem('cld_upload_preset') || '');
  const [showConfig, setShowConfig] = useState(() => {
    return !(localStorage.getItem('cld_cloud_name') && localStorage.getItem('cld_upload_preset'));
  });

  const saveConfig = () => {
    const cleanCloud = cloudName.trim();
    const cleanPreset = uploadPreset.trim();

    if (!cleanCloud || !cleanPreset) {
      alert("Debes llenar ambos campos.");
      return;
    }

    // Validar que no pongan la API Key por error
    if (!isNaN(cleanPreset)) {
      alert("Error: El 'Upload Preset' NO puede ser una secuencia de puros números. Estás poniendo tu API Key por error. Debes poner el nombre de letras del Preset (Ej. 'peru_viajes').");
      return;
    }

    localStorage.setItem('cld_cloud_name', cleanCloud);
    localStorage.setItem('cld_upload_preset', cleanPreset);

    setCloudName(cleanCloud);
    setUploadPreset(cleanPreset);
    setShowConfig(false);
    alert("Configuración de Cloudinary guardada exitosamente.");
  };

  const openWidget = () => {
    if (!cloudName || !uploadPreset) {
      alert("Falta configurar Cloudinary. Haz clic en la tuerca arriba a la derecha.");
      setShowConfig(true);
      return;
    }

    if (typeof window.cloudinary === 'undefined') {
      alert("El script de Cloudinary no ha cargado. Revisa tu conexión a internet o recarga la página.");
      return;
    }

    try {
      // Creamos el widget desde cero
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          sources: ['local', 'url'], // Sólo local (PC) y url para evitar errores con cámara
          multiple: false,
          resourceType: 'auto', // Auto procesa cualquier formato
        },
        (error, result) => {
          if (error) {
            console.error("Error devuelto por Cloudinary:", error);
            // Mostrar error legible si cloudName o preset son incorrectos
            if (error.status === 401 || error.message?.includes('api key')) {
              alert("Error Crítico de Cloudinary (Unknown API Key).\n\nEsto pasa al 100% porque el nombre de tu Preset no coincide con el que creaste o el que creaste NO está marcado como 'Unsigned'. Vuelve a Cloudinary y verifica que esté en 'Unsigned'.");
            }
            return;
          }

          if (result && result.event === "success") {
            console.log("Subida exitosa:", result.info);
            // Guardamos directamente la URL segura y adivinamos el tipo de media
            setMediaUrl(result.info.secure_url);
            if (result.info.resource_type === 'video') {
              setMediaType('video');
            } else {
              setMediaType('image');
            }
          }
        }
      );

      widget.open();

    } catch (err) {
      console.error("Fallo general abriendo Widget:", err);
      alert("Error iniciando el panel de subida. Abre la consola para más detalles.");
    }
  };

  const country = countriesData.find(c => c.id === selectedCountry);

  const handleCopyJson = () => {
    const newExperience = {
      id: generatedId,
      title,
      description,
      location,
      date,
      [mediaType === 'image' ? 'image' : 'video']: mediaUrl
    };

    navigator.clipboard.writeText(JSON.stringify(newExperience, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setMediaUrl('');
    setGeneratedId(Math.floor(Math.random() * 10000));
  };

  return (
    <div className="min-h-screen bg-[#0f0f15] text-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Cabecera Principal */}
        <div className="mb-10 border-b border-white/10 pb-6 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 text-accent mb-2">
              <Upload size={28} />
              <h1 className="text-3xl font-bold">Panel de Organización y Subida</h1>
            </div>
            <p className="text-gray-400 max-w-2xl mb-3">
              Sube tus imágenes y videos (WebP, MP4, etc.) directamente.
              <span className="text-[#F39C12] block mt-1">⚠️ Recuerda eliminar este componente antes de ir a producción.</span>
            </p>
            {/* Status Visual de Cloudinary */}
            {cloudName && uploadPreset && (
              <div className="inline-flex gap-3 px-3 py-1 bg-green-900/30 border border-green-500/50 rounded-md text-sm font-mono text-green-400">
                <span>Cloud: <strong className="text-white">{cloudName}</strong></span>
                <span>Preset: <strong className="text-white">{uploadPreset}</strong></span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="p-3 bg-white/5 hover:bg-accent hover:text-white rounded-full transition-colors text-gray-300"
            title="Configurar Cloudinary"
          >
            <Settings size={24} />
          </button>
        </div>

        {/* Panel de Configuración */}
        {showConfig && (
          <div className="mb-8 p-6 bg-accent/10 border border-accent/20 rounded-2xl">
            <h2 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
              <Cloud size={20} /> Conectar Cloudinary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Cloud Name</label>
                <input
                  type="text"
                  value={cloudName}
                  onChange={(e) => setCloudName(e.target.value)}
                  placeholder="Ej. drtvfrfpm"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Upload Preset (Debe ser Unsigned)</label>
                <input
                  type="text"
                  value={uploadPreset}
                  onChange={(e) => setUploadPreset(e.target.value)}
                  placeholder="Ej. peru_viajes"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none font-mono"
                />
              </div>
            </div>
            <button
              onClick={saveConfig}
              className="px-6 py-3 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-bold w-full md:w-auto"
            >
              Guardar Credenciales
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Zona Izquierda: Formulario y Subida */}
          <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">

            {/* Subida */}
            <div className="bg-black/40 p-5 rounded-xl border border-accent/30 space-y-4">
              <label className="block text-sm font-bold text-accent">Subir Archivo desde PC</label>
              <button
                onClick={openWidget}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-accent border border-accent text-white font-bold shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:bg-white hover:text-accent transition-all"
              >
                <Cloud size={24} /> Subir Imagen o Video
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-widest">O pega una URL</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://ejemplo.com/archivo.jpg"
                className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none text-sm"
              />
            </div>

            {/* Datos */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Asignar a País</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none"
              >
                {countriesData.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Título del Lugar</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Ubicación</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">Fecha</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Ej. Junio 2026"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">Descripción Corta</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-accent outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleClear}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              >
                <Trash2 size={18} /> Limpiar
              </button>
              <button
                onClick={handleCopyJson}
                className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-green-600 text-white hover:bg-green-500 transition-colors font-bold shadow-lg"
              >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? '¡Copiado!' : 'Copiar Código'}
              </button>
            </div>
          </div>

          {/* Zona Derecha: Vista Previa */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-gray-200">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">👁️</span>
              Preview Visual
            </h2>

            {/* Tarjeta Visual Estilo App */}
            <div className="group rounded-2xl overflow-hidden relative border border-white/10 aspect-[4/5] max-w-sm shadow-2xl">
              <div className="absolute inset-0 bg-black/20"></div>
              {mediaUrl ? (
                mediaType === 'image' ? (
                  <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <video src={mediaUrl} className="w-full h-full object-cover" controls autoPlay muted loop />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-[#151520]">
                  <ImageIcon size={48} className="mb-2 opacity-50" />
                  <p>Sube tu media aquí</p>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{title || 'Título Aquí'}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-300">
                    <span className="text-accent">{location || 'Ubicación'}</span>
                    <span>{date || 'Fecha'}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-3 line-clamp-2">
                    {description || 'Descripción...'}
                  </p>
                </div>
              </div>
            </div>

            {/* Código Generado */}
            <div className="bg-black/90 rounded-xl p-5 border border-white/10 overflow-x-auto relative shadow-inner">
              <h3 className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-3">
                Destino: <span className="text-accent">{country?.name}</span>
              </h3>
              <pre className="text-sm text-green-400 font-mono">
                {`{
  "id": ${generatedId},
  "title": "${title}",
  "description": "${description}",
  "location": "${location}",
  "date": "${date}",
  "${mediaType}": "${mediaUrl}"
}`}
              </pre>
            </div>
            <p className="text-xs text-gray-500">
              Copia este código y pégalo dentro de "experiences" en `countries.json`.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

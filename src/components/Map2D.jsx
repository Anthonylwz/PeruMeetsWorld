import { useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import countriesData from '../data/countries.json';

// Fix for default markers
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons based on status
const createCustomIcon = (color) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color:${color};width:16px;height:16px;border-radius:50%;border:2px solid white;box-shadow:0 0 10px ${color}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const visitedIcon = createCustomIcon('#E94560');

const Map2D = ({ onCountryClick, onZoomStart }) => {
  const mapRef = useRef(null);

  const handleMarkerClick = (country) => {
    // Notificamos al Home para que inicie la transición fluida de imagen (igual que en 3D)
    onZoomStart && onZoomStart(country);

    const map = mapRef.current;
    if (map) {
      // Acercamiento suave y extendido a 2.2 segundos para igualar la transición 3D
      map.flyTo([country.lat, country.lng], 6, {
        duration: 2.2,
        easeLinearity: 0.25
      });
      // Esperamos a que la animación y el overlay terminen
      setTimeout(() => {
        onCountryClick(country);
      }, 2200);
    } else {
      onCountryClick(country);
    }
  };

  return (
    <div className="absolute inset-0 z-0">
      <LeafletMap
        ref={mapRef}
        center={[20, 0]}
        zoom={3}
        style={{ height: '100vh', width: '100%', background: '#0C0C0C' }}
        zoomControl={false}
        worldCopyJump={true}
      >
        {/* Dark map tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {countriesData.filter(c => c.visited).map((country) => {
          if (typeof country.lat === 'undefined' || typeof country.lng === 'undefined') return null;

          return (
            <Marker
              key={country.id}
              position={[country.lat, country.lng]}
              icon={visitedIcon}
              eventHandlers={{
                click: () => handleMarkerClick(country)
              }}
            />
          );
        })}
      </LeafletMap>
    </div>
  );
};

export default Map2D;

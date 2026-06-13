import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
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
const nextIcon = createCustomIcon('#F39C12');
const defaultIcon = createCustomIcon('#ffffff');

const Map2D = ({ onCountryClick }) => {
  return (
    <div className="absolute inset-0 z-0">
      <LeafletMap 
        center={[20, 0]} 
        zoom={3} 
        style={{ height: '100vh', width: '100%', background: '#1A1A2E' }}
        zoomControl={false}
        worldCopyJump={true}
      >
        {/* Dark map tiles */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {countriesData.map((country) => {
          if (typeof country.lat === 'undefined' || typeof country.lng === 'undefined') return null;

          let icon = defaultIcon;
          if (country.visited) icon = visitedIcon;
          else if (country.nextDestination) icon = nextIcon;

          return (
            <Marker 
              key={country.id} 
              position={[country.lat, country.lng]} 
              icon={icon}
              eventHandlers={{
                click: () => onCountryClick(country)
              }}
            >
              <Popup className="custom-popup">
                <div className="font-sans text-center">
                  <h3 className="font-bold text-gray-800">{country.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {country.visited ? 'Visitado' : (country.nextDestination ? 'Próximo Destino' : 'No Visitado')}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onCountryClick(country);
                    }}
                    className="bg-accent text-white px-3 py-1 text-xs rounded-full hover:bg-accent/90 transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    </div>
  );
};

export default Map2D;

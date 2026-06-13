import { useState, useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import { useNavigate } from 'react-router-dom';
import countriesData from '../data/countries.json';

const Earth3D = ({ onCountryClick }) => {
  const containerRef = useRef(null);
  const [globeWidth, setGlobeWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setGlobeWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Filter points based on visited or not, or just show all but differently
    const pointsData = countriesData.map(c => ({
      lat: c.lat,
      lng: c.lng,
      size: c.visited ? 1.5 : 0.8,
      color: c.visited ? '#E94560' : (c.nextDestination ? '#F39C12' : '#ffffff'),
      name: c.name,
      slug: c.slug,
      visited: c.visited,
      nextDestination: c.nextDestination,
      id: c.id
    }));

    const myGlobe = Globe()
      (containerRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
      .pointsData(pointsData)
      .pointAltitude(0.01)
      .pointColor('color')
      .pointRadius('size')
      .pointResolution(32)
      .width(globeWidth)
      .height(window.innerHeight)
      .pointLabel('name')
      .onPointClick((point) => {
        onCountryClick(point);
      });

    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.5;

    // Optionally add arcs for routes
    const arcsData = [];
    // We can populate this later

    return () => {
      // Clean up globe
      myGlobe._destructor();
    };
  }, [globeWidth, onCountryClick]);

  return <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />;
};

export default Earth3D;

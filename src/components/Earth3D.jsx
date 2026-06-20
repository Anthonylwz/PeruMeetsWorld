import { useState, useEffect, useRef } from 'react';
import Globe from 'globe.gl';
import countriesData from '../data/countries.json';

const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerpLng = (a, b, t) => {
  let diff = b - a;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
};

const smoothZoom = (globe, targetLat, targetLng, targetAlt, duration, onComplete) => {
  const start = globe.pointOfView();
  const startTime = performance.now();
  let rafId;

  const tick = (now) => {
    const elapsed = now - startTime;
    const raw = Math.min(elapsed / duration, 1);
    const t = easeInOutCubic(raw);

    globe.pointOfView({
      lat: start.lat + (targetLat - start.lat) * t,
      lng: lerpLng(start.lng, targetLng, t),
      altitude: start.altitude + (targetAlt - start.altitude) * t,
    });

    if (raw < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      onComplete && onComplete();
    }
  };

  rafId = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafId);
};

const Earth3D = ({ onCountryClick, onZoomStart }) => {
  const containerRef = useRef(null);
  const [globeWidth, setGlobeWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setGlobeWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const pointsData = countriesData
      .filter(c => c.visited)
      .map((c) => ({
      lat: c.lat,
      lng: c.lng,
      size: 1.5,
      color: '#E94560',
      name: c.name,
      slug: c.slug,
      visited: c.visited,
      id: c.id,
      coverImage: c.coverImage
    }));

    let isAnimating = false;
    let cancelZoom = null;

    const myGlobe = Globe()(containerRef.current)
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
        if (isAnimating) return;
        isAnimating = true;

        // Avisar a Home para mostrar la imagen sobre el globo sin corte
        onZoomStart && onZoomStart(point);

        const controls = myGlobe.controls();
        const originalSpeed = controls.autoRotateSpeed;
        let speedRamp = originalSpeed;
        const rampInterval = setInterval(() => {
          speedRamp = Math.max(0, speedRamp - 0.05);
          controls.autoRotateSpeed = speedRamp;
          if (speedRamp === 0) {
            controls.autoRotate = false;
            clearInterval(rampInterval);
          }
        }, 16);

        cancelZoom = smoothZoom(
          myGlobe,
          point.lat,
          point.lng,
          0.35,
          2200,
          () => {
            onCountryClick(point);
            controls.autoRotate = true;
            controls.autoRotateSpeed = originalSpeed;
            isAnimating = false;
          }
        );
      });

    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.5;

    return () => {
      if (cancelZoom) cancelZoom();
      myGlobe._destructor();
    };
  }, [globeWidth, onCountryClick, onZoomStart]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    />
  );
};

export default Earth3D;

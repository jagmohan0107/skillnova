import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const CosmicBackground = () => {
  const [init, setInit] = useState(false);
  const location = useLocation();

  // Define routes that should have specific atmospheric shifts
  const missionHubRoute = ['/bridge-factor'];
  const internalFactorRoutes = [
    '/analysis', '/skill-gap', '/roadmap', 
    '/practice-battle', '/evaluation', '/course-finder',
    '/dashboard'
  ];

  const isHub = missionHubRoute.some(route => location.pathname === route);
  const isInternalFactor = internalFactorRoutes.some(route => 
    location.pathname.startsWith(route)
  );
  const isWelcome = location.pathname === '/' || location.pathname === '/login';

  const getBackgroundColor = () => {
    if (isInternalFactor) return '#050b1a'; // Deep Navy Blue
    return '#000000'; // Void Black (Welcome/Hub/Auth)
  };

  const getParticleCount = () => {
    if (isWelcome) return 30; // Further reduced for Welcome section
    if (isHub) return 60; // Moderate for Hub
    return 80; // High for Tactical Modules
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none transition-colors duration-1000" 
      style={{ zIndex: -1, backgroundColor: getBackgroundColor() }}
    >
      {/* 1. Cinematic Radial Highlights - Specifically distributed to avoid the center in Welcome nodes */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isWelcome ? 'opacity-30' : 'opacity-40'} overflow-hidden`}>
        {/* Top-Left Peripheral Glow */}
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-25%] left-[-15%] w-[130%] h-[130%] bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.15)_0%,transparent_60%)] blur-[120px]"
        />
        {/* Bottom-Right Peripheral Glow */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-15%] right-[-15%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12)_0%,transparent_50%)] blur-[100px]"
        />
        
        {/* Only show the center-focused glow on internal mission pages */}
        {!isWelcome && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute top-[15%] left-[25%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.1)_0%,transparent_75%)] blur-[100px]"
          />
        )}
        
        {/* Global Atmosphere - Reduced for Welcome center */}
        <div className={`absolute inset-0 ${isWelcome ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.01)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.02)_0%,transparent_100%)]'}`} />
      </div>

      {/* 2. Interactive Emerald Star Network */}
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          fpsLimit: 120,
          background: { color: "transparent" },
          particles: {
            number: {
              value: getParticleCount(),
              density: { enable: true, area: 1000 }
            },
            color: { value: ["#10b981", "#ffffff", "#059669", "#34d399", "#84cc16"] },
            shape: { 
              type: "star",
              options: { star: { sides: 5 } }
            },
            opacity: {
              value: { min: 0.1, max: 0.7 },
              animation: { enable: true, speed: 0.5, minimumValue: 0.1, sync: false }
            },
            size: {
              value: { min: 1, max: 3.5 },
              animation: { enable: true, speed: 1.5, minimumValue: 1, sync: false }
            },
            links: {
              enable: true,
              distance: 180,
              color: "#10b981",
              opacity: isWelcome ? 0.1 : 0.2, // Reduced for Welcome section
              width: isWelcome ? 0.5 : 1, // Thinner for Welcome
              triangles: {
                enable: !isWelcome, // No triangles for Welcome
                opacity: 0.06,
                color: "#10b981"
              }
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" }
            },
            modes: {
              grab: { 
                distance: 250, 
                links: { opacity: 0.4 } 
              },
              push: { quantity: 3 }
            }
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default CosmicBackground;

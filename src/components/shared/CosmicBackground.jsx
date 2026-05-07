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
    if (isWelcome) return 20; // Reduced from 30
    if (isHub) return 40; // Reduced from 60
    return 60; // Reduced from 80
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
      style={{ zIndex: -1, backgroundColor: getBackgroundColor(), willChange: 'background-color' }}
    >
      {/* 1. Cinematic Radial Highlights */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isWelcome ? 'opacity-20' : 'opacity-30'} overflow-hidden`}>
        {/* Top-Left Peripheral Glow */}
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-25%] left-[-15%] w-[130%] h-[130%] bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.1)_0%,transparent_60%)] blur-[80px] will-change-transform"
        />
        {/* Bottom-Right Peripheral Glow */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[-15%] right-[-15%] w-[110%] h-[110%] bg-[radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.08)_0%,transparent_50%)] blur-[60px] will-change-transform"
        />
        
        {/* Only show the center-focused glow on internal mission pages */}
        {!isWelcome && (
          <motion.div 
            animate={{ opacity: [0.05, 0.2, 0.05] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
            className="absolute top-[15%] left-[25%] w-[70%] h-[70%] bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.05)_0%,transparent_75%)] blur-[60px] will-change-transform"
          />
        )}
        
        {/* Global Atmosphere */}
        <div className={`absolute inset-0 ${isWelcome ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(34,197,94,0.01)_0%,transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.02)_0%,transparent_100%)]'}`} />
      </div>

      {/* 2. Interactive Emerald Star Network */}
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          fpsLimit: 60, // Capped at 60 for stability
          background: { color: "transparent" },
          particles: {
            number: {
              value: getParticleCount(),
              density: { enable: true, area: 1200 } // Increased area to further thin out particles
            },
            color: { value: ["#10b981", "#ffffff"] },
            shape: { 
              type: "circle", // Changed from star to circle (faster to render)
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: { enable: true, speed: 0.3, minimumValue: 0.1, sync: false }
            },
            size: {
              value: { min: 0.5, max: 2 },
              animation: { enable: true, speed: 1, minimumValue: 0.5, sync: false }
            },
            links: {
              enable: true,
              distance: 150,
              color: "#10b981",
              opacity: isWelcome ? 0.05 : 0.1, // Reduced opacity
              width: 0.5,
              triangles: {
                enable: false, // Disabled triangles globally for performance
              }
            },
            move: {
              enable: true,
              speed: 0.3, // Slower move speed
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
                distance: 200, 
                links: { opacity: 0.2 } 
              },
              push: { quantity: 2 }
            }
          },
          detectRetina: false, // Disabled retina detection to save performance
        }}
      />
    </div>
  );
};

export default CosmicBackground;

import React, { useMemo } from 'react';

interface AmbientAtmosphereProps {
  enablePetals?: boolean;
  enableSparkles?: boolean;
}

export const AmbientAtmosphere: React.FC<AmbientAtmosphereProps> = ({
  enablePetals = true,
  enableSparkles = true
}) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: `${(i * 4.3 + 7) % 96}%`,
      top: `${(i * 7.1 + 12) % 94}%`,
      size: `${2 + (i % 3)}px`,
      delay: `${(i * 0.4) % 6}s`,
      duration: `${4 + (i % 5)}s`
    }));
  }, []);

  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + 4) % 94}%`,
      delay: `${i * 1.4}s`,
      duration: `${14 + (i % 8)}s`,
      size: `${14 + (i % 12)}px`,
      rot: `${(i * 35) % 360}deg`
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Volumetric ambient vignette and luxury lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(110,24,45,0.22),transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(214,183,121,0.04),transparent_65%)]" />

      {/* Floating Golden Dust Sparkles */}
      {enableSparkles &&
        sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full bg-[#D6B779] opacity-0 animate-pulse"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
              boxShadow: '0 0 8px #D6B779, 0 0 16px rgba(214,183,121,0.6)'
            }}
          />
        ))}

      {/* Falling Romantic Rose Petals */}
      {enablePetals &&
        petals.map((p) => (
          <div
            key={p.id}
            className="absolute -top-10 opacity-70 transition-transform"
            style={{
              left: p.left,
              animation: `fallingPetal ${p.duration} linear infinite`,
              animationDelay: p.delay
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              style={{ transform: `rotate(${p.rot})` }}
            >
              <path
                d="M12 2C7 6 4 10 4 15C4 18.866 7.134 22 11 22C16 22 20 18 20 12C20 7 16 3 12 2Z"
                fill="#6E182D"
                opacity="0.85"
              />
              <path
                d="M12 2C8 6 6 10 7 14C8 17 10 19 13 19C15 19 17 17 17 13C17 9 15 5 12 2Z"
                fill="#8C1F3A"
                opacity="0.4"
              />
            </svg>
          </div>
        ))}

      <style>{`
        @keyframes fallingPetal {
          0% {
            transform: translateY(0vh) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          90% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

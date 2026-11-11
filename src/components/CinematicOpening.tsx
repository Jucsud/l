import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface CinematicOpeningProps {
  recipientName: string;
  onEnter: () => void;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  recipientName,
  onEnter
}) => {
  const [stage, setStage] = useState<'fade-in' | 'ready' | 'transitioning'>('fade-in');

  useEffect(() => {
    // Check for ?autostart=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      onEnter();
      return;
    }

    const timer = setTimeout(() => {
      setStage('ready');
    }, 600);

    return () => clearTimeout(timer);
  }, [onEnter]);

  const handleEnterClick = () => {
    setStage('transitioning');
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#10090D] px-6 text-center transition-all duration-1000 ${
        stage === 'transitioning' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      data-testid="cinematic-opening-screen"
    >
      {/* Volumetric spotlight beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(214,183,121,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,24,45,0.25),transparent_75%)] pointer-events-none" />

      {/* Decorative Golden Arch / Monogram */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border border-[#D6B779]/30 flex items-center justify-center bg-[#350D19]/40 backdrop-blur-xs">
          <Heart className="w-6 h-6 text-[#D6B779] fill-[#D6B779]/20" />
        </div>
      </div>

      {/* Primary Headline */}
      <p className="text-xs uppercase tracking-[0.35em] text-[#D6B779] mb-4 font-sans font-medium">
        A Curated Romantic Journey
      </p>

      <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight leading-tight max-w-2xl mb-6">
        EVERY BEAUTIFUL STORY<br />
        <span className="italic font-light text-[#D6B779]">HAS A BEGINNING.</span>
      </h1>

      <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#C88D91] italic max-w-md mb-12 transition-opacity duration-1000 delay-300">
        And this one begins with you, {recipientName}.
      </p>

      {/* Interactive Luxury Enter Button */}
      <button
        onClick={handleEnterClick}
        disabled={stage === 'transitioning'}
        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#350D19] via-[#6E182D] to-[#350D19] border border-[#D6B779]/60 text-[#F7EDE5] text-sm uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 hover:border-[#D6B779] hover:shadow-[0_0_25px_rgba(214,183,121,0.35)] cursor-pointer"
        aria-label="Enter our romantic story"
      >
        <span className="relative z-10">Enter Our Story</span>
        <Sparkles className="w-4 h-4 text-[#D6B779] transition-transform duration-500 group-hover:scale-125" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-[#C88D91]/60">
        Sound on for cinematic experience
      </div>
    </div>
  );
};

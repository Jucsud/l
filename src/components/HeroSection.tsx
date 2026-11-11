import React, { useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { calculateDaysTogether } from '../utils/storyLogic';

interface HeroSectionProps {
  recipientName: string;
  heroHeadline: string;
  heroSupporting: string;
  meetingDate: string;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  recipientName,
  heroHeadline,
  heroSupporting,
  meetingDate,
  onExploreClick
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const daysTogether = calculateDaysTogether(meetingDate);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Background Cinematic Radial Light with Mouse Parallax */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(110,24,45,0.35),transparent_65%)] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(214,183,121,0.12),transparent_60%)] pointer-events-none transition-transform duration-500 ease-out"
        style={{
          transform: `translate(${-mousePos.x * 35}px, ${-mousePos.y * 35}px)`
        }}
      />

      {/* Days Together subtle editorial counter */}
      {daysTogether > 0 && (
        <div className="relative mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D6B779] border-b border-[#D6B779]/30 pb-1">
          <span>{daysTogether} Days of Pure Wonder</span>
        </div>
      )}

      {/* Recipient's Name in Oversized Editorial Typography */}
      <div className="relative mb-4">
        <span className="block font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#F7EDE5] via-[#E4B8BC] to-[#D6B779] tracking-tight font-light drop-shadow-[0_10px_35px_rgba(110,24,45,0.4)]">
          {recipientName}
        </span>
      </div>

      {/* Main Headline */}
      <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F7EDE5] tracking-wide max-w-3xl leading-snug mb-6 whitespace-pre-line">
        {heroHeadline}
      </h1>

      {/* Supporting message */}
      <p className="font-sans text-sm sm:text-base md:text-lg text-[#C88D91] max-w-xl leading-relaxed mb-10 font-light">
        {heroSupporting}
      </p>

      {/* Glass card with quiet romantic accent */}
      <div className="relative mb-12 p-5 border border-[#D6B779]/20 bg-[#350D19]/40 backdrop-blur-md max-w-md w-full shadow-[0_8px_30px_rgba(16,9,13,0.6)]">
        <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-[#F7EDE5]/80">
          <Heart className="w-3.5 h-3.5 text-[#D6B779] fill-[#D6B779]" />
          <span>Our Journey Through Time</span>
          <Heart className="w-3.5 h-3.5 text-[#D6B779] fill-[#D6B779]" />
        </div>
      </div>

      {/* Scroll down prompt */}
      <button
        onClick={onExploreClick}
        className="group inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D6B779]/80 hover:text-[#D6B779] transition-colors cursor-pointer"
        aria-label="Scroll to read our story"
      >
        <span>Begin The Chapters</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D6B779]" />
      </button>
    </section>
  );
};

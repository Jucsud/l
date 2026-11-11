import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FinalForeverSectionProps {
  title: string;
  subtitle: string;
  signoff: string;
  proposerName: string;
  recipientName: string;
}

export const FinalForeverSection: React.FC<FinalForeverSectionProps> = ({
  title,
  subtitle,
  signoff,
  proposerName,
  recipientName
}) => {
  return (
    <footer
      id="final-forever"
      className="relative py-28 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#D6B779]/20 bg-[#10090D]"
      data-testid="final-forever-section"
    >
      {/* Background Volumetric Radiance */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(110,24,45,0.35),transparent_70%)] pointer-events-none" />

      {/* Two Elegant Intertwined Glowing Rings Graphic */}
      <div className="relative mb-12 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Ring 1 */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#D6B779] shadow-[0_0_25px_rgba(214,183,121,0.6)] -mr-8 rotate-12 transition-transform duration-700 hover:rotate-45" />
          {/* Ring 2 */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#EAD5A8] shadow-[0_0_25px_rgba(214,183,121,0.6)] rotate-[-18deg] transition-transform duration-700 hover:rotate-[-45deg]" />

          {/* Central Sparkle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sparkles className="w-6 h-6 text-[#FFFFFF] drop-shadow-[0_0_10px_#FFFFFF]" />
          </div>
        </div>
      </div>

      {/* Chapter V Header */}
      <p className="text-xs uppercase tracking-[0.35em] text-[#D6B779] mb-4 font-sans font-medium">
        Forever & Always
      </p>

      {/* Main Title */}
      <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight mb-4">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="font-serif text-lg sm:text-2xl text-[#C88D91] italic max-w-xl mx-auto mb-16 font-light">
        {subtitle}
      </p>

      {/* Proposer Signature & Monogram Card */}
      <div className="relative max-w-md w-full border border-[#D6B779]/30 bg-[#350D19]/40 p-8 backdrop-blur-xs shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
        <span className="block text-xs uppercase tracking-[0.25em] text-[#D6B779]/80 mb-3 font-sans">
          {signoff}
        </span>

        {/* Personalized Calligraphic Signature representation */}
        <span className="block font-serif text-4xl sm:text-5xl text-[#F7EDE5] tracking-wider italic mb-4 font-light">
          {proposerName}
        </span>

        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C88D91]">
          <span>{proposerName}</span>
          <Heart className="w-3 h-3 text-[#D6B779] fill-[#D6B779]" />
          <span>{recipientName}</span>
        </div>
      </div>

      <div className="mt-16 text-[11px] uppercase tracking-[0.25em] text-[#F7EDE5]/40 font-sans">
        A Love Story Written In The Stars
      </div>
    </footer>
  );
};

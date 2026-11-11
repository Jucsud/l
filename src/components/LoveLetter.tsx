import React from 'react';
import { Heart, Feather } from 'lucide-react';

interface LoveLetterProps {
  title: string;
  paragraphs: string[];
  recipientName: string;
  proposerName: string;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({
  title,
  paragraphs,
  recipientName,
  proposerName
}) => {
  return (
    <section
      id="love-letter"
      className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto"
      data-testid="love-letter-section"
    >
      {/* Editorial Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D6B779] mb-3 font-sans font-medium">
          Chapter II · The Confession
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight">
          {title}
        </h2>
      </div>

      {/* The Letter Parchment / Velvet Surface */}
      <div className="relative border border-[#D6B779]/40 bg-gradient-to-b from-[#2A0914] via-[#1E070F] to-[#10090D] p-8 sm:p-12 md:p-16 shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        {/* Subtle corner golden filigree ornaments */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D6B779]/50" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D6B779]/50" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D6B779]/50" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D6B779]/50" />

        {/* Letterhead */}
        <div className="flex items-center justify-between border-b border-[#D6B779]/20 pb-6 mb-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D6B779]">
            <Feather className="w-4 h-4 text-[#D6B779]" />
            <span>To My Dearest {recipientName}</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#D6B779]/30 bg-[#350D19] flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 text-[#D6B779] fill-[#D6B779]/30" />
          </div>
        </div>

        {/* Letter Body */}
        <div className="space-y-6 sm:space-y-8 font-serif text-lg sm:text-xl md:text-2xl text-[#F7EDE5] leading-relaxed font-light">
          {paragraphs.map((para, idx) => (
            <p
              key={idx}
              className="tracking-wide first-letter:text-3xl sm:first-letter:text-4xl first-letter:font-normal first-letter:text-[#D6B779]"
            >
              {para}
            </p>
          ))}
        </div>

        {/* Sign-off */}
        <div className="mt-14 pt-8 border-t border-[#D6B779]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="block text-xs uppercase tracking-[0.25em] text-[#C88D91] font-sans">
              Forever Yours,
            </span>
            <span className="font-serif italic text-2xl sm:text-3xl text-[#D6B779] tracking-wide">
              {proposerName}
            </span>
          </div>

          <div className="text-[11px] uppercase tracking-[0.2em] text-[#D6B779]/60 font-sans">
            Written with devotion
          </div>
        </div>
      </div>
    </section>
  );
};

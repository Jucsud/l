import React from 'react';
import { Volume2, VolumeX, SlidersHorizontal, Heart } from 'lucide-react';

interface NavigationDockProps {
  isMuted: boolean;
  onToggleSound: () => void;
  onOpenCustomizer: () => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({
  isMuted,
  onToggleSound,
  onOpenCustomizer
}) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#10090D]/80 backdrop-blur-md border-b border-[#D6B779]/15 px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Monogram */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
          aria-label="Back to top"
        >
          <div className="w-8 h-8 rounded-full border border-[#D6B779]/40 bg-[#350D19] flex items-center justify-center transition-transform group-hover:scale-110">
            <Heart className="w-3.5 h-3.5 text-[#D6B779] fill-[#D6B779]/30" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base text-[#F7EDE5] tracking-widest uppercase">
              Forever & Always
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#D6B779] uppercase">
              Our Journey
            </span>
          </div>
        </button>

        {/* Clean Editorial Nav Links (No pills, subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] text-[#F7EDE5]/80">
          <button
            onClick={() => scrollTo('story-timeline')}
            className="hover:text-[#D6B779] transition-colors cursor-pointer py-1"
          >
            Milestones
          </button>
          <span className="text-[#D6B779]/30 select-none">·</span>
          <button
            onClick={() => scrollTo('love-letter')}
            className="hover:text-[#D6B779] transition-colors cursor-pointer py-1"
          >
            The Letter
          </button>
          <span className="text-[#D6B779]/30 select-none">·</span>
          <button
            onClick={() => scrollTo('memory-gallery')}
            className="hover:text-[#D6B779] transition-colors cursor-pointer py-1"
          >
            Memories
          </button>
          <span className="text-[#D6B779]/30 select-none">·</span>
          <button
            onClick={() => scrollTo('proposal-climax')}
            className="text-[#D6B779] font-medium hover:text-[#EAD5A8] transition-colors cursor-pointer py-1"
          >
            The Proposal
          </button>
        </nav>

        {/* Action Controls: Sound Toggle & Customizer */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#D6B779]/30 bg-[#350D19]/40 text-xs text-[#F7EDE5] hover:border-[#D6B779] transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute romantic sound' : 'Mute romantic sound'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#C88D91]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#C88D91]">
                  Muted
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D6B779]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#D6B779]">
                  Sound On
                </span>
              </>
            )}
          </button>

          {/* Customize Story Button */}
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#D6B779]/50 bg-gradient-to-r from-[#6E182D]/40 to-[#350D19]/40 text-xs text-[#D6B779] hover:border-[#D6B779] hover:text-[#F7EDE5] transition-colors cursor-pointer"
            aria-label="Customize Proposal Story"
            title="Personalize names, dates, photos, and messages"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] uppercase tracking-wider">
              Customize
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { StoryMilestone } from '../types/story';
import { Calendar, Sparkles } from 'lucide-react';

interface StoryTimelineProps {
  title: string;
  subtitle: string;
  milestones: StoryMilestone[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  title,
  subtitle,
  milestones
}) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>(
    milestones[0]?.id || ''
  );
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="story-timeline"
      className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto"
      data-testid="story-timeline-section"
    >
      {/* Section Header */}
      <div className="text-center mb-16 sm:mb-24">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D6B779] mb-3 font-sans font-medium">
          Chapter I · The Milestones
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight mb-4">
          {title}
        </h2>
        <p className="font-serif text-base sm:text-lg text-[#C88D91] italic max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Timeline spine and milestone cards */}
      <div className="relative">
        {/* Central Vertical Spine Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#D6B779]/40 to-transparent -translate-x-1/2" />

        <div className="space-y-16 sm:space-y-24">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const isSelected = activeMilestoneId === milestone.id;

            return (
              <div
                key={milestone.id}
                onClick={() => setActiveMilestoneId(milestone.id)}
                className={`relative flex flex-col md:flex-row items-center gap-8 lg:gap-12 transition-all duration-500 cursor-pointer ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                data-testid={`timeline-milestone-${index}`}
              >
                {/* Timeline Center Node Badge (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-[#D6B779] bg-[#350D19] items-center justify-center shadow-[0_0_15px_rgba(214,183,121,0.3)] z-10 transition-transform duration-300 hover:scale-110">
                  <span className="text-[11px] font-serif text-[#D6B779] font-semibold">
                    {index + 1}
                  </span>
                </div>

                {/* Photo Side */}
                <div className="w-full md:w-1/2">
                  <div className="group relative overflow-hidden rounded-xs border border-[#D6B779]/30 bg-[#350D19]/60 shadow-[0_15px_35px_rgba(16,9,13,0.7)]">
                    {/* Golden accent border glow */}
                    <div className="absolute inset-0 border border-[#D6B779]/20 pointer-events-none z-10 transition-colors duration-500 group-hover:border-[#D6B779]/60" />

                    <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-[#1E070F]">
                      {!imageErrors[milestone.id] ? (
                        <img
                          src={milestone.imageUrl}
                          alt={milestone.imageAlt || milestone.title}
                          onError={() => handleImageError(milestone.id)}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#350D19] to-[#10090D]">
                          <Sparkles className="w-8 h-8 text-[#D6B779] mb-2 opacity-60" />
                          <span className="font-serif text-lg text-[#F7EDE5]">{milestone.title}</span>
                          <span className="text-xs text-[#C88D91] mt-1">{milestone.date}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#10090D]/80 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Date Tag */}
                    <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 bg-[#10090D]/80 border border-[#D6B779]/30 text-[11px] text-[#D6B779] font-sans uppercase tracking-[0.2em] backdrop-blur-xs">
                      <Calendar className="w-3 h-3 text-[#D6B779]" />
                      <span>{milestone.date}</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-6 text-left' : 'md:pr-6 md:text-right'}`}>
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D6B779] font-sans">
                      Milestone 0{index + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F7EDE5] tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#F7EDE5]/80 leading-relaxed font-light">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

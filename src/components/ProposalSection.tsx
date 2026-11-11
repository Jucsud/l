import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ProposalScene3D } from './ProposalScene3D';
import { audioEngine } from '../utils/audioEngine';
import { Sparkles, Heart, Clock, RefreshCw } from 'lucide-react';

interface ProposalSectionProps {
  headline: string;
  supporting: string;
  preQuestion: string;
  question: string;
  recipientName: string;
  yesButtonText: string;
  momentButtonText: string;
  yesTitle: string;
  yesSubtitle: string;
  momentTitle: string;
  momentSubtitle: string;
}

export const ProposalSection: React.FC<ProposalSectionProps> = ({
  headline,
  supporting,
  preQuestion,
  question,
  recipientName,
  yesButtonText,
  momentButtonText,
  yesTitle,
  yesSubtitle,
  momentTitle,
  momentSubtitle
}) => {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [answerState, setAnswerState] = useState<'unanswered' | 'yes' | 'moment'>('unanswered');

  const triggerRingBoxOpen = () => {
    if (!isBoxOpen) {
      setIsBoxOpen(true);
      audioEngine.playRevealChime();
    }
  };

  const triggerCelebrationConfetti = () => {
    // Elegant Champagne & Gold & Crimson Confetti blast
    const colors = ['#D6B779', '#F7EDE5', '#6E182D', '#C88D91', '#EAD5A8'];

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };

  const handleYes = () => {
    setAnswerState('yes');
    audioEngine.playCelebration();
    triggerCelebrationConfetti();

    // Additional secondary celebratory bursts
    setTimeout(triggerCelebrationConfetti, 400);
    setTimeout(triggerCelebrationConfetti, 900);
  };

  const handleMoment = () => {
    setAnswerState('moment');
    audioEngine.playGentleClick();
  };

  const handleResetAnswer = () => {
    setAnswerState('unanswered');
    audioEngine.playGentleClick();
  };

  return (
    <section
      id="proposal-climax"
      className="relative min-h-screen py-24 px-4 sm:px-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#10090D] via-[#2A0914] to-[#10090D]"
      data-testid="proposal-section"
    >
      {/* Background Volumetric Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(214,183,121,0.1),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="max-w-3xl mb-8 relative z-10">
        <p className="text-xs uppercase tracking-[0.35em] text-[#D6B779] mb-3 font-sans font-medium">
          Chapter IV · The Turning Point
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight mb-4">
          {headline}
        </h2>
        <p className="font-serif text-lg sm:text-xl text-[#C88D91] italic font-light">
          {supporting}
        </p>
      </div>

      {/* 3D Interactive Ring Box Canvas */}
      <div className="relative w-full max-w-4xl flex flex-col items-center justify-center my-4">
        <ProposalScene3D
          isOpen={isBoxOpen}
          onOpenTrigger={triggerRingBoxOpen}
        />

        {/* Action Button: "OPEN YOUR SURPRISE" if not yet opened */}
        {!isBoxOpen && (
          <div className="mt-4 relative z-20">
            <button
              onClick={triggerRingBoxOpen}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#6E182D] via-[#8C1F3A] to-[#6E182D] border-2 border-[#D6B779] text-[#F7EDE5] text-sm sm:text-base uppercase tracking-[0.25em] font-sans font-medium shadow-[0_0_35px_rgba(214,183,121,0.4)] hover:shadow-[0_0_55px_rgba(214,183,121,0.7)] hover:scale-105 transition-all duration-500 cursor-pointer"
              aria-label="Open your surprise ring box"
            >
              <Sparkles className="w-5 h-5 text-[#D6B779] animate-spin" />
              <span>Open Your Surprise</span>
              <Sparkles className="w-5 h-5 text-[#D6B779] animate-spin" />
            </button>
          </div>
        )}
      </div>

      {/* The Proposal Revelation once the box is opened */}
      {isBoxOpen && (
        <div className="relative z-20 max-w-4xl w-full mt-6 transition-all duration-1000 animate-fadeIn">
          {answerState === 'unanswered' && (
            <div className="space-y-8">
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#D6B779] italic tracking-wide">
                {preQuestion}
              </p>

              {/* The Grand Question */}
              <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#F7EDE5] to-[#D6B779] font-light tracking-tight drop-shadow-[0_10px_40px_rgba(214,183,121,0.5)]">
                {recipientName},<br />
                {question}
              </h3>

              {/* Interactive Answer Experience */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <button
                  onClick={handleYes}
                  className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#D6B779] via-[#EAD5A8] to-[#D6B779] text-[#10090D] font-sans font-semibold text-sm sm:text-base uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(214,183,121,0.5)] hover:shadow-[0_0_50px_rgba(214,183,121,0.8)] hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  aria-label="Accept proposal: Yes, a thousand times yes"
                  data-testid="proposal-yes-btn"
                >
                  <Heart className="w-5 h-5 text-[#6E182D] fill-[#6E182D]" />
                  <span>{yesButtonText}</span>
                </button>

                <button
                  onClick={handleMoment}
                  className="w-full sm:w-auto px-8 py-5 border border-[#D6B779]/50 bg-[#10090D]/80 text-[#F7EDE5] font-sans font-medium text-sm sm:text-base uppercase tracking-[0.15em] hover:bg-[#350D19] hover:border-[#D6B779] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  aria-label="Select: I need a moment"
                  data-testid="proposal-moment-btn"
                >
                  <Clock className="w-4 h-4 text-[#D6B779]" />
                  <span>{momentButtonText}</span>
                </button>
              </div>
            </div>
          )}

          {/* YES Celebration View */}
          {answerState === 'yes' && (
            <div
              className="space-y-6 p-8 sm:p-12 border border-[#D6B779] bg-[#1E070F]/90 backdrop-blur-md shadow-[0_0_60px_rgba(214,183,121,0.35)] animate-fadeIn"
              data-testid="proposal-yes-celebration"
            >
              <div className="w-16 h-16 rounded-full mx-auto border-2 border-[#D6B779] bg-[#350D19] flex items-center justify-center shadow-[0_0_25px_rgba(214,183,121,0.5)]">
                <Heart className="w-8 h-8 text-[#D6B779] fill-[#D6B779]" />
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F7EDE5] tracking-tight">
                {yesTitle}
              </h3>

              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#D6B779] font-light">
                {yesSubtitle}
              </p>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={triggerCelebrationConfetti}
                  className="px-6 py-2.5 border border-[#D6B779]/40 text-xs uppercase tracking-[0.2em] text-[#D6B779] hover:border-[#D6B779] transition-colors cursor-pointer"
                >
                  Celebrate Again ✨
                </button>
                <button
                  onClick={handleResetAnswer}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs text-[#C88D91]/70 hover:text-[#C88D91] transition-colors cursor-pointer"
                  title="Revisit choices"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Replay Moment</span>
                </button>
              </div>
            </div>
          )}

          {/* I NEED A MOMENT View */}
          {answerState === 'moment' && (
            <div
              className="space-y-6 p-8 sm:p-12 border border-[#D6B779]/40 bg-[#1E070F]/90 backdrop-blur-md shadow-2xl animate-fadeIn"
              data-testid="proposal-moment-view"
            >
              <div className="w-14 h-14 rounded-full mx-auto border border-[#D6B779]/40 bg-[#350D19] flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#D6B779]" />
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl text-[#F7EDE5] tracking-tight">
                {momentTitle}
              </h3>

              <p className="font-sans text-base sm:text-lg text-[#C88D91] max-w-xl mx-auto leading-relaxed font-light">
                {momentSubtitle}
              </p>

              <div className="pt-4">
                <button
                  onClick={handleResetAnswer}
                  className="px-8 py-3 bg-[#6E182D] border border-[#D6B779]/50 text-xs uppercase tracking-[0.2em] text-[#F7EDE5] hover:border-[#D6B779] transition-colors cursor-pointer"
                >
                  Return to Question
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

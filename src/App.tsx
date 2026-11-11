import React, { useState, useEffect } from 'react';
import { loadStoryConfig, getDefaultStoryConfig } from './utils/storyLogic';
import { StoryConfig } from './types/story';
import { audioEngine } from './utils/audioEngine';

import { AmbientAtmosphere } from './components/AmbientAtmosphere';
import { CinematicOpening } from './components/CinematicOpening';
import { NavigationDock } from './components/NavigationDock';
import { HeroSection } from './components/HeroSection';
import { StoryTimeline } from './components/StoryTimeline';
import { LoveLetter } from './components/LoveLetter';
import { MemoryGallery } from './components/MemoryGallery';
import { ProposalSection } from './components/ProposalSection';
import { FinalForeverSection } from './components/FinalForeverSection';
import { StoryCustomizerModal } from './components/StoryCustomizerModal';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [storyConfig, setStoryConfig] = useState<StoryConfig>(getDefaultStoryConfig());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  useEffect(() => {
    // Load persisted configuration from localStorage
    const saved = loadStoryConfig();
    setStoryConfig(saved);

    // Auto-enter if ?autostart=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') {
      setHasEntered(true);
      audioEngine.startRomanticSoundtrack(saved.customAudioUrl);
    }
  }, []);

  const handleEnterStory = () => {
    setHasEntered(true);
    audioEngine.playGentleClick();
    audioEngine.startRomanticSoundtrack(storyConfig.customAudioUrl);
  };

  const handleToggleSound = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollToTimeline = () => {
    const el = document.getElementById('story-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConfigUpdated = (newConfig: StoryConfig) => {
    setStoryConfig(newConfig);
  };

  return (
    <div className="relative min-h-screen bg-[#10090D] text-[#F7EDE5] selection:bg-[#6E182D] selection:text-[#F7EDE5]">
      {/* Cinematic Opening Overlay if user hasn't clicked Enter */}
      {!hasEntered && (
        <CinematicOpening
          recipientName={storyConfig.recipientName}
          onEnter={handleEnterStory}
        />
      )}

      {/* Persistent Ambient Rose Petals & Golden Sparkles */}
      <AmbientAtmosphere
        enablePetals={storyConfig.enablePetals}
        enableSparkles={storyConfig.enableSparkles}
      />

      {/* Main Experience (Visible when entered or pre-rendered in DOM) */}
      <div className={`transition-opacity duration-1000 ${hasEntered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation & Audio Dock */}
        <NavigationDock
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Hero Section */}
        <HeroSection
          recipientName={storyConfig.recipientName}
          heroHeadline={storyConfig.heroHeadline}
          heroSupporting={storyConfig.heroSupporting}
          meetingDate={storyConfig.meetingDate}
          onExploreClick={handleScrollToTimeline}
        />

        {/* Love Story Interactive Timeline */}
        <StoryTimeline
          title={storyConfig.timelineTitle}
          subtitle={storyConfig.timelineSubtitle}
          milestones={storyConfig.milestones}
        />

        {/* The Love Letter */}
        <LoveLetter
          title={storyConfig.loveLetterTitle}
          paragraphs={storyConfig.loveLetterContent}
          recipientName={storyConfig.recipientName}
          proposerName={storyConfig.proposerName}
        />

        {/* The Memory Gallery */}
        <MemoryGallery
          title={storyConfig.galleryTitle}
          subtitle={storyConfig.gallerySubtitle}
          photos={storyConfig.galleryPhotos}
        />

        {/* The Proposal Climax (3D Interactive Ring Box & Answer Experience) */}
        <ProposalSection
          headline={storyConfig.proposalHeadline}
          supporting={storyConfig.proposalSupporting}
          preQuestion={storyConfig.proposalPreQuestion}
          question={storyConfig.proposalQuestion}
          recipientName={storyConfig.recipientName}
          yesButtonText={storyConfig.yesButtonText}
          momentButtonText={storyConfig.momentButtonText}
          yesTitle={storyConfig.yesResponseTitle}
          yesSubtitle={storyConfig.yesResponseSubtitle}
          momentTitle={storyConfig.momentResponseTitle}
          momentSubtitle={storyConfig.momentResponseSubtitle}
        />

        {/* Final Forever Section */}
        <FinalForeverSection
          title={storyConfig.finalSectionTitle}
          subtitle={storyConfig.finalSectionSubtitle}
          signoff={storyConfig.finalSignoff}
          proposerName={storyConfig.proposerName}
          recipientName={storyConfig.recipientName}
        />
      </div>

      {/* Story Customization Modal */}
      <StoryCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={storyConfig}
        onConfigUpdated={handleConfigUpdated}
      />
    </div>
  );
}

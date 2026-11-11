export interface StoryMilestone {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  location?: string;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export interface StoryConfig {
  proposerName: string;
  recipientName: string;
  heroHeadline: string;
  heroSupporting: string;
  meetingDate: string;
  proposalDate: string;
  timelineTitle: string;
  timelineSubtitle: string;
  milestones: StoryMilestone[];
  loveLetterTitle: string;
  loveLetterContent: string[];
  galleryTitle: string;
  gallerySubtitle: string;
  galleryPhotos: GalleryPhoto[];
  proposalHeadline: string;
  proposalSupporting: string;
  proposalPreQuestion: string;
  proposalQuestion: string;
  yesButtonText: string;
  momentButtonText: string;
  yesResponseTitle: string;
  yesResponseSubtitle: string;
  momentResponseTitle: string;
  momentResponseSubtitle: string;
  finalSectionTitle: string;
  finalSectionSubtitle: string;
  finalSignoff: string;
  customAudioUrl?: string;
  enablePetals: boolean;
  enableSparkles: boolean;
}

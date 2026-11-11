import { StoryConfig } from '../types/story';

const base = typeof import.meta !== 'undefined' && (import.meta as unknown as { env?: { BASE_URL?: string } }).env?.BASE_URL
  ? (import.meta as unknown as { env: { BASE_URL: string } }).env.BASE_URL
  : '/';
const normalizedBase = base.endsWith('/') ? base : `${base}/`;
export const USER_ASSET_SWANS = `${normalizedBase}assets/aistudio/romantic-valentine-theme-greeting-cards-bright-colors-romantic-valentine-theme-greeting-cards-354681346_574c1cee.webp`;

export function getDefaultStoryConfig(): StoryConfig {
  return {
    proposerName: 'Alexander',
    recipientName: 'Sophia',
    heroHeadline: 'YOU ARE MY\nFAVORITE STORY.',
    heroSupporting: 'Among billions of people, somehow, my heart found you.',
    meetingDate: '2022-10-14',
    proposalDate: 'Today & Forever',
    timelineTitle: 'EVERY MOMENT LED ME TO YOU.',
    timelineSubtitle: 'The chapters that shaped our world and brought us to this exact moment.',
    milestones: [
      {
        id: 'milestone-1',
        title: 'The First Time We Met',
        date: 'October 14, 2022',
        description: 'A crowded room, autumn rain outside, and a single exchange of glances that stopped the entire universe in place. I knew right then my life was about to change.',
        imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'Cozy autumn coffee shop encounter'
      },
      {
        id: 'milestone-2',
        title: 'The First Conversation',
        date: 'November 2, 2022',
        description: 'Hours dissolved into minutes. We talked about childhood dreams, favourite songs, and quiet vulnerabilities as if we had known each other across lifetimes.',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'Late evening heartfelt conversation under warm bistro lights'
      },
      {
        id: 'milestone-3',
        title: 'The Moment I Started Falling',
        date: 'January 28, 2023',
        description: 'Watching you laugh without restraint in the winter breeze. In that effortless laughter, I surrendered every defense I ever held.',
        imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'Gentle laughter during winter sunset'
      },
      {
        id: 'milestone-4',
        title: 'Our Most Beautiful Memory',
        date: 'July 19, 2023',
        description: 'Under twilight skies by calm waters, watching two swans drift in perfect serenity beneath the rising evening stars. A moment of pure peace and quiet devotion.',
        imageUrl: USER_ASSET_SWANS,
        imageAlt: 'Two majestic luminous swans forming a glowing heart on tranquil water under starlight'
      },
      {
        id: 'milestone-5',
        title: 'The Moment I Realized You Were Special',
        date: 'December 31, 2023',
        description: 'Standing amidst midnight celebrations, everyone counting down to the new year, but all I could see was you. I knew I never wanted to welcome another year without you.',
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        imageAlt: 'Sparkling celebration under midnight lights'
      }
    ],
    loveLetterTitle: 'WORDS I HAVE ALWAYS WANTED TO SAY.',
    loveLetterContent: [
      "I don't know exactly when it happened.",
      "Maybe it was your smile.",
      "Maybe it was the way you made ordinary moments feel extraordinary.",
      "Maybe it was simply the way my world became a little brighter whenever you were around.",
      "But somewhere along the way, you became someone I never wanted to lose.",
      "I don't promise a perfect story.",
      "I promise to keep choosing you, to stand beside you, and to make beautiful memories together.",
      "And today, there is something I want to ask you."
    ],
    galleryTitle: 'MOMENTS FROZEN IN TIME',
    gallerySubtitle: 'Every photograph a testament to quiet warmth, shared laughter, and boundless affection.',
    galleryPhotos: [
      {
        id: 'gal-1',
        url: USER_ASSET_SWANS,
        caption: 'Our serene twilight sanctuary — grace, devotion, and calm waters',
        location: 'Twilight Lake'
      },
      {
        id: 'gal-2',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
        caption: 'Golden hour radiance and the warmth in your eyes',
        location: 'Coastal Cliffs'
      },
      {
        id: 'gal-3',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000&q=80',
        caption: 'Hands entwined, navigating the world side by side',
        location: 'Old Town Promenade'
      },
      {
        id: 'gal-4',
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
        caption: 'Shared whispers over morning espresso and sunlight',
        location: 'Montmartre Terrace'
      },
      {
        id: 'gal-5',
        url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80',
        caption: 'Dancing under string lights without caring who watched',
        location: 'Vineyard Solstice'
      },
      {
        id: 'gal-6',
        url: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80',
        caption: 'Starlit shores and endless midnight promises',
        location: 'Amalfi Coast'
      }
    ],
    proposalHeadline: 'THERE IS ONE MORE THING...',
    proposalSupporting: 'I have something special to ask you.',
    proposalPreQuestion: 'MY HEART HAS CHOSEN YOU.',
    proposalQuestion: 'WILL YOU MARRY ME?',
    yesButtonText: 'YES, A THOUSAND TIMES YES!',
    momentButtonText: 'I NEED A MOMENT ❤️',
    yesResponseTitle: 'YOU JUST MADE ME THE HAPPIEST PERSON ALIVE.',
    yesResponseSubtitle: "Here's to forever, together.",
    momentResponseTitle: 'Take all the time you need.',
    momentResponseSubtitle: 'Some questions deserve a quiet moment of their own. My love for you is patient, steady, and unwavering.',
    finalSectionTitle: 'TO OUR NEXT CHAPTER.',
    finalSectionSubtitle: 'Not just a beautiful moment. A lifetime of beautiful moments.',
    finalSignoff: 'WITH ALL MY LOVE,',
    customAudioUrl: '',
    enablePetals: true,
    enableSparkles: true
  };
}

const STORAGE_KEY = 'forever_proposal_story_config_v1';

export function loadStoryConfig(): StoryConfig {
  if (typeof window === 'undefined') return getDefaultStoryConfig();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultStoryConfig();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultStoryConfig(),
      ...parsed,
      milestones: Array.isArray(parsed.milestones) && parsed.milestones.length > 0 
        ? parsed.milestones 
        : getDefaultStoryConfig().milestones,
      galleryPhotos: Array.isArray(parsed.galleryPhotos) && parsed.galleryPhotos.length > 0 
        ? parsed.galleryPhotos 
        : getDefaultStoryConfig().galleryPhotos,
    };
  } catch (e) {
    console.warn('Failed to load story config from localStorage', e);
    return getDefaultStoryConfig();
  }
}

export function saveStoryConfig(config: StoryConfig): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Failed to save story config', e);
    return false;
  }
}

export function resetStoryConfig(): StoryConfig {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
  return getDefaultStoryConfig();
}

export function validateStoryConfig(config: StoryConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!config.proposerName || config.proposerName.trim().length === 0) {
    errors.push("Proposer's name cannot be empty.");
  }
  if (!config.recipientName || config.recipientName.trim().length === 0) {
    errors.push("Recipient's name cannot be empty.");
  }
  if (!config.proposalQuestion || config.proposalQuestion.trim().length === 0) {
    errors.push('Proposal question cannot be empty.');
  }
  if (!Array.isArray(config.milestones) || config.milestones.length === 0) {
    errors.push('At least one milestone is required.');
  }
  if (!Array.isArray(config.loveLetterContent) || config.loveLetterContent.length === 0) {
    errors.push('Love letter content cannot be empty.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function calculateDaysTogether(startDateStr: string, referenceDate: Date = new Date()): number {
  if (!startDateStr) return 0;
  const start = new Date(startDateStr);
  if (isNaN(start.getTime())) return 0;
  const diffTime = Math.max(0, referenceDate.getTime() - start.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Procedural musical chord progression frequencies for romantic piano (Db Major palette)
export const ROMANTIC_CHORDS = [
  // Dbmaj7: Db3 (138.59), F3 (174.61), Ab3 (207.65), C4 (261.63), F4 (349.23), Ab4 (415.30)
  [138.59, 174.61, 207.65, 261.63, 349.23, 415.30],
  // Bbm7: Bb2 (116.54), F3 (174.61), Bb3 (233.08), Db4 (277.18), F4 (349.23)
  [116.54, 174.61, 233.08, 277.18, 349.23, 466.16],
  // Gbmaj7: Gb2 (92.50), Db3 (138.59), Gb3 (185.00), Bb3 (233.08), Db4 (277.18), F4 (349.23)
  [92.50, 138.59, 185.00, 233.08, 277.18, 349.23],
  // Abadd9: Ab2 (103.83), Eb3 (155.56), Ab3 (207.65), C4 (261.63), Eb4 (311.13), Bb4 (466.16)
  [103.83, 155.56, 207.65, 261.63, 311.13, 466.16],
  // F7sus4 -> Fm7: F2 (87.31), C3 (130.81), F3 (174.61), Ab3 (207.65), C4 (261.63), Eb4 (311.13)
  [87.31, 130.81, 174.61, 207.65, 261.63, 311.13]
];

// Romantic music box reveal chime notes (pentatonic bells)
export const REVEAL_CHIME_NOTES = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];

// Celebration joyful fanfare
export const CELEBRATION_FANFARE_CHORDS = [
  [261.63, 329.63, 392.00, 523.25], // C major
  [329.63, 392.00, 493.88, 659.25], // E minor
  [349.23, 440.00, 523.25, 698.46], // F major
  [392.00, 493.88, 587.33, 783.99], // G major
  [523.25, 659.25, 783.99, 1046.50] // C octave triumph
];

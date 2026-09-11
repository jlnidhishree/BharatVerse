/**
 * BHARATVERSE — Static Game Configuration & Cultural Data Layer
 * Based on SIH 2026 Problem Statement SIH26208 (Toys & Games)
 */

import type {
  Avatar,
  AgeGroup,
  LanguageOption,
  Interest,
  Region,
  ExplorerProfile
} from '../types/explorer.ts'

// ============================================================================
// PART 2 — AVATAR DATA (Exactly 5 Categories)
// ============================================================================

export const AVATARS: Avatar[] = [
  {
    id: 'explorer',
    name: 'Vanguard Explorer',
    title: 'The Wayfinder',
    shortDescription: 'Trailblazer of ancient citadels, forgotten mountain passes, and mystical river valleys.',
    icon: 'Compass',
    themeColor: '#FACC15',
    accentGlow: 'rgba(250, 204, 21, 0.35)',
    loreSnippet: 'Driven by relentless curiosity to map the hidden marvels of the Indian subcontinent.'
  },
  {
    id: 'scholar',
    name: 'Vedic Scholar',
    title: 'The Lorekeeper',
    shortDescription: 'Seeker of ancient manuscripts, astronomical treatises, and philosophical debate.',
    icon: 'BookOpen',
    themeColor: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    loreSnippet: 'Decodes inscriptions etched upon copper plates and stone edicts from lost dynasties.'
  },
  {
    id: 'warrior',
    name: 'Kshatriya Warrior',
    title: 'The Guardian',
    shortDescription: 'Disciplined protector trained in indigenous martial arts like Kalaripayattu and fort defense.',
    icon: 'Shield',
    themeColor: '#EF4444',
    accentGlow: 'rgba(239, 68, 68, 0.35)',
    loreSnippet: 'Embodies valor, righteousness, and the tactical mastery of legendary Indian warriors.'
  },
  {
    id: 'artist',
    name: 'Kala Artisan',
    title: 'The Artisan',
    shortDescription: 'Master of classical arts, temple iconography, sacred music, and living folk traditions.',
    icon: 'Palette',
    themeColor: '#A855F7',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    loreSnippet: 'Brings folklore to life through sculptures, vibrant dyes, rhythm, and theatrical masks.'
  },
  {
    id: 'default',
    name: 'Cultural Voyager',
    title: 'The Seeker',
    shortDescription: 'A versatile wanderer stepping across cultural boundaries with an open heart and keen mind.',
    icon: 'Sparkles',
    themeColor: '#F97316',
    accentGlow: 'rgba(249, 115, 22, 0.35)',
    loreSnippet: 'Balances knowledge, action, and appreciation on a tailored journey through Bharat.'
  }
]

// ============================================================================
// PART 3 — PLAYER AGE GROUP DATA (Exactly 8–12, 13–16, 17+)
// ============================================================================

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: '8-12',
    label: '8–12',
    range: '8–12 Years',
    experienceLevel: 'Beginner / Explorer',
    description: 'Visual folklore stories, gentle puzzle mechanics, and foundational traditional games.'
  },
  {
    id: '13-16',
    label: '13–16',
    range: '13–16 Years',
    experienceLevel: 'Intermediate / Adventurer',
    description: 'Tactical heritage challenges, historical mystery quests, and strategic traditional board games.'
  },
  {
    id: '17+',
    label: '17+',
    range: '17+ Years',
    experienceLevel: 'Advanced / Heritage Seeker',
    description: 'Philosophical epics, deep architectural history, and advanced competitive traditional games.'
  }
]

// ============================================================================
// PART 4 — LANGUAGE DATA (English default + 5 Indian languages)
// ============================================================================

export const LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    name: 'English',
    nativeLabel: 'English',
    isDefault: true
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeLabel: 'हिन्दी'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeLabel: 'ಕನ್ನಡ'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeLabel: 'தமிழ்'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeLabel: 'తెలుగు'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeLabel: 'മലയാളം'
  }
]

export const DEFAULT_LANGUAGE: LanguageOption = LANGUAGES[0]

// ============================================================================
// PART 5 — INTEREST DATA (Exactly 8 Cultural Interests)
// ============================================================================

export const INTERESTS: Interest[] = [
  {
    id: 'history',
    title: 'History & Civilizations',
    shortDescription: 'Explore ancient kingdoms, forgotten cities, archaeological wonders, and the civilizations that shaped Bharat.',
    icon: 'Landmark',
    category: 'Ancient Dynasties',
    culturalFocus: 'Monuments, dynasties, trade routes, and epigraphs',
    themeColor: '#EAB308',
    accentGlow: 'rgba(234, 179, 8, 0.35)',
    keywords: ['Kingdoms', 'Archaeology', 'Dynasties'],
    explorationHint: 'Unlock heritage quests'
  },
  {
    id: 'traditional_games',
    title: 'Ancient Board Games',
    shortDescription: "Discover traditional games, strategic thinking, ancient play systems, and the stories behind India's historic games.",
    icon: 'Dice5',
    category: 'Play & Strategy',
    culturalFocus: 'Pallanguzhi, Chowka Bara, Chaturanga, and board mechanics',
    themeColor: '#F97316',
    accentGlow: 'rgba(249, 115, 22, 0.35)',
    keywords: ['Chowka Bara', 'Pallanguzhi', 'Strategy'],
    explorationHint: 'Master ancestral game boards'
  },
  {
    id: 'art_culture',
    title: 'Sacred Arts',
    shortDescription: 'Journey through temple art, sacred symbolism, traditional painting, sculpture, and spiritual expression.',
    icon: 'Palette',
    category: 'Sacred Iconography',
    culturalFocus: 'Temple sculptures, bronze casting, mural paintings, and sacred geometry',
    themeColor: '#A855F7',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    keywords: ['Temple Art', 'Sculpture', 'Symbolism'],
    explorationHint: 'Decode temple aesthetics'
  },
  {
    id: 'mythology',
    title: 'Folklore & Mythology',
    shortDescription: 'Explore epic tales, regional legends, folk heroes, myths, and stories passed through generations.',
    icon: 'BookOpen',
    category: 'Epic Folklore',
    culturalFocus: 'Epic legends, moral parables, sacred mountains, and divine lore',
    themeColor: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.35)',
    keywords: ['Epic Sagas', 'Folk Legends', 'Myths'],
    explorationHint: 'Unravel timeless myths'
  },
  {
    id: 'music_dance',
    title: 'Classical Music & Dance',
    shortDescription: 'Discover ragas, rhythms, classical dance traditions, instruments, and living performance heritage.',
    icon: 'Music',
    category: 'Living Heritage',
    culturalFocus: 'Carnatic, Hindustani, classical dance mudras, and indigenous instruments',
    themeColor: '#EC4899',
    accentGlow: 'rgba(236, 72, 153, 0.35)',
    keywords: ['Ragas', 'Bharatanatyam', 'Rhythms'],
    explorationHint: 'Feel the sacred rhythms'
  },
  {
    id: 'architecture',
    title: 'Architecture & Temples',
    shortDescription: 'Explore magnificent temples, ancient structures, sacred geometry, and architectural heritage.',
    icon: 'Castle',
    category: 'Sacred Architecture',
    culturalFocus: 'Dravidian gopurams, Hoysala friezes, stepwells, and rock-cut shrines',
    themeColor: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.35)',
    keywords: ['Gopurams', 'Acoustics', 'Stepwells'],
    explorationHint: 'Explore monumental wonders'
  },
  {
    id: 'festivals',
    title: 'Traditions & Festivals',
    shortDescription: 'Experience cultural celebrations, rituals, traditional practices, and the festivals of Bharat.',
    icon: 'Sparkles',
    category: 'Living Celebrations',
    culturalFocus: 'Carnivals, seasonal harvest rites, festive music, and community spirit',
    themeColor: '#FB923C',
    accentGlow: 'rgba(251, 146, 60, 0.35)',
    keywords: ['Utsavas', 'Seasonal Rites', 'Carnivals'],
    explorationHint: 'Join sacred rituals'
  },
  {
    id: 'nature',
    title: 'Nature & Heritage',
    shortDescription: "Journey through mountains, forests, rivers, wildlife, and the landscapes connected to India's cultural heritage.",
    icon: 'Mountain',
    category: 'Sacred Landscapes',
    culturalFocus: 'Western Ghats, sacred groves, sacred rivers, and botanical heritage',
    themeColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.35)',
    keywords: ['Western Ghats', 'Sacred Groves', 'Rivers'],
    explorationHint: 'Traverse sacred terrains'
  }
]

// ============================================================================
// PART 6 — STARTING REGION DATA (Extensible for all Indian States)
// ============================================================================

export const STARTING_REGIONS: Region[] = [
  {
    id: 'karnataka',
    name: 'Karnataka',
    shortDescription: 'The Golden Realm of Vijayanagara, Hoysala stone poetry, and ancient dice games.',
    culturalDescription: 'Architecture • Art • Games',
    culturalTags: ['Hampi Ruins', 'Hoysala Architecture', 'Chowka Bara', 'Yakshagana'],
    icon: 'Castle',
    accentColor: '#EAB308',
    signatureGame: 'Chowka Bara'
  },
  {
    id: 'tamil_nadu',
    name: 'Tamil Nadu',
    shortDescription: 'The Land of towering Dravidian gopurams, Chola seafaring legacy, and ancient mancala.',
    culturalDescription: 'Temples • Tradition',
    culturalTags: ['Chola Temples', 'Pallanguzhi', 'Bharatanatyam', 'Sangam Literature'],
    icon: 'Landmark',
    accentColor: '#F97316',
    signatureGame: 'Pallanguzhi'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    shortDescription: 'The Emerald Cradle of Ayurvedic wisdom, sacred groves, and Kalaripayattu martial arts.',
    culturalDescription: 'Nature • Knowledge',
    culturalTags: ['Kalaripayattu', 'Ayurvedic Lineage', 'Kathakali', 'Backwaters Lore'],
    icon: 'Trees',
    accentColor: '#10B981',
    signatureGame: 'Kallu Kali'
  },
  {
    id: 'andhra_pradesh',
    name: 'Andhra Pradesh',
    shortDescription: 'The Legendary Heritage of Kakatiya sculptors, Lepakshi mysteries, and vibrant toy craft.',
    culturalDescription: 'Dynasties • Kuchipudi • Folklore',
    culturalTags: ['Kakatiya Dynasties', 'Lepakshi Marvels', 'Ashta Chamma', 'Kondapalli Craft'],
    icon: 'Compass',
    accentColor: '#FB923C',
    signatureGame: 'Ashta Chamma'
  },
  {
    id: 'telangana',
    name: 'Telangana',
    shortDescription: 'The Citadel of Golconda acoustic wonders, Ramappa floating bricks, and Deccan metalcraft.',
    culturalDescription: 'Forts • Craftsmanship • Heritage',
    culturalTags: ['Golconda Fort', 'Ramappa Temple', 'Daayam / Pachisi', 'Bidriware'],
    icon: 'Shield',
    accentColor: '#E05326',
    signatureGame: 'Daayam'
  }
]

// ============================================================================
// DEFAULT EXPLORER PROFILE SEED
// ============================================================================

export const DEFAULT_EXPLORER_PROFILE: ExplorerProfile = {
  name: '',
  avatar: 'explorer',
  ageGroup: '13-16',
  language: 'en',
  interests: ['history', 'traditional_games'],
  startingRegion: 'karnataka',
  recommendedQuest: 'The Lost Chronicle of Hampi',
  recommendedGame: 'Chowka Bara',
  culturalPath: ['History', 'Architecture', 'Traditional Games']
}

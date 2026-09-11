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
    title: 'History',
    shortDescription: 'Ancient empires, monumental architecture, and pivotal historical epochs.',
    icon: 'Landmark',
    culturalFocus: 'Monuments, dynasties, trade routes, and epigraphs'
  },
  {
    id: 'mythology',
    title: 'Mythology',
    shortDescription: 'Epic sagas of the Ramayana & Mahabharata, deities, and timeless allegories.',
    icon: 'Scroll',
    culturalFocus: 'Legends, moral parables, sacred mountains, and divine lore'
  },
  {
    id: 'freedom_fighters',
    title: 'Freedom Fighters',
    shortDescription: 'Heroes of India’s independence, fearless revolutionaries, and tribal uprisings.',
    icon: 'Flag',
    culturalFocus: 'National struggles, regional rebellion heroes, and patriot lore'
  },
  {
    id: 'traditional_games',
    title: 'Traditional Games',
    shortDescription: 'Indigenous board games of wit, ancient dice, and heritage strategy sports.',
    icon: 'Dice5',
    culturalFocus: 'Pallanguzhi, Chowka Bara, Chaturanga, and board mechanics'
  },
  {
    id: 'festivals',
    title: 'Festivals',
    shortDescription: 'Vibrant harvest festivals, temple pageants, and seasonal community rituals.',
    icon: 'Sparkles',
    culturalFocus: 'Carnivals, sacred traditions, festive music, and community spirit'
  },
  {
    id: 'art_culture',
    title: 'Art & Culture',
    shortDescription: 'Classical dance forms, temple sculptures, folk crafts, and theatrical arts.',
    icon: 'Palette',
    culturalFocus: 'Kathakali, Bharatanatyam, bronze casting, and mural paintings'
  },
  {
    id: 'science_knowledge',
    title: 'Science & Ancient Knowledge',
    shortDescription: 'Vedic mathematics, astronomical observatories, metallurgy, and Ayurveda.',
    icon: 'Atom',
    culturalFocus: 'Astronomical yantras, herbal wisdom, metallurgy, and water engineering'
  },
  {
    id: 'regional_stories',
    title: 'Regional Stories',
    shortDescription: 'Local folk legends, village balladeer tales, and oral traditions unique to each land.',
    icon: 'Compass',
    culturalFocus: 'Oral history, folk ballads, guardian spirits, and community lore'
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

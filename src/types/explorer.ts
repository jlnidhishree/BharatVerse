/**
 * BHARATVERSE — Explorer & AI Personalization Types
 * Based on SIH 2026 Problem Statement SIH26208 (Toys & Games)
 */

// ============================================================================
// PART 1 — EXPLORER PROFILE TYPE (Required Core Interface)
// ============================================================================

/**
 * Primary player profile structure for BharatVerse.
 * Scalable for local state, future Firebase storage, and FastAPI synchronization.
 */
export interface ExplorerProfile {
  name: string;
  avatar: string;
  ageGroup: string;
  language: string;
  interests: string[];
  startingRegion: string;
  recommendedQuest: string;
  recommendedGame: string;
  culturalPath: string[];
}

// ============================================================================
// SUPPORTING STRONG TYPES
// ============================================================================

/**
 * Avatar category identifiers matching the 5 game archetypes.
 */
export type AvatarId = 'explorer' | 'scholar' | 'warrior' | 'artist' | 'default';

export interface Avatar {
  id: AvatarId;
  name: string;
  title: string;
  shortDescription: string;
  icon: string; // Lucide icon identifier strategy
  themeColor: string;
  accentGlow: string;
  loreSnippet: string;
}

/**
 * Supported age group tiers influencing quest narrative complexity and difficulty.
 */
export type AgeGroupId = '8-12' | '13-16' | '17+';

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  range: string;
  experienceLevel: string; // e.g. 'Beginner / Explorer'
  description: string;
}

/**
 * Supported UI & cultural languages.
 */
export type LanguageCode = 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'ml';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeLabel: string;
  isDefault?: boolean;
}

/**
 * Cultural interest topics treated as RPG exploration traits.
 */
export type InterestId =
  | 'history'
  | 'mythology'
  | 'freedom_fighters'
  | 'traditional_games'
  | 'festivals'
  | 'art_culture'
  | 'science_knowledge'
  | 'regional_stories';

export interface Interest {
  id: InterestId;
  title: string;
  shortDescription: string;
  icon: string; // Lucide icon identifier
  culturalFocus: string;
}

/**
 * Regional starting hubs.
 * Extensible for all Indian states/territories in future expansions.
 */
export type InitialRegionId = 'karnataka' | 'tamil_nadu' | 'kerala' | 'andhra_pradesh' | 'telangana';

export interface Region {
  id: InitialRegionId | string;
  name: string;
  shortDescription: string;
  culturalDescription: string;
  culturalTags: string[];
  icon: string; // Lucide icon identifier
  accentColor: string;
  signatureGame: string;
}

// ============================================================================
// PART 7 — JOURNEY RECOMMENDATION TYPES
// ============================================================================

/**
 * Recommendation request payload conceptually matching:
 * POST /api/recommend-journey
 */
export interface RecommendationRequest {
  ageGroup: string;
  interests: string[];
  language: string;
  startingRegion: string;
}

export type RecommendationDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Recommendation response payload conceptually matching:
 * POST /api/recommend-journey
 */
export interface RecommendationResponse {
  recommendedQuest: string;
  recommendedGame: string;
  culturalPath: string[];
  difficulty: RecommendationDifficulty;
  questDescription?: string;
  loreSnippet?: string;
}

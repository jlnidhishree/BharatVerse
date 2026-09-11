/**
 * BHARATVERSE — Local Recommendation Service & AI Personalization Engine
 * Based on SIH 2026 Problem Statement SIH26208 (Toys & Games)
 *
 * ARCHITECTURAL DESIGN NOTE:
 * This is a deterministic local recommendation service for the hackathon MVP.
 * It contains ZERO fetch calls or fake HTTP delays.
 *
 * FUTURE FASTAPI INTEGRATION:
 * When the Python FastAPI backend is deployed, replace the local execution
 * inside `fetchAIRecommendedJourney` with:
 *
 * ```ts
 * const response = await fetch(`${API_BASE_URL}/api/recommend-journey`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(request)
 * });
 * return await response.json();
 * ```
 */

import type {
  RecommendationRequest,
  RecommendationResponse,
  RecommendationDifficulty
} from '../types/explorer.ts'

// ============================================================================
// REGIONAL THEME & LORE DEFINITIONS
// ============================================================================

interface QuestTemplate {
  questName: string;
  game: string;
  path: string[];
  description: string;
  loreSnippet: string;
}

interface RegionalQuestMatrix {
  defaultQuest: QuestTemplate;
  interestOverrides: Partial<Record<string, QuestTemplate>>;
}

/**
 * Regional Quest & Traditional Game Knowledge Base
 */
const REGIONAL_KNOWLEDGE_BASE: Record<string, RegionalQuestMatrix> = {
  karnataka: {
    defaultQuest: {
      questName: 'The Lost Chronicle of Hampi',
      game: 'Chowka Bara',
      path: ['History', 'Architecture', 'Traditional Games'],
      description: 'Journey across the boulder-strewn ruins of the Vijayanagara capital to recover the royal game master’s lost ledger.',
      loreSnippet: 'Centuries ago, Vijayanagara courtiers etched Chowka Bara boards directly into the stone slabs of the Vitthala Temple.'
    },
    interestOverrides: {
      history: {
        questName: 'The Lost Chronicle of Hampi',
        game: 'Chowka Bara',
        path: ['History', 'Architecture', 'Traditional Games'],
        description: 'Decode the secret royal decrees preserved inside the stone monuments of Hampi.',
        loreSnippet: 'Hampi’s bazaar was once the world’s grandest trading hub for diamonds, silk, and sacred manuscripts.'
      },
      traditional_games: {
        questName: 'The Grand Arena of Chowka Bara',
        game: 'Chowka Bara',
        path: ['Traditional Games', 'Vijayanagara Strategy', 'Folk Heritage'],
        description: 'Master the ancient Karnataka 5x5 race game of cowrie shells, tactical blockades, and inner sanctum entry.',
        loreSnippet: 'Known as "Chauka Baara", this game taught young princes the fundamentals of troop movement and strategic patience.'
      },
      art_culture: {
        questName: 'Secrets of the Hoysala Sculptors',
        game: 'Ganjifa',
        path: ['Temple Architecture', 'Classical Sculpture', 'Sacred Arts'],
        description: 'Explore the soapstone masterpieces of Belur and Halebidu to reveal ancient artisan guild secrets.',
        loreSnippet: 'Hoysala sculptors signed their works with miniature self-portraits at the base of temple friezes.'
      },
      mythology: {
        questName: 'Legends of the Kishkindha Realm',
        game: 'Aadu Huli Aata',
        path: ['Mythology', 'Ramayana Topography', 'Folk Legends'],
        description: 'Traverse the mythical monkey kingdom of Kishkindha around Lake Pampa and the Tungabhadra river.',
        loreSnippet: 'Folklorists identify the hills of Anegundi across the river from Hampi as the epic kingdom of Sugriva.'
      },
      science_knowledge: {
        questName: 'Acoustic Wonders of Gol Gumbaz & Belur',
        game: 'Chowka Bara',
        path: ['Ancient Engineering', 'Acoustics & Astronomy', 'Living Monuments'],
        description: 'Uncover how medieval Deccan architects harnessed sound resonance and geometric precision.',
        loreSnippet: 'The Whispering Gallery of Gol Gumbaz echoes the faintest sound up to eleven times across its massive dome.'
      }
    }
  },

  tamil_nadu: {
    defaultQuest: {
      questName: 'Shadow of the Big Temple: The Chola Legacy',
      game: 'Pallanguzhi',
      path: ['Chola Heritage', 'Temple Traditions', 'Pallanguzhi Mastery'],
      description: 'Unravel the architectural wonders and oceanic expeditions of the Chola empire across Thanjavur and Gangaikonda Cholapuram.',
      loreSnippet: 'The 80-tonne granite dome crowning the Brihadisvara Temple was lifted into place using an inclined ramp stretching over 4 miles.'
    },
    interestOverrides: {
      history: {
        questName: 'Maritime Expeditions of Rajendra Chola',
        game: 'Pallanguzhi',
        path: ['Chola Heritage', 'Naval Expeditions', 'Temple Archives'],
        description: 'Follow the seafaring armada of the Cholas across the Bay of Bengal to the Strait of Malacca.',
        loreSnippet: 'The Chola navy was the pre-eminent maritime force in the 11th century, safeguarding spice trade routes.'
      },
      traditional_games: {
        questName: 'The Masters of the 14-Pits: Pallanguzhi Arena',
        game: 'Pallanguzhi',
        path: ['Traditional Games', 'Mathematical Wit', 'Sangam Heritage'],
        description: 'Compete in the timeless Tamil mancala game of cowrie distribution, capturing pits, and mental arithmetic.',
        loreSnippet: 'Pallanguzhi boards carved with 14 depressions date back to early Sangam era archaeological settlements.'
      },
      art_culture: {
        questName: 'The Divine Rhythm of Chidambaram',
        game: 'Aadu Puli Aattam',
        path: ['Bharatanatyam Lore', 'Bronze Metallurgy', 'Dravidian Temples'],
        description: 'Decode the 108 sacred dance karanas carved along the monumental gopurams of Chidambaram.',
        loreSnippet: 'Chola bronze artisans perfected the lost-wax casting technique to create world-famous icons of Nataraja.'
      },
      mythology: {
        questName: 'Sacred Chronicles of Madurai & Rameshwaram',
        game: 'Pallanguzhi',
        path: ['Temple Traditions', 'Divine Inscriptions', 'Epic Legends'],
        description: 'Journey through the historic temple cities where epic legends intersect with living Sangam poetry.',
        loreSnippet: 'The Meenakshi Sundareswarar Temple complex is organized according to sacred Vedic architectural mandalas.'
      }
    }
  },

  kerala: {
    defaultQuest: {
      questName: 'The Green Sanctuaries of the Western Ghats',
      game: 'Kallu Kali',
      path: ['Nature', 'Knowledge', 'Regional Traditions'],
      description: 'Trek the rainforest trails of Kerala to learn sacred grove conservation and timeless wellness wisdom.',
      loreSnippet: 'Kerala’s "Kavu" (sacred groves) have preserved biodiversity and natural water aquifers for over two millennia.'
    },
    interestOverrides: {
      science_knowledge: {
        questName: 'The Herbal Alchemists of the Western Ghats',
        game: 'Kallu Kali',
        path: ['Ayurvedic Wisdom', 'Forest Ecosystems', 'Kerala Astronomy School'],
        description: 'Learn the principles of classical Ashtavaidya Ayurvedic medicine and medieval Kerala astronomical calculus.',
        loreSnippet: 'The Kerala School of Astronomy and Mathematics developed infinite series expansions centuries before European calculus.'
      },
      traditional_games: {
        questName: 'The Martial Arena of Kalaripayattu',
        game: 'Kallu Kali',
        path: ['Martial Traditions', 'Physical Mastery', 'Indigenous Sports'],
        description: 'Train in the world’s oldest martial art, mastering animal postures, flexibility, and ancient reflex games.',
        loreSnippet: 'Kalaripayattu integrates martial combat with deep Ayurvedic Marma (vital pressure point) anatomy.'
      },
      art_culture: {
        questName: 'Whispers of the Kathakali Masks',
        game: 'Kallu Kali',
        path: ['Sacred Theatre', 'Ritual Arts', 'Folklore of Malabar'],
        description: 'Decipher the green Paccha and fiery Kathi facial makeup of Kerala’s classical dance-drama.',
        loreSnippet: 'Kathakali performers spend years training eye and facial muscles to express nine primary rasas without uttering a word.'
      },
      regional_stories: {
        questName: 'Folktales of the Silent Valley & Theyyam',
        game: 'Kallu Kali',
        path: ['Nature Lore', 'Sacred Groves', 'Indigenous Storytelling'],
        description: 'Witness the divine trance rituals of Theyyam and listen to ballads of heroic Malabar ancestors.',
        loreSnippet: 'In Theyyam rituals, folk performers become living embodiments of forest deities and righteous folk heroes.'
      }
    }
  },

  andhra_pradesh: {
    defaultQuest: {
      questName: 'The Riddle of the Lepakshi Pillar',
      game: 'Ashta Chamma',
      path: ['Kakatiya Heritage', 'Lepakshi Marvels', 'Kalamkari Storytelling'],
      description: 'Investigate the marvel of the hanging granite pillar of Lepakshi and the legendary Vijayanagara murals.',
      loreSnippet: 'The Lepakshi Veerabhadra Temple features a hanging pillar that does not touch the ground, allowing cloths to pass beneath it.'
    },
    interestOverrides: {
      history: {
        questName: 'Queens of the Kakatiya Dynasty',
        game: 'Ashta Chamma',
        path: ['Kakatiya Heritage', 'Warrior Queens', 'Dynastic Forts'],
        description: 'Follow the valiant reign of Rani Rudrama Devi and explore the historic gates of Warangal Fort.',
        loreSnippet: 'Marco Polo praised Rani Rudrama Devi for her justice, administrative brilliance, and courage in defending her people.'
      },
      traditional_games: {
        questName: 'The Royal Courtyard of Ashta Chamma',
        game: 'Ashta Chamma',
        path: ['Traditional Games', 'Courtyard Tactics', 'Andhra Folk Games'],
        description: 'Throw the cowrie shells to navigate your tokens around the concentric squares of Ashta Chamma.',
        loreSnippet: 'Ashta Chamma (also called Daayam or Chauka Bara in neighboring regions) was a favorite leisure game in Andhra royal households.'
      },
      art_culture: {
        questName: 'Living Colors of Kalamkari & Kondapalli',
        game: 'Ashta Chamma',
        path: ['Folk Puppetry', 'Kalamkari Murals', 'Artisan Lineages'],
        description: 'Discover how natural vegetable dyes and soft Poniki wood create legendary Andhra crafts.',
        loreSnippet: 'Srikalahasti Kalamkari artists still use tamarind pens to hand-draw intricate scenes from the Ramayana onto cotton.'
      }
    }
  },

  telangana: {
    defaultQuest: {
      questName: 'The Echoes of Golconda: Sound & Stone',
      game: 'Daayam',
      path: ['Acoustic Architecture', 'Ramappa Floating Bricks', 'Deccan Craftsmanship'],
      description: 'Explore the whispering battlements of Golconda Fort and the diamond-rich heritage of the Deccan plateau.',
      loreSnippet: 'A handclap at the entrance gate of Golconda can be heard clearly at the Bala Hissar pavilion a kilometer away at the highest point.'
    },
    interestOverrides: {
      history: {
        questName: 'Citadels of the Qutb Shahis & Kakatiyas',
        game: 'Daayam',
        path: ['Acoustic Architecture', 'Deccan History', 'Fort Engineering'],
        description: 'Trace the defensive engineering, water filtration channels, and secret tunnels beneath Golconda.',
        loreSnippet: 'Golconda was the trading center for the world’s most legendary gems, including the Koh-i-Noor and Hope Diamond.'
      },
      science_knowledge: {
        questName: 'The Floating Bricks of Ramappa Temple',
        game: 'Daayam',
        path: ['UNESCO Heritage', 'Medieval Engineering', 'Vedic Metallurgy'],
        description: 'Discover the lightweight floating porous bricks and sandbox earthquake foundation of the 800-year-old Ramappa Temple.',
        loreSnippet: 'Ramappa’s bricks are so light and porous that they float on water, protecting the temple from seismic collapse.'
      },
      traditional_games: {
        questName: 'The Deccan Grandmaster of Daayam',
        game: 'Daayam',
        path: ['Traditional Games', 'Deccan Strategy', 'Ancient Boards'],
        description: 'Compete against regional champions in Daayam, balancing swift offensive dashes and tactical retreats.',
        loreSnippet: 'Daayam boards made of embroidered velvet and brass tokens were prized family heirlooms across the Deccan.'
      },
      festivals: {
        questName: 'The Floral Tapestry of Bathukamma',
        game: 'Daayam',
        path: ['Floral Traditions', 'Folk Songs', 'Telangana Heritage'],
        description: 'Celebrate the festival of flowers, arranging seasonal blooms into conical shrines to honor nature and womanhood.',
        loreSnippet: 'Bathukamma is a unique cultural celebration centered entirely on seasonal wild medicinal flowers like Gunugu and Tangedu.'
      }
    }
  }
}

// ============================================================================
// PART 8 — LOCAL DETERMINISTIC RECOMMENDATION FUNCTION
// ============================================================================

/**
 * Calculates difficulty based on age group.
 * 8–12: Beginner / Explorer
 * 13–16: Intermediate / Adventurer
 * 17+: Advanced / Heritage Seeker
 */
function resolveDifficulty(ageGroup: string): RecommendationDifficulty {
  if (ageGroup === '8-12') return 'Beginner'
  if (ageGroup === '17+') return 'Advanced'
  return 'Intermediate' // default for '13-16' and general users
}

/**
 * Normalizes input keys for safe matching.
 */
function normalizeKey(str: string): string {
  return (str || '').toLowerCase().trim().replace(/[\s-]+/g, '_')
}

/**
 * Primary deterministic recommendation engine.
 * Priority hierarchy:
 * 1. Starting Region
 * 2. Selected Interests (matches highest priority interest)
 * 3. Age Group (determines difficulty tier & narration complexity)
 * 4. Language (passed through for future localized narrative pipelines)
 */
export function recommendJourney(request: RecommendationRequest): RecommendationResponse {
  const normalizedRegion = normalizeKey(request.startingRegion)
  const normalizedInterests = (request.interests || []).map(normalizeKey)
  const difficulty = resolveDifficulty(request.ageGroup)

  // Step 1: Resolve regional knowledge base entry (with graceful fallback to Karnataka)
  const regionEntry = REGIONAL_KNOWLEDGE_BASE[normalizedRegion] || REGIONAL_KNOWLEDGE_BASE.karnataka

  // Step 2: Check for interest overrides based on player selections
  let chosenQuest: QuestTemplate = regionEntry.defaultQuest

  for (const interest of normalizedInterests) {
    if (regionEntry.interestOverrides[interest]) {
      chosenQuest = regionEntry.interestOverrides[interest]!
      break // First matching high-affinity interest takes priority
    }
  }

  // Step 3: Handle Traditional Games specific priority
  let recommendedGame = chosenQuest.game
  if (normalizedInterests.includes('traditional_games')) {
    // If traditional games is explicitly chosen, ensure game matches regional indigenous specialty
    switch (normalizedRegion) {
      case 'karnataka':
        recommendedGame = 'Chowka Bara'
        break
      case 'tamil_nadu':
        recommendedGame = 'Pallanguzhi'
        break
      case 'kerala':
        recommendedGame = 'Kallu Kali'
        break
      case 'andhra_pradesh':
        recommendedGame = 'Ashta Chamma'
        break
      case 'telangana':
        recommendedGame = 'Daayam'
        break
      default:
        recommendedGame = 'Chaturanga'
    }
  }

  // Step 4: Adjust difficulty flavor if required
  return {
    recommendedQuest: chosenQuest.questName,
    recommendedGame,
    culturalPath: chosenQuest.path,
    difficulty,
    questDescription: chosenQuest.description,
    loreSnippet: chosenQuest.loreSnippet
  }
}

/**
 * Convenience helper accepting individual arguments.
 */
export function getJourneyRecommendation(
  startingRegion: string,
  interests: string[],
  ageGroup: string,
  language: string
): RecommendationResponse {
  return recommendJourney({
    startingRegion,
    interests,
    ageGroup,
    language
  })
}

// ============================================================================
// PART 9 — FUTURE FASTAPI INTEGRATION ADAPTER
// ============================================================================

/**
 * Async adapter designed to be a drop-in replacement when the
 * Python FastAPI endpoint (POST /api/recommend-journey) is deployed.
 *
 * Current behavior: Returns the deterministic local recommendation.
 * Future behavior: Calls FastAPI endpoint via standard fetch.
 */
export async function fetchAIRecommendedJourney(
  request: RecommendationRequest
): Promise<RecommendationResponse> {
  // In development/hackathon MVP without a running FastAPI container,
  // we execute the deterministic local logic directly:
  return recommendJourney(request)
}

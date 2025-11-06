/**
 * @promptcraft/shared
 *
 * Single source of truth for PromptCraft's data structures, constants, and business logic.
 * Shared between extension, web app, and API.
 */

// Export all constants
export * from './constants/index.js';

// Export all structures
export * from './structures/index.js';

// Export all helpers
export * from './helpers/index.js';

// Package version
export const VERSION = '1.0.0';

/**
 * API Router
 *
 * The API logic is available at './api/router.js'
 * Import it separately: import handler from '@promptcraft/shared/api'
 *
 * See api/README.md for complete API documentation.
 */

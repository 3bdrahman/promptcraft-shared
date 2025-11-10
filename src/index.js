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

// Export API client and utilities
export * from './api/index.js';

// Package version
export const VERSION = '1.0.0';

/**
 * API Usage
 *
 * The shared package now includes a complete API client library:
 *
 * @example
 * import api from '@promptcraft/shared/api';
 *
 * // Configure client
 * api.client.config.setBaseUrl('https://api.promptcraft.app');
 * api.client.config.setTokens(accessToken, refreshToken);
 *
 * // Use services
 * const templates = await api.services.templates.getTemplates();
 * const user = await api.services.auth.login({ email, password });
 *
 * @example
 * // Or use individual services
 * import { templates } from '@promptcraft/shared/api';
 * const myTemplates = await templates.getMyTemplates();
 *
 * The API server logic is available at '../api/router.js'
 * Import it separately: import handler from '@promptcraft/shared/api/server'
 */

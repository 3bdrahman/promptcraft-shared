/**
 * PromptCraft Shared API Module
 * Main entry point for all API-related functionality
 *
 * @example
 * // Import the entire API module
 * import api from '@promptcraft/shared/api';
 *
 * // Configure the client
 * api.client.config.setBaseUrl('https://api.promptcraft.app');
 * api.client.config.setTokens(accessToken, refreshToken);
 *
 * // Use services
 * const templates = await api.services.templates.getTemplates();
 * const user = await api.services.auth.login({ email, password });
 *
 * @example
 * // Or import specific parts
 * import { services, routes, types } from '@promptcraft/shared/api';
 * import { config, http } from '@promptcraft/shared/api/client';
 */

// Client exports
export { default as client, config, http, ApiError, isApiError, getErrorMessage, normalizeResponse } from './client.js';

// Routes exports
export { default as routes, API_ROUTES, AUTH_ROUTES, TEMPLATE_ROUTES, CONTEXT_ROUTES, TEAM_ROUTES, AI_ROUTES, MISC_ROUTES, buildQueryString, buildUrl } from './routes.js';

// Types exports (for JSDoc usage)
export { default as types } from './types.js';

// Services exports
export { default as services } from './services/index.js';
export * as auth from './services/auth.js';
export * as templates from './services/templates.js';
export * as contexts from './services/contexts.js';
export * as teams from './services/teams.js';
export * as ai from './services/ai.js';

// Default export with everything organized
import clientExports from './client.js';
import routesExports from './routes.js';
import typesExports from './types.js';
import servicesExports from './services/index.js';

export default {
  client: clientExports,
  routes: routesExports,
  types: typesExports,
  services: servicesExports,
};

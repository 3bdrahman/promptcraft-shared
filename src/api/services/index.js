/**
 * API Services Index
 * Re-exports all API service modules
 */

export * as auth from './auth.js';
export * as templates from './templates.js';
export * as contexts from './contexts.js';
export * as teams from './teams.js';
export * as ai from './ai.js';

// Default export with all services
import authService from './auth.js';
import templatesService from './templates.js';
import contextsService from './contexts.js';
import teamsService from './teams.js';
import aiService from './ai.js';

export default {
  auth: authService,
  templates: templatesService,
  contexts: contextsService,
  teams: teamsService,
  ai: aiService,
};

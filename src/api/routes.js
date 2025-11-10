/**
 * API Routes Constants
 * Centralized route definitions for all API endpoints
 * Use these constants in both client and server code
 */

/**
 * Base API URL (should be configured per environment)
 */
export const API_BASE_URL = '/api';

/**
 * Authentication Endpoints
 */
export const AUTH_ROUTES = {
  SIGNUP: '/api/auth/signup',
  LOGIN: '/api/auth/login',
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',
  LOGOUT_ALL: '/api/auth/logout-all',
  VERIFY_PIN: '/api/auth/verify-pin',
  RESEND_PIN: '/api/auth/resend-pin',
  // Legacy
  AUTH_BY_EMAIL: '/api/user/auth-by-email',
};

/**
 * Template Endpoints
 */
export const TEMPLATE_ROUTES = {
  BASE: '/api/templates',
  LIST: '/api/templates',
  MY_TEMPLATES: '/api/templates/my-templates',
  FAVORITES: '/api/templates/favorites',
  SCHEMA: '/api/templates/schema',
  byId: (id) => `/api/templates/${id}`,
  favorite: (id) => `/api/templates/${id}/favorite`,
};

/**
 * Context/Layer Endpoints
 */
export const CONTEXT_ROUTES = {
  BASE: '/api/contexts',
  LAYERS: '/api/contexts/layers',
  PROFILES: '/api/contexts/profiles',
  COMBINATIONS: '/api/contexts/combinations',
  SNIPPETS: '/api/contexts/snippets',

  // Advanced context features
  SEARCH: '/api/contexts/search',
  RECOMMEND: '/api/contexts/recommend',
  EFFECTIVENESS: '/api/contexts/effectiveness',
  TRACK_USAGE: '/api/contexts/track-usage',
  ASSOCIATIONS: '/api/contexts/associations',
  RELATIONSHIPS: '/api/contexts/relationships',

  // Layer-specific endpoints
  byId: (id) => `/api/contexts/layers/${id}`,
  tree: (id) => `/api/contexts/layers/${id}/tree`,
  children: (id) => `/api/contexts/layers/${id}/children`,
  removeChild: (id, childId) => `/api/contexts/layers/${id}/children/${childId}`,
  reorder: (id) => `/api/contexts/layers/${id}/order`,
  descendants: (id) => `/api/contexts/layers/${id}/descendants`,
  dependencies: (id) => `/api/contexts/layers/${id}/dependencies`,
  conflicts: (id) => `/api/contexts/layers/${id}/conflicts`,
  dependencyOrder: (id) => `/api/contexts/layers/${id}/order`,
  similar: (id) => `/api/contexts/layers/${id}/similar`,
  versions: (id) => `/api/contexts/layers/${id}/versions`,
  version: (id, versionId) => `/api/contexts/layers/${id}/versions/${versionId}`,
  revert: (id, versionId) => `/api/contexts/layers/${id}/revert/${versionId}`,
  diff: (id) => `/api/contexts/layers/${id}/diff`,
  branch: (id) => `/api/contexts/layers/${id}/branch`,
  branches: (id) => `/api/contexts/layers/${id}/branches`,
  generateEmbedding: (id) => `/api/contexts/layers/${id}/generate-embedding`,

  // Relationship endpoints
  relationshipById: (id) => `/api/contexts/relationships/${id}`,
};

/**
 * Team Endpoints
 */
export const TEAM_ROUTES = {
  BASE: '/api/teams',
  LIST: '/api/teams',
  byId: (id) => `/api/teams/${id}`,
  members: (teamId) => `/api/teams/${teamId}/members`,
  member: (teamId, memberId) => `/api/teams/${teamId}/members/${memberId}`,
  invitations: (teamId) => `/api/teams/${teamId}/invitations`,
  invitation: (teamId, invitationId) => `/api/teams/${teamId}/invitations/${invitationId}`,

  // Public invitation endpoints (no team in path)
  invitationByToken: (token) => `/api/invitations/${token}`,
  acceptInvitation: (token) => `/api/invitations/${token}/accept`,
  rejectInvitation: (token) => `/api/invitations/${token}/reject`,
};

/**
 * AI Endpoints
 */
export const AI_ROUTES = {
  GENERATE: '/api/ai/generate',
  EMBEDDINGS: '/api/ai/embeddings',
  PROVIDERS: '/api/ai/providers',
};

/**
 * Analytics & Subscription Endpoints
 */
export const MISC_ROUTES = {
  ANALYTICS: '/api/analytics',
  SUBSCRIPTION: '/api/user/subscription',
  SUBSCRIPTIONS: '/api/subscriptions',
};

/**
 * Helper function to build query string from params
 * @param {Object} params - Query parameters
 * @returns {string} Query string
 */
export function buildQueryString(params) {
  if (!params || Object.keys(params).length === 0) return '';

  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        queryParams.append(key, JSON.stringify(value));
      } else {
        queryParams.append(key, String(value));
      }
    }
  });

  const queryString = queryParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Helper function to build full URL with query params
 * @param {string} route - Base route
 * @param {Object} params - Query parameters
 * @returns {string} Full URL
 */
export function buildUrl(route, params) {
  return route + buildQueryString(params);
}

/**
 * All routes combined
 */
export const API_ROUTES = {
  AUTH: AUTH_ROUTES,
  TEMPLATES: TEMPLATE_ROUTES,
  CONTEXTS: CONTEXT_ROUTES,
  TEAMS: TEAM_ROUTES,
  AI: AI_ROUTES,
  MISC: MISC_ROUTES,
};

export default API_ROUTES;

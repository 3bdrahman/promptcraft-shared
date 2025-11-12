/**
 * Templates API Service
 * Handles all template-related API calls
 */

import { http } from '../client.js';
import { API_ROUTES } from '../routes.js';

/**
 * Get list of public templates
 * @param {Object} [filters] - Filter options
 * @param {string} [filters.category] - Category ID
 * @param {string} [filters.grandparent] - Grandparent category ID
 * @param {string} [filters.parent] - Parent category ID
 * @param {string[]} [filters.categories] - Multiple category IDs
 * @param {string} [filters.search] - Search query
 * @param {string[]} [filters.tags] - Filter by tags
 * @param {number} [filters.limit=25] - Results per page
 * @param {number} [filters.offset=0] - Offset for pagination
 * @param {string} [filters.sortBy='created_at'] - Sort by field
 * @param {string[]} [filters.excludeIds] - Exclude template IDs
 * @returns {Promise<import('../types.js').TemplateListResponse>}
 */
export async function getTemplates(filters = {}) {
  const response = await http.get(API_ROUTES.TEMPLATES.LIST, filters);
  return response;
}

/**
 * Get user's own templates (both public and private)
 * @param {Object} [options] - Options
 * @param {number} [options.limit=50] - Results limit
 * @param {number} [options.offset=0] - Offset
 * @returns {Promise<import('../types.js').MyTemplatesResponse>}
 */
export async function getMyTemplates(options = {}) {
  const response = await http.get(API_ROUTES.TEMPLATES.MY_TEMPLATES, options);
  return response;
}

/**
 * Get user's favorite templates
 * @param {Object} [options] - Pagination options
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=25] - Results per page
 * @returns {Promise<import('../types.js').TemplateListResponse>}
 */
export async function getFavoriteTemplates(options = {}) {
  const response = await http.get(API_ROUTES.TEMPLATES.FAVORITES, options);
  return response;
}

/**
 * Get single template by ID
 * @param {string} id - Template ID
 * @returns {Promise<import('../types.js').TemplateResponse>}
 */
export async function getTemplate(id) {
  const response = await http.get(API_ROUTES.TEMPLATES.byId(id));
  return response;
}

/**
 * Create a new template
 * @param {Object} data - Template data
 * @param {string} data.name - Template name (required)
 * @param {string} [data.description] - Template description
 * @param {string} data.content - Template content (required)
 * @param {Array} [data.variables] - Template variables
 * @param {string} [data.category='general'] - Category ID
 * @param {string[]} [data.tags] - Tags
 * @param {boolean} [data.is_public=false] - Public visibility
 * @returns {Promise<import('../types.js').Template>}
 */
export async function createTemplate(data) {
  const response = await http.post(API_ROUTES.TEMPLATES.BASE, data);
  return response.data;
}

/**
 * Update an existing template
 * @param {string} id - Template ID
 * @param {Object} data - Updated template data
 * @param {string} data.name - Template name (required)
 * @param {string} [data.description] - Template description
 * @param {string} data.content - Template content (required)
 * @param {Array} [data.variables] - Template variables
 * @param {string} [data.category] - Category ID
 * @param {string[]} [data.tags] - Tags
 * @param {boolean} [data.is_public] - Public visibility
 * @returns {Promise<import('../types.js').Template>}
 */
export async function updateTemplate(id, data) {
  const response = await http.put(API_ROUTES.TEMPLATES.byId(id), data);
  return response.data;
}

/**
 * Delete a template
 * @param {string} id - Template ID
 * @returns {Promise<Object>}
 */
export async function deleteTemplate(id) {
  const response = await http.delete(API_ROUTES.TEMPLATES.byId(id));
  return response.data;
}

/**
 * Toggle favorite status for a template
 * @param {string} id - Template ID
 * @returns {Promise<Object>}
 */
export async function toggleFavorite(id) {
  const response = await http.post(API_ROUTES.TEMPLATES.favorite(id));
  return response.data;
}

/**
 * Get team templates
 * @param {string} teamId - Team ID
 * @returns {Promise<import('../types.js').TemplateListResponse>}
 */
export async function getTeamTemplates(teamId) {
  const response = await http.get(`/templates/team/${teamId}`);
  return response;
}

/**
 * Share template with team
 * @param {string} templateId - Template ID
 * @param {string} teamId - Team ID to share with
 * @returns {Promise<import('../types.js').Template>}
 */
export async function shareTemplateWithTeam(templateId, teamId) {
  const response = await http.post(`/templates/${templateId}/share`, { team_id: teamId });
  return response.data;
}

/**
 * Unshare template (make private)
 * @param {string} templateId - Template ID
 * @returns {Promise<import('../types.js').Template>}
 */
export async function unshareTemplate(templateId) {
  const response = await http.post(`/templates/${templateId}/unshare`);
  return response.data;
}

/**
 * Get database schema (debug endpoint)
 * @returns {Promise<Object>}
 */
export async function getSchema() {
  const response = await http.get(API_ROUTES.TEMPLATES.SCHEMA);
  return response;
}

export default {
  getTemplates,
  getMyTemplates,
  getFavoriteTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  toggleFavorite,
  getTeamTemplates,
  shareTemplateWithTeam,
  unshareTemplate,
  getSchema,
};

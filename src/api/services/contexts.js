/**
 * Contexts/Layers API Service
 * Handles all context layer-related API calls
 */

import { http } from '../client.js';
import { API_ROUTES } from '../routes.js';

// ============================================================================
// Basic Layer Operations
// ============================================================================

/**
 * Get list of context layers
 * Note: This would typically go to a base layers endpoint
 * You may need to adjust based on your actual API structure
 * @param {Object} [filters] - Filter options
 * @returns {Promise<Object>}
 */
export async function getLayers(filters = {}) {
  const response = await http.get(API_ROUTES.CONTEXTS.LAYERS, filters);
  return response;
}

/**
 * Get single layer by ID
 * @param {string} id - Layer ID
 * @returns {Promise<import('../types.js').ContextLayer>}
 */
export async function getLayer(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.byId(id));
  return response.data;
}

/**
 * Create a new context layer
 * @param {Object} data - Layer data
 * @returns {Promise<import('../types.js').ContextLayer>}
 */
export async function createLayer(data) {
  const response = await http.post(API_ROUTES.CONTEXTS.LAYERS, data);
  return response.data;
}

/**
 * Update a context layer
 * @param {string} id - Layer ID
 * @param {Object} data - Updated layer data
 * @returns {Promise<import('../types.js').ContextLayer>}
 */
export async function updateLayer(id, data) {
  const response = await http.put(API_ROUTES.CONTEXTS.byId(id), data);
  return response.data;
}

/**
 * Delete a context layer
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function deleteLayer(id) {
  const response = await http.delete(API_ROUTES.CONTEXTS.byId(id));
  return response.data;
}

// ============================================================================
// Hierarchical Composition
// ============================================================================

/**
 * Get composition tree for a layer
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function getCompositionTree(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.tree(id));
  return response.data;
}

/**
 * Add a child layer
 * @param {string} id - Parent layer ID
 * @param {Object} data - Child data
 * @param {string} data.childId - Child layer ID
 * @param {number} [data.order] - Order position
 * @returns {Promise<Object>}
 */
export async function addChild(id, data) {
  const response = await http.post(API_ROUTES.CONTEXTS.children(id), data);
  return response.data;
}

/**
 * Remove a child layer
 * @param {string} id - Parent layer ID
 * @param {string} childId - Child layer ID
 * @returns {Promise<Object>}
 */
export async function removeChild(id, childId) {
  const response = await http.delete(API_ROUTES.CONTEXTS.removeChild(id, childId));
  return response.data;
}

/**
 * Reorder children
 * @param {string} id - Parent layer ID
 * @param {Object} data - Reorder data
 * @param {string[]} data.childIds - Ordered array of child IDs
 * @returns {Promise<Object>}
 */
export async function reorderChildren(id, data) {
  const response = await http.put(API_ROUTES.CONTEXTS.reorder(id), data);
  return response.data;
}

/**
 * Get all descendants
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function getDescendants(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.descendants(id));
  return response.data;
}

// ============================================================================
// Relationships & Dependencies
// ============================================================================

/**
 * Get all relationships
 * @param {Object} [filters] - Filter options
 * @returns {Promise<import('../types.js').ContextRelationship[]>}
 */
export async function getRelationships(filters = {}) {
  const response = await http.get(API_ROUTES.CONTEXTS.RELATIONSHIPS, filters);
  return response.data;
}

/**
 * Create a relationship
 * @param {Object} data - Relationship data
 * @param {string} data.sourceLayerId - Source layer ID
 * @param {string} data.targetLayerId - Target layer ID
 * @param {string} data.relationshipType - Type (requires, enhances, conflicts, replaces)
 * @param {Object} [data.metadata] - Additional metadata
 * @returns {Promise<import('../types.js').ContextRelationship>}
 */
export async function createRelationship(data) {
  const response = await http.post(API_ROUTES.CONTEXTS.RELATIONSHIPS, data);
  return response.data;
}

/**
 * Delete a relationship
 * @param {string} id - Relationship ID
 * @returns {Promise<Object>}
 */
export async function deleteRelationship(id) {
  const response = await http.delete(API_ROUTES.CONTEXTS.relationshipById(id));
  return response.data;
}

/**
 * Resolve dependencies for a layer
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function resolveDependencies(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.dependencies(id));
  return response.data;
}

/**
 * Check for conflicts
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function checkConflicts(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.conflicts(id));
  return response.data;
}

/**
 * Get dependency order
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function getDependencyOrder(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.dependencyOrder(id));
  return response.data;
}

// ============================================================================
// Version Control
// ============================================================================

/**
 * Get version history for a layer
 * @param {string} id - Layer ID
 * @returns {Promise<import('../types.js').ContextVersion[]>}
 */
export async function getVersionHistory(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.versions(id));
  return response.data;
}

/**
 * Get specific version
 * @param {string} id - Layer ID
 * @param {string} versionId - Version ID
 * @returns {Promise<import('../types.js').ContextVersion>}
 */
export async function getVersion(id, versionId) {
  const response = await http.get(API_ROUTES.CONTEXTS.version(id, versionId));
  return response.data;
}

/**
 * Revert to a specific version
 * @param {string} id - Layer ID
 * @param {string} versionId - Version ID
 * @returns {Promise<Object>}
 */
export async function revertToVersion(id, versionId) {
  const response = await http.post(API_ROUTES.CONTEXTS.revert(id, versionId));
  return response.data;
}

/**
 * Compare versions
 * @param {string} id - Layer ID
 * @param {Object} params - Comparison params
 * @param {string} params.from - From version ID
 * @param {string} params.to - To version ID
 * @returns {Promise<Object>}
 */
export async function compareVersions(id, params) {
  const response = await http.get(API_ROUTES.CONTEXTS.diff(id), params);
  return response.data;
}

/**
 * Create a branch
 * @param {string} id - Layer ID
 * @param {Object} data - Branch data
 * @param {string} data.name - Branch name
 * @returns {Promise<Object>}
 */
export async function createBranch(id, data) {
  const response = await http.post(API_ROUTES.CONTEXTS.branch(id), data);
  return response.data;
}

/**
 * Get branches
 * @param {string} id - Layer ID
 * @returns {Promise<Object[]>}
 */
export async function getBranches(id) {
  const response = await http.get(API_ROUTES.CONTEXTS.branches(id));
  return response.data;
}

// ============================================================================
// Semantic Search & Recommendations
// ============================================================================

/**
 * Semantic search for contexts
 * @param {Object} data - Search data
 * @param {string} data.query - Search query
 * @param {number} [data.limit] - Results limit
 * @returns {Promise<Object>}
 */
export async function semanticSearch(data) {
  const response = await http.post(API_ROUTES.CONTEXTS.SEARCH, data);
  return response.data;
}

/**
 * Get context recommendations
 * @param {Object} data - Recommendation criteria
 * @param {string} [data.context] - Current context
 * @param {string[]} [data.layerIds] - Layer IDs to base recommendations on
 * @returns {Promise<Object>}
 */
export async function getRecommendations(data) {
  const response = await http.post(API_ROUTES.CONTEXTS.RECOMMEND, data);
  return response.data;
}

/**
 * Find similar contexts
 * @param {string} id - Layer ID
 * @param {Object} [params] - Filter params
 * @returns {Promise<Object>}
 */
export async function findSimilar(id, params = {}) {
  const response = await http.get(API_ROUTES.CONTEXTS.similar(id), params);
  return response.data;
}

/**
 * Get effectiveness metrics
 * @param {Object} [params] - Filter params
 * @returns {Promise<Object>}
 */
export async function getEffectivenessMetrics(params = {}) {
  const response = await http.get(API_ROUTES.CONTEXTS.EFFECTIVENESS, params);
  return response.data;
}

/**
 * Track context usage
 * @param {Object} data - Usage data
 * @returns {Promise<Object>}
 */
export async function trackUsage(data) {
  const response = await http.post(API_ROUTES.CONTEXTS.TRACK_USAGE, data);
  return response.data;
}

/**
 * Get context associations
 * @param {Object} [params] - Filter params
 * @returns {Promise<Object>}
 */
export async function getAssociations(params = {}) {
  const response = await http.get(API_ROUTES.CONTEXTS.ASSOCIATIONS, params);
  return response.data;
}

/**
 * Generate embedding for a layer
 * @param {string} id - Layer ID
 * @returns {Promise<Object>}
 */
export async function generateEmbedding(id) {
  const response = await http.post(API_ROUTES.CONTEXTS.generateEmbedding(id));
  return response.data;
}

export default {
  // Basic operations
  getLayers,
  getLayer,
  createLayer,
  updateLayer,
  deleteLayer,

  // Composition
  getCompositionTree,
  addChild,
  removeChild,
  reorderChildren,
  getDescendants,

  // Relationships
  getRelationships,
  createRelationship,
  deleteRelationship,
  resolveDependencies,
  checkConflicts,
  getDependencyOrder,

  // Version control
  getVersionHistory,
  getVersion,
  revertToVersion,
  compareVersions,
  createBranch,
  getBranches,

  // Search & recommendations
  semanticSearch,
  getRecommendations,
  findSimilar,
  getEffectivenessMetrics,
  trackUsage,
  getAssociations,
  generateEmbedding,
};

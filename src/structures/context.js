/**
 * Context Layer Structure
 *
 * Context layers are modular pieces of background information that can be
 * combined with prompts to provide relevant context to LLMs.
 */

import { LAYER_TYPES, MAX_COMBINED_CONTEXT_TOKENS, DEFAULT_CONTEXT_PRIORITY } from '../constants/limits.js';

/**
 * Context Layer Object Structure (matches database schema)
 */
export const CONTEXT_FIELDS = {
  // Core Identity
  id: { type: 'uuid', required: true },
  user_id: { type: 'uuid', required: true },

  // Basic Information
  name: { type: 'string', required: true, minLength: 2, maxLength: 100 },
  description: { type: 'string', required: false, maxLength: 500, default: '' },
  content: { type: 'string', required: true, minLength: 1, maxLength: 100000 },

  // Type & Organization
  layer_type: { type: 'string', required: true },  // profile, project, task, snippet, session, adhoc
  tags: { type: 'array', required: false, default: [] },

  // Context Management
  token_count: { type: 'number', required: false, default: 0 },  // Estimated tokens
  priority: { type: 'number', required: false, default: 5, min: 1, max: 10 },
  auto_include: { type: 'boolean', required: false, default: false },

  // Sharing
  visibility: { type: 'string', required: false, default: 'private' },  // private | shared | public
  is_template: { type: 'boolean', required: false, default: false },

  // Session Management (for session type contexts)
  session_id: { type: 'string', required: false },
  expires_at: { type: 'timestamp', required: false },

  // Analytics
  usage_count: { type: 'number', required: false, default: 0 },
  avg_rating: { type: 'number', required: false, default: 0 },
  favorite_count: { type: 'number', required: false, default: 0 },

  // Sync (for extension<->cloud sync)
  device_last_modified: { type: 'string', required: false },
  last_synced_at: { type: 'timestamp', required: false },
  sync_status: { type: 'string', required: false, default: 'synced' },  // synced | pending | conflict

  // Metadata (extensible JSON field)
  metadata: { type: 'object', required: false, default: {} },

  // Timestamps
  created_at: { type: 'timestamp', required: true },
  updated_at: { type: 'timestamp', required: true },
  deleted_at: { type: 'timestamp', required: false }
};

/**
 * Create a new context layer
 */
export function createContext(data) {
  const now = new Date().toISOString();
  const layerInfo = LAYER_TYPES[data.layer_type] || LAYER_TYPES.adhoc;

  return {
    id: data.id || generateUUID(),
    user_id: data.user_id,

    name: data.name,
    description: data.description || '',
    content: data.content,

    layer_type: data.layer_type,
    tags: Array.isArray(data.tags) ? data.tags : [],

    token_count: data.token_count || estimateTokens(data.content),
    priority: data.priority !== undefined ? data.priority : DEFAULT_CONTEXT_PRIORITY,
    auto_include: data.auto_include !== undefined ? data.auto_include : (layerInfo.auto_include || false),

    visibility: data.visibility || 'private',
    is_template: data.is_template || false,

    session_id: data.session_id || null,
    expires_at: data.expires_at || (data.layer_type === 'session' ? getSessionExpiry() : null),

    usage_count: data.usage_count || 0,
    avg_rating: data.avg_rating || 0,
    favorite_count: data.favorite_count || 0,

    device_last_modified: data.device_last_modified || null,
    last_synced_at: data.last_synced_at || null,
    sync_status: data.sync_status || 'synced',

    metadata: data.metadata || {},

    created_at: data.created_at || now,
    updated_at: data.updated_at || now,
    deleted_at: data.deleted_at || null
  };
}

/**
 * Estimate token count for content
 * Rough approximation: 1 token ≈ 4 characters
 */
export function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

/**
 * Get session expiry time (24 hours from now)
 */
function getSessionExpiry() {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 24);
  return expiry.toISOString();
}

/**
 * Combine multiple context layers into a single context string
 *
 * This is the core function for context management - it takes multiple
 * context layers and intelligently combines them based on priority,
 * token limits, and other constraints.
 *
 * @param {Array} layers - Array of context layer objects
 * @param {Object} options - Combination options
 * @returns {String} Combined context string
 */
export function combineContexts(layers, options = {}) {
  const {
    maxTokens = MAX_COMBINED_CONTEXT_TOKENS,  // Maximum tokens to include
    priorityOrder = true,                      // Respect priority field
    includeHeaders = true,                     // Add headers for each layer
    separator = '\n\n---\n\n',                // Separator between layers
    autoIncludeOnly = false                    // Only include auto_include layers
  } = options;

  // Filter out deleted and expired layers
  let filteredLayers = layers.filter(layer => {
    if (layer.deleted_at) return false;
    if (!layer.content) return false;

    // Check if session layer is expired
    if (layer.layer_type === 'session' && layer.expires_at) {
      const expiryDate = new Date(layer.expires_at);
      if (expiryDate < new Date()) return false;
    }

    // If autoIncludeOnly mode, filter out non-auto layers
    if (autoIncludeOnly && !layer.auto_include) return false;

    return true;
  });

  // Sort by priority (higher priority first)
  if (priorityOrder) {
    filteredLayers.sort((a, b) => {
      const priorityA = a.priority || DEFAULT_CONTEXT_PRIORITY;
      const priorityB = b.priority || DEFAULT_CONTEXT_PRIORITY;
      return priorityB - priorityA;
    });
  }

  // Combine layers until token limit
  const parts = [];
  let totalTokens = 0;

  for (const layer of filteredLayers) {
    const layerTokens = layer.token_count || estimateTokens(layer.content);

    // Check if adding this layer would exceed limit
    if (totalTokens + layerTokens > maxTokens) {
      console.warn(`Skipping context layer "${layer.name}" - would exceed token limit`);
      continue;
    }

    let layerText = '';

    // Add header with layer metadata
    if (includeHeaders) {
      const layerInfo = LAYER_TYPES[layer.layer_type];
      layerText += `# ${layerInfo?.icon || ''} ${layer.name}\n`;
      if (layer.description) {
        layerText += `${layer.description}\n`;
      }
      layerText += '\n';
    }

    layerText += layer.content;

    parts.push(layerText);
    totalTokens += layerTokens;
  }

  return parts.join(separator);
}

/**
 * Validate context layer
 */
export function validateContext(context) {
  const errors = [];

  // Name validation
  if (!context.name) {
    errors.push('Context name is required');
  } else if (context.name.length < 2) {
    errors.push('Context name must be at least 2 characters');
  } else if (context.name.length > 100) {
    errors.push('Context name cannot exceed 100 characters');
  }

  // Content validation
  if (!context.content) {
    errors.push('Context content is required');
  } else if (context.content.length < 1) {
    errors.push('Context content cannot be empty');
  } else if (context.content.length > 100000) {
    errors.push('Context content cannot exceed 100,000 characters');
  }

  // Layer type validation
  const validTypes = Object.keys(LAYER_TYPES);
  if (!context.layer_type) {
    errors.push('Context must have a layer_type');
  } else if (!validTypes.includes(context.layer_type)) {
    errors.push(`Invalid layer_type. Must be one of: ${validTypes.join(', ')}`);
  }

  // Priority validation (1-10 scale)
  if (context.priority !== undefined) {
    if (context.priority < 1 || context.priority > 10) {
      errors.push('Priority must be between 1 and 10');
    }
  }

  // Visibility validation
  const validVisibility = ['private', 'shared', 'public'];
  if (context.visibility && !validVisibility.includes(context.visibility)) {
    errors.push(`Invalid visibility. Must be one of: ${validVisibility.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if context layer is expired (for session layers)
 */
export function isContextExpired(context) {
  if (!context.expires_at) return false;

  const expiryDate = new Date(context.expires_at);
  return expiryDate < new Date();
}

/**
 * Get context layers that should auto-include
 */
export function getAutoIncludeLayers(layers) {
  return layers.filter(layer =>
    layer.auto_include &&
    !layer.deleted_at &&
    !isContextExpired(layer)
  );
}

/**
 * Get combined token count for multiple layers
 */
export function getTotalTokenCount(layers) {
  return layers.reduce((total, layer) => {
    return total + (layer.token_count || estimateTokens(layer.content));
  }, 0);
}

/**
 * Check if layers would exceed token limit
 */
export function wouldExceedTokenLimit(layers, maxTokens = MAX_COMBINED_CONTEXT_TOKENS) {
  return getTotalTokenCount(layers) > maxTokens;
}

/**
 * Simple UUID generator (browser compatible)
 */
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================================================
// ADVANCED CONTEXT FEATURES (Post-Migration 008-013)
// ============================================================================

/**
 * Assemble a hierarchical context tree recursively
 *
 * @param {Object} rootContext - Root context object
 * @param {Array} allContexts - All available contexts
 * @param {Array} compositionRelationships - parent-child relationships from context_composition table
 * @param {Object} options - Assembly options
 * @returns {String} Assembled hierarchical context
 */
export function assembleHierarchicalContext(rootContext, allContexts, compositionRelationships, options = {}) {
  const {
    maxDepth = 5,
    currentDepth = 0,
    visited = new Set(),
    maxTokens = MAX_COMBINED_CONTEXT_TOKENS,
    includeOptional = true,
    separator = '\n\n'
  } = options;

  // Prevent cycles and excessive depth
  if (visited.has(rootContext.id) || currentDepth >= maxDepth) {
    return rootContext.content;
  }

  visited.add(rootContext.id);

  // Get child relationships for this context
  const childRelationships = compositionRelationships
    .filter(rel => rel.parent_id === rootContext.id)
    .sort((a, b) => a.composition_order - b.composition_order);

  // Start with root content
  let assembled = rootContext.content;
  let totalTokens = rootContext.token_count || estimateTokens(rootContext.content);

  // Recursively add children
  for (const relationship of childRelationships) {
    // Skip optional children if requested
    if (!includeOptional && !relationship.is_required) {
      continue;
    }

    const childContext = allContexts.find(c => c.id === relationship.child_id);
    if (!childContext || childContext.deleted_at) continue;

    // Recursively assemble child
    const childContent = assembleHierarchicalContext(
      childContext,
      allContexts,
      compositionRelationships,
      { ...options, currentDepth: currentDepth + 1, visited: new Set(visited) }
    );

    const childTokens = estimateTokens(childContent);

    // Token budget check
    if (totalTokens + childTokens > maxTokens) {
      if (relationship.is_required) {
        console.warn(`Required child context "${childContext.name}" exceeds token budget`);
      }
      continue;
    }

    // Add child with appropriate formatting
    assembled += `${separator}### ${childContext.name}${separator}${childContent}`;
    totalTokens += childTokens;
  }

  return assembled;
}

/**
 * Resolve dependencies for a set of contexts
 *
 * @param {Array} contextIds - Initial context IDs
 * @param {Array} allContexts - All available contexts
 * @param {Array} relationships - All context_relationships records
 * @param {Object} options - Resolution options
 * @returns {Object} { resolved: Array, conflicts: Array, order: Array }
 */
export function resolveContextDependencies(contextIds, allContexts, relationships, options = {}) {
  const {
    maxDepth = 5,
    includeRecommendations = false,
    minRecommendationStrength = 0.7
  } = options;

  const resolved = new Set(contextIds);
  const conflicts = [];
  let currentLevel = [...contextIds];
  let depth = 0;

  while (depth < maxDepth && currentLevel.length > 0) {
    const nextLevel = new Set();

    for (const contextId of currentLevel) {
      // Check for conflicts with already-resolved contexts
      const conflictRels = relationships.filter(
        rel => rel.source_id === contextId &&
               rel.relationship_type === 'conflicts' &&
               resolved.has(rel.target_id)
      );

      if (conflictRels.length > 0) {
        const context = allContexts.find(c => c.id === contextId);
        conflicts.push({
          context_id: contextId,
          context_name: context?.name,
          conflicts_with: conflictRels.map(r => {
            const target = allContexts.find(c => c.id === r.target_id);
            return { id: r.target_id, name: target?.name };
          })
        });
        continue;
      }

      // Add required dependencies
      const requirements = relationships.filter(
        rel => rel.source_id === contextId &&
               (rel.relationship_type === 'requires' || rel.relationship_type === 'extends')
      );

      for (const req of requirements) {
        if (!resolved.has(req.target_id)) {
          resolved.add(req.target_id);
          nextLevel.add(req.target_id);
        }
      }

      // Optionally add recommendations
      if (includeRecommendations) {
        const recommendations = relationships.filter(
          rel => rel.source_id === contextId &&
                 rel.relationship_type === 'recommends' &&
                 rel.strength >= minRecommendationStrength
        );

        for (const rec of recommendations) {
          if (!resolved.has(rec.target_id)) {
            resolved.add(rec.target_id);
            nextLevel.add(rec.target_id);
          }
        }
      }
    }

    currentLevel = Array.from(nextLevel);
    depth++;
  }

  // Topological sort for dependency order
  const order = topologicalSort(Array.from(resolved), relationships);

  return {
    resolved: Array.from(resolved),
    conflicts,
    order
  };
}

/**
 * Topological sort for dependency ordering
 */
function topologicalSort(contextIds, relationships) {
  const graph = new Map();
  const inDegree = new Map();

  // Initialize graph
  for (const id of contextIds) {
    graph.set(id, []);
    inDegree.set(id, 0);
  }

  // Build adjacency list and in-degree count
  for (const rel of relationships) {
    if (rel.relationship_type === 'requires' || rel.relationship_type === 'extends') {
      if (graph.has(rel.source_id) && graph.has(rel.target_id)) {
        graph.get(rel.target_id).push(rel.source_id);
        inDegree.set(rel.source_id, inDegree.get(rel.source_id) + 1);
      }
    }
  }

  // Kahn's algorithm
  const queue = contextIds.filter(id => inDegree.get(id) === 0);
  const sorted = [];

  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const dependent of graph.get(current)) {
      inDegree.set(dependent, inDegree.get(dependent) - 1);
      if (inDegree.get(dependent) === 0) {
        queue.push(dependent);
      }
    }
  }

  // If not all nodes are sorted, there's a cycle
  if (sorted.length !== contextIds.length) {
    console.warn('Circular dependency detected in context relationships');
    return contextIds; // Return original order
  }

  return sorted;
}

/**
 * Calculate context relevance score with embedding similarity
 *
 * @param {Object} context - Context object
 * @param {Array} promptEmbedding - Prompt embedding vector (1536 dimensions)
 * @param {Object} effectiveness - Historical effectiveness data
 * @returns {Number} Score from 0-1
 */
export function calculateContextScore(context, promptEmbedding = null, effectiveness = null) {
  let score = 0;

  // Base priority score (20%)
  score += (context.priority / 10) * 0.2;

  // Embedding similarity score (40%) - requires backend calculation
  if (promptEmbedding && context.embedding) {
    const similarity = cosineSimilarity(context.embedding, promptEmbedding);
    score += similarity * 0.4;
  } else {
    // Fallback: use priority as proxy
    score += (context.priority / 10) * 0.2;
  }

  // Historical effectiveness (30%)
  if (effectiveness) {
    const effectivenessScore = (effectiveness.avg_rating / 5) * 0.5 +
                                (effectiveness.success_rate || 0.5) * 0.5;
    score += effectivenessScore * 0.3;
  } else {
    score += 0.15; // Default middle effectiveness
  }

  // Usage frequency (10%)
  if (context.usage_count) {
    const usageScore = Math.min(context.usage_count / 100, 1);
    score += usageScore * 0.1;
  }

  // Auto-include bonus
  if (context.auto_include) {
    score += 0.1;
  }

  // Freshness penalty (contexts not used recently)
  if (context.last_used_at) {
    const daysSinceUse = (Date.now() - new Date(context.last_used_at)) / (1000 * 60 * 60 * 24);
    if (daysSinceUse > 90) {
      score *= 0.7; // 30% penalty for stale contexts
    }
  }

  return Math.min(Math.max(score, 0), 1);
}

/**
 * Cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  if (normA === 0 || normB === 0) return 0;

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Optimize context selection using dynamic programming (knapsack variant)
 *
 * @param {Array} contexts - Available contexts with scores
 * @param {Number} maxTokens - Token budget
 * @returns {Object} { selected: Array, totalScore: Number, totalTokens: Number }
 */
export function optimizeContextSelection(contexts, maxTokens = MAX_COMBINED_CONTEXT_TOKENS) {
  // Score each context first
  const scored = contexts.map(ctx => ({
    ...ctx,
    score: ctx.score || calculateContextScore(ctx),
    tokens: ctx.token_count || estimateTokens(ctx.content)
  }));

  // Filter out contexts that are too large on their own
  const viable = scored.filter(ctx => ctx.tokens <= maxTokens);

  // Sort by score-to-token ratio for greedy heuristic
  viable.sort((a, b) => (b.score / b.tokens) - (a.score / a.tokens));

  // Dynamic programming table
  const n = viable.length;
  const dp = Array(n + 1).fill(null).map(() => Array(maxTokens + 1).fill(0));
  const selected = Array(n + 1).fill(null).map(() => Array(maxTokens + 1).fill(false));

  // Fill DP table
  for (let i = 1; i <= n; i++) {
    const ctx = viable[i - 1];
    for (let t = 0; t <= maxTokens; t++) {
      // Don't include this context
      dp[i][t] = dp[i - 1][t];

      // Include this context (if it fits)
      if (ctx.tokens <= t) {
        const scoreWithContext = dp[i - 1][t - ctx.tokens] + ctx.score;
        if (scoreWithContext > dp[i][t]) {
          dp[i][t] = scoreWithContext;
          selected[i][t] = true;
        }
      }
    }
  }

  // Backtrack to find selected contexts
  const result = [];
  let remainingTokens = maxTokens;

  for (let i = n; i > 0; i--) {
    if (selected[i][remainingTokens]) {
      result.push(viable[i - 1]);
      remainingTokens -= viable[i - 1].tokens;
    }
  }

  const totalTokens = result.reduce((sum, ctx) => sum + ctx.tokens, 0);
  const totalScore = dp[n][maxTokens];

  return {
    selected: result.reverse(),
    totalScore,
    totalTokens,
    unusedTokens: maxTokens - totalTokens
  };
}

/**
 * Format context with version information
 */
export function formatContextWithVersion(context, version = null) {
  if (!version) return context;

  return {
    ...context,
    _version: {
      version_number: version.version_number,
      created_at: version.created_at,
      commit_message: version.commit_message,
      is_current: version.version_number === context.current_version_number
    }
  };
}

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

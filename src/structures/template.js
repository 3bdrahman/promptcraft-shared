/**
 * Template Structure
 *
 * Defines the complete template object schema and helper functions.
 * This structure matches the database schema exactly.
 */

import { guessVariableType } from '../constants/variables.js';
import { TEMPLATE_CATEGORIES } from '../constants/categories.js';

/**
 * Template Object Structure (matches database schema)
 *
 * Fields marked with * are required by database constraints
 */
export const TEMPLATE_FIELDS = {
  // Core Identity
  id: { type: 'uuid', required: true },
  user_id: { type: 'uuid', required: true },

  // Basic Information
  name: { type: 'string', required: true, minLength: 3, maxLength: 100 },
  description: { type: 'string', required: false, maxLength: 500, default: '' },
  content: { type: 'string', required: true, minLength: 10, maxLength: 50000 },

  // Variables (JSONB array in database)
  variables: { type: 'array', required: false, default: [] },
  // Structure: [{ name, type, default, required, description, placeholder }]

  // Categorization
  category: { type: 'string', required: true },  // Must be valid category ID
  tags: { type: 'array', required: false, default: [] },  // Simple string array

  // Visibility
  is_public: { type: 'boolean', required: false, default: false },

  // Analytics (computed/managed by API, not user-editable)
  favorite_count: { type: 'number', required: false, default: 0 },
  usage_count: { type: 'number', required: false, default: 0 },

  // Timestamps (managed automatically)
  created_at: { type: 'timestamp', required: true },
  updated_at: { type: 'timestamp', required: true }
};

/**
 * Create a new template with proper defaults
 * @param {object} data - Template data
 * @returns {object} Complete template object
 */
export function createTemplate(data) {
  const now = new Date().toISOString();

  // Generate UUID if not provided (client-side, will be replaced by DB if needed)
  const id = data.id || generateUUID();

  return {
    id,
    user_id: data.user_id,

    // Basic info
    name: data.name,
    description: data.description || '',
    content: data.content,

    // Variables - auto-extract if not provided
    variables: data.variables || extractVariables(data.content),

    // Categorization
    category: data.category || 'general',
    tags: Array.isArray(data.tags) ? data.tags : [],

    // Visibility
    is_public: data.is_public !== undefined ? data.is_public : false,

    // Analytics (default to 0 for new templates)
    favorite_count: data.favorite_count || 0,
    usage_count: data.usage_count || 0,

    // Timestamps
    created_at: data.created_at || now,
    updated_at: data.updated_at || now
  };
}

/**
 * Extract variables from template content
 * Finds all {{variable}} patterns and returns structured variable objects
 *
 * @param {string} content - Template content with {{variables}}
 * @returns {array} Array of variable objects with guessed types
 */
export function extractVariables(content) {
  if (!content) return [];

  const pattern = /\{\{([^}]+)\}\}/g;
  const matches = content.matchAll(pattern);
  const variables = new Set();

  for (const match of matches) {
    const varName = match[1].trim();
    variables.add(varName);
  }

  // Return as structured objects with auto-guessed types
  return Array.from(variables).map(name => ({
    name,
    type: guessVariableType(name),
    default: null,
    required: true,
    description: '',
    placeholder: `Enter ${name}`
  }));
}

/**
 * Apply variable values to template content
 * Replaces {{variable}} placeholders with actual values
 *
 * @param {object} template - Template object with content and variables
 * @param {object} values - Object mapping variable names to values
 * @returns {string} Content with variables replaced
 */
export function applyVariables(template, values) {
  let result = template.content;

  if (!template.variables || template.variables.length === 0) {
    return result;
  }

  template.variables.forEach(variable => {
    const value = values[variable.name] || variable.default || '';
    const pattern = new RegExp(`\\{\\{\\s*${escapeRegExp(variable.name)}\\s*\\}\\}`, 'g');
    result = result.replace(pattern, value);
  });

  return result;
}

/**
 * Validate template object
 * @param {object} template - Template to validate
 * @returns {object} { valid: boolean, errors: string[] }
 */
export function validateTemplate(template) {
  const errors = [];

  // Name validation
  if (!template.name) {
    errors.push('Template name is required');
  } else if (template.name.length < 3) {
    errors.push('Template name must be at least 3 characters');
  } else if (template.name.length > 100) {
    errors.push('Template name cannot exceed 100 characters');
  }

  // Content validation
  if (!template.content) {
    errors.push('Template content is required');
  } else if (template.content.length < 10) {
    errors.push('Template content must be at least 10 characters');
  } else if (template.content.length > 50000) {
    errors.push('Template content cannot exceed 50,000 characters');
  }

  // Category validation
  if (!template.category) {
    errors.push('Template must have a category');
  } else if (!isValidCategoryId(template.category)) {
    errors.push(`Invalid category: ${template.category}`);
  }

  // Variable validation
  if (template.variables && Array.isArray(template.variables)) {
    template.variables.forEach((variable, index) => {
      if (!variable.name) {
        errors.push(`Variable at index ${index} is missing a name`);
      }
      if (variable.type && !isValidVariableType(variable.type)) {
        errors.push(`Variable "${variable.name}" has invalid type: ${variable.type}`);
      }
    });
  }

  // Tags validation (must be array)
  if (template.tags && !Array.isArray(template.tags)) {
    errors.push('Tags must be an array');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if category ID is valid
 */
function isValidCategoryId(categoryId) {
  for (const grandparent of TEMPLATE_CATEGORIES) {
    for (const parent of grandparent.children) {
      if (parent.children) {
        for (const category of parent.children) {
          if (category.id === categoryId) {
            return true;
          }
        }
      }
      // Parent itself can also be a category
      if (parent.id === categoryId) {
        return true;
      }
    }
    // Grandparent itself can also be a category
    if (grandparent.id === categoryId) {
      return true;
    }
  }
  return false;
}

/**
 * Check if variable type is valid
 */
function isValidVariableType(type) {
  const validTypes = [
    'technology', 'time', 'place', 'individualized',
    'role', 'format', 'domain', 'numeric', 'text', 'file'
  ];
  return validTypes.includes(type);
}

/**
 * Sanitize template for API response (remove sensitive fields if needed)
 * Currently just returns template as-is, but placeholder for future
 */
export function sanitizeTemplate(template) {
  return { ...template };
}

/**
 * Simple UUID generator (browser compatible)
 */
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Escape special regex characters
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Get list of all variables in a template
 * @param {object} template - Template object
 * @returns {array} Array of variable names
 */
export function getVariableNames(template) {
  if (!template.variables) return [];
  return template.variables.map(v => v.name);
}

/**
 * Check if template has required variables
 * @param {object} template - Template object
 * @returns {array} Array of required variable names
 */
export function getRequiredVariables(template) {
  if (!template.variables) return [];
  return template.variables
    .filter(v => v.required)
    .map(v => v.name);
}

/**
 * Validate variable values against template requirements
 * @param {object} template - Template object
 * @param {object} values - Variable values to validate
 * @returns {object} { valid: boolean, errors: string[], missing: string[] }
 */
export function validateVariableValues(template, values) {
  const errors = [];
  const missing = [];

  const requiredVars = getRequiredVariables(template);

  requiredVars.forEach(varName => {
    if (!values[varName] || values[varName].trim() === '') {
      missing.push(varName);
      errors.push(`Required variable "${varName}" is missing`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    missing
  };
}

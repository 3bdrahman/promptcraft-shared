/**
 * API Request/Response Validators
 * Validation functions for API data
 */

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(message, field, errors = []) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.errors = errors;
    this.isValidationError = true;
  }
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error) {
  return error && error.isValidationError === true;
}

// ============================================================================
// Generic Validators
// ============================================================================

/**
 * Validate required field
 */
export function required(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    throw new ValidationError(`${fieldName} is required`, fieldName);
  }
  return true;
}

/**
 * Validate email format
 */
export function isEmail(value, fieldName = 'email') {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new ValidationError(`Invalid email format`, fieldName);
  }
  return true;
}

/**
 * Validate UUID format
 */
export function isUUID(value, fieldName = 'id') {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(value)) {
    throw new ValidationError(`Invalid UUID format`, fieldName);
  }
  return true;
}

/**
 * Validate string length
 */
export function minLength(value, min, fieldName) {
  if (typeof value !== 'string' || value.length < min) {
    throw new ValidationError(`${fieldName} must be at least ${min} characters`, fieldName);
  }
  return true;
}

/**
 * Validate max string length
 */
export function maxLength(value, max, fieldName) {
  if (typeof value !== 'string' || value.length > max) {
    throw new ValidationError(`${fieldName} must be at most ${max} characters`, fieldName);
  }
  return true;
}

/**
 * Validate string length range
 */
export function lengthBetween(value, min, max, fieldName) {
  if (typeof value !== 'string' || value.length < min || value.length > max) {
    throw new ValidationError(`${fieldName} must be between ${min} and ${max} characters`, fieldName);
  }
  return true;
}

/**
 * Validate value is in enum
 */
export function isOneOf(value, options, fieldName) {
  if (!options.includes(value)) {
    throw new ValidationError(`${fieldName} must be one of: ${options.join(', ')}`, fieldName);
  }
  return true;
}

/**
 * Validate array
 */
export function isArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an array`, fieldName);
  }
  return true;
}

/**
 * Validate object
 */
export function isObject(value, fieldName) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new ValidationError(`${fieldName} must be an object`, fieldName);
  }
  return true;
}

/**
 * Validate number range
 */
export function numberBetween(value, min, max, fieldName) {
  if (typeof value !== 'number' || value < min || value > max) {
    throw new ValidationError(`${fieldName} must be between ${min} and ${max}`, fieldName);
  }
  return true;
}

// ============================================================================
// Auth Validators
// ============================================================================

/**
 * Validate signup data
 */
export function validateSignupData(data) {
  const errors = [];

  try {
    required(data.email, 'email');
    isEmail(data.email, 'email');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.username, 'username');
    lengthBetween(data.username, 3, 30, 'username');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.password, 'password');
    minLength(data.password, 8, 'password');
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'signup', errors);
  }

  return true;
}

/**
 * Validate login data
 */
export function validateLoginData(data) {
  const errors = [];

  try {
    required(data.email, 'email');
    isEmail(data.email, 'email');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.password, 'password');
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'login', errors);
  }

  return true;
}

// ============================================================================
// Template Validators
// ============================================================================

/**
 * Validate template data
 */
export function validateTemplateData(data) {
  const errors = [];

  try {
    required(data.name, 'name');
    lengthBetween(data.name, 3, 100, 'name');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.content, 'content');
    lengthBetween(data.content, 10, 50000, 'content');
  } catch (e) {
    errors.push(e.message);
  }

  // Optional fields validation
  if (data.description !== undefined && data.description !== null && data.description !== '') {
    try {
      maxLength(data.description, 500, 'description');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (data.tags !== undefined) {
    try {
      isArray(data.tags, 'tags');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (data.variables !== undefined) {
    try {
      isArray(data.variables, 'variables');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'template', errors);
  }

  return true;
}

// ============================================================================
// Context/Layer Validators
// ============================================================================

/**
 * Validate layer type
 */
export const LAYER_TYPES = ['profile', 'project', 'task', 'snippet', 'session', 'adhoc'];

/**
 * Validate visibility
 */
export const VISIBILITY_TYPES = ['private', 'shared', 'public'];

/**
 * Validate context layer data
 */
export function validateLayerData(data) {
  const errors = [];

  try {
    required(data.name, 'name');
    lengthBetween(data.name, 2, 100, 'name');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.content, 'content');
    lengthBetween(data.content, 1, 100000, 'content');
  } catch (e) {
    errors.push(e.message);
  }

  if (data.layer_type) {
    try {
      isOneOf(data.layer_type, LAYER_TYPES, 'layer_type');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (data.visibility) {
    try {
      isOneOf(data.visibility, VISIBILITY_TYPES, 'visibility');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (data.priority !== undefined) {
    try {
      numberBetween(data.priority, 1, 10, 'priority');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'layer', errors);
  }

  return true;
}

/**
 * Validate relationship type
 */
export const RELATIONSHIP_TYPES = ['requires', 'enhances', 'conflicts', 'replaces'];

/**
 * Validate context relationship data
 */
export function validateRelationshipData(data) {
  const errors = [];

  try {
    required(data.sourceLayerId, 'sourceLayerId');
    isUUID(data.sourceLayerId, 'sourceLayerId');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.targetLayerId, 'targetLayerId');
    isUUID(data.targetLayerId, 'targetLayerId');
  } catch (e) {
    errors.push(e.message);
  }

  try {
    required(data.relationshipType, 'relationshipType');
    isOneOf(data.relationshipType, RELATIONSHIP_TYPES, 'relationshipType');
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'relationship', errors);
  }

  return true;
}

// ============================================================================
// Team Validators
// ============================================================================

/**
 * Validate team roles
 */
export const TEAM_ROLES = ['owner', 'admin', 'member', 'viewer'];

/**
 * Validate team data
 */
export function validateTeamData(data) {
  const errors = [];

  try {
    required(data.name, 'name');
    lengthBetween(data.name, 3, 100, 'name');
  } catch (e) {
    errors.push(e.message);
  }

  if (data.description !== undefined && data.description !== null && data.description !== '') {
    try {
      maxLength(data.description, 500, 'description');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'team', errors);
  }

  return true;
}

/**
 * Validate team invitation data
 */
export function validateTeamInvitationData(data) {
  const errors = [];

  try {
    required(data.email, 'email');
    isEmail(data.email, 'email');
  } catch (e) {
    errors.push(e.message);
  }

  if (data.role) {
    try {
      isOneOf(data.role, TEAM_ROLES, 'role');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'invitation', errors);
  }

  return true;
}

// ============================================================================
// AI Validators
// ============================================================================

/**
 * Validate AI providers
 */
export const AI_PROVIDERS = ['openai', 'anthropic', 'google', 'huggingface'];

/**
 * Validate AI generation request
 */
export function validateAIGenerationRequest(data) {
  const errors = [];

  try {
    required(data.prompt, 'prompt');
    minLength(data.prompt, 1, 'prompt');
  } catch (e) {
    errors.push(e.message);
  }

  if (data.provider) {
    try {
      isOneOf(data.provider, AI_PROVIDERS, 'provider');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (data.temperature !== undefined) {
    try {
      numberBetween(data.temperature, 0, 2, 'temperature');
    } catch (e) {
      errors.push(e.message);
    }
  }

  if (errors.length > 0) {
    throw new ValidationError('Validation failed', 'ai_generation', errors);
  }

  return true;
}

// ============================================================================
// Export all validators
// ============================================================================

export default {
  // Error handling
  ValidationError,
  isValidationError,

  // Generic validators
  required,
  isEmail,
  isUUID,
  minLength,
  maxLength,
  lengthBetween,
  isOneOf,
  isArray,
  isObject,
  numberBetween,

  // Auth validators
  validateSignupData,
  validateLoginData,

  // Template validators
  validateTemplateData,

  // Context validators
  validateLayerData,
  validateRelationshipData,
  LAYER_TYPES,
  VISIBILITY_TYPES,
  RELATIONSHIP_TYPES,

  // Team validators
  validateTeamData,
  validateTeamInvitationData,
  TEAM_ROLES,

  // AI validators
  validateAIGenerationRequest,
  AI_PROVIDERS,
};

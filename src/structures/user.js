/**
 * User Structure
 *
 * Defines user object structure matching the database schema.
 * Includes functions for creating safe user objects (without sensitive data).
 */

/**
 * User Object Structure (matches database schema)
 */
export const USER_FIELDS = {
  // Core Identity
  id: { type: 'uuid', required: true },
  email: { type: 'string', required: true },
  username: { type: 'string', required: true },

  // Authentication (NEVER send password_hash to frontend!)
  password_hash: { type: 'string', required: true, sensitive: true },
  email_verified: { type: 'boolean', required: false, default: false },
  email_verified_at: { type: 'timestamp', required: false },

  // Security
  failed_login_attempts: { type: 'number', required: false, default: 0, sensitive: true },
  locked_until: { type: 'timestamp', required: false, sensitive: true },

  // Subscription
  current_tier: { type: 'string', required: false, default: 'free' },
  subscription_status: { type: 'string', required: false, default: 'active' },
  subscription_expires_at: { type: 'timestamp', required: false },

  // Profile
  display_name: { type: 'string', required: false },
  role: { type: 'string', required: false },
  avatar_url: { type: 'string', required: false },

  // Timestamps
  last_login_at: { type: 'timestamp', required: false },
  created_at: { type: 'timestamp', required: true },
  updated_at: { type: 'timestamp', required: true },
  deleted_at: { type: 'timestamp', required: false }
};

/**
 * Create a user object with all fields
 * (Internal use only - includes sensitive fields)
 */
export function createUser(data) {
  const now = new Date().toISOString();

  return {
    id: data.id || generateUUID(),
    email: data.email,
    username: data.username,

    password_hash: data.password_hash,
    email_verified: data.email_verified || false,
    email_verified_at: data.email_verified_at || null,

    failed_login_attempts: data.failed_login_attempts || 0,
    locked_until: data.locked_until || null,

    current_tier: data.current_tier || 'free',
    subscription_status: data.subscription_status || 'active',
    subscription_expires_at: data.subscription_expires_at || null,

    display_name: data.display_name || data.username,
    role: data.role || null,
    avatar_url: data.avatar_url || null,

    last_login_at: data.last_login_at || null,
    created_at: data.created_at || now,
    updated_at: data.updated_at || now,
    deleted_at: data.deleted_at || null
  };
}

/**
 * Create a safe user object for frontend
 * Removes password and security-sensitive fields
 *
 * @param {object} user - Full user object from database
 * @returns {object} Safe user object without sensitive data
 */
export function sanitizeUser(user) {
  if (!user) return null;

  const {
    password_hash,
    failed_login_attempts,
    locked_until,
    ...safeUser
  } = user;

  return safeUser;
}

/**
 * Validate user object
 */
export function validateUser(user) {
  const errors = [];

  // Email validation
  if (!user.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(user.email)) {
    errors.push('Invalid email format');
  }

  // Username validation
  if (!user.username) {
    errors.push('Username is required');
  } else if (user.username.length < 3) {
    errors.push('Username must be at least 3 characters');
  } else if (user.username.length > 50) {
    errors.push('Username cannot exceed 50 characters');
  } else if (!/^[a-zA-Z0-9_-]+$/.test(user.username)) {
    errors.push('Username can only contain letters, numbers, hyphens, and underscores');
  }

  // Tier validation
  const validTiers = ['free', 'pro', 'unlimited'];
  if (user.current_tier && !validTiers.includes(user.current_tier)) {
    errors.push(`Invalid tier. Must be one of: ${validTiers.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Check if user account is locked
 */
export function isUserLocked(user) {
  if (!user.locked_until) return false;

  const lockExpiry = new Date(user.locked_until);
  return lockExpiry > new Date();
}

/**
 * Check if user's subscription is active
 */
export function hasActiveSubscription(user) {
  if (user.subscription_status !== 'active') return false;

  // Free tier is always active
  if (user.current_tier === 'free') return true;

  // Check expiry for paid tiers
  if (!user.subscription_expires_at) return true;  // No expiry set

  const expiryDate = new Date(user.subscription_expires_at);
  return expiryDate > new Date();
}

/**
 * Get user's display name (fallback to username)
 */
export function getUserDisplayName(user) {
  return user.display_name || user.username || 'User';
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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

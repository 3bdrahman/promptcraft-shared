/**
 * Subscription Tier Limits
 *
 * Defines what users can do based on their subscription tier.
 * Used for enforcement in API and UI display in web app/extension.
 */

export const SUBSCRIPTION_TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    displayName: 'Community',
    price: 0,
    limits: {
      templates: 10,                    // Max number of templates user can create
      contexts: 5,                      // Max number of context layers
      monthly_tokens: 50000,            // Tokens per month (~80 analyses)
      api_calls_per_day: 20,            // Daily API call limit
      custom_template_limit: 5          // Max custom templates
    },
    features: {
      public_templates: true,
      custom_templates: true,
      local_ollama: true,
      cloud_llm: true,
      basic_analysis: true,
      advanced_analysis: false,
      template_sharing: false,
      api_access: false,
      priority_support: false
    }
  },

  pro: {
    id: 'pro',
    name: 'Pro',
    displayName: 'Professional',
    price: 6.00,
    price_annual: 50.00,                // $4.17/month (30% discount)
    limits: {
      templates: null,                   // unlimited
      contexts: null,                    // unlimited
      monthly_tokens: 750000,            // 750K tokens/month (~1,250 analyses)
      api_calls_per_day: 1000,
      custom_template_limit: 50
    },
    features: {
      public_templates: true,
      custom_templates: true,
      private_templates: true,
      local_ollama: true,
      cloud_llm: true,
      basic_analysis: true,
      advanced_analysis: true,
      conversation_aware: true,
      prompt_comparison: true,
      export_reports: true,
      template_sharing: false,
      api_access: false,
      priority_support: false,
      early_access: true
    }
  },

  unlimited: {
    id: 'unlimited',
    name: 'Unlimited',
    displayName: 'Power User',
    price: 12.00,
    price_annual: 100.00,               // $8.33/month (30% discount)
    limits: {
      templates: null,                   // unlimited
      contexts: null,                    // unlimited
      monthly_tokens: 3000000,           // 3M tokens/month (~5,000 analyses)
      api_calls_per_day: null,           // unlimited
      custom_template_limit: null        // unlimited
    },
    features: {
      public_templates: true,
      custom_templates: true,
      private_templates: true,
      local_ollama: true,
      cloud_llm: true,
      basic_analysis: true,
      advanced_analysis: true,
      conversation_aware: true,
      prompt_comparison: true,
      export_reports: true,
      template_sharing: true,
      template_versioning: true,
      api_access: true,
      priority_support: true,
      early_access: true,
      usage_analytics: true
    }
  }
};

/**
 * Get tier limits for a user
 * @param {string} tierId - 'free', 'pro', or 'unlimited'
 * @returns {object} Limits object
 */
export function getTierLimits(tierId) {
  return SUBSCRIPTION_TIERS[tierId]?.limits || SUBSCRIPTION_TIERS.free.limits;
}

/**
 * Check if user can perform an action based on their tier
 * @param {string} tierId - User's subscription tier
 * @param {string} feature - Feature name (e.g., 'api_access')
 * @returns {boolean} Whether user has access to feature
 */
export function canUserAccessFeature(tierId, feature) {
  const tier = SUBSCRIPTION_TIERS[tierId] || SUBSCRIPTION_TIERS.free;
  return tier.features[feature] === true;
}

/**
 * Check if user has reached their limit for a resource
 * @param {string} tierId - User's subscription tier
 * @param {string} resource - Resource name (e.g., 'templates', 'contexts')
 * @param {number} currentCount - Current usage count
 * @returns {object} { allowed: boolean, limit: number|null, message: string }
 */
export function checkResourceLimit(tierId, resource, currentCount) {
  const limits = getTierLimits(tierId);
  const limit = limits[resource];

  // null means unlimited
  if (limit === null) {
    return {
      allowed: true,
      limit: null,
      remaining: null,
      message: 'Unlimited'
    };
  }

  const allowed = currentCount < limit;
  const remaining = Math.max(0, limit - currentCount);

  return {
    allowed,
    limit,
    remaining,
    current: currentCount,
    message: allowed
      ? `${remaining} remaining of ${limit}`
      : `Limit reached (${limit}). Upgrade your plan for more.`
  };
}

/**
 * Get tier display info
 */
export function getTierInfo(tierId) {
  const tier = SUBSCRIPTION_TIERS[tierId] || SUBSCRIPTION_TIERS.free;
  return {
    id: tier.id,
    name: tier.name,
    displayName: tier.displayName,
    price: tier.price,
    priceAnnual: tier.price_annual
  };
}

/**
 * Context Layer Types
 * These determine how context layers behave
 */
export const LAYER_TYPES = {
  profile: {
    name: 'User Profile',
    description: 'Your personal background, role, preferences',
    icon: '👤',
    persistent: true,
    auto_include: true,           // Typically always included
    example: 'I am a senior Python developer with 8 years of experience...'
  },

  project: {
    name: 'Project Context',
    description: 'Current project details, tech stack, goals',
    icon: '📁',
    persistent: true,
    auto_include: false,
    example: 'Working on a REST API using FastAPI and PostgreSQL...'
  },

  task: {
    name: 'Task Context',
    description: 'Specific task or problem you are working on',
    icon: '✅',
    persistent: true,
    auto_include: false,
    example: 'Debugging authentication middleware that fails on expired tokens...'
  },

  snippet: {
    name: 'Code/Text Snippet',
    description: 'Reusable snippets, examples, reference material',
    icon: '📋',
    persistent: true,
    auto_include: false,
    example: 'Error handling pattern: try { ... } catch (error) { ... }'
  },

  session: {
    name: 'Current Session',
    description: 'Temporary context for this conversation/session',
    icon: '💬',
    persistent: false,
    auto_include: true,            // Active for current session only
    expires: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
    example: 'In this session, we are refactoring the auth module...'
  },

  adhoc: {
    name: 'Ad-hoc Context',
    description: 'One-time context for specific situations',
    icon: '⚡',
    persistent: false,
    auto_include: false,
    example: 'Customer reported bug in production affecting checkout flow...'
  }
};

/**
 * Visibility options for templates and contexts
 */
export const VISIBILITY_OPTIONS = ['private', 'shared', 'public'];

/**
 * Default priority for context layers (1-10 scale)
 */
export const DEFAULT_CONTEXT_PRIORITY = 5;

/**
 * Maximum tokens for combined context
 * Ensures we don't exceed LLM context windows
 */
export const MAX_COMBINED_CONTEXT_TOKENS = 8000;

/**
 * API Response Type Definitions
 * JSDoc type definitions for all API responses
 */

/**
 * @typedef {Object} ApiSuccessResponse
 * @property {true} success - Indicates successful response
 * @property {string} [message] - Success message
 * @property {*} [data] - Response data
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} ApiErrorResponse
 * @property {false} success - Indicates error response
 * @property {string} error - Error message
 * @property {number} code - HTTP status code
 * @property {*} [details] - Additional error details
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {Object} PaginationInfo
 * @property {number} page - Current page number
 * @property {number} limit - Items per page
 * @property {number} offset - Offset from start
 * @property {number} total - Total number of items
 * @property {number} totalPages - Total number of pages
 * @property {boolean} hasMore - Whether there are more items
 * @property {boolean} hasNextPage - Whether there's a next page
 * @property {boolean} [hasNext] - Alternative naming
 * @property {boolean} [hasPrev] - Whether there's a previous page
 */

/**
 * @typedef {Object} ApiPaginatedResponse
 * @property {true} success - Indicates successful response
 * @property {Array} results - Array of results
 * @property {PaginationInfo} pagination - Pagination information
 * @property {string} timestamp - ISO timestamp
 */

/**
 * @typedef {ApiSuccessResponse | ApiErrorResponse} ApiResponse
 */

// ============================================================================
// Authentication Types
// ============================================================================

/**
 * @typedef {Object} AuthTokens
 * @property {string} accessToken - JWT access token
 * @property {string} refreshToken - JWT refresh token
 * @property {number} expiresIn - Token expiration in seconds
 */

/**
 * @typedef {Object} User
 * @property {string} id - User UUID
 * @property {string} email - User email
 * @property {string} username - Username
 * @property {string} [display_name] - Display name
 * @property {boolean} email_verified - Email verification status
 * @property {string} [email_verified_at] - Verification timestamp
 * @property {string} current_tier - Subscription tier (free/pro/unlimited)
 * @property {string} [subscription_status] - Subscription status
 * @property {string} [subscription_expires_at] - Subscription expiry
 * @property {string} [role] - User role
 * @property {string} [avatar_url] - Avatar URL
 * @property {string} [last_login_at] - Last login timestamp
 * @property {string} created_at - Account creation timestamp
 * @property {string} updated_at - Last update timestamp
 */

/**
 * @typedef {Object} LoginResponse
 * @property {User} user - User object
 * @property {AuthTokens} tokens - Authentication tokens
 * @property {boolean} requiresVerification - Whether email verification is required
 */

/**
 * @typedef {Object} SignupResponse
 * @property {User} user - Created user object
 * @property {AuthTokens} tokens - Authentication tokens
 * @property {string} message - Success message
 */

// ============================================================================
// Template Types
// ============================================================================

/**
 * @typedef {Object} TemplateVariable
 * @property {string} name - Variable name
 * @property {string} type - Variable type (technology, time, place, etc.)
 * @property {string} [description] - Variable description
 * @property {*} [defaultValue] - Default value
 * @property {boolean} [required] - Whether required
 */

/**
 * @typedef {Object} Template
 * @property {string} id - Template UUID
 * @property {string} user_id - Creator user ID
 * @property {string} name - Template name
 * @property {string} description - Template description
 * @property {string} content - Template content
 * @property {TemplateVariable[]} variables - Template variables
 * @property {string} category - Category ID
 * @property {string} grandparent - Grandparent category ID
 * @property {string} parent - Parent category ID
 * @property {string[]} tags - Template tags
 * @property {boolean} is_public - Public visibility
 * @property {number} favorite_count - Number of favorites
 * @property {number} [usage_count] - Usage count
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Update timestamp
 * @property {string} [username] - Creator username
 * @property {Object} [userInteractions] - User interaction data
 * @property {boolean} [userInteractions.isFavorited] - Whether user favorited
 * @property {boolean} [userInteractions.isOwner] - Whether user owns
 * @property {Object} [engagement] - Engagement metrics
 * @property {number} [engagement.favorites] - Favorite count
 * @property {number} [engagement.downloads] - Download count
 * @property {Object} [engagement.ratings] - Rating data
 * @property {Object} [creator] - Creator info
 * @property {string} [creator.username] - Creator username
 * @property {string} [creator.displayName] - Creator display name
 * @property {string} [creator.avatar] - Creator avatar URL
 */

/**
 * @typedef {Object} TemplateListResponse
 * @property {Template[]} templates - Array of templates
 * @property {PaginationInfo} pagination - Pagination info
 */

/**
 * @typedef {Object} TemplateResponse
 * @property {Template} template - Template object
 * @property {true} success - Success flag
 */

/**
 * @typedef {Object} MyTemplatesResponse
 * @property {Template[]} templates - User's templates
 * @property {number} total - Total count
 * @property {number} public_count - Public template count
 * @property {number} private_count - Private template count
 */

// ============================================================================
// Context/Layer Types
// ============================================================================

/**
 * @typedef {Object} ContextLayer
 * @property {string} id - Layer UUID
 * @property {string} user_id - User ID
 * @property {string} name - Layer name
 * @property {string} description - Layer description
 * @property {string} content - Layer content
 * @property {string} layer_type - Type (profile, project, task, snippet, session, adhoc)
 * @property {number} token_count - Token count
 * @property {number} priority - Priority (1-10)
 * @property {boolean} auto_include - Auto-include flag
 * @property {string} visibility - Visibility (private, shared, public)
 * @property {boolean} is_template - Template flag
 * @property {string} [session_id] - Session ID for session layers
 * @property {string} [expires_at] - Expiration timestamp
 * @property {number} usage_count - Usage count
 * @property {number} [avg_rating] - Average rating
 * @property {number} [favorite_count] - Favorite count
 * @property {string} [device_last_modified] - Last modified device
 * @property {string} [last_synced_at] - Last sync timestamp
 * @property {string} [sync_status] - Sync status
 * @property {Object} [metadata] - Additional metadata
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Update timestamp
 * @property {string} [deleted_at] - Deletion timestamp
 */

/**
 * @typedef {Object} ContextRelationship
 * @property {string} id - Relationship UUID
 * @property {string} source_layer_id - Source layer ID
 * @property {string} target_layer_id - Target layer ID
 * @property {string} relationship_type - Type (requires, enhances, conflicts, replaces)
 * @property {Object} [metadata] - Additional metadata
 * @property {string} created_at - Creation timestamp
 */

/**
 * @typedef {Object} ContextVersion
 * @property {string} id - Version UUID
 * @property {string} layer_id - Layer ID
 * @property {number} version_number - Version number
 * @property {string} content - Version content
 * @property {string} change_summary - Change description
 * @property {string} created_by - Creator user ID
 * @property {string} created_at - Creation timestamp
 */

// ============================================================================
// Team Types
// ============================================================================

/**
 * @typedef {Object} Team
 * @property {string} id - Team UUID
 * @property {string} name - Team name
 * @property {string} slug - Team slug
 * @property {string} [description] - Team description
 * @property {string} created_by - Creator user ID
 * @property {string} owner_id - Owner user ID
 * @property {number} [member_count] - Member count
 * @property {string} [role] - Current user's role
 * @property {string} created_at - Creation timestamp
 * @property {string} updated_at - Update timestamp
 * @property {string} [deleted_at] - Deletion timestamp
 */

/**
 * @typedef {Object} TeamMember
 * @property {string} id - Member UUID
 * @property {string} team_id - Team ID
 * @property {string} user_id - User ID
 * @property {string} role - Role (owner, admin, member, viewer)
 * @property {string} joined_at - Join timestamp
 * @property {Object} [user] - User details
 */

/**
 * @typedef {Object} TeamInvitation
 * @property {string} id - Invitation UUID
 * @property {string} team_id - Team ID
 * @property {string} email - Invitee email
 * @property {string} role - Invited role
 * @property {string} token - Invitation token
 * @property {string} status - Status (pending, accepted, rejected, cancelled)
 * @property {string} invited_by - Inviter user ID
 * @property {string} [accepted_at] - Acceptance timestamp
 * @property {string} expires_at - Expiration timestamp
 * @property {string} created_at - Creation timestamp
 */

/**
 * @typedef {Object} TeamsListResponse
 * @property {true} success - Success flag
 * @property {Team[]} teams - Array of teams
 */

// ============================================================================
// AI Types
// ============================================================================

/**
 * @typedef {Object} AIProvider
 * @property {string} id - Provider ID
 * @property {string} name - Provider name
 * @property {boolean} available - Availability status
 * @property {string[]} models - Available models
 */

/**
 * @typedef {Object} AIGenerationRequest
 * @property {string} prompt - Generation prompt
 * @property {string} [provider] - Provider ID (openai, anthropic, google, huggingface)
 * @property {string} [model] - Model ID
 * @property {number} [max_tokens] - Max tokens
 * @property {number} [temperature] - Temperature (0-2)
 * @property {Object} [context] - Context data
 */

/**
 * @typedef {Object} AIGenerationResponse
 * @property {string} text - Generated text
 * @property {string} provider - Provider used
 * @property {string} model - Model used
 * @property {Object} usage - Token usage
 * @property {number} usage.prompt_tokens - Prompt tokens
 * @property {number} usage.completion_tokens - Completion tokens
 * @property {number} usage.total_tokens - Total tokens
 */

/**
 * @typedef {Object} EmbeddingResponse
 * @property {number[]} embedding - Embedding vector
 * @property {string} model - Model used
 * @property {number} dimensions - Vector dimensions
 */

// ============================================================================
// Export all types
// ============================================================================

export default {
  // Response types
  ApiSuccessResponse: /** @type {ApiSuccessResponse} */ ({}),
  ApiErrorResponse: /** @type {ApiErrorResponse} */ ({}),
  ApiPaginatedResponse: /** @type {ApiPaginatedResponse} */ ({}),

  // Auth types
  User: /** @type {User} */ ({}),
  AuthTokens: /** @type {AuthTokens} */ ({}),
  LoginResponse: /** @type {LoginResponse} */ ({}),
  SignupResponse: /** @type {SignupResponse} */ ({}),

  // Template types
  Template: /** @type {Template} */ ({}),
  TemplateVariable: /** @type {TemplateVariable} */ ({}),
  TemplateListResponse: /** @type {TemplateListResponse} */ ({}),
  TemplateResponse: /** @type {TemplateResponse} */ ({}),

  // Context types
  ContextLayer: /** @type {ContextLayer} */ ({}),
  ContextRelationship: /** @type {ContextRelationship} */ ({}),
  ContextVersion: /** @type {ContextVersion} */ ({}),

  // Team types
  Team: /** @type {Team} */ ({}),
  TeamMember: /** @type {TeamMember} */ ({}),
  TeamInvitation: /** @type {TeamInvitation} */ ({}),

  // AI types
  AIProvider: /** @type {AIProvider} */ ({}),
  AIGenerationRequest: /** @type {AIGenerationRequest} */ ({}),
  AIGenerationResponse: /** @type {AIGenerationResponse} */ ({}),
  EmbeddingResponse: /** @type {EmbeddingResponse} */ ({}),
};

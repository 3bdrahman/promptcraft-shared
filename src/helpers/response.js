/**
 * API Response Formatters
 *
 * Standardized response format for all API endpoints.
 * Ensures consistency between extension API, web API, and future integrations.
 */

/**
 * Standard success response
 * @param {*} data - Response data
 * @param {string} message - Optional success message
 * @returns {object} Formatted response
 */
export function success(data, message = null) {
  return {
    success: true,
    data,
    message,
    error: null
  };
}

/**
 * Standard error response
 * @param {string} message - Error message
 * @param {number} code - HTTP status code
 * @param {object} details - Additional error details
 * @returns {object} Formatted error response
 */
export function error(message, code = 500, details = null) {
  return {
    success: false,
    data: null,
    message: null,
    error: {
      message,
      code,
      details
    }
  };
}

/**
 * Paginated response
 * @param {array} items - Array of items
 * @param {object} pagination - Pagination info
 * @returns {object} Formatted paginated response
 */
export function paginated(items, pagination) {
  return {
    success: true,
    data: items,
    pagination: {
      total: pagination.total || pagination.totalCount || 0,
      page: pagination.page || 1,
      limit: pagination.limit || 25,
      pages: pagination.pages || pagination.totalPages || 1,
      hasMore: pagination.hasMore || pagination.hasNextPage || false
    },
    message: null,
    error: null
  };
}

/**
 * Validation error response
 * @param {array} errors - Array of validation error strings
 * @returns {object} Formatted validation error response
 */
export function validationError(errors) {
  return error('Validation failed', 400, { errors });
}

/**
 * Not found error response
 * @param {string} resource - Resource type (e.g., 'Template', 'User')
 * @returns {object} Formatted not found response
 */
export function notFound(resource = 'Resource') {
  return error(`${resource} not found`, 404);
}

/**
 * Unauthorized error response
 * @returns {object} Formatted unauthorized response
 */
export function unauthorized(message = 'Authentication required') {
  return error(message, 401);
}

/**
 * Forbidden error response
 * @returns {object} Formatted forbidden response
 */
export function forbidden(message = 'Access denied') {
  return error(message, 403);
}

/**
 * Rate limit error response
 * @param {number} retryAfter - Seconds until rate limit resets
 * @returns {object} Formatted rate limit response
 */
export function rateLimit(retryAfter = 60) {
  return error('Rate limit exceeded', 429, { retryAfter });
}

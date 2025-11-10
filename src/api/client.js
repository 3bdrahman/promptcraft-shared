/**
 * PromptCraft API Client
 * Standardized HTTP client for all API requests
 * Use this in both web app and browser extension
 */

import { API_ROUTES, buildUrl } from './routes.js';

/**
 * API Client Configuration
 */
class ApiClientConfig {
  constructor() {
    this.baseUrl = '';
    this.accessToken = null;
    this.refreshToken = null;
    this.onTokenRefresh = null;
    this.onUnauthorized = null;
    this.onError = null;
  }

  /**
   * Set base URL for API requests
   * @param {string} url - Base URL
   */
  setBaseUrl(url) {
    this.baseUrl = url.replace(/\/$/, ''); // Remove trailing slash
  }

  /**
   * Set authentication tokens
   * @param {string} accessToken - Access token
   * @param {string} [refreshToken] - Refresh token
   */
  setTokens(accessToken, refreshToken) {
    this.accessToken = accessToken;
    if (refreshToken) {
      this.refreshToken = refreshToken;
    }
  }

  /**
   * Clear authentication tokens
   */
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
  }

  /**
   * Set token refresh callback
   * @param {Function} callback - Called when tokens are refreshed
   */
  onTokenRefreshed(callback) {
    this.onTokenRefresh = callback;
  }

  /**
   * Set unauthorized callback
   * @param {Function} callback - Called on 401 errors
   */
  onUnauthorizedError(callback) {
    this.onUnauthorized = callback;
  }

  /**
   * Set global error callback
   * @param {Function} callback - Called on all errors
   */
  onErrorResponse(callback) {
    this.onError = callback;
  }
}

/**
 * Global API client configuration
 */
export const config = new ApiClientConfig();

/**
 * Custom API Error class
 */
export class ApiError extends Error {
  constructor(message, code, details, response) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.response = response;
    this.isApiError = true;
  }
}

/**
 * Make HTTP request
 * @private
 */
async function makeRequest(url, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    skipAuth = false,
  } = options;

  // Build headers
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add auth token if available and not skipped
  if (!skipAuth && config.accessToken) {
    requestHeaders['Authorization'] = `Bearer ${config.accessToken}`;
  }

  // Build fetch options
  const fetchOptions = {
    method,
    headers: requestHeaders,
    credentials: 'include', // Send cookies
  };

  // Add body for non-GET requests
  if (body && method !== 'GET') {
    fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  // Make request
  const fullUrl = url.startsWith('http') ? url : `${config.baseUrl}${url}`;

  let response;
  try {
    response = await fetch(fullUrl, fetchOptions);
  } catch (error) {
    // Network error
    throw new ApiError(
      'Network request failed. Please check your internet connection.',
      0,
      { originalError: error.message },
      null
    );
  }

  // Parse response
  let data;
  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch (error) {
      // JSON parse error
      throw new ApiError(
        'Failed to parse server response',
        response.status,
        { originalError: error.message },
        response
      );
    }
  } else {
    // Non-JSON response (likely HTML error page)
    const text = await response.text();
    data = {
      success: false,
      error: response.statusText || 'The page could not be found',
      code: response.status,
      details: text.length < 500 ? text : 'Invalid response format',
    };
  }

  // Handle non-2xx responses
  if (!response.ok) {
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Try to refresh token if available
      if (config.refreshToken && !url.includes('/auth/refresh')) {
        try {
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            // Retry original request with new token
            return makeRequest(url, options);
          }
        } catch (refreshError) {
          // Refresh failed, trigger unauthorized callback
          if (config.onUnauthorized) {
            config.onUnauthorized();
          }
        }
      } else if (config.onUnauthorized) {
        config.onUnauthorized();
      }
    }

    // Create error
    const error = new ApiError(
      data.error || data.message || 'Request failed',
      response.status,
      data.details || null,
      response
    );

    // Call global error handler
    if (config.onError) {
      config.onError(error);
    }

    throw error;
  }

  return data;
}

/**
 * Refresh access token
 * @private
 */
async function refreshAccessToken() {
  if (!config.refreshToken) {
    return false;
  }

  try {
    const response = await makeRequest(API_ROUTES.AUTH.REFRESH, {
      method: 'POST',
      body: { refreshToken: config.refreshToken },
      skipAuth: true,
    });

    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data;
      config.setTokens(accessToken, refreshToken);

      // Call token refresh callback
      if (config.onTokenRefresh) {
        config.onTokenRefresh(accessToken, refreshToken);
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    config.clearTokens();
    return false;
  }
}

/**
 * HTTP Methods
 */
export const http = {
  /**
   * GET request
   * @param {string} url - Request URL
   * @param {Object} [params] - Query parameters
   * @param {Object} [options] - Request options
   */
  async get(url, params, options = {}) {
    const fullUrl = params ? buildUrl(url, params) : url;
    return makeRequest(fullUrl, { ...options, method: 'GET' });
  },

  /**
   * POST request
   * @param {string} url - Request URL
   * @param {Object} [body] - Request body
   * @param {Object} [options] - Request options
   */
  async post(url, body, options = {}) {
    return makeRequest(url, { ...options, method: 'POST', body });
  },

  /**
   * PUT request
   * @param {string} url - Request URL
   * @param {Object} [body] - Request body
   * @param {Object} [options] - Request options
   */
  async put(url, body, options = {}) {
    return makeRequest(url, { ...options, method: 'PUT', body });
  },

  /**
   * DELETE request
   * @param {string} url - Request URL
   * @param {Object} [options] - Request options
   */
  async delete(url, options = {}) {
    return makeRequest(url, { ...options, method: 'DELETE' });
  },

  /**
   * PATCH request
   * @param {string} url - Request URL
   * @param {Object} [body] - Request body
   * @param {Object} [options] - Request options
   */
  async patch(url, body, options = {}) {
    return makeRequest(url, { ...options, method: 'PATCH', body });
  },
};

/**
 * Check if error is an API error
 * @param {Error} error - Error to check
 * @returns {boolean}
 */
export function isApiError(error) {
  return error && error.isApiError === true;
}

/**
 * Get error message from error object
 * @param {Error} error - Error object
 * @param {string} [defaultMessage] - Default message
 * @returns {string}
 */
export function getErrorMessage(error, defaultMessage = 'An error occurred') {
  if (isApiError(error)) {
    return error.message;
  }
  if (error && error.message) {
    return error.message;
  }
  return defaultMessage;
}

/**
 * Format response data to ensure consistent structure
 * Handles legacy response formats and normalizes them
 * @param {Object} response - API response
 * @returns {Object} Normalized response
 */
export function normalizeResponse(response) {
  // Already in correct format
  if (response && typeof response.success === 'boolean') {
    return response;
  }

  // Legacy format or direct data
  return {
    success: true,
    data: response,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Export configured client
 */
export default {
  config,
  http,
  ApiError,
  isApiError,
  getErrorMessage,
  normalizeResponse,
};

/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import { http } from '../client.js';
import { API_ROUTES } from '../routes.js';

/**
 * Sign up a new user
 * @param {Object} data - Signup data
 * @param {string} data.email - User email
 * @param {string} data.username - Username
 * @param {string} data.password - Password
 * @returns {Promise<import('../types.js').SignupResponse>}
 */
export async function signup(data) {
  const response = await http.post(API_ROUTES.AUTH.SIGNUP, data);
  return response.data;
}

/**
 * Log in a user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - Password
 * @returns {Promise<import('../types.js').LoginResponse>}
 */
export async function login(credentials) {
  const response = await http.post(API_ROUTES.AUTH.LOGIN, credentials);
  return response.data;
}

/**
 * Refresh access token
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<import('../types.js').AuthTokens>}
 */
export async function refreshToken(refreshToken) {
  const response = await http.post(API_ROUTES.AUTH.REFRESH, { refreshToken });
  return response.data;
}

/**
 * Log out current session
 * @returns {Promise<Object>}
 */
export async function logout() {
  const response = await http.post(API_ROUTES.AUTH.LOGOUT);
  return response.data;
}

/**
 * Log out from all sessions
 * @returns {Promise<Object>}
 */
export async function logoutAll() {
  const response = await http.post(API_ROUTES.AUTH.LOGOUT_ALL);
  return response.data;
}

/**
 * Verify email with PIN
 * @param {Object} data - Verification data
 * @param {string} data.email - User email
 * @param {string} data.pin - Verification PIN
 * @returns {Promise<Object>}
 */
export async function verifyEmail(data) {
  const response = await http.post(API_ROUTES.AUTH.VERIFY_PIN, data);
  return response.data;
}

/**
 * Resend verification PIN
 * @param {Object} data - Email data
 * @param {string} data.email - User email
 * @returns {Promise<Object>}
 */
export async function resendVerificationPin(data) {
  const response = await http.post(API_ROUTES.AUTH.RESEND_PIN, data);
  return response.data;
}

/**
 * Legacy email-based authentication
 * @param {Object} data - Auth data
 * @param {string} data.email - User email
 * @returns {Promise<Object>}
 */
export async function authByEmail(data) {
  const response = await http.post(API_ROUTES.AUTH.AUTH_BY_EMAIL, data);
  return response.data;
}

export default {
  signup,
  login,
  refreshToken,
  logout,
  logoutAll,
  verifyEmail,
  resendVerificationPin,
  authByEmail,
};

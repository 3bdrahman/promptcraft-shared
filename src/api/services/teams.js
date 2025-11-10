/**
 * Teams API Service
 * Handles all team-related API calls
 */

import { http } from '../client.js';
import { API_ROUTES } from '../routes.js';

// ============================================================================
// Team Operations
// ============================================================================

/**
 * Get user's teams
 * @param {Object} [params] - Query params
 * @returns {Promise<import('../types.js').TeamsListResponse>}
 */
export async function getTeams(params = {}) {
  const response = await http.get(API_ROUTES.TEAMS.LIST, params);
  return response;
}

/**
 * Get team details
 * @param {string} id - Team ID
 * @returns {Promise<import('../types.js').Team>}
 */
export async function getTeam(id) {
  const response = await http.get(API_ROUTES.TEAMS.byId(id));
  return response.data;
}

/**
 * Create a new team
 * @param {Object} data - Team data
 * @param {string} data.name - Team name (required)
 * @param {string} [data.description] - Team description
 * @returns {Promise<import('../types.js').Team>}
 */
export async function createTeam(data) {
  const response = await http.post(API_ROUTES.TEAMS.BASE, data);
  return response.data;
}

/**
 * Update team details
 * @param {string} id - Team ID
 * @param {Object} data - Updated team data
 * @param {string} [data.name] - Team name
 * @param {string} [data.description] - Team description
 * @returns {Promise<import('../types.js').Team>}
 */
export async function updateTeam(id, data) {
  const response = await http.put(API_ROUTES.TEAMS.byId(id), data);
  return response.data;
}

/**
 * Delete a team
 * @param {string} id - Team ID
 * @returns {Promise<Object>}
 */
export async function deleteTeam(id) {
  const response = await http.delete(API_ROUTES.TEAMS.byId(id));
  return response.data;
}

// ============================================================================
// Team Members
// ============================================================================

/**
 * Get team members
 * @param {string} teamId - Team ID
 * @returns {Promise<import('../types.js').TeamMember[]>}
 */
export async function getTeamMembers(teamId) {
  const response = await http.get(API_ROUTES.TEAMS.members(teamId));
  return response.data;
}

/**
 * Update team member role
 * @param {string} teamId - Team ID
 * @param {string} memberId - Member ID
 * @param {Object} data - Update data
 * @param {string} data.role - New role (owner, admin, member, viewer)
 * @returns {Promise<import('../types.js').TeamMember>}
 */
export async function updateTeamMember(teamId, memberId, data) {
  const response = await http.put(API_ROUTES.TEAMS.member(teamId, memberId), data);
  return response.data;
}

/**
 * Remove team member
 * @param {string} teamId - Team ID
 * @param {string} memberId - Member ID
 * @returns {Promise<Object>}
 */
export async function removeTeamMember(teamId, memberId) {
  const response = await http.delete(API_ROUTES.TEAMS.member(teamId, memberId));
  return response.data;
}

// ============================================================================
// Team Invitations
// ============================================================================

/**
 * Get team invitations
 * @param {string} teamId - Team ID
 * @returns {Promise<import('../types.js').TeamInvitation[]>}
 */
export async function getTeamInvitations(teamId) {
  const response = await http.get(API_ROUTES.TEAMS.invitations(teamId));
  return response.data;
}

/**
 * Create team invitation
 * @param {string} teamId - Team ID
 * @param {Object} data - Invitation data
 * @param {string} data.email - Invitee email
 * @param {string} [data.role='member'] - Role to assign
 * @returns {Promise<import('../types.js').TeamInvitation>}
 */
export async function createTeamInvitation(teamId, data) {
  const response = await http.post(API_ROUTES.TEAMS.invitations(teamId), data);
  return response.data;
}

/**
 * Cancel team invitation
 * @param {string} teamId - Team ID
 * @param {string} invitationId - Invitation ID
 * @returns {Promise<Object>}
 */
export async function cancelTeamInvitation(teamId, invitationId) {
  const response = await http.delete(API_ROUTES.TEAMS.invitation(teamId, invitationId));
  return response.data;
}

// ============================================================================
// Public Invitation Operations (token-based)
// ============================================================================

/**
 * Get invitation details by token
 * @param {string} token - Invitation token
 * @returns {Promise<import('../types.js').TeamInvitation>}
 */
export async function getInvitationByToken(token) {
  const response = await http.get(API_ROUTES.TEAMS.invitationByToken(token));
  return response.data;
}

/**
 * Accept team invitation
 * @param {string} token - Invitation token
 * @returns {Promise<Object>}
 */
export async function acceptInvitation(token) {
  const response = await http.post(API_ROUTES.TEAMS.acceptInvitation(token));
  return response.data;
}

/**
 * Reject team invitation
 * @param {string} token - Invitation token
 * @returns {Promise<Object>}
 */
export async function rejectInvitation(token) {
  const response = await http.post(API_ROUTES.TEAMS.rejectInvitation(token));
  return response.data;
}

export default {
  // Team operations
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,

  // Member operations
  getTeamMembers,
  updateTeamMember,
  removeTeamMember,

  // Invitation operations
  getTeamInvitations,
  createTeamInvitation,
  cancelTeamInvitation,
  getInvitationByToken,
  acceptInvitation,
  rejectInvitation,
};

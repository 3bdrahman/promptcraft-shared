/**
 * API Router for PromptCraft
 * Routes all API requests to appropriate endpoint handlers
 * Consolidates into single serverless function for Vercel Hobby plan
 */

import { handleCors, success, error } from './_lib/shared/responses.js';

// Import all endpoint handlers statically for Vercel bundling
import templatesHandler from './_lib/endpoints/templates.js';
import layersHandler from './_lib/endpoints/layers.js';
import profilesHandler from './_lib/endpoints/profiles.js';
import combinationsHandler from './_lib/endpoints/combinations.js';
import snippetsHandler from './_lib/endpoints/snippets.js';
import authHandler from './_lib/endpoints/auth-by-email.js';
import subscriptionHandler from './_lib/endpoints/subscription.js';
import analyticsHandler from './_lib/endpoints/analytics.js';
import subscriptionsHandler from './_lib/endpoints/subscriptions.js';
import contextsRouter from './_lib/endpoints/contexts/index.js';

// Enterprise auth endpoints
import signupHandler from './_lib/endpoints/auth/signup.js';
import loginHandler from './_lib/endpoints/auth/login.js';
import refreshHandler from './_lib/endpoints/auth/refresh.js';
import logoutHandler from './_lib/endpoints/auth/logout.js';
import logoutAllHandler from './_lib/endpoints/auth/logout-all.js';
import verifyPinHandler from './_lib/endpoints/auth/verify-pin.js';
import resendPinHandler from './_lib/endpoints/auth/resend-pin.js';

// Teams endpoints
import {
  getUserTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam
} from './_lib/endpoints/teams/index.js';

import {
  getTeamMembers,
  updateTeamMember,
  removeTeamMember
} from './_lib/endpoints/teams/members.js';

import {
  getTeamInvitations,
  createTeamInvitation,
  getInvitationByToken,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation
} from './_lib/endpoints/teams/invitations.js';

// AI endpoints
import aiGenerateHandler from './ai/generate.js';
import aiEmbeddingsHandler from './ai/embeddings.js';
import aiProvidersHandler from './ai/providers.js';

/**
 * Main API router
 */
export default async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) {
    return;
  }

  try {
    const { url, method } = req;
    const urlObj = new URL(url, `https://${req.headers.host}`);
    const path = urlObj.pathname;

    console.log(`📡 [API] ${method} ${path}`);
    console.log(`📦 [API] Body type: ${typeof req.body}`);

    // Parse JSON body if needed - same as templates.js
    if (req.body && typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
        console.log(`✅ [API] Parsed body successfully`);
      } catch (e) {
        console.error('❌ [API] JSON parse failed:', e.message);
        return res.status(400).json(error('Invalid JSON in request body', 400));
      }
    }

    console.log(`📋 [API] Body is:`, req.body);

    // Route to appropriate handler based on path
    // Enterprise auth endpoints (check these first for priority)
    if (path === '/api/auth/signup') {
      return await signupHandler(req, res);
    } else if (path === '/api/auth/login') {
      return await loginHandler(req, res);
    } else if (path === '/api/auth/refresh') {
      return await refreshHandler(req, res);
    } else if (path === '/api/auth/logout') {
      return await logoutHandler(req, res);
    } else if (path === '/api/auth/logout-all') {
      return await logoutAllHandler(req, res);
    } else if (path === '/api/auth/verify-pin') {
      return await verifyPinHandler(req, res);
    } else if (path === '/api/auth/resend-pin') {
      return await resendPinHandler(req, res);
    }

    // Teams endpoints
    if (path === '/api/teams' && method === 'GET') {
      return await getUserTeams(req, res);
    } else if (path === '/api/teams' && method === 'POST') {
      return await createTeam(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+$/) && method === 'GET') {
      req.params = { id: path.split('/')[3] };
      return await getTeam(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+$/) && method === 'PUT') {
      req.params = { id: path.split('/')[3] };
      return await updateTeam(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+$/) && method === 'DELETE') {
      req.params = { id: path.split('/')[3] };
      return await deleteTeam(req, res);
    }

    // Team members endpoints
    else if (path.match(/^\/api\/teams\/[^/]+\/members$/) && method === 'GET') {
      const parts = path.split('/');
      req.params = { teamId: parts[3] };
      return await getTeamMembers(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+\/members\/[^/]+$/) && method === 'PUT') {
      const parts = path.split('/');
      req.params = { teamId: parts[3], memberId: parts[5] };
      return await updateTeamMember(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+\/members\/[^/]+$/) && method === 'DELETE') {
      const parts = path.split('/');
      req.params = { teamId: parts[3], memberId: parts[5] };
      return await removeTeamMember(req, res);
    }

    // Team invitations endpoints
    else if (path.match(/^\/api\/teams\/[^/]+\/invitations$/) && method === 'GET') {
      const parts = path.split('/');
      req.params = { teamId: parts[3] };
      return await getTeamInvitations(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+\/invitations$/) && method === 'POST') {
      const parts = path.split('/');
      req.params = { teamId: parts[3] };
      return await createTeamInvitation(req, res);
    } else if (path.match(/^\/api\/teams\/[^/]+\/invitations\/[^/]+$/) && method === 'DELETE') {
      const parts = path.split('/');
      req.params = { teamId: parts[3], invitationId: parts[5] };
      return await cancelInvitation(req, res);
    }

    // Public invitation endpoints (no team in path)
    else if (path.match(/^\/api\/invitations\/[^/]+$/) && method === 'GET') {
      const parts = path.split('/');
      req.params = { token: parts[3] };
      return await getInvitationByToken(req, res);
    } else if (path.match(/^\/api\/invitations\/[^/]+\/accept$/) && method === 'POST') {
      const parts = path.split('/');
      req.params = { token: parts[3] };
      return await acceptInvitation(req, res);
    } else if (path.match(/^\/api\/invitations\/[^/]+\/reject$/) && method === 'POST') {
      const parts = path.split('/');
      req.params = { token: parts[3] };
      return await rejectInvitation(req, res);
    }

    // Analytics endpoints
    if (path.startsWith('/analytics')) {
      return await analyticsHandler(req, res);
    }

    // Subscription endpoints (new enterprise subscriptions)
    if (path.startsWith('/subscriptions')) {
      return await subscriptionsHandler(req, res);
    }

    // Legacy and other endpoints
    if (path.startsWith('/api/templates')) {
      return await templatesHandler(req, res);
    } else if (path.startsWith('/api/contexts/layers')) {
      // Check if this is an advanced context endpoint
      const pathParts = path.split('/').filter(Boolean);

      // Advanced endpoints (tree, children, versions, etc.)
      if (pathParts.length > 4) {
        return await contextsRouter(req, res, pathParts);
      }

      // Basic CRUD operations
      return await layersHandler(req, res);
    } else if (path.startsWith('/api/contexts/')) {
      // New context endpoints (relationships, search, etc.)
      const pathParts = path.split('/').filter(Boolean);
      return await contextsRouter(req, res, pathParts);
    } else if (path.startsWith('/api/contexts/profiles')) {
      return await profilesHandler(req, res);
    } else if (path.startsWith('/api/contexts/combinations')) {
      return await combinationsHandler(req, res);
    } else if (path.startsWith('/api/contexts/snippets')) {
      return await snippetsHandler(req, res);
    } else if (path.startsWith('/api/user/auth-by-email')) {
      return await authHandler(req, res);
    } else if (path.startsWith('/api/user/subscription')) {
      return await subscriptionHandler(req, res);
    } else if (path === '/api/ai/generate') {
      return await aiGenerateHandler(req, res);
    } else if (path === '/api/ai/embeddings') {
      return await aiEmbeddingsHandler(req, res);
    } else if (path === '/api/ai/providers') {
      return await aiProvidersHandler(req, res);
    } else {
      return res.status(404).json(error('Endpoint not found', 404));
    }
  } catch (err) {
    console.error('❌ [API] Error:', err);
    return res.status(500).json(error(err.message, 500));
  }
}


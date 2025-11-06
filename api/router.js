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

// Enterprise auth endpoints
import signupHandler from './_lib/endpoints/auth/signup.js';
import loginHandler from './_lib/endpoints/auth/login.js';
import refreshHandler from './_lib/endpoints/auth/refresh.js';
import logoutHandler from './_lib/endpoints/auth/logout.js';
import logoutAllHandler from './_lib/endpoints/auth/logout-all.js';
import verifyPinHandler from './_lib/endpoints/auth/verify-pin.js';
import resendPinHandler from './_lib/endpoints/auth/resend-pin.js';

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
      return await layersHandler(req, res);
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
    } else {
      return res.status(404).json(error('Endpoint not found', 404));
    }
  } catch (err) {
    console.error('❌ [API] Error:', err);
    return res.status(500).json(error(err.message, 500));
  }
}


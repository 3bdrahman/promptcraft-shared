/**
 * Auth Router - Separate router for authentication endpoints
 * Isolated to prevent breaking main API if auth has issues
 */

import { handleCors, error } from './_lib/shared/responses.js';

// Import auth endpoint handlers
import signupHandler from './_lib/endpoints/auth/signup.js';
import loginHandler from './_lib/endpoints/auth/login.js';
import refreshHandler from './_lib/endpoints/auth/refresh.js';
import logoutHandler from './_lib/endpoints/auth/logout.js';
import logoutAllHandler from './_lib/endpoints/auth/logout-all.js';
import verifyPinHandler from './_lib/endpoints/auth/verify-pin.js';
import resendPinHandler from './_lib/endpoints/auth/resend-pin.js';

/**
 * Auth API router
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

    console.log(`📡 [AUTH] ${method} ${path}`);

    // Handle body parsing - same pattern as templates.js
    if (req.body && typeof req.body === 'string') {
      try {
        req.body = JSON.parse(req.body);
      } catch (e) {
        console.error('❌ [AUTH] Failed to parse body as JSON:', e);
        return res.status(400).json(error('Invalid JSON in request body', 400));
      }
    }

    // Route to appropriate auth handler
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
    } else {
      return res.status(404).json(error('Auth endpoint not found', 404));
    }
  } catch (err) {
    console.error('❌ [AUTH] Error:', err);
    return res.status(500).json(error(err.message, 500));
  }
}

/**
 * Minimal router test - adding imports one by one
 */

import { handleCors, success, error } from './_lib/shared/responses.js';
import templatesHandler from './_lib/endpoints/templates.js';

export default async function handler(req, res) {
  if (handleCors(req, res)) {
    return;
  }

  const path = new URL(req.url, `https://${req.headers.host}`).pathname;

  // Route to templates handler
  if (path.startsWith('/api/templates')) {
    return await templatesHandler(req, res);
  }

  return res.status(200).json(success({
    message: 'Router with templates handler import working',
    path,
    method: req.method
  }));
}

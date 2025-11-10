/**
 * AI API Service
 * Handles all AI-related API calls
 */

import { http } from '../client.js';
import { API_ROUTES } from '../routes.js';

/**
 * Generate AI completion
 * @param {import('../types.js').AIGenerationRequest} data - Generation request
 * @returns {Promise<import('../types.js').AIGenerationResponse>}
 */
export async function generate(data) {
  const response = await http.post(API_ROUTES.AI.GENERATE, data);
  return response.data;
}

/**
 * Generate embeddings
 * @param {Object} data - Embedding request
 * @param {string} data.text - Text to embed
 * @param {string} [data.model] - Model to use
 * @returns {Promise<import('../types.js').EmbeddingResponse>}
 */
export async function generateEmbeddings(data) {
  const response = await http.post(API_ROUTES.AI.EMBEDDINGS, data);
  return response.data;
}

/**
 * Get available AI providers
 * @returns {Promise<import('../types.js').AIProvider[]>}
 */
export async function getProviders() {
  const response = await http.get(API_ROUTES.AI.PROVIDERS);
  return response.data;
}

export default {
  generate,
  generateEmbeddings,
  getProviders,
};

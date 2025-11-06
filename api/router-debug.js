/**
 * Debug router to find which import is failing
 */

// Test imports one by one
console.log('Starting router debug...');

try {
  console.log('1. Importing responses...');
  const responses = await import('./_lib/shared/responses.js');
  console.log('✓ responses imported');

  console.log('2. Importing database...');
  const database = await import('./_lib/shared/database.js');
  console.log('✓ database imported');

  console.log('3. Importing auth...');
  const auth = await import('./_lib/shared/auth.js');
  console.log('✓ auth imported');

  console.log('4. Importing templates handler...');
  const templates = await import('./_lib/endpoints/templates.js');
  console.log('✓ templates handler imported');

} catch (error) {
  console.error('Import failed:', error);
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ debug: 'Check Vercel logs for import results' });
}

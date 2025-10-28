# Usage Examples

## Installation

```bash
# In your extension or web app
npm install @promptcraft/shared
```

## Template Management

```javascript
import {
  createTemplate,
  validateTemplate,
  extractVariables,
  applyVariables,
  TEMPLATE_CATEGORIES
} from '@promptcraft/shared';

// Create a new template
const template = createTemplate({
  user_id: 'user-123',
  name: 'Code Review Helper',
  description: 'Helps review code with best practices',
  content: 'Review this {{language}} code for {{focus}} issues:\n\n{{code}}',
  category: 'code-generation',
  is_public: true
});

// Variables are auto-extracted with smart type guessing
console.log(template.variables);
// [
//   { name: 'language', type: 'technology', required: true, ... },
//   { name: 'focus', type: 'text', required: true, ... },
//   { name: 'code', type: 'file', required: true, ... }
// ]

// Validate template
const validation = validateTemplate(template);
if (!validation.valid) {
  console.error(validation.errors);
}

// Apply variables to get final prompt
const finalPrompt = applyVariables(template, {
  language: 'Python',
  focus: 'security',
  code: 'def login(user, pass): ...'
});
```

## Context Layer Management

```javascript
import {
  createContext,
  combineContexts,
  LAYER_TYPES
} from '@promptcraft/shared';

// Create different types of context layers
const profileLayer = createContext({
  user_id: 'user-123',
  name: 'My Developer Profile',
  content: 'I am a senior Python developer with 8 years of experience...',
  layer_type: 'profile',
  priority: 10,  // Highest priority
  auto_include: true  // Always include this
});

const projectLayer = createContext({
  user_id: 'user-123',
  name: 'Current Project',
  content: 'Working on a REST API using FastAPI and PostgreSQL...',
  layer_type: 'project',
  priority: 8
});

const sessionLayer = createContext({
  user_id: 'user-123',
  name: 'Today\'s Work',
  content: 'Debugging authentication issues in production...',
  layer_type: 'session',
  priority: 9
});

// Combine contexts intelligently
const combinedContext = combineContexts(
  [profileLayer, projectLayer, sessionLayer],
  {
    maxTokens: 8000,      // Respect LLM context limits
    priorityOrder: true,   // Use priority field
    includeHeaders: true   // Add "# Profile" headers
  }
);

// Result:
// # 👤 My Developer Profile
// I am a senior Python developer...
//
// ---
//
// # 💬 Today's Work
// Debugging authentication issues...
//
// ---
//
// # 📁 Current Project
// Working on a REST API...
```

## Category Navigation

```javascript
import {
  getCategoryInfo,
  getCategoriesByGrandparent,
  enrichWithHierarchy,
  getCategoryBreadcrumb
} from '@promptcraft/shared';

// Get category details
const categoryInfo = getCategoryInfo('summaries-overviews');
console.log(categoryInfo);
// {
//   id: 'summaries-overviews',
//   label: 'Summaries & Overviews',
//   icon: '📋',
//   level: 'category',
//   parent: 'information-processing',
//   grandparent: 'understand-analyze'
// }

// Get all categories under a grandparent
const allAnalysisCategories = getCategoriesByGrandparent('understand-analyze');
// Returns all IDs under "Understand & Analyze"

// Enrich template with hierarchy
const template = { category: 'summaries-overviews', ...otherFields };
const enriched = enrichWithHierarchy(template);
console.log(enriched);
// {
//   ...template,
//   grandparent: 'understand-analyze',
//   parent: 'information-processing',
//   category: 'summaries-overviews'
// }

// Build breadcrumb for UI
const breadcrumb = getCategoryBreadcrumb('summaries-overviews');
// [
//   { id: 'understand-analyze', label: 'Understand & Analyze', icon: '🔍' },
//   { id: 'information-processing', label: 'Information Processing', icon: '📊' },
//   { id: 'summaries-overviews', label: 'Summaries & Overviews', icon: '📋' }
// ]
```

## Subscription Limits

```javascript
import {
  SUBSCRIPTION_TIERS,
  getTierLimits,
  canUserAccessFeature,
  checkResourceLimit
} from '@promptcraft/shared';

// Get user's limits
const limits = getTierLimits('free');
console.log(limits);
// { templates: 10, contexts: 5, monthly_tokens: 50000, ... }

// Check feature access
const hasAPI = canUserAccessFeature('free', 'api_access');
// false

const hasAdvanced = canUserAccessFeature('pro', 'advanced_analysis');
// true

// Check if user can create more templates
const limitCheck = checkResourceLimit('free', 'templates', 8);
console.log(limitCheck);
// {
//   allowed: true,
//   limit: 10,
//   remaining: 2,
//   current: 8,
//   message: '2 remaining of 10'
// }

// User at limit
const atLimit = checkResourceLimit('free', 'templates', 10);
console.log(atLimit);
// {
//   allowed: false,
//   limit: 10,
//   remaining: 0,
//   current: 10,
//   message: 'Limit reached (10). Upgrade your plan for more.'
// }
```

## API Response Formatting

```javascript
import {
  success,
  error,
  paginated,
  validationError,
  notFound,
  unauthorized
} from '@promptcraft/shared';

// Success response
const response = success(template, 'Template created successfully');
// {
//   success: true,
//   data: {...template},
//   message: 'Template created successfully',
//   error: null
// }

// Error response
const errorResponse = error('Template not found', 404);
// {
//   success: false,
//   data: null,
//   message: null,
//   error: { message: 'Template not found', code: 404, details: null }
// }

// Paginated response
const paginatedResponse = paginated(templates, {
  total: 150,
  page: 2,
  limit: 25,
  pages: 6,
  hasMore: true
});

// Validation errors
const validationErrors = validationError([
  'Name is required',
  'Content must be at least 10 characters'
]);

// Common errors
const notFoundResponse = notFound('Template');
const unauthorizedResponse = unauthorized();
```

## User Management

```javascript
import {
  createUser,
  sanitizeUser,
  validateUser,
  isUserLocked,
  hasActiveSubscription
} from '@promptcraft/shared';

// Create user (server-side only - includes password)
const user = createUser({
  email: 'user@example.com',
  username: 'developer123',
  password_hash: '...hashed...',
  current_tier: 'pro'
});

// Sanitize for frontend (removes password and sensitive fields)
const safeUser = sanitizeUser(user);
// No password_hash, failed_login_attempts, or locked_until

// Validate user data
const validation = validateUser(user);
if (!validation.valid) {
  console.error(validation.errors);
}

// Security checks
if (isUserLocked(user)) {
  console.log('Account is locked');
}

if (hasActiveSubscription(user)) {
  console.log('Subscription is active');
}
```

## Variable Type Helpers

```javascript
import {
  VARIABLE_TYPES,
  guessVariableType,
  getVariableTypeName,
  getVariableTypeIcon
} from '@promptcraft/shared';

// Auto-guess variable type from name
const type = guessVariableType('programming_language');
// 'technology'

const type2 = guessVariableType('deadline_date');
// 'time'

// Get display info
const name = getVariableTypeName('technology');
// 'Technology'

const icon = getVariableTypeIcon('technology');
// '💻'

// All variable types
console.log(Object.keys(VARIABLE_TYPES));
// ['technology', 'time', 'place', 'individualized', 'role',
//  'format', 'domain', 'numeric', 'text', 'file']
```

## Complete Example: Template Creation Flow

```javascript
import {
  createTemplate,
  validateTemplate,
  checkResourceLimit,
  success,
  error
} from '@promptcraft/shared';

async function handleTemplateCreation(userId, userTier, currentCount, templateData) {
  // 1. Check subscription limits
  const limitCheck = checkResourceLimit(userTier, 'templates', currentCount);
  if (!limitCheck.allowed) {
    return error(limitCheck.message, 403);
  }

  // 2. Create template with auto-extracted variables
  const template = createTemplate({
    user_id: userId,
    ...templateData
  });

  // 3. Validate
  const validation = validateTemplate(template);
  if (!validation.valid) {
    return error('Validation failed', 400, { errors: validation.errors });
  }

  // 4. Save to database (your code here)
  // await db.save(template);

  // 5. Return success
  return success(template, 'Template created successfully');
}
```

# @promptcraft/shared

Pure shared library for PromptCraft - provides data structures, constants, validators, and utilities used across all PromptCraft applications.

## Architecture Role

```
┌─────────────────────┐
│  PromptCraft        │  ← Chrome Extension
│  (Browser)          │     Uses: structures, constants, validators
└──────────┬──────────┘
           │
           ↓ (imports @promptcraft/shared)
┌─────────────────────┐
│  promptcraft-shared │  ← Shared Library (this package)
│  (Core Library)     │     Provides: Data schemas, validation, helpers
└──────────┬──────────┘
           ↑ (imports @promptcraft/shared)
           │
┌──────────┴──────────┐
│  craft-site         │  ← React Web App
│  (Frontend)         │     Uses: structures, constants, validators
└──────────┬──────────┘
           │
           ↓ (imports @promptcraft/shared)
┌─────────────────────┐
│  promptcraft-api    │  ← Express API Server
│  (Backend)          │     Uses: structures, constants, validators
└─────────────────────┘
```

**Purpose**:
- Ensure consistent data structures across all applications
- Single source of truth for business logic and validation
- Zero-dependency design for maximum portability
- Works in browser, Node.js, and serverless environments

## Installation

### In Monorepo (Development)

```bash
# From monorepo root
npm install

# The package is linked automatically via npm workspaces
# Changes to this package are immediately available in other packages
```

### As NPM Package (Production)

```bash
npm install @promptcraft/shared
```

## Usage

### Basic Import Patterns

```javascript
// Import everything (not recommended - use specific imports)
import * as PromptCraft from '@promptcraft/shared';

// Import specific modules (recommended)
import { createTemplate, validateTemplate } from '@promptcraft/shared/structures';
import { TEMPLATE_CATEGORIES, VARIABLE_TYPES } from '@promptcraft/shared/constants';
import { isValidCategory, combineContexts } from '@promptcraft/shared/helpers';
```

### Working with Templates

```javascript
import { createTemplate, validateTemplate } from '@promptcraft/shared/structures';
import { TEMPLATE_CATEGORIES } from '@promptcraft/shared/constants';

// Create a new template
const template = createTemplate({
  name: 'Code Review Template',
  description: 'Template for reviewing code',
  content: 'Review this {{language}} code for {{quality}} issues:\n\n{{code}}',
  category: 'engineering.code-review',
  tags: ['code', 'review', 'quality'],
  variables: [
    { name: 'language', type: 'technology', description: 'Programming language' },
    { name: 'quality', type: 'quality', description: 'Quality standards' },
    { name: 'code', type: 'data', description: 'Code to review' }
  ]
});

// Validate template
const { valid, errors } = validateTemplate(template);
if (!valid) {
  console.error('Template validation failed:', errors);
}

// Check if category exists
import { isValidCategory } from '@promptcraft/shared/helpers';
const categoryExists = isValidCategory('engineering.code-review'); // true
```

### Working with Context Layers

```javascript
import { createContextLayer, validateContextLayer } from '@promptcraft/shared/structures';
import { LAYER_TYPES } from '@promptcraft/shared/constants';

// Create a profile layer
const profile = createContextLayer({
  name: 'Senior Software Engineer',
  description: 'My professional profile',
  content: 'I am a senior software engineer with 10+ years of experience in web development.',
  layer_type: 'profile',
  tags: ['engineering', 'web'],
  metadata: { experience: 10 }
});

// Create a project layer
const project = createContextLayer({
  name: 'E-commerce Platform',
  description: 'Current project context',
  content: 'Building an e-commerce platform using React, Node.js, and PostgreSQL.',
  layer_type: 'project',
  tags: ['react', 'nodejs', 'postgres']
});

// Combine contexts
import { combineContexts } from '@promptcraft/shared/helpers';
const combined = combineContexts([profile, project], {
  format: 'xml', // or 'markdown'
  platform: 'claude' // or 'chatgpt', 'gemini', etc.
});

console.log(combined);
// Output (XML format for Claude):
// <context>
//   <profile>I am a senior software engineer...</profile>
//   <project>Building an e-commerce platform...</project>
// </context>
```

### Using Constants

```javascript
import {
  TEMPLATE_CATEGORIES,
  VARIABLE_TYPES,
  LAYER_TYPES,
  SUBSCRIPTION_LIMITS
} from '@promptcraft/shared/constants';

// Browse template categories
console.log(TEMPLATE_CATEGORIES);
// Output:
// {
//   engineering: {
//     label: 'Engineering',
//     subcategories: {
//       'code-review': { label: 'Code Review', description: '...' },
//       'debugging': { label: 'Debugging', description: '...' },
//       ...
//     }
//   },
//   ...
// }

// Check variable types
console.log(VARIABLE_TYPES);
// Output:
// {
//   technology: { label: 'Technology', examples: ['JavaScript', 'Python', ...] },
//   time: { label: 'Time', examples: ['2024-01-01', 'next week', ...] },
//   ...
// }

// Check layer types
console.log(LAYER_TYPES);
// Output: ['profile', 'project', 'task', 'snippet', 'adhoc']

// Check subscription limits
console.log(SUBSCRIPTION_LIMITS.free);
// Output:
// {
//   max_templates: 10,
//   max_contexts: 5,
//   max_teams: 1,
//   ...
// }
```

### Validation Helpers

```javascript
import {
  validateTemplate,
  validateContextLayer,
  validateUser
} from '@promptcraft/shared/validators';

// Validate template
const templateResult = validateTemplate({
  name: 'My Template',
  content: 'Template content here',
  category: 'engineering.code-review'
});

if (!templateResult.valid) {
  console.error('Validation errors:', templateResult.errors);
  // Output: ['Missing required field: description', ...]
}

// Validate context layer
const layerResult = validateContextLayer({
  name: 'My Profile',
  content: 'Profile content',
  layer_type: 'profile'
});

// Validate user object
const userResult = validateUser({
  email: 'user@example.com',
  name: 'John Doe',
  current_tier: 'free'
});
```

## Structure

```
src/
├── structures/       # Object factories and schemas
│   ├── template.js   # Template object structure
│   ├── context.js    # Context layer structure
│   ├── user.js       # User object structure
│   └── index.js
├── constants/        # Shared constants
│   ├── categories.js # Template categories hierarchy
│   ├── variables.js  # Variable type definitions
│   ├── limits.js     # Subscription limits
│   └── index.js
├── validators/       # Validation functions
│   ├── template.js   # Template validation
│   ├── context.js    # Context validation
│   └── index.js
├── helpers/          # Helper utilities
│   ├── category.js   # Category navigation helpers
│   ├── context.js    # Context combination logic
│   └── index.js
├── api/              # API client library (NEW!)
│   ├── client.js     # HTTP client with token refresh
│   ├── routes.js     # API route constants
│   ├── types.js      # JSDoc type definitions
│   ├── validators.js # Request/response validators
│   ├── services/     # API service modules
│   │   ├── auth.js       # Authentication services
│   │   ├── templates.js  # Template services
│   │   ├── contexts.js   # Context services
│   │   ├── teams.js      # Team services
│   │   └── ai.js         # AI services
│   ├── index.js      # Main API client export
│   └── README.md     # API client documentation
└── index.js          # Main entry point

api/                  # API server implementation
├── router.js         # Main serverless function handler
├── _lib/
│   ├── auth/         # JWT, password hashing, middleware
│   ├── endpoints/    # API endpoint handlers
│   └── shared/       # Database, responses, utilities
└── README.md         # Server API documentation
```

## Key Features

### Template System
- **150+ Categories**: Hierarchical organization (e.g., `engineering.code-review`)
- **10 Variable Types**: Semantic variable system (technology, time, person, etc.)
- **Template Validation**: Ensure templates meet quality standards
- **Usage Tracking**: Monitor which templates are most effective

### Context Layers
- **5 Layer Types**: Profile, Project, Task, Snippet, Adhoc
- **Context Composition**: Stack layers for rich, comprehensive prompts
- **Platform Adaptation**: Auto-format for Claude (XML) or ChatGPT (Markdown)
- **Relationship Tracking**: Link contexts to projects and templates

### Subscription Management
- **Tier System**: Free, Starter, Pro, Enterprise
- **Usage Limits**: Templates, contexts, teams per tier
- **Feature Flags**: Control access to premium features
- **Upgrade Paths**: Clear progression between tiers

### Validation & Helpers
- **Type-Safe Validation**: Comprehensive validation for all data structures
- **Category Helpers**: Navigate template category hierarchy
- **Context Combiners**: Merge multiple contexts intelligently
- **Format Converters**: Convert between XML, Markdown, JSON formats

## Design Principles

1. **Database Schema Alignment** - Structures mirror PostgreSQL schema exactly
2. **Zero Dependencies** - Pure JavaScript, no external packages (core library only)
3. **Universal Compatibility** - Works in browser, Node.js, and serverless
4. **Backward Compatible** - New fields are optional, existing code won't break
5. **Well Documented** - JSDoc comments explain purpose and usage
6. **Validation First** - All structures include validation functions
7. **Helper Functions** - Common operations provided as utilities
8. **Immutable Structures** - Object factories create clean, validated objects

## How Projects Use This Library

### PromptCraft Extension (Chrome)
```javascript
// Load template categories for UI
import { TEMPLATE_CATEGORIES } from '@promptcraft/shared/constants';
populateDropdown(TEMPLATE_CATEGORIES);

// Validate user input before saving
import { validateTemplate } from '@promptcraft/shared/validators';
const { valid, errors } = validateTemplate(userTemplate);

// Format context for Claude
import { combineContexts } from '@promptcraft/shared/helpers';
const formatted = combineContexts(layers, { format: 'xml', platform: 'claude' });
```

### craft-site (React Web App)
```javascript
// Create template from form data
import { createTemplate } from '@promptcraft/shared/structures';
const template = createTemplate(formData);

// Validate before API submission
import { validateTemplate } from '@promptcraft/shared/validators';
if (!validateTemplate(template).valid) {
  showErrors();
  return;
}

// Display category hierarchy
import { TEMPLATE_CATEGORIES } from '@promptcraft/shared/constants';
renderCategoryTree(TEMPLATE_CATEGORIES);
```

### promptcraft-api (Express Server)
```javascript
// Validate incoming API requests
import { validateTemplate } from '@promptcraft/shared/validators';
const { valid, errors } = validateTemplate(req.body);
if (!valid) {
  return res.status(400).json({ errors });
}

// Check subscription limits
import { SUBSCRIPTION_LIMITS } from '@promptcraft/shared/constants';
const userLimit = SUBSCRIPTION_LIMITS[user.tier].max_templates;
if (userTemplateCount >= userLimit) {
  return res.status(403).json({ error: 'Template limit reached' });
}

// Create consistent response objects
import { createTemplate } from '@promptcraft/shared/structures';
const template = createTemplate(dbRow);
res.json({ template });
```

## Development

### Making Changes

This is a shared library used by multiple projects. When making changes:

1. **Test in all consuming projects** before committing
2. **Maintain backward compatibility** - don't break existing code
3. **Update version** in package.json following semver
4. **Document changes** in this README

### Testing Changes Locally

```bash
# From monorepo root, changes are automatically available via npm workspaces
cd promptcraft-shared
# Edit files...

# Test in extension
cd ../PromptCraft
npm start  # Changes are immediately available

# Test in web app
cd ../craft-site
npm start  # Changes are immediately available

# Test in API
cd ../promptcraft-api
npm run dev  # Changes are immediately available
```

### Adding New Structures

1. Create structure file in `src/structures/`
2. Add factory function: `createXxx(data)`
3. Add to `src/structures/index.js` exports
4. Create validator in `src/validators/`
5. Add to `src/validators/index.js` exports
6. Add JSDoc type definitions
7. Update this README with usage examples

### Adding New Constants

1. Create constant file in `src/constants/`
2. Export constant object
3. Add to `src/constants/index.js` exports
4. Document purpose and structure
5. Update this README

### Publishing to NPM (Future)

```bash
# Update version
npm version patch  # or minor, or major

# Build if needed
npm run build

# Publish
npm publish --access public
```

## Recent Updates

### November 2024
- ✅ Consolidated documentation to single README per project
- ✅ Enhanced usage examples with practical code snippets
- ✅ Added "How Projects Use This Library" section
- ✅ Documented all key features and design principles
- ✅ Improved structure documentation
- ✅ Added development guidelines

### Version 1.1.0 (API Client Library)
- Complete API client library for consuming the API
- HTTP client with automatic JWT token refresh
- Centralized route constants and URL builders
- Comprehensive JSDoc type definitions
- Request/response validators
- High-level service modules (auth, templates, contexts, teams, AI)
- Global error handling and interceptors

### Version 1.0.0 (Initial Release)
- Template structure and validation
- Context layer structure and validation
- User structure
- Category hierarchy (150+ categories) and helpers
- Variable type definitions (10 semantic types)
- Subscription limits and tier management
- Analysis and optimization structures
- Complete validation suite
- Helper utilities for common operations

## Contributing

1. Create feature branch from `main`
2. Make changes following design principles
3. Test in all consuming projects
4. Update documentation
5. Submit pull request with description

## License

MIT License - see LICENSE file for details

## Support

**Questions**: Check usage examples in this README first

**Issues**: Report via GitHub Issues

**Development**: See "Development" section above for guidelines

---

**Package:** @promptcraft/shared
**Version:** 1.1.0
**License:** MIT
**Dependencies:** Zero (core library), minimal for optional features

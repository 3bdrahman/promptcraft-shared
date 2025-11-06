# @promptcraft/shared

**Single Source of Truth** for PromptCraft's data structures, constants, and business logic.

This package is shared between:
- **PromptCraft Extension** (Chrome extension)
- **PromptCraft Web App** (React web application)
- **PromptCraft API** (Vercel serverless functions)

## Installation

```bash
# In the monorepo root
npm install

# The package will be linked automatically via workspaces
```

## Usage

### Shared Structures and Constants

```javascript
// Import everything
import * as PromptCraft from '@promptcraft/shared';

// Or import specific modules
import { createTemplate, validateTemplate } from '@promptcraft/shared/structures';
import { TEMPLATE_CATEGORIES, VARIABLE_TYPES } from '@promptcraft/shared/constants';
import { isValidCategory, combineContexts } from '@promptcraft/shared/helpers';
```

### API

```javascript
// Import the API router
import handler from '@promptcraft/shared/api';

// Use with Express, Next.js, or Vercel
app.all('/api/*', handler);
```

See [api/README.md](./api/README.md) for complete API documentation.

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
└── index.js          # Main entry point

api/                  # Complete API implementation
├── router.js         # Main serverless function handler
├── _lib/
│   ├── auth/         # JWT, password hashing, middleware
│   ├── endpoints/    # API endpoint handlers
│   └── shared/       # Database, responses, utilities
└── README.md         # Detailed API documentation
```

## Design Principles

1. **Current Schema First** - Mirrors existing database schema exactly
2. **Backward Compatible** - New fields are optional
3. **Pure JavaScript** - No TypeScript, no build step needed
4. **Well Documented** - Every field explains why it exists
5. **Validation Included** - Consistent validation across projects
6. **Helper Functions** - Common operations are provided

## API Integration

This package now includes the complete PromptCraft API implementation, migrated from the main repository. The API provides:

- **Authentication** - JWT-based auth with access/refresh tokens
- **Templates** - CRUD operations for prompt templates
- **Contexts** - Layers, profiles, combinations, and snippets
- **Analytics** - Usage tracking and statistics
- **Subscriptions** - User subscription management

**Dependencies:**
- `pg` - PostgreSQL database client
- `jsonwebtoken` - JWT token handling
- `bcryptjs` - Password hashing
- `resend` - Email service

See [api/README.md](./api/README.md) for detailed API documentation.

## Version History

### 1.0.0 (Initial Release)
- Template structure and validation
- Context layer structure and validation
- User structure
- Category hierarchy and helpers
- Variable type definitions
- Subscription limits
- Analysis and optimization structures
- **Complete API implementation** (migrated from promptcraft repository)
  - Authentication system (JWT, password hashing)
  - Template endpoints
  - Context management endpoints
  - Analytics and subscription endpoints
  - Database integration
  - Email service integration

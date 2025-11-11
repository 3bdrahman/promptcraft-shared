# @promptcraft/shared

**Pure Shared Library** for PromptCraft's data structures, constants, validators, and utilities.

This zero-dependency package is shared between:
- **PromptCraft Extension** (Chrome extension)
- **PromptCraft Web App** (React web application)
- **PromptCraft API** (Express API server)

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

### API Client (NEW!)

The shared package now includes a complete API client library for consuming the API:

```javascript
import api from '@promptcraft/shared/api';

// Configure the client (once at app startup)
api.client.config.setBaseUrl('https://api.promptcraft.app');
api.client.config.setTokens(accessToken, refreshToken);

// Use the API services
const templates = await api.services.templates.getTemplates();
const user = await api.services.auth.login({ email, password });
const layers = await api.services.contexts.getLayers();
```

**Features:**
- ✅ Automatic JWT token refresh
- ✅ Type-safe responses (JSDoc/TypeScript)
- ✅ Centralized error handling
- ✅ Request/response validation
- ✅ Standardized API routes

See [API_CLIENT_GUIDE.md](./API_CLIENT_GUIDE.md) for complete client usage guide.

### API Server

```javascript
// Import the API server router
import handler from '@promptcraft/shared/api/server';

// Use with Express, Next.js, or Vercel
app.all('/api/*', handler);
```

See [api/README.md](./api/README.md) for server API documentation.

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

### 1.1.0 (API Client Library)
- **NEW: Complete API client library** for consuming the API
  - HTTP client with automatic JWT token refresh
  - Centralized route constants and URL builders
  - Comprehensive JSDoc type definitions
  - Request/response validators
  - High-level service modules (auth, templates, contexts, teams, AI)
  - Global error handling and interceptors
  - Full documentation and integration guides
- Package exports updated for granular module imports
- Fixes for API-related errors (404s, null responses)
- Migration guide for web app and extension

### 1.0.0 (Initial Release)
- Template structure and validation
- Context layer structure and validation
- User structure
- Category hierarchy and helpers
- Variable type definitions
- Subscription limits
- Analysis and optimization structures
- **Complete API server implementation**
  - Authentication system (JWT, password hashing)
  - Template endpoints
  - Context management endpoints
  - Analytics and subscription endpoints
  - Database integration
  - Email service integration

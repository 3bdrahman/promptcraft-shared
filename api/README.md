# PromptCraft API

Complete API implementation for the PromptCraft platform, including authentication, templates, contexts, analytics, and subscriptions.

## Overview

This API is designed for serverless deployment (Vercel) and provides a comprehensive backend for the PromptCraft application ecosystem.

## Architecture

```
api/
├── router.js                  # Main API router (consolidates all endpoints)
├── auth-router.js             # Separate auth router (legacy)
├── router-minimal.js          # Minimal router for testing
├── router-debug.js            # Debug router with logging
├── test.js                    # API tests
├── package.json               # API-specific dependencies
└── _lib/
    ├── auth/                  # Authentication utilities
    │   ├── jwt.js            # JWT token generation/verification
    │   ├── password.js       # Password hashing with bcrypt
    │   └── middleware.js     # Auth middleware
    ├── endpoints/            # API endpoint handlers
    │   ├── templates.js      # Template CRUD operations
    │   ├── layers.js         # Context layers management
    │   ├── profiles.js       # User profiles
    │   ├── combinations.js   # Context combinations
    │   ├── snippets.js       # Reusable snippets
    │   ├── analytics.js      # Usage analytics
    │   ├── subscription.js   # Legacy subscription
    │   ├── subscriptions.js  # Enterprise subscriptions
    │   ├── auth-by-email.js  # Email-based auth (legacy)
    │   └── auth/            # Modern auth endpoints
    │       ├── signup.js     # User registration
    │       ├── login.js      # User login
    │       ├── logout.js     # Session logout
    │       ├── logout-all.js # Logout all devices
    │       ├── refresh.js    # Token refresh
    │       ├── verify-pin.js # Email verification
    │       └── resend-pin.js # Resend verification
    └── shared/              # Shared utilities
        ├── database.js       # PostgreSQL connection
        ├── responses.js      # Standard API responses
        ├── auth.js          # Auth helper functions
        ├── category-helpers.js # Category utilities
        ├── context-builder.js # Context building logic
        ├── email.js         # Email service (Resend)
        └── token-tracking.js # Token management
```

## Dependencies

- **pg** `^8.11.3` - PostgreSQL client
- **jsonwebtoken** `^9.0.2` - JWT authentication
- **bcryptjs** `^3.0.2` - Password hashing
- **resend** `^6.2.2` - Email service

## Environment Variables

Required environment variables for API operation:

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# JWT Secrets
JWT_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret

# Token Expiry (optional)
ACCESS_TOKEN_EXPIRY=30m
REFRESH_TOKEN_EXPIRY=30d

# Email (Resend)
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout current session
- `POST /api/auth/logout-all` - Logout all sessions
- `POST /api/auth/verify-pin` - Verify email with PIN
- `POST /api/auth/resend-pin` - Resend verification PIN

### Templates

- `GET /api/templates` - List public templates
- `GET /api/templates/:id` - Get single template
- `GET /api/templates/favorites` - Get user's favorites
- `GET /api/templates/my-templates` - Get user's private templates
- `POST /api/templates` - Create new template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template
- `POST /api/templates/:id/favorite` - Toggle favorite status

### Contexts

- `GET /api/contexts/layers` - Get context layers
- `POST /api/contexts/layers` - Create context layer
- `PUT /api/contexts/layers/:id` - Update context layer
- `DELETE /api/contexts/layers/:id` - Delete context layer

- `GET /api/contexts/profiles` - Get context profiles
- `POST /api/contexts/profiles` - Create context profile
- `PUT /api/contexts/profiles/:id` - Update context profile
- `DELETE /api/contexts/profiles/:id` - Delete context profile

- `GET /api/contexts/combinations` - Get saved combinations
- `POST /api/contexts/combinations` - Save combination
- `DELETE /api/contexts/combinations/:id` - Delete combination

- `GET /api/contexts/snippets` - Get snippets
- `POST /api/contexts/snippets` - Create snippet
- `PUT /api/contexts/snippets/:id` - Update snippet
- `DELETE /api/contexts/snippets/:id` - Delete snippet

### Analytics

- `POST /analytics/track` - Track usage event
- `GET /analytics/stats` - Get usage statistics

### Subscriptions

- `GET /subscriptions` - Get user subscription
- `POST /subscriptions` - Create subscription
- `PUT /subscriptions/:id` - Update subscription

## Usage

### In Vercel

Deploy the `router.js` file as a serverless function. The `vercel.json` configuration should route all API requests to this handler:

```json
{
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/router.js" },
    { "source": "/analytics/(.*)", "destination": "/api/router.js" },
    { "source": "/subscriptions/(.*)", "destination": "/api/router.js" }
  ]
}
```

### As an npm Package

Import the API router in your application:

```javascript
import handler from '@promptcraft/shared/api';

// Use with your Node.js server
app.all('/api/*', handler);
```

### Response Format

All API responses follow a consistent format:

**Success Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "code": 400,
  "details": null,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Paginated Response:**
```json
{
  "success": true,
  "results": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 100,
    "totalPages": 4
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Authentication

The API uses JWT-based authentication with access and refresh tokens.

### Token Flow

1. User logs in with credentials
2. Server returns access token (30min) and refresh token (30 days)
3. Client includes access token in `Authorization: Bearer <token>` header
4. When access token expires, use refresh token to get new access token
5. Refresh tokens are stored in database and can be revoked

### Protected Endpoints

Most endpoints require authentication. Include the JWT in the Authorization header:

```
Authorization: Bearer <access-token>
```

## Database Schema

The API expects the following PostgreSQL tables:

- `users` - User accounts
- `templates` - Prompt templates
- `favorites` - User template favorites
- `context_layers` - Context layers
- `context_profiles` - Context profiles
- `context_combinations` - Saved context combinations
- `context_snippets` - Reusable snippets
- `refresh_tokens` - Active refresh tokens
- `analytics_events` - Usage tracking
- `subscriptions` - User subscriptions

See migration files in the main repository for detailed schema.

## Security Features

- JWT-based authentication with separate access/refresh tokens
- Bcrypt password hashing
- CORS protection
- SQL injection prevention via parameterized queries
- Token revocation support
- Device tracking for sessions

## Development

### Testing Locally

1. Set up environment variables
2. Run database migrations
3. Start the API server:

```bash
npm install
node api/router.js
```

### Debug Mode

Use `router-debug.js` for detailed logging:

```javascript
import handler from './api/router-debug.js';
```

## Integration with Shared Package

The API uses shared constants and structures from the main package:

```javascript
import { TEMPLATE_CATEGORIES, TEMPLATE_TAGS } from '../src/constants/categories.js';
import { Template, User, Context } from '../src/structures/index.js';
```

This ensures consistency across extension, web app, and API.

## License

MIT

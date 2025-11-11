# PromptCraft API Client Library

This directory contains the complete API client library for PromptCraft. It provides a standardized way to interact with the PromptCraft API from both the web application and browser extension.

## Directory Structure

```
src/api/
├── client.js           # HTTP client with automatic token refresh
├── routes.js           # API route constants and URL builders
├── types.js            # JSDoc type definitions for all API responses
├── validators.js       # Request/response validation functions
├── services/           # High-level API service modules
│   ├── index.js        # Services barrel export
│   ├── auth.js         # Authentication services
│   ├── templates.js    # Template services
│   ├── contexts.js     # Context/layer services
│   ├── teams.js        # Team services
│   └── ai.js           # AI services
└── index.js            # Main API module export
```

## Key Features

### 🔐 Authentication

- Automatic JWT token refresh
- Secure token storage integration
- Unauthorized error handling
- Session management

### 🛡️ Type Safety

- Comprehensive JSDoc type definitions
- Full TypeScript support
- Inline documentation
- IntelliSense support

### ✅ Validation

- Request data validation
- Response format validation
- Field-level validators
- Custom validation rules

### 🔄 Error Handling

- Typed error objects
- Global error handlers
- Automatic retry logic
- User-friendly error messages

### 📡 Network

- Automatic request/response parsing
- CORS handling
- Query parameter serialization
- Request deduplication

## Usage Patterns

### Import Everything

```javascript
import api from '@promptcraft/shared/api';

api.client.config.setBaseUrl('https://api.example.com');
const templates = await api.services.templates.getTemplates();
```

### Import Specific Services

```javascript
import { templates, auth } from '@promptcraft/shared/api';

const user = await auth.login({ email, password });
const list = await templates.getTemplates();
```

### Import Client Only

```javascript
import { http, config } from '@promptcraft/shared/api/client';

config.setBaseUrl('https://api.example.com');
const response = await http.get('/api/templates');
```

### Import Routes Only

```javascript
import { API_ROUTES } from '@promptcraft/shared/api/routes';

console.log(API_ROUTES.TEMPLATES.LIST); // '/api/templates'
console.log(API_ROUTES.TEMPLATES.byId('123')); // '/api/templates/123'
```

## Module Exports

### client.js

Exports:
- `config` - API client configuration
- `http` - HTTP methods (get, post, put, delete, patch)
- `ApiError` - Custom error class
- `isApiError()` - Error type checker
- `getErrorMessage()` - Error message extractor
- `normalizeResponse()` - Response normalizer

### routes.js

Exports:
- `API_ROUTES` - All route constants organized by resource
- `AUTH_ROUTES` - Authentication endpoints
- `TEMPLATE_ROUTES` - Template endpoints
- `CONTEXT_ROUTES` - Context/layer endpoints
- `TEAM_ROUTES` - Team endpoints
- `AI_ROUTES` - AI endpoints
- `buildQueryString()` - Query string builder
- `buildUrl()` - URL with query params builder

### types.js

Provides JSDoc type definitions for:
- API responses (success, error, paginated)
- Authentication (User, AuthTokens, LoginResponse)
- Templates (Template, TemplateVariable)
- Contexts (ContextLayer, ContextRelationship, ContextVersion)
- Teams (Team, TeamMember, TeamInvitation)
- AI (AIProvider, AIGenerationRequest, AIGenerationResponse)

### validators.js

Exports:
- `ValidationError` - Custom validation error class
- Generic validators (required, isEmail, isUUID, etc.)
- Resource validators (validateTemplateData, validateLayerData, etc.)
- Constant enums (LAYER_TYPES, VISIBILITY_TYPES, TEAM_ROLES)

### services/

Each service module exports functions for:
- **auth.js**: signup, login, logout, verify email, etc.
- **templates.js**: CRUD operations, favorites, search
- **contexts.js**: layers, composition, relationships, versions, search
- **teams.js**: teams, members, invitations
- **ai.js**: generation, embeddings, providers

## Configuration

### Setting Base URL

```javascript
import { config } from '@promptcraft/shared/api/client';

// Production
config.setBaseUrl('https://api.promptcraft.app');

// Development
config.setBaseUrl('http://localhost:3000');

// Custom
config.setBaseUrl(process.env.VITE_API_URL);
```

### Authentication Setup

```javascript
import { config } from '@promptcraft/shared/api/client';

// Set tokens after login
config.setTokens(accessToken, refreshToken);

// Clear tokens on logout
config.clearTokens();

// Handle token refresh
config.onTokenRefreshed((accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
});

// Handle unauthorized errors
config.onUnauthorizedError(() => {
  localStorage.clear();
  window.location.href = '/login';
});

// Handle all errors
config.onErrorResponse((error) => {
  console.error('API Error:', error);
});
```

## Error Handling

### API Errors

```javascript
import { isApiError, getErrorMessage } from '@promptcraft/shared/api';

try {
  const result = await api.services.templates.getTemplates();
} catch (error) {
  if (isApiError(error)) {
    // API error
    console.error(error.message);  // User-friendly message
    console.error(error.code);     // HTTP status code
    console.error(error.details);  // Additional details
  } else {
    // Other error (network, etc.)
    console.error(getErrorMessage(error));
  }
}
```

### Validation Errors

```javascript
import { validators } from '@promptcraft/shared/api';

try {
  validators.validateTemplateData({ name: 'Test' }); // Missing content
} catch (error) {
  if (validators.isValidationError(error)) {
    console.error(error.field);   // 'content'
    console.error(error.errors);  // ['content is required']
  }
}
```

## Response Formats

All API responses follow a consistent format:

### Success Response

```javascript
{
  success: true,
  data: { ... },
  message: 'Operation successful',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Error Response

```javascript
{
  success: false,
  error: 'Error message',
  code: 400,
  details: null,
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

### Paginated Response

```javascript
{
  success: true,
  results: [ ... ],
  pagination: {
    page: 1,
    limit: 25,
    total: 100,
    totalPages: 4,
    hasMore: true,
    hasNextPage: true,
    hasPrev: false
  },
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

## Integration Examples

### React

```javascript
import { useEffect, useState } from 'react';
import api from '@promptcraft/shared/api';

function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.services.templates.getTemplates()
      .then(res => setTemplates(res.templates))
      .catch(err => setError(api.client.getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return { templates, loading, error };
}
```

### Browser Extension

```javascript
// background.js
import api from '@promptcraft/shared/api';

// Load tokens from storage
chrome.storage.local.get(['accessToken', 'refreshToken'], (result) => {
  if (result.accessToken) {
    api.client.config.setTokens(result.accessToken, result.refreshToken);
  }
});

// Handle messages from popup/content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTemplates') {
    api.services.templates.getTemplates(request.filters)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({
        success: false,
        error: api.client.getErrorMessage(error)
      }));
    return true;
  }
});
```

### Vue 3

```javascript
import { ref, onMounted } from 'vue';
import api from '@promptcraft/shared/api';

export function useTemplates() {
  const templates = ref([]);
  const loading = ref(true);
  const error = ref(null);

  async function load() {
    try {
      loading.value = true;
      const res = await api.services.templates.getTemplates();
      templates.value = res.templates;
    } catch (err) {
      error.value = api.client.getErrorMessage(err);
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  return { templates, loading, error, reload: load };
}
```

## Testing

```javascript
import api from '@promptcraft/shared/api';

// Mock the HTTP client for testing
jest.mock('@promptcraft/shared/api/client', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  config: {
    setBaseUrl: jest.fn(),
    setTokens: jest.fn(),
  }
}));

// Test
test('getTemplates returns templates', async () => {
  api.client.http.get.mockResolvedValue({
    templates: [{ id: '1', name: 'Test' }]
  });

  const result = await api.services.templates.getTemplates();
  expect(result.templates).toHaveLength(1);
});
```

## Best Practices

1. **Always configure before use**: Set base URL and tokens at app initialization
2. **Use services, not raw HTTP**: Prefer `api.services.templates.getTemplates()` over `http.get('/api/templates')`
3. **Handle errors**: Always use try-catch or .catch() for API calls
4. **Use route constants**: Import routes from `API_ROUTES` instead of hardcoding
5. **Validate before sending**: Use validators to catch errors before API calls
6. **Type your responses**: Use JSDoc or TypeScript for IntelliSense and type safety

## See Also

- [API Client Guide](../../API_CLIENT_GUIDE.md) - Complete usage guide
- [Server API](../../../api/router.js) - Server-side API implementation
- [Constants](../constants/) - Shared constants (limits, categories, etc.)
- [Structures](../structures/) - Data models and validators

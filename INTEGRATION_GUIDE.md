# Integration Guide: Migrating to Shared API Client

This guide helps you migrate your existing web app and browser extension to use the new shared API client library.

## Overview

The shared package now includes a complete API client that provides:
- ✅ Standardized API routes
- ✅ Automatic token refresh
- ✅ Type-safe responses
- ✅ Error handling
- ✅ Request validation
- ✅ Consistent response formats

## Installation

### Step 1: Update the Shared Package

In your web app and extension projects:

```bash
# If using local development
npm install ../promptcraft-shared

# If published to npm
npm install @promptcraft/shared@latest
```

### Step 2: Remove Old API Code

You can now remove:
- ❌ Custom fetch wrappers
- ❌ Hardcoded API URLs
- ❌ Custom error handling
- ❌ Token refresh logic
- ❌ Request/response parsing

## Web Application Migration

### Before (Old Code)

```javascript
// api/contextAPI.js
export const fetchContexts = async (userId) => {
  const response = await fetch(`/api/contexts/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contexts');
  }

  const data = await response.json();
  return data;
};
```

### After (New Code)

```javascript
// api/contextAPI.js
import { contexts } from '@promptcraft/shared/api';

export const fetchContexts = async () => {
  // The API client handles auth headers automatically
  const layers = await contexts.getLayers();
  return layers;
};
```

### Setup in App Entry Point

```javascript
// main.jsx or App.jsx
import api from '@promptcraft/shared/api';

// Configure API client once at startup
api.client.config.setBaseUrl(import.meta.env.VITE_API_URL || 'http://localhost:3000');

// Load tokens from storage
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

if (accessToken) {
  api.client.config.setTokens(accessToken, refreshToken);
}

// Handle token refresh
api.client.config.onTokenRefreshed((accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
});

// Handle unauthorized errors
api.client.config.onUnauthorizedError(() => {
  localStorage.clear();
  window.location.href = '/login';
});
```

## Fixing Your Errors

### Error 1: 404 on `/api/contexts/${userId}`

**Problem**: The endpoint expects `/api/contexts/layers`, not `/api/contexts/${userId}`

**Old Code**:
```javascript
fetch(`/api/contexts/${userId}`)
```

**New Code**:
```javascript
import { contexts } from '@promptcraft/shared/api';

// Get all layers for authenticated user
const layers = await contexts.getLayers();

// Or with filters
const layers = await contexts.getLayers({
  layer_type: 'project',
  visibility: 'private'
});
```

### Error 2: Cannot read properties of null (reading 'success')

**Problem**: Response format mismatch or HTML error page returned

**Old Code**:
```javascript
const response = await fetch('/api/contexts/...');
const data = await response.json();
if (data.success) {  // Breaks if data is null
  return data.data;
}
```

**New Code**:
```javascript
import { contexts } from '@promptcraft/shared/api';

try {
  const layers = await contexts.getLayers();
  // Response is already unwrapped and validated
  return layers;
} catch (error) {
  // Proper error handling
  console.error('Failed to fetch layers:', error.message);
}
```

### Error 3: 404 on `/api/templates/${userId}`

**Problem**: Wrong endpoint format

**Old Code**:
```javascript
fetch(`/api/templates/${userId}`)
```

**New Code**:
```javascript
import { templates } from '@promptcraft/shared/api';

// Get my templates
const myTemplates = await templates.getMyTemplates();

// Get public templates
const publicTemplates = await templates.getTemplates();

// Get single template by ID
const template = await templates.getTemplate(templateId);
```

### Error 4: 404 on `/api/teams?userId=${userId}`

**Problem**: Teams endpoint doesn't need userId in query

**Old Code**:
```javascript
fetch(`/api/teams?userId=${userId}`)
```

**New Code**:
```javascript
import { teams } from '@promptcraft/shared/api';

// Get teams (automatically uses authenticated user)
const { teams: myTeams } = await teams.getTeams();
```

## Component Migration Examples

### React Component Example

**Before**:
```javascript
import { useEffect, useState } from 'react';

function ContextsPage() {
  const [contexts, setContexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    fetch(`/api/contexts/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data && data.success) {
        setContexts(data.data);
      }
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  return <div>...</div>;
}
```

**After**:
```javascript
import { useEffect, useState } from 'react';
import { contexts } from '@promptcraft/shared/api';

function ContextsPage() {
  const [contextList, setContextList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    contexts.getLayers()
      .then(layers => setContextList(layers))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>...</div>;
}
```

### Login Component Example

**Before**:
```javascript
async function handleLogin(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (data.success) {
    localStorage.setItem('token', data.tokens.accessToken);
    localStorage.setItem('refreshToken', data.tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
}
```

**After**:
```javascript
import api from '@promptcraft/shared/api';

async function handleLogin(email, password) {
  try {
    const { user, tokens } = await api.services.auth.login({ email, password });

    // Store tokens
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    // Configure API client
    api.client.config.setTokens(tokens.accessToken, tokens.refreshToken);

    return user;
  } catch (error) {
    throw new Error(error.message || 'Login failed');
  }
}
```

## Browser Extension Migration

### Background Script Setup

```javascript
// background.js
import api from '@promptcraft/shared/api';

// Configure API
api.client.config.setBaseUrl('https://api.promptcraft.app');

// Load tokens from chrome.storage
chrome.storage.local.get(['accessToken', 'refreshToken'], (result) => {
  if (result.accessToken) {
    api.client.config.setTokens(result.accessToken, result.refreshToken);
  }
});

// Save tokens when refreshed
api.client.config.onTokenRefreshed((accessToken, refreshToken) => {
  chrome.storage.local.set({ accessToken, refreshToken });
});

// Clear tokens on unauthorized
api.client.config.onUnauthorizedError(() => {
  chrome.storage.local.remove(['accessToken', 'refreshToken', 'user']);
  chrome.tabs.create({ url: 'https://app.promptcraft.app/login' });
});

// Message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTemplates') {
    api.services.templates.getTemplates(request.filters)
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }

  if (request.action === 'getContexts') {
    api.services.contexts.getLayers()
      .then(data => sendResponse({ success: true, data }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true;
  }
});
```

## Common Patterns

### Pattern 1: List with Filters

**Before**:
```javascript
const url = new URL('/api/templates', window.location.origin);
url.searchParams.append('category', 'code');
url.searchParams.append('limit', '25');

const response = await fetch(url);
const data = await response.json();
```

**After**:
```javascript
import { templates } from '@promptcraft/shared/api';

const { templates: list, pagination } = await templates.getTemplates({
  category: 'code',
  limit: 25
});
```

### Pattern 2: Create Resource

**Before**:
```javascript
const response = await fetch('/api/templates', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'My Template',
    content: 'Content'
  })
});

const data = await response.json();
```

**After**:
```javascript
import { templates } from '@promptcraft/shared/api';

const newTemplate = await templates.createTemplate({
  name: 'My Template',
  content: 'Content'
});
```

### Pattern 3: Error Handling

**Before**:
```javascript
try {
  const response = await fetch('/api/templates');
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  if (!data.success) {
    throw new Error(data.error || 'Unknown error');
  }

  return data.data;
} catch (error) {
  console.error(error);
}
```

**After**:
```javascript
import { templates, isApiError, getErrorMessage } from '@promptcraft/shared/api';

try {
  const result = await templates.getTemplates();
  return result;
} catch (error) {
  if (isApiError(error)) {
    // API error with details
    console.error('API Error:', error.message, error.code);
  } else {
    // Network or other error
    console.error('Error:', getErrorMessage(error));
  }
}
```

## Environment Variables

### Web App (.env)

```env
VITE_API_URL=http://localhost:3000
```

### Browser Extension (manifest.json)

```json
{
  "host_permissions": [
    "https://api.promptcraft.app/*"
  ]
}
```

## Testing

### Mock the API Client

```javascript
// __mocks__/@promptcraft/shared/api.js
export const templates = {
  getTemplates: jest.fn(),
  createTemplate: jest.fn(),
  updateTemplate: jest.fn(),
  deleteTemplate: jest.fn(),
};

export const contexts = {
  getLayers: jest.fn(),
  createLayer: jest.fn(),
};

export default {
  services: { templates, contexts },
  client: {
    config: {
      setBaseUrl: jest.fn(),
      setTokens: jest.fn(),
    }
  }
};
```

### Test Example

```javascript
import { templates } from '@promptcraft/shared/api';

jest.mock('@promptcraft/shared/api');

test('loads templates', async () => {
  templates.getTemplates.mockResolvedValue({
    templates: [{ id: '1', name: 'Test' }],
    pagination: { total: 1 }
  });

  const result = await templates.getTemplates();
  expect(result.templates).toHaveLength(1);
});
```

## Checklist

After migration, verify:

- [ ] API client is configured at app startup
- [ ] Tokens are loaded from storage
- [ ] Token refresh handler is set up
- [ ] Unauthorized handler redirects to login
- [ ] All fetch calls replaced with service calls
- [ ] Error handling uses isApiError()
- [ ] Routes use correct endpoints (no userId in paths)
- [ ] Response format is consistent
- [ ] TypeScript/JSDoc types work
- [ ] Tests are updated

## Support

For issues or questions:
- See [API_CLIENT_GUIDE.md](./API_CLIENT_GUIDE.md) for complete usage guide
- See [src/api/README.md](./src/api/README.md) for module documentation
- Check existing code examples in the guide
- File an issue on GitHub

## Summary

By migrating to the shared API client, you get:

1. **No more 404 errors** - Correct endpoint routes
2. **No more null errors** - Consistent response handling
3. **Automatic auth** - Token management built-in
4. **Type safety** - Full IntelliSense support
5. **Better DX** - Clean, simple API calls
6. **Easier maintenance** - Single source of truth

The migration is straightforward and will significantly improve code quality and reduce bugs.

# PromptCraft API Client Guide

Complete guide for using the PromptCraft shared API client in your web application and browser extension.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [API Services](#api-services)
  - [Authentication](#authentication)
  - [Templates](#templates)
  - [Contexts/Layers](#contextslayers)
  - [Teams](#teams)
  - [AI](#ai)
- [Error Handling](#error-handling)
- [TypeScript Support](#typescript-support)
- [Examples](#examples)

---

## Installation

The API client is included in the `@promptcraft/shared` package:

```bash
npm install @promptcraft/shared
```

---

## Quick Start

```javascript
import api from '@promptcraft/shared/api';

// Configure the client (do this once at app initialization)
api.client.config.setBaseUrl('https://api.promptcraft.app');

// Set authentication tokens
api.client.config.setTokens(accessToken, refreshToken);

// Use the API services
const templates = await api.services.templates.getTemplates();
const user = await api.services.auth.login({ email, password });
```

---

## Configuration

### Setting Base URL

Set the API base URL for all requests:

```javascript
import { config } from '@promptcraft/shared/api/client';

config.setBaseUrl('https://api.promptcraft.app');
// or for local development
config.setBaseUrl('http://localhost:3000');
```

### Authentication Tokens

Set access and refresh tokens after login:

```javascript
config.setTokens(accessToken, refreshToken);
```

Clear tokens on logout:

```javascript
config.clearTokens();
```

### Event Handlers

Set up event handlers for token refresh and authentication errors:

```javascript
// Called when tokens are automatically refreshed
config.onTokenRefreshed((accessToken, refreshToken) => {
  // Save new tokens to storage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
});

// Called on 401 Unauthorized errors
config.onUnauthorizedError(() => {
  // Redirect to login page
  window.location.href = '/login';
});

// Called on all API errors
config.onErrorResponse((error) => {
  console.error('API Error:', error.message);
  // Show global error notification
});
```

---

## API Services

### Authentication

```javascript
import { auth } from '@promptcraft/shared/api';

// Sign up
const { user, tokens } = await auth.signup({
  email: 'user@example.com',
  username: 'username',
  password: 'password123'
});

// Login
const { user, tokens } = await auth.login({
  email: 'user@example.com',
  password: 'password123'
});

// Verify email
await auth.verifyEmail({
  email: 'user@example.com',
  pin: '123456'
});

// Resend verification PIN
await auth.resendVerificationPin({
  email: 'user@example.com'
});

// Logout
await auth.logout();

// Logout from all devices
await auth.logoutAll();
```

### Templates

```javascript
import { templates } from '@promptcraft/shared/api';

// Get public templates
const { templates: list, pagination } = await templates.getTemplates({
  category: 'code-generation',
  search: 'javascript',
  tags: ['react', 'typescript'],
  limit: 25,
  offset: 0,
  sortBy: 'relevance' // or 'recent', 'alphabetical', 'rating'
});

// Get my templates
const { templates: myList } = await templates.getMyTemplates({
  limit: 50,
  offset: 0
});

// Get favorite templates
const { templates: favorites } = await templates.getFavoriteTemplates({
  page: 1,
  limit: 25
});

// Get single template
const { template } = await templates.getTemplate(templateId);

// Create template
const newTemplate = await templates.createTemplate({
  name: 'My Template',
  description: 'Template description',
  content: 'Template content with {{variables}}',
  category: 'code-generation',
  tags: ['javascript', 'react'],
  is_public: true
});

// Update template
const updated = await templates.updateTemplate(templateId, {
  name: 'Updated Name',
  content: 'Updated content'
});

// Delete template
await templates.deleteTemplate(templateId);

// Toggle favorite
const { isFavorited } = await templates.toggleFavorite(templateId);
```

### Contexts/Layers

```javascript
import { contexts } from '@promptcraft/shared/api';

// Get layers
const layers = await contexts.getLayers();

// Get single layer
const layer = await contexts.getLayer(layerId);

// Create layer
const newLayer = await contexts.createLayer({
  name: 'My Context',
  description: 'Description',
  content: 'Context content',
  layer_type: 'project', // profile, project, task, snippet, session, adhoc
  priority: 5,
  auto_include: true,
  visibility: 'private' // private, shared, public
});

// Update layer
const updated = await contexts.updateLayer(layerId, {
  name: 'Updated Name'
});

// Delete layer
await contexts.deleteLayer(layerId);

// Hierarchical composition
const tree = await contexts.getCompositionTree(layerId);
await contexts.addChild(parentId, { childId: childLayerId });
await contexts.removeChild(parentId, childId);
await contexts.reorderChildren(parentId, { childIds: [id1, id2, id3] });
const descendants = await contexts.getDescendants(layerId);

// Relationships
const relationships = await contexts.getRelationships();
await contexts.createRelationship({
  sourceLayerId: id1,
  targetLayerId: id2,
  relationshipType: 'requires' // requires, enhances, conflicts, replaces
});
await contexts.deleteRelationship(relationshipId);
const deps = await contexts.resolveDependencies(layerId);

// Version control
const versions = await contexts.getVersionHistory(layerId);
const version = await contexts.getVersion(layerId, versionId);
await contexts.revertToVersion(layerId, versionId);
const diff = await contexts.compareVersions(layerId, { from: v1, to: v2 });

// Search & recommendations
const results = await contexts.semanticSearch({
  query: 'search query',
  limit: 10
});
const recommendations = await contexts.getRecommendations({
  layerIds: [id1, id2]
});
const similar = await contexts.findSimilar(layerId);
```

### Teams

```javascript
import { teams } from '@promptcraft/shared/api';

// Get my teams
const { teams: myTeams } = await teams.getTeams();

// Get team details
const team = await teams.getTeam(teamId);

// Create team
const newTeam = await teams.createTeam({
  name: 'My Team',
  description: 'Team description'
});

// Update team
const updated = await teams.updateTeam(teamId, {
  name: 'Updated Name'
});

// Delete team
await teams.deleteTeam(teamId);

// Team members
const members = await teams.getTeamMembers(teamId);
await teams.updateTeamMember(teamId, memberId, {
  role: 'admin' // owner, admin, member, viewer
});
await teams.removeTeamMember(teamId, memberId);

// Invitations
const invitations = await teams.getTeamInvitations(teamId);
const invitation = await teams.createTeamInvitation(teamId, {
  email: 'user@example.com',
  role: 'member'
});
await teams.cancelTeamInvitation(teamId, invitationId);

// Accept/reject invitations (public endpoints)
const inviteDetails = await teams.getInvitationByToken(token);
await teams.acceptInvitation(token);
await teams.rejectInvitation(token);
```

### AI

```javascript
import { ai } from '@promptcraft/shared/api';

// Generate completion
const result = await ai.generate({
  prompt: 'Write a function that...',
  provider: 'openai', // openai, anthropic, google, huggingface
  model: 'gpt-4',
  max_tokens: 1000,
  temperature: 0.7
});

// Generate embeddings
const { embedding } = await ai.generateEmbeddings({
  text: 'Text to embed',
  model: 'text-embedding-ada-002'
});

// Get available providers
const providers = await ai.getProviders();
```

---

## Error Handling

### Using try-catch

```javascript
import { isApiError, getErrorMessage } from '@promptcraft/shared/api';

try {
  const templates = await api.services.templates.getTemplates();
} catch (error) {
  if (isApiError(error)) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.code);
    console.error('Details:', error.details);
  } else {
    console.error('Unknown Error:', getErrorMessage(error));
  }
}
```

### Global Error Handler

```javascript
import { config } from '@promptcraft/shared/api/client';

config.onErrorResponse((error) => {
  // Log to monitoring service
  console.error('API Error:', error);

  // Show user-friendly message
  if (error.code === 404) {
    showNotification('Resource not found');
  } else if (error.code === 403) {
    showNotification('Permission denied');
  } else if (error.code >= 500) {
    showNotification('Server error. Please try again later.');
  }
});
```

### Automatic Token Refresh

The client automatically handles token refresh:

```javascript
// Set up token refresh handler
config.onTokenRefreshed((accessToken, refreshToken) => {
  // Save tokens to storage
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
});

// If a request returns 401, the client will:
// 1. Attempt to refresh the token using the refresh token
// 2. Retry the original request with the new token
// 3. If refresh fails, call onUnauthorizedError()
```

---

## TypeScript Support

The API client includes comprehensive JSDoc type definitions:

```javascript
/**
 * @type {import('@promptcraft/shared/api').Template}
 */
const template = await templates.getTemplate(id);

/**
 * @type {import('@promptcraft/shared/api').User}
 */
const user = await auth.login({ email, password });
```

For TypeScript projects, you can use the types directly:

```typescript
import type { Template, User, Team } from '@promptcraft/shared/api';

const template: Template = await templates.getTemplate(id);
```

---

## Examples

### Complete React Example

```javascript
import { useEffect, useState } from 'react';
import api from '@promptcraft/shared/api';

// Initialize API client
api.client.config.setBaseUrl(import.meta.env.VITE_API_URL);

// Set up token refresh
api.client.config.onTokenRefreshed((accessToken, refreshToken) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
});

// Set up unauthorized handler
api.client.config.onUnauthorizedError(() => {
  localStorage.clear();
  window.location.href = '/login';
});

function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const response = await api.services.templates.getTemplates({
        limit: 25,
        sortBy: 'recent'
      });
      setTemplates(response.templates);
    } catch (err) {
      setError(api.client.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {templates.map(template => (
        <div key={template.id}>{template.name}</div>
      ))}
    </div>
  );
}
```

### Complete Browser Extension Example

```javascript
// background.js
import api from '@promptcraft/shared/api';

// Configure API client
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
  chrome.storage.local.remove(['accessToken', 'refreshToken']);
  chrome.tabs.create({ url: 'https://app.promptcraft.app/login' });
});

// Message handler for popup/content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTemplates') {
    api.services.templates.getTemplates(request.filters)
      .then(response => sendResponse({ success: true, data: response }))
      .catch(error => sendResponse({
        success: false,
        error: api.client.getErrorMessage(error)
      }));
    return true; // Keep channel open for async response
  }
});
```

### Using Routes Constants

```javascript
import { API_ROUTES } from '@promptcraft/shared/api';

// Use route constants for consistency
console.log(API_ROUTES.TEMPLATES.LIST); // '/api/templates'
console.log(API_ROUTES.TEMPLATES.byId('123')); // '/api/templates/123'
console.log(API_ROUTES.AUTH.LOGIN); // '/api/auth/login'
```

### Validation

```javascript
import { validators } from '@promptcraft/shared/api';

try {
  // Validate template data before creating
  validators.validateTemplateData({
    name: 'My Template',
    content: 'Template content'
  });

  const template = await api.services.templates.createTemplate({
    name: 'My Template',
    content: 'Template content'
  });
} catch (error) {
  if (validators.isValidationError(error)) {
    console.error('Validation errors:', error.errors);
  }
}
```

---

## Best Practices

1. **Initialize once**: Configure the API client once at app startup
2. **Handle tokens**: Set up token refresh and unauthorized handlers
3. **Error handling**: Always wrap API calls in try-catch blocks
4. **Type safety**: Use JSDoc or TypeScript for type checking
5. **Route constants**: Use `API_ROUTES` constants instead of hardcoded strings
6. **Validation**: Validate data before sending to API using built-in validators

---

## Migration from Direct Fetch Calls

Before (direct fetch):
```javascript
const response = await fetch(`/api/templates?limit=25`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();
if (!response.ok) {
  throw new Error(data.error);
}
```

After (using API client):
```javascript
const { templates } = await api.services.templates.getTemplates({
  limit: 25
});
```

The API client handles:
- ✅ Headers (auth, content-type)
- ✅ Request/response parsing
- ✅ Error handling
- ✅ Token refresh
- ✅ Type safety
- ✅ Consistent response format

---

## Support

For issues or questions, please file an issue on the GitHub repository.

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

## Teams & Collaboration

### Creating and Managing Teams

```javascript
// Create a new team
async function createTeam(name, description) {
  const response = await fetch('https://api.promptcraft.ai/api/teams', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, description })
  });

  const { data: team } = await response.json();

  console.log(team);
  // {
  //   id: "uuid",
  //   name: "Engineering Team",
  //   slug: "engineering-team",  // Auto-generated
  //   description: "Main engineering team",
  //   created_by: "user-uuid",
  //   owner_id: "user-uuid"
  // }

  return team;
}

// Get all user's teams
async function getUserTeams() {
  const response = await fetch('https://api.promptcraft.ai/api/teams', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const { teams } = await response.json();

  console.log(teams);
  // [
  //   {
  //     id: "uuid",
  //     name: "Engineering Team",
  //     description: "...",
  //     member_role: "owner",
  //     member_count: 5,
  //     created_at: "2025-01-01T00:00:00Z"
  //   }
  // ]

  return teams;
}

// Update team details (requires admin role)
async function updateTeam(teamId, updates) {
  const response = await fetch(`https://api.promptcraft.ai/api/teams/${teamId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  const { data: team } = await response.json();
  return team;
}

// Delete team (requires owner role)
async function deleteTeam(teamId) {
  const response = await fetch(`https://api.promptcraft.ai/api/teams/${teamId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  return response.json();
}
```

### Managing Team Members

```javascript
// Get team members
async function getTeamMembers(teamId) {
  const response = await fetch(`https://api.promptcraft.ai/api/teams/${teamId}/members`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const { members } = await response.json();

  console.log(members);
  // [
  //   {
  //     id: "member-uuid",
  //     user_id: "user-uuid",
  //     role: "owner",
  //     joined_at: "2025-01-01T00:00:00Z",
  //     username: "johndoe",
  //     email: "john@example.com"
  //   }
  // ]

  return members;
}

// Update member role (requires admin, cannot modify owner)
async function updateMemberRole(teamId, memberId, newRole) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/teams/${teamId}/members/${memberId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role: newRole })
    }
  );

  const { data: member } = await response.json();
  return member;
}

// Remove member from team (requires admin or self-removal)
async function removeMember(teamId, memberId) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/teams/${teamId}/members/${memberId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  return response.json();
}
```

### Team Invitations

```javascript
// Send team invitation (requires admin role)
async function inviteToTeam(teamId, email, role = 'member') {
  const response = await fetch(
    `https://api.promptcraft.ai/api/teams/${teamId}/invitations`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, role })
    }
  );

  const { data } = await response.json();

  console.log(data);
  // {
  //   invitation: { id, email, role, token, ... },
  //   invitationUrl: "http://localhost:3001/invitations/abc123..."
  // }

  // Send invitationUrl to the invited user via email
  return data;
}

// Get pending invitations (requires admin role)
async function getTeamInvitations(teamId) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/teams/${teamId}/invitations`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  const { invitations } = await response.json();

  console.log(invitations);
  // [
  //   {
  //     id: "invitation-uuid",
  //     email: "newuser@example.com",
  //     role: "member",
  //     status: "pending",
  //     inviter_username: "johndoe",
  //     created_at: "2025-01-01T00:00:00Z",
  //     expires_at: "2025-01-08T00:00:00Z"
  //   }
  // ]

  return invitations;
}

// Get invitation details by token (public, no auth required)
async function getInvitation(token) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/invitations/${token}`
  );

  const { data: invitation } = await response.json();

  console.log(invitation);
  // {
  //   email: "newuser@example.com",
  //   role: "member",
  //   status: "pending",
  //   team_name: "Engineering Team",
  //   team_slug: "engineering-team",
  //   inviter_username: "johndoe",
  //   expires_at: "2025-01-08T00:00:00Z"
  // }

  return invitation;
}

// Accept invitation (requires authentication, email must match)
async function acceptInvitation(token) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/invitations/${token}/accept`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  const { data } = await response.json();

  console.log(data);
  // {
  //   team: { id, name, slug, ... },
  //   message: "Successfully joined team"
  // }

  return data;
}

// Reject invitation (requires authentication, email must match)
async function rejectInvitation(token) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/invitations/${token}/reject`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  return response.json();
}

// Cancel invitation (requires admin role)
async function cancelInvitation(teamId, invitationId) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/teams/${teamId}/invitations/${invitationId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  return response.json();
}
```

### Team-Scoped Templates and Contexts

```javascript
// Create team template (visible to all team members)
async function createTeamTemplate(teamId, templateData) {
  const response = await fetch('https://api.promptcraft.ai/api/templates', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...templateData,
      team_id: teamId,
      visibility: 'team'  // 'private', 'team', or 'public'
    })
  });

  const { data: template } = await response.json();
  return template;
}

// Create team context layer
async function createTeamContext(teamId, contextData) {
  const response = await fetch('https://api.promptcraft.ai/api/contexts/layers', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...contextData,
      team_id: teamId,
      visibility: 'team'
    })
  });

  const { data: context } = await response.json();
  return context;
}

// Get team templates (filtered by team_id)
async function getTeamTemplates(teamId) {
  const response = await fetch(
    `https://api.promptcraft.ai/api/templates?team_id=${teamId}`,
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }
  );

  const { data: templates } = await response.json();
  return templates;
}
```

### Complete Team Workflow Example

```javascript
// Full workflow: Create team → Invite members → Share resources
async function teamCollaborationWorkflow() {
  // 1. Create a team
  const team = await createTeam('Engineering Team', 'Our main engineering team');
  console.log('Team created:', team.name);

  // 2. Invite team members
  const invitation1 = await inviteToTeam(team.id, 'developer@example.com', 'member');
  const invitation2 = await inviteToTeam(team.id, 'admin@example.com', 'admin');
  console.log('Invitations sent');

  // 3. Member accepts invitation (on their end)
  // await acceptInvitation(invitation1.invitation.token);

  // 4. Get team members
  const members = await getTeamMembers(team.id);
  console.log(`Team has ${members.length} members`);

  // 5. Promote a member to admin
  const memberToPromote = members.find(m => m.email === 'developer@example.com');
  if (memberToPromote) {
    await updateMemberRole(team.id, memberToPromote.id, 'admin');
    console.log('Member promoted to admin');
  }

  // 6. Create shared team template
  const template = await createTeamTemplate(team.id, {
    name: 'Code Review Guidelines',
    content: 'Review this {{language}} code for {{focus}} issues:\n\n{{code}}',
    category: 'code-generation',
    visibility: 'team'
  });
  console.log('Team template created:', template.name);

  // 7. Create shared team context
  const context = await createTeamContext(team.id, {
    name: 'Team Standards',
    content: 'Our team follows these coding standards...',
    layer_type: 'snippet',
    visibility: 'team'
  });
  console.log('Team context created:', context.name);

  // 8. Get all team resources
  const teamTemplates = await getTeamTemplates(team.id);
  console.log(`Team has ${teamTemplates.length} shared templates`);
}
```

### Role-Based Access Example

```javascript
// Helper function to check user's role in team
async function getUserTeamRole(teamId) {
  const teams = await getUserTeams();
  const team = teams.find(t => t.id === teamId);
  return team?.member_role;
}

// Conditional actions based on role
async function manageTeamBasedOnRole(teamId) {
  const role = await getUserTeamRole(teamId);

  if (role === 'owner') {
    console.log('You can: delete team, manage all members');
    // Can do anything
    await deleteTeam(teamId);
  } else if (role === 'admin') {
    console.log('You can: manage members, update team settings');
    // Can manage members and settings
    await updateTeam(teamId, { description: 'Updated description' });
    await inviteToTeam(teamId, 'newmember@example.com');
  } else if (role === 'member') {
    console.log('You can: view and create team resources');
    // Can view and create resources
    await createTeamTemplate(teamId, { /* template data */ });
  } else if (role === 'viewer') {
    console.log('You can: view team resources only');
    // Read-only access
    const templates = await getTeamTemplates(teamId);
  }
}
```

### Error Handling

```javascript
// Handle common team errors
async function robustTeamInvitation(teamId, email, role) {
  try {
    const result = await inviteToTeam(teamId, email, role);
    return { success: true, data: result };
  } catch (error) {
    const response = await error.response.json();

    if (response.error.code === 403) {
      return {
        success: false,
        error: 'You do not have permission to invite members'
      };
    } else if (response.error.code === 400) {
      if (response.error.message.includes('already a member')) {
        return {
          success: false,
          error: 'User is already a team member'
        };
      } else if (response.error.message.includes('invitation has already been sent')) {
        return {
          success: false,
          error: 'An invitation has already been sent to this email'
        };
      }
    }

    return {
      success: false,
      error: 'Failed to send invitation'
    };
  }
}
```

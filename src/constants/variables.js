/**
 * Variable Type Definitions
 *
 * Typed variables help users understand and organize template placeholders
 * semantically rather than just as generic text fields.
 *
 * Each variable type has:
 * - name: Display name
 * - description: What this type represents
 * - examples: Example values for this type
 * - icon: Visual identifier
 * - color: Color for UI highlighting
 */

export const VARIABLE_TYPES = {
  technology: {
    name: 'Technology',
    description: 'Programming languages, frameworks, tools, platforms',
    examples: ['Python', 'React', 'Docker', 'AWS', 'PostgreSQL', 'Git'],
    icon: '💻',
    color: '#3b82f6',
    placeholder: 'e.g., Python, React, Docker'
  },

  time: {
    name: 'Time',
    description: 'Dates, durations, schedules, deadlines',
    examples: ['2024-01-15', '2 weeks', 'Q4 2024', 'next Monday', '30 days'],
    icon: '⏰',
    color: '#8b5cf6',
    placeholder: 'e.g., 2024-01-15, 2 weeks'
  },

  place: {
    name: 'Place',
    description: 'Locations, regions, settings, environments',
    examples: ['New York', 'Europe', 'remote office', 'headquarters', 'online'],
    icon: '📍',
    color: '#10b981',
    placeholder: 'e.g., New York, remote office'
  },

  individualized: {
    name: 'Individualized',
    description: 'Personal preferences, custom values, user-specific data',
    examples: ['my_name', 'favorite_color', 'company_name', 'preferred_style'],
    icon: '👤',
    color: '#f59e0b',
    placeholder: 'e.g., your name, company name'
  },

  role: {
    name: 'Role/Persona',
    description: 'Perspectives, personas, job roles, character types',
    examples: ['senior developer', 'product manager', 'customer', 'expert consultant'],
    icon: '🎭',
    color: '#ec4899',
    placeholder: 'e.g., senior developer, manager'
  },

  format: {
    name: 'Format/Style',
    description: 'Output formats, writing styles, presentation modes',
    examples: ['markdown', 'formal', 'bullet points', 'JSON', 'table', 'conversational'],
    icon: '📝',
    color: '#06b6d4',
    placeholder: 'e.g., markdown, bullet points'
  },

  domain: {
    name: 'Domain-Specific',
    description: 'Industry-specific terms, specialized vocabulary',
    examples: ['healthcare', 'finance', 'legal', 'education', 'e-commerce'],
    icon: '🏢',
    color: '#84cc16',
    placeholder: 'e.g., healthcare, finance'
  },

  numeric: {
    name: 'Numeric',
    description: 'Numbers, counts, measurements, quantities',
    examples: ['100', '5 items', '2.5x', '$500', '75%'],
    icon: '🔢',
    color: '#6366f1',
    placeholder: 'e.g., 100, 5 items, 75%'
  },

  text: {
    name: 'General Text',
    description: 'General text input, descriptions, content',
    examples: ['topic', 'description', 'content', 'message', 'summary'],
    icon: '✏️',
    color: '#64748b',
    placeholder: 'e.g., your text here'
  },

  file: {
    name: 'File/Resource',
    description: 'File paths, URLs, resources, attachments',
    examples: ['document.pdf', 'https://example.com', 'image.png', 'data.csv'],
    icon: '📎',
    color: '#a855f7',
    placeholder: 'e.g., document.pdf, https://...'
  }
};

/**
 * Get display name for a variable type
 */
export function getVariableTypeName(type) {
  return VARIABLE_TYPES[type]?.name || 'General Text';
}

/**
 * Get icon for a variable type
 */
export function getVariableTypeIcon(type) {
  return VARIABLE_TYPES[type]?.icon || '✏️';
}

/**
 * Get color for a variable type
 */
export function getVariableTypeColor(type) {
  return VARIABLE_TYPES[type]?.color || '#64748b';
}

/**
 * Get placeholder text for a variable type
 */
export function getVariableTypePlaceholder(type) {
  return VARIABLE_TYPES[type]?.placeholder || 'Enter value';
}

/**
 * Guess variable type based on variable name
 * Used for auto-suggesting types when creating variables
 */
export function guessVariableType(varName) {
  const lower = varName.toLowerCase();

  // Technology patterns
  if (/(lang|framework|library|tool|platform|tech|code|api|database|stack)/i.test(lower)) {
    return 'technology';
  }

  // Time patterns
  if (/(date|time|deadline|duration|when|schedule|day|month|year|period)/i.test(lower)) {
    return 'time';
  }

  // Place patterns
  if (/(location|place|region|country|city|where|site|venue)/i.test(lower)) {
    return 'place';
  }

  // Role patterns
  if (/(role|persona|who|audience|user|character|position|title)/i.test(lower)) {
    return 'role';
  }

  // Format patterns
  if (/(format|style|tone|output|structure|type|mode)/i.test(lower)) {
    return 'format';
  }

  // Numeric patterns
  if (/(count|number|amount|quantity|size|length|price|cost|percent)/i.test(lower)) {
    return 'numeric';
  }

  // File patterns
  if (/(file|document|url|link|path|resource|attachment|upload)/i.test(lower)) {
    return 'file';
  }

  // Domain patterns
  if (/(industry|domain|field|sector|vertical|market)/i.test(lower)) {
    return 'domain';
  }

  // Individualized patterns (personal/custom)
  if (/(my|your|name|custom|personal|preference|setting)/i.test(lower)) {
    return 'individualized';
  }

  // Default to general text
  return 'text';
}

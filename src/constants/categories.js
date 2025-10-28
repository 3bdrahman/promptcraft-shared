/**
 * Template Categories - Single Source of Truth
 *
 * ULTIMATE TIMELESS AI PROMPT CATEGORIZATION SYSTEM
 *
 * DESIGN PRINCIPLES:
 * - Time-resistant: Based on fundamental human cognitive activities
 * - Specificity-resistant: Broad enough for user customization in template titles
 * - Universal: Works for all users, domains, and contexts
 * - Intuitive: Matches natural "When I want to..." mental models
 * - Output-focused: Level 3 categories are deliverable outputs
 *
 * STRUCTURE: 6 Level 1 (grandparents) → 30 Level 2 (parents) → 150 Level 3 (leaf categories)
 * COVERAGE: 95%+ of all AI use cases
 *
 * This is shared between extension, web app, and API.
 */

export const TEMPLATE_CATEGORIES = [
  {
    id: 'understand-analyze',
    label: 'Understand & Analyze',
    icon: '🔍',
    color: '#4ecdc4',
    description: 'Making sense of information, situations, and complex topics',
    children: [
      {
        id: 'information-processing',
        label: 'Information Processing',
        icon: '📊',
        description: 'Working with data, research, and information sources',
        children: [
          { id: 'summaries-overviews', label: 'Summaries & Overviews', icon: '📋' },
          { id: 'comparisons-analysis', label: 'Comparative Analysis', icon: '⚖️' },
          { id: 'insights-conclusions', label: 'Insights & Conclusions', icon: '💡' },
          { id: 'recommendations', label: 'Recommendations & Next Steps', icon: '🎯' },
          { id: 'data-interpretation', label: 'Data Interpretation Reports', icon: '📈' }
        ]
      },
      {
        id: 'situation-assessment',
        label: 'Situation Assessment',
        icon: '🌍',
        description: 'Understanding contexts, environments, and circumstances',
        children: [
          { id: 'context-analysis', label: 'Context Analysis Reports', icon: '🔍' },
          { id: 'stakeholder-mapping', label: 'Stakeholder Maps', icon: '👥' },
          { id: 'risk-opportunity-assessment', label: 'Risk & Opportunity Assessments', icon: '⚠️' },
          { id: 'environmental-impact', label: 'Environmental Impact Assessments', icon: '🌐' },
          { id: 'implications-impact', label: 'Impact Analysis Reports', icon: '📈' }
        ]
      },
      {
        id: 'pattern-recognition',
        label: 'Pattern Recognition',
        icon: '📈',
        description: 'Identifying trends, relationships, and recurring themes',
        children: [
          { id: 'trend-analysis', label: 'Trend Analysis Reports', icon: '📊' },
          { id: 'relationship-mapping', label: 'Relationship Maps', icon: '🔗' },
          { id: 'behavioral-patterns', label: 'Behavioral Pattern Analysis', icon: '🧠' },
          { id: 'anomaly-identification', label: 'Anomaly Detection Reports', icon: '🎯' },
          { id: 'predictive-insights', label: 'Predictive Analysis', icon: '🔮' }
        ]
      },
      {
        id: 'quality-evaluation',
        label: 'Quality Evaluation',
        icon: '📏',
        description: 'Assessing performance, standards, and effectiveness',
        children: [
          { id: 'assessment-criteria', label: 'Assessment Criteria & Rubrics', icon: '📐' },
          { id: 'performance-evaluations', label: 'Performance Evaluations', icon: '📊' },
          { id: 'gap-analysis', label: 'Gap Analysis Reports', icon: '🔍' },
          { id: 'improvement-recommendations', label: 'Improvement Recommendations', icon: '💡' },
          { id: 'benchmarking-reports', label: 'Benchmarking Reports', icon: '📏' }
        ]
      },
      {
        id: 'research-investigation',
        label: 'Research & Investigation',
        icon: '🔬',
        description: 'Systematic inquiry and evidence-based analysis',
        children: [
          { id: 'research-designs', label: 'Research Designs & Methodologies', icon: '🗺️' },
          { id: 'literature-reviews', label: 'Literature Reviews', icon: '📚' },
          { id: 'source-evaluations', label: 'Source Evaluations', icon: '✅' },
          { id: 'experimental-results', label: 'Experimental Results & Analysis', icon: '🧪' },
          { id: 'research-findings', label: 'Research Findings & Reports', icon: '🔍' }
        ]
      }
    ]
  },

  {
    id: 'create-express',
    label: 'Create & Express',
    icon: '✨',
    color: '#ff6b6b',
    description: 'Generating content, building solutions, and expressing ideas',
    children: [
      {
        id: 'content-generation',
        label: 'Content Generation',
        icon: '📝',
        description: 'Creating written, visual, and multimedia content',
        children: [
          { id: 'written-materials', label: 'Written Materials & Documents', icon: '📄' },
          { id: 'visual-content', label: 'Visual Content Concepts', icon: '🎨' },
          { id: 'multimedia-concepts', label: 'Multimedia Concepts', icon: '🎬' },
          { id: 'narrative-content', label: 'Stories & Narrative Content', icon: '📖' },
          { id: 'documentation-records', label: 'Documentation & Records', icon: '📋' }
        ]
      },
      {
        id: 'solution-building',
        label: 'Solution Building',
        icon: '🔧',
        description: 'Developing frameworks, systems, and practical solutions',
        children: [
          { id: 'frameworks-models', label: 'Frameworks & Models', icon: '🏗️' },
          { id: 'system-designs', label: 'System Designs & Architectures', icon: '🏛️' },
          { id: 'process-blueprints', label: 'Process Blueprints', icon: '🔄' },
          { id: 'implementation-guides', label: 'Implementation Guides', icon: '📋' },
          { id: 'tool-templates', label: 'Tools & Templates', icon: '🛠️' }
        ]
      },
      {
        id: 'idea-development',
        label: 'Idea Development',
        icon: '💡',
        description: 'Generating and refining concepts and innovations',
        children: [
          { id: 'brainstorming-outputs', label: 'Brainstorming Lists & Ideas', icon: '🌟' },
          { id: 'concept-designs', label: 'Concept Designs', icon: '🎯' },
          { id: 'innovation-proposals', label: 'Innovation Proposals', icon: '🚀' },
          { id: 'creative-combinations', label: 'Creative Combinations', icon: '🔀' },
          { id: 'vision-statements', label: 'Vision & Mission Statements', icon: '🗺️' }
        ]
      },
      {
        id: 'artistic-creative',
        label: 'Artistic & Creative',
        icon: '🎨',
        description: 'Creative, artistic, and entertainment content',
        children: [
          { id: 'creative-works', label: 'Creative Works & Art', icon: '🖼️' },
          { id: 'entertainment-content', label: 'Entertainment & Gaming Content', icon: '🎮' },
          { id: 'performance-scripts', label: 'Scripts & Performance Content', icon: '🎭' },
          { id: 'humor-comedy', label: 'Humor & Comedy Content', icon: '😄' },
          { id: 'personal-expressions', label: 'Personal Expressions', icon: '💭' }
        ]
      },
      {
        id: 'standards-guidelines',
        label: 'Standards & Guidelines',
        icon: '📏',
        description: 'Creating standards, guidelines, and compliance materials',
        children: [
          { id: 'policy-guidelines', label: 'Policies & Guidelines', icon: '📜' },
          { id: 'compliance-materials', label: 'Compliance Checklists & Materials', icon: '✅' },
          { id: 'accessibility-standards', label: 'Accessibility & Inclusion Standards', icon: '♿' },
          { id: 'ethical-frameworks', label: 'Ethical Guidelines & Frameworks', icon: '⚖️' },
          { id: 'best-practices', label: 'Best Practices & Standards', icon: '🌟' }
        ]
      }
    ]
  },

  {
    id: 'communicate-collaborate',
    label: 'Communicate & Collaborate',
    icon: '🤝',
    color: '#45b7d1',
    description: 'Sharing ideas, working with others, and building relationships',
    children: [
      {
        id: 'information-sharing',
        label: 'Information Sharing',
        icon: 'ℹ️',
        description: 'Conveying knowledge and data to others',
        children: [
          { id: 'explanations-descriptions', label: 'Explanations & Descriptions', icon: '💬' },
          { id: 'instructional-content', label: 'Instructions & How-to Content', icon: '📚' },
          { id: 'presentation-materials', label: 'Presentations & Slides', icon: '📊' },
          { id: 'documentation-guides', label: 'User Guides & Documentation', icon: '📄' },
          { id: 'status-reports', label: 'Status Reports & Updates', icon: '📈' }
        ]
      },
      {
        id: 'persuasion-influence',
        label: 'Persuasion & Influence',
        icon: '🎯',
        description: 'Convincing, motivating, and inspiring others',
        children: [
          { id: 'persuasive-content', label: 'Persuasive Arguments & Content', icon: '⚖️' },
          { id: 'motivational-content', label: 'Motivational Content', icon: '🌟' },
          { id: 'proposals-pitches', label: 'Proposals & Pitches', icon: '🚀' },
          { id: 'marketing-copy', label: 'Marketing Copy & Messaging', icon: '📢' },
          { id: 'negotiation-scripts', label: 'Negotiation Scripts & Strategies', icon: '🤝' }
        ]
      },
      {
        id: 'relationship-building',
        label: 'Relationship Building',
        icon: '🤗',
        description: 'Connecting with others and strengthening interpersonal bonds',
        children: [
          { id: 'conversation-starters', label: 'Conversation Starters', icon: '💬' },
          { id: 'networking-content', label: 'Networking Messages & Content', icon: '🌐' },
          { id: 'feedback-responses', label: 'Feedback & Response Templates', icon: '📝' },
          { id: 'support-messages', label: 'Support & Encouragement Messages', icon: '❤️' },
          { id: 'relationship-guides', label: 'Relationship Improvement Guides', icon: '💝' }
        ]
      },
      {
        id: 'team-coordination',
        label: 'Team Coordination',
        icon: '👥',
        description: 'Facilitating group work and collaboration',
        children: [
          { id: 'meeting-agendas', label: 'Meeting Agendas & Facilitation Guides', icon: '🗣️' },
          { id: 'collaboration-protocols', label: 'Collaboration Protocols', icon: '🔗' },
          { id: 'team-coordination', label: 'Team Coordination Plans', icon: '📋' },
          { id: 'consensus-building', label: 'Consensus Building Materials', icon: '🤝' },
          { id: 'conflict-resolution', label: 'Conflict Resolution Guides', icon: '⚖️' }
        ]
      },
      {
        id: 'audience-engagement',
        label: 'Audience Engagement',
        icon: '📢',
        description: 'Connecting with broader audiences and communities',
        children: [
          { id: 'public-communications', label: 'Public Communications', icon: '📺' },
          { id: 'community-content', label: 'Community Engagement Content', icon: '👥' },
          { id: 'outreach-materials', label: 'Outreach Materials', icon: '🌍' },
          { id: 'brand-messaging', label: 'Brand Voice & Messaging', icon: '🏷️' },
          { id: 'social-content', label: 'Social Media Content', icon: '💬' }
        ]
      }
    ]
  },

  {
    id: 'learn-develop',
    label: 'Learn & Develop',
    icon: '📚',
    color: '#96ceb4',
    description: 'Acquiring knowledge, building skills, and personal growth',
    children: [
      {
        id: 'knowledge-acquisition',
        label: 'Knowledge Acquisition',
        icon: '🧠',
        description: 'Learning and understanding new information',
        children: [
          { id: 'study-guides', label: 'Study Guides & Materials', icon: '📖' },
          { id: 'concept-explanations', label: 'Concept Explanations', icon: '💡' },
          { id: 'learning-exercises', label: 'Learning Exercises & Activities', icon: '📝' },
          { id: 'knowledge-tests', label: 'Knowledge Tests & Assessments', icon: '✅' },
          { id: 'research-summaries', label: 'Research Summaries', icon: '📚' }
        ]
      },
      {
        id: 'skill-development',
        label: 'Skill Development',
        icon: '💪',
        description: 'Building and improving practical abilities',
        children: [
          { id: 'practice-exercises', label: 'Practice Exercises', icon: '🔄' },
          { id: 'skill-assessments', label: 'Skill Assessment Tools', icon: '📊' },
          { id: 'development-plans', label: 'Skill Development Plans', icon: '🗺️' },
          { id: 'training-curricula', label: 'Training Curricula & Programs', icon: '📚' },
          { id: 'competency-profiles', label: 'Competency Profiles', icon: '🏗️' }
        ]
      },
      {
        id: 'teaching-instruction',
        label: 'Teaching & Instruction',
        icon: '👨‍🏫',
        description: 'Helping others learn and understand',
        children: [
          { id: 'lesson-plans', label: 'Lesson Plans & Content', icon: '📄' },
          { id: 'instructional-designs', label: 'Instructional Designs', icon: '🎯' },
          { id: 'educational-activities', label: 'Educational Activities', icon: '🎪' },
          { id: 'assessment-rubrics', label: 'Assessment Tools & Rubrics', icon: '📏' },
          { id: 'feedback-forms', label: 'Feedback Forms & Systems', icon: '💬' }
        ]
      },
      {
        id: 'personal-growth',
        label: 'Personal Growth',
        icon: '🌱',
        description: 'Self-improvement and personal development',
        children: [
          { id: 'reflection-prompts', label: 'Self-Reflection Prompts & Guides', icon: '🪞' },
          { id: 'goal-plans', label: 'Goal Setting & Action Plans', icon: '🎯' },
          { id: 'habit-trackers', label: 'Habit Formation Systems', icon: '🔄' },
          { id: 'wellness-programs', label: 'Wellness & Self-Care Programs', icon: '🏃‍♀️' },
          { id: 'therapy-tools', label: 'Therapeutic & Mental Health Tools', icon: '🧠' }
        ]
      },
      {
        id: 'mentoring-coaching',
        label: 'Mentoring & Coaching',
        icon: '🤝',
        description: 'Guiding others in their development',
        children: [
          { id: 'coaching-plans', label: 'Coaching Plans & Programs', icon: '🏗️' },
          { id: 'mentoring-guides', label: 'Mentoring Guides & Resources', icon: '🤗' },
          { id: 'development-assessments', label: 'Development Assessments', icon: '📊' },
          { id: 'guidance-materials', label: 'Guidance Materials & Resources', icon: '🧭' },
          { id: 'progress-trackers', label: 'Progress Tracking Tools', icon: '📈' }
        ]
      }
    ]
  },

  {
    id: 'plan-organize',
    label: 'Plan & Organize',
    icon: '📋',
    color: '#feca57',
    description: 'Structuring approaches, managing resources, and coordinating activities',
    children: [
      {
        id: 'strategic-planning',
        label: 'Strategic Planning',
        icon: '🎯',
        description: 'High-level planning and goal setting',
        children: [
          { id: 'strategic-plans', label: 'Strategic Plans & Frameworks', icon: '🏗️' },
          { id: 'vision-mission', label: 'Vision & Mission Documents', icon: '🌟' },
          { id: 'objectives-goals', label: 'Objectives & Goal Statements', icon: '🎯' },
          { id: 'priority-matrices', label: 'Priority Matrices & Rankings', icon: '📊' },
          { id: 'strategic-roadmaps', label: 'Strategic Roadmaps', icon: '🗺️' }
        ]
      },
      {
        id: 'project-management',
        label: 'Project Management',
        icon: '📊',
        description: 'Planning and coordinating specific initiatives',
        children: [
          { id: 'project-plans', label: 'Project Plans & Charters', icon: '📋' },
          { id: 'schedules-timelines', label: 'Schedules & Timelines', icon: '📅' },
          { id: 'resource-plans', label: 'Resource Allocation Plans', icon: '⚖️' },
          { id: 'milestone-trackers', label: 'Milestone Trackers', icon: '🏁' },
          { id: 'risk-plans', label: 'Risk Management Plans', icon: '🛡️' }
        ]
      },
      {
        id: 'operational-organization',
        label: 'Operational Organization',
        icon: '⚙️',
        description: 'Day-to-day organization and efficiency',
        children: [
          { id: 'workflow-charts', label: 'Workflow Charts & Diagrams', icon: '🔄' },
          { id: 'process-manuals', label: 'Process Manuals & SOPs', icon: '📄' },
          { id: 'efficiency-systems', label: 'Efficiency Systems & Tools', icon: '⚡' },
          { id: 'coordination-plans', label: 'Coordination Plans', icon: '🔗' },
          { id: 'quality-checklists', label: 'Quality Control Checklists', icon: '✅' }
        ]
      },
      {
        id: 'time-management',
        label: 'Time Management',
        icon: '⏰',
        description: 'Organizing and optimizing time usage',
        children: [
          { id: 'schedule-templates', label: 'Schedule Templates & Calendars', icon: '📅' },
          { id: 'productivity-systems', label: 'Productivity Systems', icon: '🚀' },
          { id: 'time-blocking', label: 'Time Blocking Templates', icon: '🗓️' },
          { id: 'focus-plans', label: 'Focus & Concentration Plans', icon: '🎯' },
          { id: 'deadline-trackers', label: 'Deadline Management Tools', icon: '⏳' }
        ]
      },
      {
        id: 'contingency-preparation',
        label: 'Contingency Preparation',
        icon: '🛡️',
        description: 'Planning for uncertainties and changes',
        children: [
          { id: 'scenario-plans', label: 'Scenario Plans & Alternatives', icon: '🎭' },
          { id: 'backup-plans', label: 'Backup Plans & Contingencies', icon: '💾' },
          { id: 'change-plans', label: 'Change Management Plans', icon: '🔄' },
          { id: 'emergency-plans', label: 'Emergency Response Plans', icon: '🚨' },
          { id: 'adaptive-frameworks', label: 'Adaptive Planning Frameworks', icon: '🌊' }
        ]
      }
    ]
  },

  {
    id: 'solve-decide',
    label: 'Solve & Decide',
    icon: '💡',
    color: '#ff9ff3',
    description: 'Finding solutions, making choices, and resolving challenges',
    children: [
      {
        id: 'problem-identification',
        label: 'Problem Identification',
        icon: '🔍',
        description: 'Recognizing and defining challenges',
        children: [
          { id: 'problem-statements', label: 'Problem Statements & Definitions', icon: '📝' },
          { id: 'root-cause-analysis', label: 'Root Cause Analysis Reports', icon: '🌳' },
          { id: 'impact-assessments', label: 'Problem Impact Assessments', icon: '📊' },
          { id: 'stakeholder-analysis', label: 'Stakeholder Impact Analysis', icon: '👥' },
          { id: 'urgency-assessments', label: 'Urgency & Priority Assessments', icon: '⚡' }
        ]
      },
      {
        id: 'solution-generation',
        label: 'Solution Generation',
        icon: '💡',
        description: 'Creating and developing potential solutions',
        children: [
          { id: 'solution-options', label: 'Solution Options & Alternatives', icon: '🔀' },
          { id: 'creative-solutions', label: 'Creative Solution Concepts', icon: '✨' },
          { id: 'strategic-alternatives', label: 'Strategic Alternatives', icon: '🗺️' },
          { id: 'innovation-concepts', label: 'Innovation Concepts', icon: '🚀' },
          { id: 'optimized-solutions', label: 'Resource-Optimized Solutions', icon: '⚖️' }
        ]
      },
      {
        id: 'decision-analysis',
        label: 'Decision Analysis',
        icon: '⚖️',
        description: 'Evaluating options and making informed choices',
        children: [
          { id: 'decision-matrices', label: 'Decision Matrices & Frameworks', icon: '🏗️' },
          { id: 'evaluation-criteria', label: 'Evaluation Criteria & Scorecards', icon: '📏' },
          { id: 'pros-cons-lists', label: 'Pros & Cons Analysis', icon: '⚖️' },
          { id: 'risk-benefit-analysis', label: 'Risk-Benefit Analysis', icon: '📊' },
          { id: 'decision-trees', label: 'Decision Trees & Flow Charts', icon: '🌳' }
        ]
      },
      {
        id: 'implementation-planning',
        label: 'Implementation Planning',
        icon: '🚀',
        description: 'Planning the execution of chosen solutions',
        children: [
          { id: 'action-plans', label: 'Action Plans & Task Lists', icon: '📋' },
          { id: 'implementation-roadmaps', label: 'Implementation Roadmaps', icon: '🗺️' },
          { id: 'resource-requirements', label: 'Resource Requirement Lists', icon: '📦' },
          { id: 'success-metrics', label: 'Success Metrics & KPIs', icon: '📏' },
          { id: 'monitoring-dashboards', label: 'Monitoring Dashboards', icon: '📡' }
        ]
      },
      {
        id: 'optimization-improvement',
        label: 'Optimization & Improvement',
        icon: '⚙️',
        description: 'Refining and perfecting solutions and processes',
        children: [
          { id: 'optimization-plans', label: 'Performance Optimization Plans', icon: '🔧' },
          { id: 'improvement-recommendations', label: 'Continuous Improvement Plans', icon: '🔄' },
          { id: 'feedback-analysis', label: 'Feedback Analysis & Integration', icon: '📝' },
          { id: 'scaling-plans', label: 'Scaling & Growth Plans', icon: '📈' },
          { id: 'sustainability-frameworks', label: 'Sustainability Frameworks', icon: '🌱' }
        ]
      }
    ]
  }
];

/**
 * Template Tags
 * Pre-defined tag categories for better organization
 */
export const TEMPLATE_TAGS = {
  tone: ['Formal', 'Informal', 'Humorous', 'Neutral', 'Professional', 'Persuasive', 'Empathetic', 'Authoritative', 'Analytical', 'Conversational', 'Instructive', 'Concise', 'Detailed', 'Strategic'],
  audience: ['Students', 'Teachers', 'Managers', 'Executives', 'Customers', 'General Public', 'Developers', 'Researchers', 'Healthcare Professionals', 'Legal Professionals', 'Marketing Professionals', 'Sales Professionals', 'HR Professionals', 'Finance Professionals'],
  format: ['Paragraph', 'List', 'Bullet Points', 'Table', 'Code Snippet', 'Email', 'Report', 'Presentation Outline', 'FAQ', 'Chat Dialogue', 'Summary', 'Outline', 'Script', 'Structured', 'Framework', 'Wireframe', 'Chart Description'],
  industry: ['Marketing', 'Sales', 'Education', 'Healthcare', 'Finance', 'Legal', 'Technology', 'Human Resources', 'Customer Service', 'Project Management', 'Media & Entertainment', 'Product Development', 'Operations', 'Research', 'Consulting', 'Manufacturing', 'Language Learning', 'Personal Productivity'],
  complexity: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  taskType: ['Generation', 'Summarization', 'Analysis', 'Debugging', 'Translation', 'Brainstorming', 'Planning', 'Editing', 'Refactoring', 'Question Answering', 'Classification', 'Extraction'],
  outputLength: ['Short', 'Medium', 'Long']
};

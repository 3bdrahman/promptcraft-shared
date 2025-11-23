/**
 * COMPREHENSIVE LLM TEMPLATE TAXONOMY
 *
 * A complete, exhaustive categorization system for ALL LLM use cases
 * Structure: Modality → Domain → Use Case → Specific Task
 *
 * This taxonomy is designed to be:
 * - Comprehensive: Covers all professions, industries, and use cases
 * - Hierarchical: Multi-level organization for easy navigation
 * - Flexible: Allows templates to belong to multiple categories
 * - Extensible: Easy to add new categories as LLM capabilities evolve
 * - Searchable: Rich metadata for discovery
 *
 * This is the single source of truth for template categorization across
 * extension, web app, and API.
 */

// ============================================================================
// LEVEL 1: MODALITY - How users interact with LLMs
// ============================================================================

export const MODALITIES = {
  // === TEXT-BASED INTERACTIONS ===
  PROMPT: {
    id: 'prompt',
    label: 'Prompt',
    icon: '💬',
    description: 'Single-turn text prompts for specific outputs',
    color: '#3b82f6', // blue
    examples: ['Generate a blog post', 'Summarize this article', 'Write an email']
  },

  AGENT: {
    id: 'agent',
    label: 'Agent',
    icon: '🤖',
    description: 'Conversational agents with personality and context',
    color: '#8b5cf6', // purple
    examples: ['Customer support bot', 'Virtual assistant', 'Tutor']
  },

  SYSTEM_PROMPT: {
    id: 'system-prompt',
    label: 'System Prompt',
    icon: '⚙️',
    description: 'Defines AI behavior, personality, and constraints',
    color: '#6366f1', // indigo
    examples: ['Professional tone setter', 'Expert persona', 'Safety guidelines']
  },

  PERSONA: {
    id: 'persona',
    label: 'Persona',
    icon: '🎭',
    description: 'Role-based AI with specific expertise or character',
    color: '#ec4899', // pink
    examples: ['Shakespeare', 'CEO Coach', 'Motivational Speaker']
  },

  // === MEDIA GENERATION ===
  IMAGE_GENERATION: {
    id: 'image-generation',
    label: 'Image Generation',
    icon: '🎨',
    description: 'Prompts for generating images (DALL-E, Midjourney, etc.)',
    color: '#f59e0b', // amber
    examples: ['Product mockup', 'Artistic portrait', 'Logo design']
  },

  IMAGE_ANALYSIS: {
    id: 'image-analysis',
    label: 'Image Analysis',
    icon: '🔍',
    description: 'Analyze and describe images',
    color: '#10b981', // green
    examples: ['Medical imaging analysis', 'Product defect detection', 'Scene description']
  },

  VIDEO_GENERATION: {
    id: 'video-generation',
    label: 'Video Generation',
    icon: '🎬',
    description: 'Prompts for video creation and editing',
    color: '#ef4444', // red
    examples: ['Marketing video script', 'Educational content', 'Animation storyboard']
  },

  AUDIO_GENERATION: {
    id: 'audio-generation',
    label: 'Audio Generation',
    icon: '🎵',
    description: 'Voice, music, and audio content generation',
    color: '#06b6d4', // cyan
    examples: ['Podcast script', 'Voiceover script', 'Music composition']
  },

  // === CODE & TECHNICAL ===
  CODE_GENERATION: {
    id: 'code-generation',
    label: 'Code Generation',
    icon: '💻',
    description: 'Generate code, scripts, and programs',
    color: '#14b8a6', // teal
    examples: ['API endpoint', 'Database schema', 'Unit test']
  },

  CODE_ANALYSIS: {
    id: 'code-analysis',
    label: 'Code Analysis',
    icon: '🔬',
    description: 'Review, debug, and analyze code',
    color: '#0ea5e9', // sky
    examples: ['Code review', 'Bug detection', 'Performance optimization']
  },

  // === DATA & ANALYTICS ===
  DATA_ANALYSIS: {
    id: 'data-analysis',
    label: 'Data Analysis',
    icon: '📊',
    description: 'Analyze and interpret data',
    color: '#8b5cf6', // violet
    examples: ['Statistical analysis', 'Trend identification', 'Data visualization']
  },

  DATA_TRANSFORMATION: {
    id: 'data-transformation',
    label: 'Data Transformation',
    icon: '🔄',
    description: 'Convert, clean, and process data',
    color: '#6366f1', // indigo
    examples: ['CSV to JSON', 'Data cleaning', 'Format conversion']
  },

  // === ADVANCED INTERACTIONS ===
  MULTIMODAL: {
    id: 'multimodal',
    label: 'Multi-Modal',
    icon: '🌐',
    description: 'Combines multiple input/output types',
    color: '#a855f7', // purple
    examples: ['Image + Text analysis', 'Video transcription + summary', 'Voice to text to image']
  },

  WORKFLOW: {
    id: 'workflow',
    label: 'Workflow',
    icon: '🔗',
    description: 'Multi-step prompt chains and pipelines',
    color: '#ec4899', // pink
    examples: ['Research → Outline → Write', 'Scrape → Analyze → Report', 'Interview → Evaluate → Hire']
  },

  FUNCTION_CALLING: {
    id: 'function-calling',
    label: 'Function Calling',
    icon: '⚡',
    description: 'AI agents that can execute functions and use tools',
    color: '#f59e0b', // amber
    examples: ['API integration', 'Database queries', 'External tool usage']
  },

  RAG: {
    id: 'rag',
    label: 'RAG (Retrieval)',
    icon: '📚',
    description: 'Retrieval-Augmented Generation with knowledge bases',
    color: '#10b981', // emerald
    examples: ['Document Q&A', 'Knowledge base search', 'Contextual assistance']
  },

  FINE_TUNING: {
    id: 'fine-tuning',
    label: 'Fine-Tuning',
    icon: '🎯',
    description: 'Training data and instructions for model fine-tuning',
    color: '#ef4444', // red
    examples: ['Custom model training', 'Domain-specific adaptation', 'Style transfer']
  },

  CHAIN_OF_THOUGHT: {
    id: 'chain-of-thought',
    label: 'Chain of Thought',
    icon: '🧠',
    description: 'Step-by-step reasoning and problem-solving',
    color: '#06b6d4', // cyan
    examples: ['Math problem solving', 'Logic puzzles', 'Strategic planning']
  },

  FEW_SHOT: {
    id: 'few-shot',
    label: 'Few-Shot Learning',
    icon: '📝',
    description: 'Prompts with examples for pattern learning',
    color: '#14b8a6', // teal
    examples: ['Categorization', 'Style mimicry', 'Format following']
  }
};

// ============================================================================
// LEVEL 2: DOMAINS - Professional fields and industries
// ============================================================================

export const DOMAINS = {
  // === TECHNOLOGY ===
  TECHNOLOGY: {
    id: 'technology',
    label: 'Technology',
    icon: '💻',
    description: 'Computer science, software, and IT',
    subdomains: {
      SOFTWARE_DEVELOPMENT: {
        id: 'software-development',
        label: 'Software Development',
        roles: ['Full-Stack Developer', 'Frontend Developer', 'Backend Developer', 'Mobile Developer', 'Game Developer']
      },
      DEVOPS: {
        id: 'devops',
        label: 'DevOps & Infrastructure',
        roles: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect', 'System Administrator']
      },
      DATA_SCIENCE: {
        id: 'data-science',
        label: 'Data Science & Analytics',
        roles: ['Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'Data Engineer', 'Business Intelligence Analyst']
      },
      CYBERSECURITY: {
        id: 'cybersecurity',
        label: 'Cybersecurity',
        roles: ['Security Analyst', 'Penetration Tester', 'Security Architect', 'Incident Responder', 'Compliance Officer']
      },
      AI_ML: {
        id: 'ai-ml',
        label: 'AI & Machine Learning',
        roles: ['ML Researcher', 'AI Engineer', 'NLP Specialist', 'Computer Vision Engineer', 'Prompt Engineer']
      },
      PRODUCT_MANAGEMENT: {
        id: 'product-management',
        label: 'Product Management',
        roles: ['Product Manager', 'Product Owner', 'Product Designer', 'UX Researcher', 'Product Analyst']
      },
      IT_SUPPORT: {
        id: 'it-support',
        label: 'IT Support & Help Desk',
        roles: ['IT Support Specialist', 'Help Desk Technician', 'Technical Support Engineer']
      }
    }
  },

  // === HEALTHCARE & MEDICINE ===
  HEALTHCARE: {
    id: 'healthcare',
    label: 'Healthcare & Medicine',
    icon: '⚕️',
    description: 'Medical, health, and wellness professions',
    subdomains: {
      CLINICAL_MEDICINE: {
        id: 'clinical-medicine',
        label: 'Clinical Medicine',
        roles: ['Physician', 'Surgeon', 'Cardiologist', 'Neurologist', 'Oncologist', 'Pediatrician', 'Psychiatrist', 'Dermatologist', 'Emergency Medicine Doctor']
      },
      NURSING: {
        id: 'nursing',
        label: 'Nursing',
        roles: ['Registered Nurse', 'Nurse Practitioner', 'ICU Nurse', 'Pediatric Nurse', 'Surgical Nurse']
      },
      PHARMACY: {
        id: 'pharmacy',
        label: 'Pharmacy',
        roles: ['Pharmacist', 'Clinical Pharmacist', 'Hospital Pharmacist', 'Pharmacy Technician']
      },
      THERAPY: {
        id: 'therapy',
        label: 'Therapy & Counseling',
        roles: ['Psychotherapist', 'Physical Therapist', 'Occupational Therapist', 'Speech Therapist', 'Mental Health Counselor']
      },
      MEDICAL_RESEARCH: {
        id: 'medical-research',
        label: 'Medical Research',
        roles: ['Medical Researcher', 'Clinical Trial Manager', 'Biostatistician', 'Lab Technician']
      },
      HEALTHCARE_ADMINISTRATION: {
        id: 'healthcare-administration',
        label: 'Healthcare Administration',
        roles: ['Hospital Administrator', 'Medical Practice Manager', 'Health Information Manager', 'Medical Billing Specialist']
      },
      PUBLIC_HEALTH: {
        id: 'public-health',
        label: 'Public Health',
        roles: ['Epidemiologist', 'Public Health Officer', 'Health Educator', 'Infection Control Specialist']
      },
      DENTISTRY: {
        id: 'dentistry',
        label: 'Dentistry',
        roles: ['Dentist', 'Orthodontist', 'Dental Hygienist', 'Oral Surgeon']
      },
      VETERINARY: {
        id: 'veterinary',
        label: 'Veterinary Medicine',
        roles: ['Veterinarian', 'Veterinary Technician', 'Animal Behaviorist']
      }
    }
  },

  // === LAW & LEGAL ===
  LAW: {
    id: 'law',
    label: 'Law & Legal',
    icon: '⚖️',
    description: 'Legal professions and services',
    subdomains: {
      CORPORATE_LAW: {
        id: 'corporate-law',
        label: 'Corporate Law',
        roles: ['Corporate Lawyer', 'M&A Attorney', 'Securities Lawyer', 'Business Attorney']
      },
      CRIMINAL_LAW: {
        id: 'criminal-law',
        label: 'Criminal Law',
        roles: ['Criminal Defense Attorney', 'Prosecutor', 'Public Defender']
      },
      FAMILY_LAW: {
        id: 'family-law',
        label: 'Family Law',
        roles: ['Family Lawyer', 'Divorce Attorney', 'Child Custody Lawyer']
      },
      INTELLECTUAL_PROPERTY: {
        id: 'intellectual-property',
        label: 'Intellectual Property',
        roles: ['IP Lawyer', 'Patent Attorney', 'Trademark Attorney', 'Copyright Lawyer']
      },
      REAL_ESTATE_LAW: {
        id: 'real-estate-law',
        label: 'Real Estate Law',
        roles: ['Real Estate Attorney', 'Property Lawyer', 'Land Use Attorney']
      },
      LITIGATION: {
        id: 'litigation',
        label: 'Litigation',
        roles: ['Litigator', 'Trial Lawyer', 'Appellate Attorney']
      },
      CONTRACT_LAW: {
        id: 'contract-law',
        label: 'Contract Law',
        roles: ['Contract Attorney', 'Negotiation Specialist']
      },
      EMPLOYMENT_LAW: {
        id: 'employment-law',
        label: 'Employment Law',
        roles: ['Employment Lawyer', 'Labor Attorney', 'HR Legal Counsel']
      },
      LEGAL_SUPPORT: {
        id: 'legal-support',
        label: 'Legal Support',
        roles: ['Paralegal', 'Legal Assistant', 'Court Reporter', 'Legal Researcher']
      }
    }
  },

  // === EDUCATION ===
  EDUCATION: {
    id: 'education',
    label: 'Education',
    icon: '🎓',
    description: 'Teaching, training, and educational services',
    subdomains: {
      K12_TEACHING: {
        id: 'k12-teaching',
        label: 'K-12 Teaching',
        roles: ['Elementary Teacher', 'Middle School Teacher', 'High School Teacher', 'Special Education Teacher', 'ESL Teacher']
      },
      HIGHER_EDUCATION: {
        id: 'higher-education',
        label: 'Higher Education',
        roles: ['University Professor', 'Adjunct Professor', 'Research Faculty', 'Teaching Assistant', 'Academic Advisor']
      },
      TUTORING: {
        id: 'tutoring',
        label: 'Tutoring & Test Prep',
        roles: ['Private Tutor', 'Test Prep Instructor', 'Online Tutor', 'Subject Matter Expert']
      },
      CURRICULUM_DESIGN: {
        id: 'curriculum-design',
        label: 'Curriculum & Instructional Design',
        roles: ['Curriculum Developer', 'Instructional Designer', 'Education Consultant', 'Content Creator']
      },
      EDUCATIONAL_ADMINISTRATION: {
        id: 'educational-administration',
        label: 'Educational Administration',
        roles: ['Principal', 'School Administrator', 'Dean', 'Education Director']
      },
      CORPORATE_TRAINING: {
        id: 'corporate-training',
        label: 'Corporate Training',
        roles: ['Corporate Trainer', 'L&D Specialist', 'Training Manager', 'Onboarding Specialist']
      },
      EARLY_CHILDHOOD: {
        id: 'early-childhood',
        label: 'Early Childhood Education',
        roles: ['Preschool Teacher', 'Daycare Provider', 'Early Intervention Specialist']
      }
    }
  },

  // === BUSINESS & MANAGEMENT ===
  BUSINESS: {
    id: 'business',
    label: 'Business & Management',
    icon: '💼',
    description: 'Business operations, management, and strategy',
    subdomains: {
      SALES: {
        id: 'sales',
        label: 'Sales',
        roles: ['Sales Representative', 'Account Executive', 'Business Development Rep', 'Sales Manager', 'Inside Sales', 'Field Sales']
      },
      MARKETING: {
        id: 'marketing',
        label: 'Marketing',
        roles: ['Marketing Manager', 'Content Marketer', 'SEO Specialist', 'Social Media Manager', 'Brand Manager', 'Growth Marketer', 'Email Marketer']
      },
      FINANCE: {
        id: 'finance',
        label: 'Finance & Accounting',
        roles: ['Financial Analyst', 'Accountant', 'CFO', 'Controller', 'Bookkeeper', 'Tax Specialist', 'Auditor']
      },
      HUMAN_RESOURCES: {
        id: 'human-resources',
        label: 'Human Resources',
        roles: ['HR Manager', 'Recruiter', 'Talent Acquisition', 'HR Generalist', 'Compensation Analyst', 'HRIS Specialist']
      },
      OPERATIONS: {
        id: 'operations',
        label: 'Operations & Project Management',
        roles: ['Operations Manager', 'Project Manager', 'Scrum Master', 'Program Manager', 'Process Improvement Specialist']
      },
      STRATEGY: {
        id: 'strategy',
        label: 'Strategy & Consulting',
        roles: ['Strategy Consultant', 'Business Analyst', 'Management Consultant', 'Strategic Planner']
      },
      ENTREPRENEURSHIP: {
        id: 'entrepreneurship',
        label: 'Entrepreneurship & Startups',
        roles: ['Founder', 'Startup CEO', 'Entrepreneur', 'Small Business Owner']
      },
      CUSTOMER_SUCCESS: {
        id: 'customer-success',
        label: 'Customer Success & Support',
        roles: ['Customer Success Manager', 'Support Specialist', 'Customer Service Rep', 'Account Manager']
      }
    }
  },

  // === CREATIVE ARTS ===
  CREATIVE: {
    id: 'creative',
    label: 'Creative Arts',
    icon: '🎨',
    description: 'Creative professions and artistic endeavors',
    subdomains: {
      WRITING: {
        id: 'writing',
        label: 'Writing & Content Creation',
        roles: ['Author', 'Copywriter', 'Content Writer', 'Technical Writer', 'Journalist', 'Blogger', 'Screenwriter', 'Poet']
      },
      DESIGN: {
        id: 'design',
        label: 'Design',
        roles: ['Graphic Designer', 'UI/UX Designer', 'Product Designer', 'Web Designer', 'Brand Designer', 'Motion Designer']
      },
      VISUAL_ARTS: {
        id: 'visual-arts',
        label: 'Visual Arts',
        roles: ['Painter', 'Illustrator', 'Photographer', 'Digital Artist', 'Sculptor']
      },
      MUSIC: {
        id: 'music',
        label: 'Music',
        roles: ['Musician', 'Composer', 'Music Producer', 'Sound Designer', 'Music Teacher']
      },
      FILM_VIDEO: {
        id: 'film-video',
        label: 'Film & Video',
        roles: ['Filmmaker', 'Video Editor', 'Director', 'Cinematographer', 'Video Producer']
      },
      GAMING: {
        id: 'gaming',
        label: 'Gaming',
        roles: ['Game Designer', 'Game Writer', 'Level Designer', 'Game Artist']
      },
      PERFORMING_ARTS: {
        id: 'performing-arts',
        label: 'Performing Arts',
        roles: ['Actor', 'Dancer', 'Theater Director', 'Performance Artist']
      }
    }
  },

  // === SCIENCE & RESEARCH ===
  SCIENCE: {
    id: 'science',
    label: 'Science & Research',
    icon: '🔬',
    description: 'Scientific research and academic work',
    subdomains: {
      BIOLOGY: {
        id: 'biology',
        label: 'Biology & Life Sciences',
        roles: ['Biologist', 'Microbiologist', 'Geneticist', 'Ecologist', 'Biochemist']
      },
      CHEMISTRY: {
        id: 'chemistry',
        label: 'Chemistry',
        roles: ['Chemist', 'Organic Chemist', 'Analytical Chemist', 'Chemical Engineer']
      },
      PHYSICS: {
        id: 'physics',
        label: 'Physics',
        roles: ['Physicist', 'Astrophysicist', 'Quantum Physicist', 'Applied Physicist']
      },
      ENVIRONMENTAL: {
        id: 'environmental',
        label: 'Environmental Science',
        roles: ['Environmental Scientist', 'Climate Researcher', 'Conservation Biologist', 'Sustainability Consultant']
      },
      PSYCHOLOGY: {
        id: 'psychology',
        label: 'Psychology',
        roles: ['Psychologist', 'Research Psychologist', 'Behavioral Scientist', 'Neuroscientist']
      },
      SOCIAL_SCIENCES: {
        id: 'social-sciences',
        label: 'Social Sciences',
        roles: ['Sociologist', 'Anthropologist', 'Political Scientist', 'Economist']
      },
      ACADEMIC_RESEARCH: {
        id: 'academic-research',
        label: 'Academic Research',
        roles: ['Research Scientist', 'Postdoc', 'Lab Manager', 'Research Assistant']
      }
    }
  },

  // === ENGINEERING ===
  ENGINEERING: {
    id: 'engineering',
    label: 'Engineering',
    icon: '⚙️',
    description: 'Engineering disciplines and technical fields',
    subdomains: {
      CIVIL: {
        id: 'civil',
        label: 'Civil Engineering',
        roles: ['Civil Engineer', 'Structural Engineer', 'Transportation Engineer', 'Geotechnical Engineer']
      },
      MECHANICAL: {
        id: 'mechanical',
        label: 'Mechanical Engineering',
        roles: ['Mechanical Engineer', 'HVAC Engineer', 'Manufacturing Engineer', 'Robotics Engineer']
      },
      ELECTRICAL: {
        id: 'electrical',
        label: 'Electrical Engineering',
        roles: ['Electrical Engineer', 'Electronics Engineer', 'Power Systems Engineer', 'Controls Engineer']
      },
      CHEMICAL: {
        id: 'chemical',
        label: 'Chemical Engineering',
        roles: ['Chemical Engineer', 'Process Engineer', 'Petroleum Engineer']
      },
      AEROSPACE: {
        id: 'aerospace',
        label: 'Aerospace Engineering',
        roles: ['Aerospace Engineer', 'Aeronautical Engineer', 'Astronautical Engineer']
      },
      BIOMEDICAL: {
        id: 'biomedical',
        label: 'Biomedical Engineering',
        roles: ['Biomedical Engineer', 'Medical Device Engineer', 'Clinical Engineer']
      },
      INDUSTRIAL: {
        id: 'industrial',
        label: 'Industrial Engineering',
        roles: ['Industrial Engineer', 'Quality Engineer', 'Logistics Engineer', 'Operations Research Analyst']
      }
    }
  },

  // === FINANCE & BANKING ===
  FINANCE: {
    id: 'finance',
    label: 'Finance & Banking',
    icon: '💰',
    description: 'Financial services and investment',
    subdomains: {
      INVESTMENT_BANKING: {
        id: 'investment-banking',
        label: 'Investment Banking',
        roles: ['Investment Banker', 'M&A Analyst', 'Equity Research Analyst']
      },
      WEALTH_MANAGEMENT: {
        id: 'wealth-management',
        label: 'Wealth Management',
        roles: ['Financial Advisor', 'Wealth Manager', 'Portfolio Manager', 'Financial Planner']
      },
      TRADING: {
        id: 'trading',
        label: 'Trading & Investments',
        roles: ['Trader', 'Quantitative Analyst', 'Hedge Fund Manager', 'Investment Analyst']
      },
      BANKING: {
        id: 'banking',
        label: 'Retail & Commercial Banking',
        roles: ['Bank Manager', 'Loan Officer', 'Credit Analyst', 'Relationship Manager']
      },
      INSURANCE: {
        id: 'insurance',
        label: 'Insurance',
        roles: ['Insurance Agent', 'Underwriter', 'Claims Adjuster', 'Actuary']
      },
      FINTECH: {
        id: 'fintech',
        label: 'FinTech',
        roles: ['FinTech Developer', 'Blockchain Specialist', 'Payment Systems Analyst']
      }
    }
  },

  // === REAL ESTATE ===
  REAL_ESTATE: {
    id: 'real-estate',
    label: 'Real Estate',
    icon: '🏠',
    description: 'Real estate and property services',
    subdomains: {
      RESIDENTIAL: {
        id: 'residential',
        label: 'Residential Real Estate',
        roles: ['Real Estate Agent', 'Realtor', 'Buyer\'s Agent', 'Listing Agent']
      },
      COMMERCIAL: {
        id: 'commercial',
        label: 'Commercial Real Estate',
        roles: ['Commercial Broker', 'Commercial Leasing Agent', 'CRE Analyst']
      },
      PROPERTY_MANAGEMENT: {
        id: 'property-management',
        label: 'Property Management',
        roles: ['Property Manager', 'Leasing Manager', 'HOA Manager']
      },
      REAL_ESTATE_DEVELOPMENT: {
        id: 'real-estate-development',
        label: 'Real Estate Development',
        roles: ['Real Estate Developer', 'Construction Manager', 'Land Acquisition Specialist']
      },
      APPRAISAL: {
        id: 'appraisal',
        label: 'Real Estate Appraisal',
        roles: ['Appraiser', 'Home Inspector', 'Property Valuation Specialist']
      }
    }
  },

  // === HOSPITALITY & TOURISM ===
  HOSPITALITY: {
    id: 'hospitality',
    label: 'Hospitality & Tourism',
    icon: '🏨',
    description: 'Hotels, restaurants, and tourism',
    subdomains: {
      HOTELS: {
        id: 'hotels',
        label: 'Hotels & Lodging',
        roles: ['Hotel Manager', 'Front Desk Manager', 'Concierge', 'Revenue Manager']
      },
      RESTAURANTS: {
        id: 'restaurants',
        label: 'Restaurants & Food Service',
        roles: ['Restaurant Manager', 'Chef', 'Sous Chef', 'Server', 'Bartender', 'Sommelier']
      },
      TOURISM: {
        id: 'tourism',
        label: 'Tourism & Travel',
        roles: ['Travel Agent', 'Tour Guide', 'Tourism Marketing Manager', 'Destination Manager']
      },
      EVENT_PLANNING: {
        id: 'event-planning',
        label: 'Event Planning',
        roles: ['Event Planner', 'Wedding Planner', 'Conference Organizer', 'Catering Manager']
      }
    }
  },

  // === RETAIL & E-COMMERCE ===
  RETAIL: {
    id: 'retail',
    label: 'Retail & E-commerce',
    icon: '🛍️',
    description: 'Retail operations and online commerce',
    subdomains: {
      E_COMMERCE: {
        id: 'e-commerce',
        label: 'E-commerce',
        roles: ['E-commerce Manager', 'Online Merchandiser', 'E-commerce Analyst', 'Marketplace Manager']
      },
      STORE_MANAGEMENT: {
        id: 'store-management',
        label: 'Store Management',
        roles: ['Store Manager', 'Retail Manager', 'Department Manager', 'Assistant Manager']
      },
      MERCHANDISING: {
        id: 'merchandising',
        label: 'Merchandising',
        roles: ['Merchandiser', 'Visual Merchandiser', 'Buyer', 'Category Manager']
      },
      CUSTOMER_SERVICE: {
        id: 'customer-service',
        label: 'Retail Customer Service',
        roles: ['Sales Associate', 'Customer Service Representative', 'Cashier']
      }
    }
  },

  // === MANUFACTURING & SUPPLY CHAIN ===
  MANUFACTURING: {
    id: 'manufacturing',
    label: 'Manufacturing & Supply Chain',
    icon: '🏭',
    description: 'Production, manufacturing, and logistics',
    subdomains: {
      PRODUCTION: {
        id: 'production',
        label: 'Production',
        roles: ['Production Manager', 'Plant Manager', 'Production Supervisor', 'Manufacturing Engineer']
      },
      QUALITY_CONTROL: {
        id: 'quality-control',
        label: 'Quality Control',
        roles: ['Quality Manager', 'QA Inspector', 'Quality Engineer', 'Six Sigma Specialist']
      },
      SUPPLY_CHAIN: {
        id: 'supply-chain',
        label: 'Supply Chain & Logistics',
        roles: ['Supply Chain Manager', 'Logistics Coordinator', 'Procurement Specialist', 'Warehouse Manager']
      },
      LEAN_MANUFACTURING: {
        id: 'lean-manufacturing',
        label: 'Lean Manufacturing',
        roles: ['Lean Consultant', 'Continuous Improvement Manager', 'Kaizen Specialist']
      }
    }
  },

  // === AGRICULTURE ===
  AGRICULTURE: {
    id: 'agriculture',
    label: 'Agriculture',
    icon: '🌾',
    description: 'Farming, livestock, and agribusiness',
    subdomains: {
      FARMING: {
        id: 'farming',
        label: 'Farming & Crop Production',
        roles: ['Farmer', 'Agronomist', 'Crop Consultant', 'Farm Manager']
      },
      LIVESTOCK: {
        id: 'livestock',
        label: 'Livestock & Animal Husbandry',
        roles: ['Rancher', 'Livestock Manager', 'Animal Nutritionist']
      },
      AGRIBUSINESS: {
        id: 'agribusiness',
        label: 'Agribusiness',
        roles: ['Agricultural Economist', 'Farm Business Manager', 'Agricultural Sales Rep']
      },
      HORTICULTURE: {
        id: 'horticulture',
        label: 'Horticulture',
        roles: ['Horticulturist', 'Landscape Designer', 'Greenhouse Manager']
      }
    }
  },

  // === GOVERNMENT & PUBLIC SERVICE ===
  GOVERNMENT: {
    id: 'government',
    label: 'Government & Public Service',
    icon: '🏛️',
    description: 'Public administration and government work',
    subdomains: {
      PUBLIC_POLICY: {
        id: 'public-policy',
        label: 'Public Policy',
        roles: ['Policy Analyst', 'Legislative Aide', 'Policy Advisor', 'Lobbyist']
      },
      PUBLIC_ADMINISTRATION: {
        id: 'public-administration',
        label: 'Public Administration',
        roles: ['City Manager', 'Public Administrator', 'Government Program Manager']
      },
      DIPLOMACY: {
        id: 'diplomacy',
        label: 'Diplomacy & International Relations',
        roles: ['Diplomat', 'Foreign Service Officer', 'International Relations Specialist']
      },
      MILITARY: {
        id: 'military',
        label: 'Military & Defense',
        roles: ['Military Officer', 'Defense Analyst', 'Veterans Affairs Specialist']
      },
      LAW_ENFORCEMENT: {
        id: 'law-enforcement',
        label: 'Law Enforcement',
        roles: ['Police Officer', 'Detective', 'Federal Agent', 'Crime Analyst']
      }
    }
  },

  // === NON-PROFIT & SOCIAL SERVICES ===
  NONPROFIT: {
    id: 'nonprofit',
    label: 'Non-Profit & Social Services',
    icon: '🤝',
    description: 'Non-profit organizations and social work',
    subdomains: {
      FUNDRAISING: {
        id: 'fundraising',
        label: 'Fundraising & Development',
        roles: ['Development Director', 'Fundraiser', 'Grant Writer', 'Donor Relations Manager']
      },
      PROGRAM_MANAGEMENT: {
        id: 'program-management',
        label: 'Program Management',
        roles: ['Program Director', 'Program Coordinator', 'Non-Profit Manager']
      },
      SOCIAL_WORK: {
        id: 'social-work',
        label: 'Social Work',
        roles: ['Social Worker', 'Case Manager', 'Community Organizer', 'Youth Worker']
      },
      ADVOCACY: {
        id: 'advocacy',
        label: 'Advocacy & Activism',
        roles: ['Advocate', 'Community Activist', 'Campaign Manager', 'Policy Advocate']
      }
    }
  },

  // === MEDIA & COMMUNICATIONS ===
  MEDIA: {
    id: 'media',
    label: 'Media & Communications',
    icon: '📰',
    description: 'Journalism, publishing, and communications',
    subdomains: {
      JOURNALISM: {
        id: 'journalism',
        label: 'Journalism',
        roles: ['Journalist', 'Reporter', 'Investigative Journalist', 'News Editor']
      },
      BROADCASTING: {
        id: 'broadcasting',
        label: 'Broadcasting',
        roles: ['News Anchor', 'Radio Host', 'Podcast Producer', 'Broadcast Producer']
      },
      PUBLISHING: {
        id: 'publishing',
        label: 'Publishing',
        roles: ['Editor', 'Book Publisher', 'Literary Agent', 'Proofreader']
      },
      PUBLIC_RELATIONS: {
        id: 'public-relations',
        label: 'Public Relations',
        roles: ['PR Manager', 'Communications Director', 'Media Relations Specialist', 'Crisis Communications Manager']
      },
      SOCIAL_MEDIA: {
        id: 'social-media',
        label: 'Social Media',
        roles: ['Social Media Manager', 'Community Manager', 'Influencer', 'Content Creator']
      }
    }
  },

  // === SPORTS & FITNESS ===
  SPORTS: {
    id: 'sports',
    label: 'Sports & Fitness',
    icon: '⚽',
    description: 'Athletics, coaching, and fitness',
    subdomains: {
      COACHING: {
        id: 'coaching',
        label: 'Coaching',
        roles: ['Sports Coach', 'Athletic Trainer', 'Strength Coach', 'Skills Coach']
      },
      SPORTS_MANAGEMENT: {
        id: 'sports-management',
        label: 'Sports Management',
        roles: ['Sports Agent', 'General Manager', 'Sports Marketing Manager', 'Athletic Director']
      },
      FITNESS: {
        id: 'fitness',
        label: 'Fitness & Wellness',
        roles: ['Personal Trainer', 'Fitness Instructor', 'Yoga Instructor', 'Nutritionist', 'Wellness Coach']
      },
      SPORTS_ANALYTICS: {
        id: 'sports-analytics',
        label: 'Sports Analytics',
        roles: ['Sports Analyst', 'Performance Analyst', 'Sports Data Scientist']
      }
    }
  },

  // === PERSONAL DEVELOPMENT ===
  PERSONAL: {
    id: 'personal',
    label: 'Personal Development',
    icon: '🌱',
    description: 'Life coaching, self-improvement, and personal growth',
    subdomains: {
      LIFE_COACHING: {
        id: 'life-coaching',
        label: 'Life Coaching',
        roles: ['Life Coach', 'Executive Coach', 'Career Coach', 'Leadership Coach']
      },
      CAREER_DEVELOPMENT: {
        id: 'career-development',
        label: 'Career Development',
        roles: ['Career Counselor', 'Job Search Coach', 'Resume Writer', 'Interview Coach']
      },
      RELATIONSHIPS: {
        id: 'relationships',
        label: 'Relationships & Family',
        roles: ['Relationship Coach', 'Marriage Counselor', 'Parenting Coach', 'Dating Coach']
      },
      PRODUCTIVITY: {
        id: 'productivity',
        label: 'Productivity & Organization',
        roles: ['Productivity Coach', 'Time Management Consultant', 'Professional Organizer']
      }
    }
  },

  // === CONSTRUCTION & TRADES ===
  CONSTRUCTION: {
    id: 'construction',
    label: 'Construction & Trades',
    icon: '🔨',
    description: 'Construction and skilled trades',
    subdomains: {
      CONSTRUCTION_MANAGEMENT: {
        id: 'construction-management',
        label: 'Construction Management',
        roles: ['Construction Manager', 'Project Manager', 'Site Supervisor', 'Estimator']
      },
      SKILLED_TRADES: {
        id: 'skilled-trades',
        label: 'Skilled Trades',
        roles: ['Electrician', 'Plumber', 'Carpenter', 'HVAC Technician', 'Welder']
      },
      ARCHITECTURE: {
        id: 'architecture',
        label: 'Architecture',
        roles: ['Architect', 'Landscape Architect', 'Interior Designer', 'Urban Planner']
      }
    }
  },

  // === TRANSPORTATION & LOGISTICS ===
  TRANSPORTATION: {
    id: 'transportation',
    label: 'Transportation & Logistics',
    icon: '🚚',
    description: 'Transportation and delivery services',
    subdomains: {
      SHIPPING: {
        id: 'shipping',
        label: 'Shipping & Freight',
        roles: ['Logistics Manager', 'Freight Broker', 'Shipping Coordinator', 'Fleet Manager']
      },
      AVIATION: {
        id: 'aviation',
        label: 'Aviation',
        roles: ['Pilot', 'Air Traffic Controller', 'Flight Attendant', 'Aviation Manager']
      },
      AUTOMOTIVE: {
        id: 'automotive',
        label: 'Automotive',
        roles: ['Auto Mechanic', 'Automotive Engineer', 'Service Advisor', 'Parts Manager']
      }
    }
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all modalities as an array
 */
export function getAllModalities() {
  return Object.values(MODALITIES);
}

/**
 * Get all domains as an array
 */
export function getAllDomains() {
  return Object.values(DOMAINS);
}

/**
 * Get modality by ID
 */
export function getModalityById(id) {
  return Object.values(MODALITIES).find(m => m.id === id);
}

/**
 * Get domain by ID
 */
export function getDomainById(id) {
  return Object.values(DOMAINS).find(d => d.id === id);
}

/**
 * Get subdomain by domain ID and subdomain ID
 */
export function getSubdomainById(domainId, subdomainId) {
  const domain = getDomainById(domainId);
  if (!domain || !domain.subdomains) return null;
  return domain.subdomains[Object.keys(domain.subdomains).find(key =>
    domain.subdomains[key].id === subdomainId
  )];
}

/**
 * Search across all dimensions
 */
export function searchTaxonomy(query) {
  const lowerQuery = query.toLowerCase();
  const results = {
    modalities: [],
    domains: [],
    subdomains: [],
    roles: []
  };

  // Search modalities
  Object.values(MODALITIES).forEach(modality => {
    const searchText = `${modality.label} ${modality.description} ${modality.examples.join(' ')}`.toLowerCase();
    if (searchText.includes(lowerQuery)) {
      results.modalities.push(modality);
    }
  });

  // Search domains and subdomains
  Object.values(DOMAINS).forEach(domain => {
    const domainSearchText = `${domain.label} ${domain.description}`.toLowerCase();
    if (domainSearchText.includes(lowerQuery)) {
      results.domains.push(domain);
    }

    if (domain.subdomains) {
      Object.values(domain.subdomains).forEach(subdomain => {
        const subdomainSearchText = `${subdomain.label} ${subdomain.roles.join(' ')}`.toLowerCase();
        if (subdomainSearchText.includes(lowerQuery)) {
          results.subdomains.push({
            ...subdomain,
            parentDomain: domain.id,
            parentDomainLabel: domain.label
          });
        }

        // Search roles
        subdomain.roles.forEach(role => {
          if (role.toLowerCase().includes(lowerQuery)) {
            results.roles.push({
              role,
              subdomain: subdomain.label,
              domain: domain.label,
              subdomainId: subdomain.id,
              domainId: domain.id
            });
          }
        });
      });
    }
  });

  return results;
}

/**
 * Get full taxonomy path for a template
 */
export function getTaxonomyPath(modalityId, domainId, subdomainId) {
  const modality = getModalityById(modalityId);
  const domain = getDomainById(domainId);
  const subdomain = getSubdomainById(domainId, subdomainId);

  return {
    modality: modality?.label || modalityId,
    domain: domain?.label || domainId,
    subdomain: subdomain?.label || subdomainId,
    fullPath: `${modality?.label} → ${domain?.label} → ${subdomain?.label}`
  };
}

import {
  Project,
  CaseStudyData,
  WorkflowStep,
  LeadershipExperience,
  EducationItem,
  CertificationItem,
  SkillCategory,
  SkillItem,
  PortfolioSettings,
  CVDocument,
  AuditLogEntry,
  ProfileData
} from '../types';

export const PERSONAL_INFO: ProfileData = {
  name: 'UTKRISTA BHANDARY',
  shortName: 'Utkrista',
  role: 'AI-Assisted Software Developer',
  supportingTitles: [
    'BSc IT Student',
    'Full-Stack Development',
    'Software Testing & QA',
    'Data & UI/UX'
  ],
  headline: 'I BUILD SOFTWARE WITH AI, THEN TEST WHAT I BUILD.',
  alternativeHeadline: 'AI-ASSISTED SOFTWARE DEVELOPER.',
  subheadline:
    'BSc IT student building practical software, data and technology solutions through AI-assisted research, development, testing and iteration.',
  status: 'OPEN TO INTERNSHIPS & ENTRY-LEVEL OPPORTUNITIES',
  location: 'Thimi, Bhaktapur, Nepal',
  coordinates: '27.6766° N, 85.3857° E',
  email: 'utkristabhandary@gmail.com',
  phone: '+977-9860905119',
  links: {
    github: 'https://github.com/utkristabhandary-cyber',
    linkedin: 'https://www.linkedin.com/in/utkrista-bhandary-b3235733a'
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'citiconnect',
    number: '01',
    title: 'CitiConnect',
    category: 'CIVIC TECHNOLOGY / FULL-STACK WEB APPLICATION',
    period: '2026',
    statusBadge: 'FLAGSHIP CIVIC-TECH PROJECT',
    tagline: 'Connecting citizens with municipal officers for structured service workflows.',
    description:
      'An independent civic-tech platform designed around Kathmandu municipal service workflows, connecting citizens with government officers for complaints and service requests.',
    technologies: [
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Leaflet / OSM',
      'Groq AI + Mock Fallback',
      'Token Auth'
    ],
    capabilities: [
      'Role-based permissions (Citizen, Officer, Admin)',
      'Map coordinate selection & photo evidence',
      'AI-assisted complaint categorization with human review',
      'Domain separation: Citizen Complaints vs Government Issues',
      'Public transparency dashboard with ward summaries',
      'Automated backend validation & regression tests'
    ],
    keyLesson:
      'Domain modeling principle: Complaint != Issue. Multiple citizens submitting similar complaints are mapped into a single internal operational issue.',
    highlightType: 'major',
    hasCaseStudy: true,
    abstractVisualType: 'citiconnect',
    problem:
      'Citizens in urban municipalities like Kathmandu lack a transparent medium to report infrastructure defects, while municipal officers are overwhelmed by unorganized, duplicate reports.',
    approach:
      'Engineered a role-based civic platform separating citizen submissions from internal work issues, with GPS map selection and AI triage requiring human officer confirmation.',
    githubUrl: 'https://github.com/utkristabhandary-cyber',
    liveUrl: '',
    displayOrder: 1,
    status: 'published',
    isFeatured: true
  },
  {
    id: 'attendance-system',
    number: '02',
    title: 'Attendance Management System',
    category: 'FULL-STACK ACADEMIC MANAGEMENT SYSTEM',
    period: '2026 — PRESENT',
    statusBadge: 'CORE ACADEMIC PLATFORM',
    tagline: 'A role-based academic platform built around real institution business rules.',
    description:
      'A role-based academic platform for administrators, teachers and students, modeling semester schedules, subject allotments, section rosters, and attendance verification.',
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'PostgreSQL',
      'REST APIs',
      'Automated Test Suites'
    ],
    capabilities: [
      'Role-based access matrix (Admin, Faculty, Student)',
      'Relational modeling of Semester, Section, Subject & Timetable',
      'Holiday exclusion and academic business-rule validation',
      'Automated attendance percentage calculations & threshold alerts',
      'API-first endpoints tested for regression and permission edge cases',
      'AI-assisted architecture exploration with manual code audit'
    ],
    keyLesson:
      'Academic business rules require strict database constraints and API validation so attendance cannot be retroactively spoofed or recorded on scheduled holidays.',
    highlightType: 'major',
    hasCaseStudy: true,
    abstractVisualType: 'attendance',
    problem:
      'Academic institutions struggle with attendance accuracy, scheduling conflicts, and preventing retroactive or unauthorized attendance entries.',
    approach:
      'Built a relational platform with PostgreSQL and Django REST Framework enforcing database constraints, holiday verification, and strict role permissions.',
    githubUrl: 'https://github.com/utkristabhandary-cyber',
    liveUrl: '',
    displayOrder: 2,
    status: 'published',
    isFeatured: true
  },
  {
    id: 'candidate-screening',
    number: '03',
    title: 'Candidate Screening Platform',
    category: 'HACKATHON PROJECT',
    period: 'Relay Hack x Acquire',
    statusBadge: 'RAPID PROTOTYPE',
    tagline: 'Streamlining applicant evaluation under competitive time constraints.',
    description:
      'A candidate screening platform designed to streamline candidate evaluation and recruitment workflows, prototyped rapidly during the Relay Hack x Acquire hackathon.',
    technologies: [
      'React',
      'TypeScript',
      'Rapid API Design',
      'Tailwind CSS',
      'AI-Assisted Workflow'
    ],
    capabilities: [
      'User-focused recruiter assessment flow',
      'Structured evaluation criteria rubrics',
      'Fast turnaround under hackathon constraints',
      'Collaborative team development and rapid iteration'
    ],
    keyLesson:
      'Fast hackathon delivery succeeds when requirements are trimmed to their core user value and tested against realistic mock workflows before adding UI polish.',
    highlightType: 'standard',
    hasCaseStudy: false,
    abstractVisualType: 'candidate',
    problem:
      'Recruiters review hundreds of candidate submissions manually without structured scoring rubrics or rapid triage workflows.',
    approach:
      'Engineered an interactive applicant assessment interface with standardized evaluation metrics and accelerated UI prototyping.',
    githubUrl: 'https://github.com/utkristabhandary-cyber',
    liveUrl: '',
    displayOrder: 3,
    status: 'published',
    isFeatured: false
  },
  {
    id: 'data-analysis',
    number: '04',
    title: 'Data Analysis Project',
    category: 'DATA ANALYSIS & VISUALIZATION',
    period: '2026',
    statusBadge: 'ANALYTICAL STUDY',
    tagline: 'Exploratory data analysis uncovering patterns with statistical charts.',
    description:
      'Exploratory data analysis using Python, with visualizations and data-driven summaries to uncover distributions, correlations, and actionable domain observations.',
    technologies: [
      'Python',
      'Pandas',
      'NumPy',
      'Seaborn',
      'Matplotlib',
      'Jupyter'
    ],
    capabilities: [
      'Data cleaning, null-handling, and schema normalization',
      'Descriptive statistics and variance examination',
      'Correlation heatmaps and multi-variable distribution plots',
      'Data-driven narrative summaries'
    ],
    keyLesson:
      'Data preprocessing and outlier detection account for 80% of reliable analysis; clean inputs prevent misleading visual conclusions.',
    highlightType: 'standard',
    hasCaseStudy: false,
    abstractVisualType: 'data',
    problem:
      'Raw tabular datasets contain null values, distorted distributions, and obscured correlation insights that require disciplined data cleaning.',
    approach:
      'Executed systematic data cleaning, outlier identification, and statistical distribution modeling using Pandas and Seaborn visualization libraries.',
    githubUrl: 'https://github.com/utkristabhandary-cyber',
    liveUrl: '',
    displayOrder: 4,
    status: 'published',
    isFeatured: false
  }
];

export const CITICONNECT_CASE_STUDY: CaseStudyData = {
  id: 'citiconnect',
  title: 'CitiConnect Case Study',
  subtitle: 'Independent Civic-Tech Architecture for Municipal Workflows',
  category: 'Full-Stack Web Application / Civic Technology',
  problem:
    'Citizens in urban municipalities like Kathmandu lack a transparent, traceable medium to report public infrastructure defects (broken water mains, road potholes, streetlight outages). Simultaneously, government ward officers are overwhelmed by redundant reports, unverified locations, and no structured grouping mechanism for field dispatch.',
  approach:
    'Designed a role-based civic platform separating public citizen reporting from internal administrative resolution. Citizens drop precise map pins with photographic evidence and track their complaint timeline. Behind the scenes, an AI service parses submissions to suggest department routing and priority, but leaves final assignment to verified municipal officers. Public transparency dashboards aggregate ward-level progress without exposing private citizen data.',
  architecture: {
    backend: ['Django 5.x', 'Django REST Framework', 'Token Authentication'],
    frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Leaflet', 'OpenStreetMap'],
    database: 'PostgreSQL with spatial coordinate indexing',
    aiService: 'Groq API (Llama 3 inference) with deterministic mock AI fallback for offline resiliency',
    auth: 'Custom User model with role-based permission classes (IsCitizen, IsOfficer, IsWardAdmin)'
  },
  aiWorkflow: {
    title: 'AI-Assisted Triage with Human-in-the-Loop Safeguards',
    description:
      'Submissions are processed by an AI triage pipeline that proposes category (e.g. Roads, Sanitation, Water) and urgency level (Low, Medium, Critical). Crucially, the AI produces structured JSON without mutating live ticket states.',
    humanInTheLoop:
      'Government officers must confirm or override AI suggestions before any work order or department dispatch is initiated. AI accelerates triage; humans maintain accountability.',
    fallbackStrategy:
      'A deterministic local mock engine activates seamlessly if the external API reaches rate limits, preventing municipal submissions from failing silently.'
  },
  testingStrategy: {
    title: 'Automated Backend & Business-Rule Validation',
    types: [
      {
        name: 'Permission & Role Isolation',
        description: 'Verifies citizens cannot view unassigned tickets or invoke officer workflow transitions.',
        passRate: '100% Passed'
      },
      {
        name: 'Coordinate Boundary Checks',
        description: 'Validates that submitted latitude/longitude coordinates fall strictly within municipal boundaries.',
        passRate: '100% Passed'
      },
      {
        name: 'State Machine Transitions',
        description: 'Ensures complaints can only advance through defined states (Submitted -> Under Review -> In Progress -> Resolved -> Closed).',
        passRate: '100% Passed'
      },
      {
        name: 'Notification Deduplication',
        description: 'Tests event triggers so duplicate notifications are discarded during rapid state updates.',
        passRate: '100% Passed'
      }
    ]
  },
  keyEngineeringLesson: {
    title: 'Complaint != Issue',
    concept: 'Separation of Citizen Submissions from Municipal Operational Units',
    explanation:
      'Initial designs conflated a citizen report with a work order. In reality, twenty citizens might report the exact same collapsed drainage pipe on the same street. Modeling "Complaint" (citizen record, private contact, individual timestamp) separately from "Issue" (the internal municipal work unit that groups multiple related complaints) prevented duplicate field dispatches and allowed one resolution event to notify all affected citizens.'
  },
  domainCapabilities: [
    {
      group: 'Citizen Experience',
      items: [
        'Complaint submission with photo upload',
        'Interactive OpenStreetMap coordinate picker',
        'Real-time status progression timeline',
        'SMS/Email-ready event notification inbox'
      ]
    },
    {
      group: 'Government Workflow',
      items: [
        'Officer triage dashboard with urgency flags',
        'Department & ward assignment workflows',
        'Issue aggregation (grouping multiple complaints)',
        'Audit trail logging officer comments and actions'
      ]
    },
    {
      group: 'Public Transparency',
      items: [
        'Ward-by-ward resolution rate indicators',
        'Aggregated category breakdown charts',
        'Six-month municipal resolution trends',
        'Privacy-preserving public transparency portal'
      ]
    }
  ]
};

export const HOW_I_BUILD_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'UNDERSTAND',
    summary: 'Analyze requirements, constraints, and business domain rules.',
    description:
      'Before writing a line of code, I break down the actual real-world problem. Who are the users? What are the edge cases? What domain rules cannot be violated? In CitiConnect, this meant understanding municipal officer accountability; in AAMS, understanding faculty scheduling logic.',
    aiRole: 'Summarizing domain standards, drafting user personas, challenging initial assumptions.',
    developerResponsibility: 'Defining boundary conditions, verifying feasibility, deciding true scope.',
    tools: ['Figma', 'Markdown specs', 'Domain workflow diagrams']
  },
  {
    step: '02',
    title: 'EXPLORE',
    summary: 'Research architecture, database schemas, and API contracts.',
    description:
      'I investigate architectural alternatives—evaluating data relationships, normal forms, endpoint contracts, and third-party dependencies before committing to an approach.',
    aiRole: 'Exploring alternative schema normalization patterns and highlighting potential foreign key pitfalls.',
    developerResponsibility: 'Selecting the stack, establishing security constraints, designing relational models.',
    tools: ['PostgreSQL diagrams', 'Django model specs', 'REST API designs']
  },
  {
    step: '03',
    title: 'PROTOTYPE',
    summary: 'Quickly build functional wireframes and interactive interface flows.',
    description:
      'Turning structural ideas into tangible interactive surfaces. I focus on spatial rhythm, clear visual affordances, and realistic data flow rather than superficial decoration.',
    aiRole: 'Generating initial layout boilerplate, exploring CSS structures, drafting component skeletons.',
    developerResponsibility: 'Validating usability, typography scale, information hierarchy, and accessibility.',
    tools: ['Figma', 'React', 'Tailwind CSS', 'Vite']
  },
  {
    step: '04',
    title: 'BUILD',
    summary: 'Implement robust backend models, RESTful endpoints, and frontend components.',
    description:
      'Writing the core software. Setting up Django models, serializers, views, permissions, and pairing them with type-safe React client interfaces.',
    aiRole: 'Accelerating repetitive boilerplate, regex writing, serializer methods, and component props.',
    developerResponsibility: 'Synthesizing modules, verifying data flow, enforcing clean separation of concerns.',
    tools: ['Python', 'Django REST Framework', 'PostgreSQL', 'TypeScript']
  },
  {
    step: '05',
    title: 'TEST',
    summary: 'Execute rigorous unit, API, permission, and business-rule validation.',
    description:
      'Checking whether the code actually behaves as required under extreme or malicious inputs. Running automated Django test suites, checking permission leaks, and testing coordinate boundaries.',
    aiRole: 'Drafting edge-case test payloads and suggesting boundary condition tests.',
    developerResponsibility: 'Authoring test assertions, running test suites, verifying mock behaviors.',
    tools: ['Django Test Runner', 'Postman / HTTP clients', 'Pytest', 'Manual QA']
  },
  {
    step: '06',
    title: 'REVIEW & DEBUG',
    summary: 'Investigate failures, trace regressions, and refactor for clarity.',
    description:
      'Debugging is not guessing. I systematically inspect tracebacks, query logs, network payloads, and auth headers until the root cause is resolved and regression-tested.',
    aiRole: 'Explaining arcane stack traces, analyzing SQL query efficiency, suggesting regex fixes.',
    developerResponsibility: 'Root cause isolation, verifying logic corrections, preventing regressions.',
    tools: ['Django Debug Toolbar', 'Chrome DevTools', 'PostgreSQL EXPLAIN']
  },
  {
    step: '07',
    title: 'DOCUMENT',
    summary: 'Capture technical decisions, API schemas, and maintenance guides.',
    description:
      'Good software is maintainable software. I document setup steps, API endpoints, schema migrations, and the "why" behind non-obvious engineering decisions.',
    aiRole: 'Structuring Markdown drafts and formatting OpenAPI / Swagger endpoint definitions.',
    developerResponsibility: 'Ensuring absolute factual accuracy and clear developer handover notes.',
    tools: ['Markdown', 'OpenAPI / Swagger', 'Git commits']
  }
];

export const TESTING_PILLARS = [
  {
    id: 'permissions',
    name: 'Role-Based Permission Isolation',
    focus: 'Access Control & Security',
    codeSnippet: `def test_citizen_cannot_resolve_complaint(self):
    self.client.force_authenticate(user=self.citizen)
    response = self.client.patch(
        f"/api/v1/complaints/{self.complaint.id}/",
        {"status": "RESOLVED"}
    )
    self.assertEqual(response.status_code, 403)`,
    explanation:
      'Guarantees that unauthorized endpoints reject requests with HTTP 403 before any database mutation can occur.'
  },
  {
    id: 'business-rules',
    name: 'Domain Business-Rule Validation',
    focus: 'Data Integrity & State Transitions',
    codeSnippet: `def test_cannot_record_attendance_on_gazetted_holiday(self):
    session = AcademicSession.objects.create(date="2026-10-24")
    holiday = Holiday.objects.create(date="2026-10-24", title="Dashain")
    with self.assertRaises(ValidationError):
        AttendanceService.record_batch(session=session)`,
    explanation:
      'Enforces academic institutional rules at the service layer so invalid attendance records cannot be created.'
  },
  {
    id: 'api-contracts',
    name: 'API Contract & Payload Validation',
    focus: 'Schema Sanitization',
    codeSnippet: `def test_complaint_submission_rejects_out_of_bound_coords(self):
    payload = {"lat": 95.1234, "lng": 182.5678, "title": "Pothole"}
    response = self.client.post("/api/v1/complaints/", payload)
    self.assertEqual(response.status_code, 400)
    self.assertIn("coordinates", response.data["errors"])`,
    explanation:
      'Validates all incoming JSON payloads, coordinate bounds, and file sizes before parsing.'
  },
  {
    id: 'regression',
    name: 'Regression & Mock Resiliency',
    focus: 'Reliability & Fault Tolerance',
    codeSnippet: `def test_ai_service_timeout_triggers_deterministic_fallback(self):
    with patch("groq_client.chat.completions.create", side_effect=TimeoutError):
        result = TriageService.classify_complaint(self.sample_text)
        self.assertEqual(result.category, "General Infrastructure")
        self.assertTrue(result.is_fallback)`,
    explanation:
      'Verifies that external third-party API outages do not cause 500 server crashes for end citizens.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'PROGRAMMING & DEVELOPMENT',
    description: 'Languages, frameworks, and backend fundamentals for building real systems.',
    skills: [
      'Python',
      'Django',
      'Django REST Framework',
      'Flask',
      'HTML5',
      'CSS3 / Tailwind',
      'REST APIs',
      'Git & GitHub'
    ]
  },
  {
    title: 'AI & AUTOMATION',
    description: 'Deliberate use of generative AI as an engineering accelerator, not a crutch.',
    skills: [
      'AI-Assisted Development',
      'Prompt Engineering',
      'AI Research & Triage',
      'Rapid Prototyping',
      'Groq API Integration',
      'Automation Workflows'
    ]
  },
  {
    title: 'SOFTWARE TESTING & QA',
    description: 'Verification mindset ensuring systems behave correctly under edge conditions.',
    skills: [
      'Automated Backend Testing',
      'API Contract Validation',
      'Permission & Role Auditing',
      'Business-Rule Testing',
      'Regression Testing',
      'Manual Verification'
    ]
  },
  {
    title: 'DATABASES & DATA',
    description: 'Structured data modeling, querying, and exploratory data analysis.',
    skills: [
      'PostgreSQL',
      'Relational Schema Design',
      'Pandas',
      'NumPy',
      'Seaborn & Matplotlib',
      'Data Visualization',
      'Power BI'
    ]
  },
  {
    title: 'UI/UX & DESIGN THINKING',
    description: 'Bridging engineering rigor with clear, user-focused interface clarity.',
    skills: [
      'UI/UX Design',
      'Design Thinking',
      'Wireframing & Prototyping',
      'Figma',
      'Canva',
      'Visual Composition'
    ]
  },
  {
    title: 'PROFESSIONAL CAPABILITIES',
    description: 'Communication, project execution, and collaborative teamwork.',
    skills: [
      'Problem Solving',
      'Technical Documentation',
      'Team Collaboration',
      'Leadership',
      'Public Speaking',
      'Event Planning'
    ]
  }
];

export const EXPERIENCES: LeadershipExperience[] = [
  {
    id: 'exp-1',
    role: 'Acting Vice President',
    organization: 'Techspire IT Club',
    period: '2026 — PRESENT',
    type: 'Leadership',
    description:
      'Support planning and execution of technology events, workshops and club initiatives; coordinate with student members across technical, creative and organizational activities to foster a collaborative engineering culture.',
    tags: ['Leadership', 'Event Execution', 'Technical Coordination'],
    displayOrder: 1,
    status: 'published'
  },
  {
    id: 'exp-2',
    role: 'Art, Design & Tech Team',
    organization: 'Techspire IT Club',
    period: '2026 — PRESENT',
    type: 'Club',
    description:
      'Contribute to visual design, promotional materials, event content and technology-focused creative initiatives, ensuring tech events have strong visual communication and clear messaging.',
    tags: ['Visual Design', 'Branding', 'Event Content'],
    displayOrder: 2,
    status: 'published'
  },
  {
    id: 'exp-3',
    role: 'Graphics Designer & Event Planning',
    organization: 'Hult Prize, Techspire College',
    period: '2026',
    type: 'Event',
    description:
      'Designed promotional assets and social media content while supporting event planning, logistics, coordination and execution for the social entrepreneurship challenge.',
    tags: ['Graphic Design', 'Logistics', 'Event Coordination'],
    displayOrder: 3,
    status: 'published'
  }
];

export const EDUCATION_DATA: EducationItem = {
  id: 'edu-1',
  degree: 'Bachelor of Science in Information Technology (BSc IT)',
  institution: 'Techspire College',
  affiliation: 'Asia Pacific University (APU)',
  period: '2026 — Expected',
  status: 'First Year Student',
  coursework: [
    'Programming (Python / Object-Oriented Principles)',
    'Database Systems (Relational Design & SQL)',
    'Web Technologies (Frontend & REST APIs)',
    'Data Structures & Algorithms'
  ],
  displayOrder: 1,
  statusVisibility: 'published'
};

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Data Science Certification',
    organization: 'Techspire College',
    focus: 'Python, statistical analysis, and exploratory data workflows',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 1,
    status: 'published'
  },
  {
    id: 'cert-2',
    title: 'Power BI Certification',
    organization: 'Industry Training',
    focus: 'Business intelligence dashboards, data modeling, and DAX',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 2,
    status: 'published'
  },
  {
    id: 'cert-3',
    title: 'Design Thinking Certification',
    organization: 'Techspire College',
    focus: 'User empathy, problem reframing, and iterative solution testing',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 3,
    status: 'published'
  },
  {
    id: 'cert-4',
    title: 'Prompt Engineering Workshop',
    organization: 'Technical Workshop',
    focus: 'Structured output parsing, system prompt design, and reasoning chains',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 4,
    status: 'published'
  },
  {
    id: 'cert-5',
    title: 'UI/UX Design Training',
    organization: 'Professional Training',
    focus: 'Visual hierarchy, user flow mapping, and wireframing in Figma',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 5,
    status: 'published'
  },
  {
    id: 'cert-6',
    title: 'Web Development Training',
    organization: 'Technical Workshop',
    focus: 'Full-stack fundamentals, REST architecture, and responsive layouts',
    date: '2026',
    credentialId: '',
    credentialUrl: '',
    displayOrder: 6,
    status: 'published'
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Programming & Development
  { id: 'sk-1', name: 'Python', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 1, status: 'published' },
  { id: 'sk-2', name: 'Django', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 2, status: 'published' },
  { id: 'sk-3', name: 'Django REST Framework', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 3, status: 'published' },
  { id: 'sk-4', name: 'Flask', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 4, status: 'published' },
  { id: 'sk-5', name: 'HTML5', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 5, status: 'published' },
  { id: 'sk-6', name: 'CSS3 / Tailwind', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 6, status: 'published' },
  { id: 'sk-7', name: 'REST APIs', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 7, status: 'published' },
  { id: 'sk-8', name: 'Git & GitHub', category: 'PROGRAMMING & DEVELOPMENT', displayOrder: 8, status: 'published' },

  // AI & Automation
  { id: 'sk-9', name: 'AI-Assisted Development', category: 'AI & AUTOMATION', displayOrder: 9, status: 'published' },
  { id: 'sk-10', name: 'Prompt Engineering', category: 'AI & AUTOMATION', displayOrder: 10, status: 'published' },
  { id: 'sk-11', name: 'AI Research & Triage', category: 'AI & AUTOMATION', displayOrder: 11, status: 'published' },
  { id: 'sk-12', name: 'Rapid Prototyping', category: 'AI & AUTOMATION', displayOrder: 12, status: 'published' },
  { id: 'sk-13', name: 'Groq API Integration', category: 'AI & AUTOMATION', displayOrder: 13, status: 'published' },
  { id: 'sk-14', name: 'Automation Workflows', category: 'AI & AUTOMATION', displayOrder: 14, status: 'published' },

  // Software Testing & QA
  { id: 'sk-15', name: 'Automated Backend Testing', category: 'SOFTWARE TESTING & QA', displayOrder: 15, status: 'published' },
  { id: 'sk-16', name: 'API Contract Validation', category: 'SOFTWARE TESTING & QA', displayOrder: 16, status: 'published' },
  { id: 'sk-17', name: 'Permission & Role Auditing', category: 'SOFTWARE TESTING & QA', displayOrder: 17, status: 'published' },
  { id: 'sk-18', name: 'Business-Rule Testing', category: 'SOFTWARE TESTING & QA', displayOrder: 18, status: 'published' },
  { id: 'sk-19', name: 'Regression Testing', category: 'SOFTWARE TESTING & QA', displayOrder: 19, status: 'published' },
  { id: 'sk-20', name: 'Manual Verification', category: 'SOFTWARE TESTING & QA', displayOrder: 20, status: 'published' },

  // Databases & Data
  { id: 'sk-21', name: 'PostgreSQL', category: 'DATABASES & DATA', displayOrder: 21, status: 'published' },
  { id: 'sk-22', name: 'Relational Schema Design', category: 'DATABASES & DATA', displayOrder: 22, status: 'published' },
  { id: 'sk-23', name: 'Pandas', category: 'DATABASES & DATA', displayOrder: 23, status: 'published' },
  { id: 'sk-24', name: 'NumPy', category: 'DATABASES & DATA', displayOrder: 24, status: 'published' },
  { id: 'sk-25', name: 'Seaborn & Matplotlib', category: 'DATABASES & DATA', displayOrder: 25, status: 'published' },
  { id: 'sk-26', name: 'Data Visualization', category: 'DATABASES & DATA', displayOrder: 26, status: 'published' },
  { id: 'sk-27', name: 'Power BI', category: 'DATABASES & DATA', displayOrder: 27, status: 'published' },

  // UI/UX & Design Thinking
  { id: 'sk-28', name: 'UI/UX Design', category: 'UI/UX & DESIGN THINKING', displayOrder: 28, status: 'published' },
  { id: 'sk-29', name: 'Design Thinking', category: 'UI/UX & DESIGN THINKING', displayOrder: 29, status: 'published' },
  { id: 'sk-30', name: 'Wireframing & Prototyping', category: 'UI/UX & DESIGN THINKING', displayOrder: 30, status: 'published' },
  { id: 'sk-31', name: 'Figma', category: 'UI/UX & DESIGN THINKING', displayOrder: 31, status: 'published' },
  { id: 'sk-32', name: 'Canva', category: 'UI/UX & DESIGN THINKING', displayOrder: 32, status: 'published' },
  { id: 'sk-33', name: 'Visual Composition', category: 'UI/UX & DESIGN THINKING', displayOrder: 33, status: 'published' },

  // Professional
  { id: 'sk-34', name: 'Problem Solving', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 34, status: 'published' },
  { id: 'sk-35', name: 'Technical Documentation', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 35, status: 'published' },
  { id: 'sk-36', name: 'Team Collaboration', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 36, status: 'published' },
  { id: 'sk-37', name: 'Leadership', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 37, status: 'published' },
  { id: 'sk-38', name: 'Public Speaking', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 38, status: 'published' },
  { id: 'sk-39', name: 'Event Planning', category: 'PROFESSIONAL CAPABILITIES', displayOrder: 39, status: 'published' }
];

export const INITIAL_CV_DOCUMENTS: CVDocument[] = [
  {
    id: 'cv-v1',
    version: '1.2.0',
    filename: 'utkrista_bhandary.pdf',
    uploadDate: '2026-09-15',
    fileSize: '184 KB',
    status: 'current',
    downloadUrl: '/utkrista_bhandary.pdf',
    isPublic: true,
    notes: 'Verified canonical CV highlighting BSc IT First Year, CitiConnect, and Attendance Management System.'
  }
];

export const PORTFOLIO_SETTINGS: PortfolioSettings = {
  siteTitle: 'Utkrista Bhandary — AI-Assisted Software Developer',
  heroHeadline: 'I BUILD SOFTWARE WITH AI, THEN TEST WHAT I BUILD.',
  heroSubtitle:
    'BSc IT student building practical software, data and technology solutions through AI-assisted research, development, testing and iteration.',
  availabilityStatus: 'OPEN TO INTERNSHIPS & ENTRY-LEVEL OPPORTUNITIES',
  accentStyle: 'emerald-cyan',
  showCvButton: true,
  showCertifications: true,
  showExperience: true,
  showContactSection: true,
  lastUpdated: '2026-09-15'
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-09-15 08:30:00',
    action: 'Canonical Context Initialized',
    item: 'Portfolio Data Model',
    category: 'System',
    status: 'created',
    user: 'utkristabhandary@gmail.com'
  },
  {
    id: 'log-2',
    timestamp: '2026-09-15 08:45:00',
    action: 'Published Flagship Projects',
    item: 'CitiConnect & Attendance System',
    category: 'Projects',
    status: 'published',
    user: 'utkristabhandary@gmail.com'
  }
];

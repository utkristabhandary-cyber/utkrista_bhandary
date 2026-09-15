export type ContentStatus = 'published' | 'draft' | 'archived';

export interface ProfileData {
  name: string;
  shortName: string;
  role: string;
  supportingTitles: string[];
  headline: string;
  alternativeHeadline: string;
  subheadline: string;
  status: string;
  location: string;
  coordinates: string;
  email: string;
  phone: string;
  links: {
    github: string;
    linkedin: string;
  };
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  period?: string;
  statusBadge?: string;
  tagline: string;
  description: string;
  technologies: string[];
  capabilities: string[];
  keyLesson?: string;
  highlightType: 'major' | 'standard';
  hasCaseStudy: boolean;
  abstractVisualType: 'citiconnect' | 'attendance' | 'candidate' | 'data';
  // CMS fields
  problem?: string;
  approach?: string;
  githubUrl?: string;
  liveUrl?: string;
  displayOrder: number;
  status: ContentStatus;
  isFeatured: boolean;
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  problem: string;
  approach: string;
  architecture: {
    backend: string[];
    frontend: string[];
    database: string;
    aiService: string;
    auth: string;
  };
  aiWorkflow: {
    title: string;
    description: string;
    humanInTheLoop: string;
    fallbackStrategy: string;
  };
  testingStrategy: {
    title: string;
    types: { name: string; description: string; passRate?: string }[];
  };
  keyEngineeringLesson: {
    title: string;
    concept: string;
    explanation: string;
  };
  domainCapabilities: {
    group: string;
    items: string[];
  }[];
}

export interface WorkflowStep {
  step: string;
  title: string;
  summary: string;
  description: string;
  aiRole: string;
  developerResponsibility: string;
  tools: string[];
}

export type ExperienceType =
  | 'Leadership'
  | 'Club'
  | 'Volunteer'
  | 'Project'
  | 'Internship'
  | 'Employment'
  | 'Event';

export interface LeadershipExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: ExperienceType;
  description: string;
  tags: string[];
  displayOrder: number;
  status: ContentStatus;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  affiliation: string;
  period: string;
  status: string;
  coursework: string[];
  displayOrder: number;
  statusVisibility: ContentStatus;
}

export interface CertificationItem {
  id: string;
  title: string;
  organization: string;
  focus: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  displayOrder: number;
  status: ContentStatus;
}

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  displayOrder: number;
  status: ContentStatus;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

export interface CVDocument {
  id: string;
  version: string;
  filename: string;
  uploadDate: string;
  fileSize: string;
  status: 'current' | 'archived' | 'draft';
  downloadUrl?: string;
  isPublic: boolean;
  notes?: string;
}

export interface PortfolioSettings {
  siteTitle: string;
  heroHeadline: string;
  heroSubtitle: string;
  availabilityStatus: string;
  accentStyle: string;
  showCvButton: boolean;
  showCertifications: boolean;
  showExperience: boolean;
  showContactSection: boolean;
  lastUpdated: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  item: string;
  category: string;
  status: 'published' | 'draft' | 'updated' | 'deleted' | 'created';
  user: string;
}

export interface AuthUser {
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  isOwner: boolean;
  user: AuthUser | null;
}

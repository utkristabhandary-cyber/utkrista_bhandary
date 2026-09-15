import {
  ProfileData,
  Project,
  SkillItem,
  LeadershipExperience,
  EducationItem,
  CertificationItem,
  PortfolioSettings,
  CVDocument,
  AuditLogEntry,
  ContentStatus
} from '../types';
import {
  PERSONAL_INFO,
  PROJECTS,
  INITIAL_SKILLS,
  EXPERIENCES,
  EDUCATION_DATA,
  CERTIFICATIONS,
  PORTFOLIO_SETTINGS,
  INITIAL_CV_DOCUMENTS,
  INITIAL_AUDIT_LOGS
} from '../data/portfolioData';

/**
 * CONTENT REPOSITORY & PERSISTENCE ADAPTER
 * 
 * IMPORTANT ARCHITECTURAL BOUNDARY:
 * This repository manages portfolio data for the prototype using browser local persistence
 * (localStorage). localStorage is NOT production-secure or server-authoritative: it is
 * per-browser, user-editable, and not shared across devices. It is acceptable for a client
 * prototype only.
 * 
 * The repository is engineered with strict type boundaries and modular repository methods so
 * that a future backend (Node/Express API, PostgreSQL, Firestore, etc.) can directly replace
 * the storage adapter without modifying any UI components or CMS forms.
 */

interface StoredData {
  profile: ProfileData;
  projects: Project[];
  skills: SkillItem[];
  experiences: LeadershipExperience[];
  education: EducationItem;
  certifications: CertificationItem[];
  settings: PortfolioSettings;
  cvDocuments: CVDocument[];
  auditLogs: AuditLogEntry[];
}

const STORAGE_KEY = 'portfolio_cms_repository_v2';

class ContentRepository {
  private data: StoredData;
  private listeners: Array<(data: StoredData) => void> = [];

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): StoredData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure default fallbacks if schema has new fields
        return {
          profile: parsed.profile || { ...PERSONAL_INFO },
          projects: parsed.projects || [...PROJECTS],
          skills: parsed.skills || [...INITIAL_SKILLS],
          experiences: parsed.experiences || [...EXPERIENCES],
          education: parsed.education || { ...EDUCATION_DATA },
          certifications: parsed.certifications || [...CERTIFICATIONS],
          settings: parsed.settings || { ...PORTFOLIO_SETTINGS },
          cvDocuments: parsed.cvDocuments || [...INITIAL_CV_DOCUMENTS],
          auditLogs: parsed.auditLogs || [...INITIAL_AUDIT_LOGS]
        };
      }
    } catch {
      // Fallback
    }

    return {
      profile: { ...PERSONAL_INFO },
      projects: [...PROJECTS],
      skills: [...INITIAL_SKILLS],
      experiences: [...EXPERIENCES],
      education: { ...EDUCATION_DATA },
      certifications: [...CERTIFICATIONS],
      settings: { ...PORTFOLIO_SETTINGS },
      cvDocuments: [...INITIAL_CV_DOCUMENTS],
      auditLogs: [...INITIAL_AUDIT_LOGS]
    };
  }

  private save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch {
      // Storage quota exceeded or disabled
    }
    this.notify();
  }

  public subscribe(listener: (data: StoredData) => void): () => void {
    this.listeners.push(listener);
    listener(this.data);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb(this.data));
  }

  public logAction(action: string, item: string, category: string, status: 'published' | 'draft' | 'updated' | 'deleted' | 'created', user = 'utkristabhandary@gmail.com'): void {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action,
      item,
      category,
      status,
      user
    };
    this.data.auditLogs.unshift(newLog);
    // Keep max 100 audit entries
    if (this.data.auditLogs.length > 100) {
      this.data.auditLogs = this.data.auditLogs.slice(0, 100);
    }
  }

  // ===================== PROFILE =====================
  public getProfile(): ProfileData {
    return this.data.profile;
  }

  public updateProfile(updates: Partial<ProfileData>): void {
    this.data.profile = { ...this.data.profile, ...updates };
    this.data.settings.lastUpdated = new Date().toISOString().substring(0, 10);
    this.logAction('Updated Profile', updates.headline || 'Profile Information', 'Profile', 'updated');
    this.save();
  }

  // ===================== PROJECTS =====================
  public getProjects(includeDrafts = false): Project[] {
    const list = includeDrafts
      ? [...this.data.projects]
      : this.data.projects.filter((p) => p.status === 'published');
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public getProjectById(id: string): Project | undefined {
    return this.data.projects.find((p) => p.id === id);
  }

  public createProject(project: Omit<Project, 'id' | 'displayOrder'>): Project {
    const newId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`;
    const newOrder = this.data.projects.length > 0 ? Math.max(...this.data.projects.map((p) => p.displayOrder)) + 1 : 1;
    
    const newProject: Project = {
      ...project,
      id: newId,
      number: String(newOrder).padStart(2, '0'),
      displayOrder: newOrder
    };

    this.data.projects.push(newProject);
    this.logAction('Created Project', newProject.title, 'Projects', newProject.status === 'published' ? 'published' : 'draft');
    this.save();
    return newProject;
  }

  public updateProject(id: string, updates: Partial<Project>): void {
    const index = this.data.projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.data.projects[index] = { ...this.data.projects[index], ...updates };
      this.logAction('Updated Project', this.data.projects[index].title, 'Projects', this.data.projects[index].status === 'published' ? 'published' : 'updated');
      this.save();
    }
  }

  public deleteProject(id: string): boolean {
    const proj = this.data.projects.find((p) => p.id === id);
    if (!proj) return false;
    this.data.projects = this.data.projects.filter((p) => p.id !== id);
    // Reassign numbers and orders
    this.data.projects.forEach((p, idx) => {
      p.displayOrder = idx + 1;
      p.number = String(idx + 1).padStart(2, '0');
    });
    this.logAction('Deleted Project', proj.title, 'Projects', 'deleted');
    this.save();
    return true;
  }

  public duplicateProject(id: string): Project | null {
    const source = this.data.projects.find((p) => p.id === id);
    if (!source) return null;
    const duplicated: Project = {
      ...source,
      id: `${source.id}-copy-${Date.now()}`,
      title: `${source.title} (Copy)`,
      status: 'draft',
      displayOrder: this.data.projects.length + 1,
      number: String(this.data.projects.length + 1).padStart(2, '0')
    };
    this.data.projects.push(duplicated);
    this.logAction('Duplicated Project', source.title, 'Projects', 'draft');
    this.save();
    return duplicated;
  }

  public reorderProjects(ids: string[]): void {
    const map = new Map(this.data.projects.map((p) => [p.id, p]));
    const reordered: Project[] = [];
    ids.forEach((id, index) => {
      const p = map.get(id);
      if (p) {
        p.displayOrder = index + 1;
        p.number = String(index + 1).padStart(2, '0');
        reordered.push(p);
      }
    });
    this.data.projects.forEach((p) => {
      if (!ids.includes(p.id)) {
        p.displayOrder = reordered.length + 1;
        p.number = String(reordered.length + 1).padStart(2, '0');
        reordered.push(p);
      }
    });
    this.data.projects = reordered;
    this.logAction('Reordered Projects', `${ids.length} projects`, 'Projects', 'updated');
    this.save();
  }

  // ===================== SKILLS =====================
  public getSkills(includeDrafts = false): SkillItem[] {
    const list = includeDrafts
      ? [...this.data.skills]
      : this.data.skills.filter((s) => s.status === 'published');
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public createSkill(skill: Omit<SkillItem, 'id' | 'displayOrder'>): SkillItem {
    const newId = `sk-${Date.now()}`;
    const newOrder = this.data.skills.length + 1;
    const newSkill: SkillItem = {
      ...skill,
      id: newId,
      displayOrder: newOrder
    };
    this.data.skills.push(newSkill);
    this.logAction('Added Skill', newSkill.name, 'Skills', newSkill.status === 'published' ? 'published' : 'draft');
    this.save();
    return newSkill;
  }

  public updateSkill(id: string, updates: Partial<SkillItem>): void {
    const index = this.data.skills.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.data.skills[index] = { ...this.data.skills[index], ...updates };
      this.logAction('Updated Skill', this.data.skills[index].name, 'Skills', 'updated');
      this.save();
    }
  }

  public deleteSkill(id: string): boolean {
    const skill = this.data.skills.find((s) => s.id === id);
    if (!skill) return false;
    this.data.skills = this.data.skills.filter((s) => s.id !== id);
    this.logAction('Deleted Skill', skill.name, 'Skills', 'deleted');
    this.save();
    return true;
  }

  // ===================== EXPERIENCES =====================
  public getExperiences(includeDrafts = false): LeadershipExperience[] {
    const list = includeDrafts
      ? [...this.data.experiences]
      : this.data.experiences.filter((e) => e.status === 'published');
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public createExperience(exp: Omit<LeadershipExperience, 'id' | 'displayOrder'>): LeadershipExperience {
    const newId = `exp-${Date.now()}`;
    const newOrder = this.data.experiences.length + 1;
    const newExp: LeadershipExperience = {
      ...exp,
      id: newId,
      displayOrder: newOrder
    };
    this.data.experiences.push(newExp);
    this.logAction('Added Experience', `${newExp.role} at ${newExp.organization}`, 'Experience', newExp.status === 'published' ? 'published' : 'draft');
    this.save();
    return newExp;
  }

  public updateExperience(id: string, updates: Partial<LeadershipExperience>): void {
    const index = this.data.experiences.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.data.experiences[index] = { ...this.data.experiences[index], ...updates };
      this.logAction('Updated Experience', `${this.data.experiences[index].role}`, 'Experience', 'updated');
      this.save();
    }
  }

  public deleteExperience(id: string): boolean {
    const exp = this.data.experiences.find((e) => e.id === id);
    if (!exp) return false;
    this.data.experiences = this.data.experiences.filter((e) => e.id !== id);
    this.logAction('Deleted Experience', exp.role, 'Experience', 'deleted');
    this.save();
    return true;
  }

  // ===================== EDUCATION =====================
  public getEducation(): EducationItem {
    return this.data.education;
  }

  public updateEducation(updates: Partial<EducationItem>): void {
    this.data.education = { ...this.data.education, ...updates };
    this.logAction('Updated Education', this.data.education.degree, 'Education', 'updated');
    this.save();
  }

  // ===================== CERTIFICATIONS =====================
  public getCertifications(includeDrafts = false): CertificationItem[] {
    const list = includeDrafts
      ? [...this.data.certifications]
      : this.data.certifications.filter((c) => c.status === 'published');
    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  public createCertification(cert: Omit<CertificationItem, 'id' | 'displayOrder'>): CertificationItem {
    const newId = `cert-${Date.now()}`;
    const newOrder = this.data.certifications.length + 1;
    const newCert: CertificationItem = {
      ...cert,
      id: newId,
      displayOrder: newOrder
    };
    this.data.certifications.push(newCert);
    this.logAction('Added Certification', newCert.title, 'Certifications', newCert.status === 'published' ? 'published' : 'draft');
    this.save();
    return newCert;
  }

  public updateCertification(id: string, updates: Partial<CertificationItem>): void {
    const index = this.data.certifications.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.data.certifications[index] = { ...this.data.certifications[index], ...updates };
      this.logAction('Updated Certification', this.data.certifications[index].title, 'Certifications', 'updated');
      this.save();
    }
  }

  public deleteCertification(id: string): boolean {
    const cert = this.data.certifications.find((c) => c.id === id);
    if (!cert) return false;
    this.data.certifications = this.data.certifications.filter((c) => c.id !== id);
    this.logAction('Deleted Certification', cert.title, 'Certifications', 'deleted');
    this.save();
    return true;
  }

  // ===================== CV / RESUME =====================
  public getCVs(): CVDocument[] {
    return this.data.cvDocuments;
  }

  public getCurrentCV(): CVDocument | undefined {
    return this.data.cvDocuments.find((cv) => cv.status === 'current');
  }

  public uploadNewCV(filename: string, version: string, notes?: string): CVDocument {
    // Archive previous current CV
    this.data.cvDocuments.forEach((cv) => {
      if (cv.status === 'current') {
        cv.status = 'archived';
      }
    });

    const newDoc: CVDocument = {
      id: `cv-${Date.now()}`,
      version: version || `v${this.data.cvDocuments.length + 1}.0`,
      filename,
      uploadDate: new Date().toISOString().substring(0, 10),
      fileSize: '192 KB',
      status: 'current',
      downloadUrl: '/utkrista_bhandary.pdf',
      isPublic: this.data.settings.showCvButton,
      notes: notes || 'Uploaded version via Owner CMS.'
    };

    this.data.cvDocuments.unshift(newDoc);
    this.logAction('Uploaded New CV', `${filename} (${newDoc.version})`, 'CV/Resume', 'published');
    this.save();
    return newDoc;
  }

  public setCurrentCV(id: string): void {
    this.data.cvDocuments.forEach((cv) => {
      cv.status = cv.id === id ? 'current' : 'archived';
    });
    this.logAction('Switched Active CV', id, 'CV/Resume', 'updated');
    this.save();
  }

  // ===================== SETTINGS =====================
  public getSettings(): PortfolioSettings {
    return this.data.settings;
  }

  public updateSettings(updates: Partial<PortfolioSettings>): void {
    this.data.settings = { ...this.data.settings, ...updates, lastUpdated: new Date().toISOString().substring(0, 10) };
    this.logAction('Updated Settings', 'Portfolio Configuration', 'Settings', 'updated');
    this.save();
  }

  // ===================== AUDIT LOGS =====================
  public getAuditLogs(): AuditLogEntry[] {
    return this.data.auditLogs;
  }

  // ===================== RESET =====================
  public resetToDefaults(): void {
    this.data = {
      profile: { ...PERSONAL_INFO },
      projects: [...PROJECTS],
      skills: [...INITIAL_SKILLS],
      experiences: [...EXPERIENCES],
      education: { ...EDUCATION_DATA },
      certifications: [...CERTIFICATIONS],
      settings: { ...PORTFOLIO_SETTINGS },
      cvDocuments: [...INITIAL_CV_DOCUMENTS],
      auditLogs: [
        {
          id: `log-reset-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          action: 'Reset to Canonical Defaults',
          item: 'Full Repository',
          category: 'System',
          status: 'updated',
          user: 'utkristabhandary@gmail.com'
        }
      ]
    };
    this.save();
  }
}

export const contentRepository = new ContentRepository();

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  ProfileData,
  Project,
  SkillItem,
  SkillCategory,
  LeadershipExperience,
  EducationItem,
  CertificationItem,
  PortfolioSettings,
  CVDocument,
  AuditLogEntry
} from '../types';
import { contentRepository } from '../services/contentRepository';

interface PortfolioContentContextType {
  profile: ProfileData;
  projects: Project[]; // Published only
  allProjects: Project[]; // Including drafts
  skills: SkillItem[]; // Published only
  allSkills: SkillItem[];
  skillCategories: SkillCategory[]; // Grouped for public display
  experiences: LeadershipExperience[]; // Published only
  allExperiences: LeadershipExperience[];
  education: EducationItem;
  certifications: CertificationItem[]; // Published only
  allCertifications: CertificationItem[];
  settings: PortfolioSettings;
  cvDocuments: CVDocument[];
  currentCV: CVDocument | undefined;
  auditLogs: AuditLogEntry[];

  // Mutations
  updateProfile: (updates: Partial<ProfileData>) => void;
  createProject: (project: Omit<Project, 'id' | 'displayOrder'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => boolean;
  duplicateProject: (id: string) => Project | null;
  reorderProjects: (ids: string[]) => void;

  createSkill: (skill: Omit<SkillItem, 'id' | 'displayOrder'>) => SkillItem;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => boolean;

  createExperience: (exp: Omit<LeadershipExperience, 'id' | 'displayOrder'>) => LeadershipExperience;
  updateExperience: (id: string, updates: Partial<LeadershipExperience>) => void;
  deleteExperience: (id: string) => boolean;

  updateEducation: (updates: Partial<EducationItem>) => void;

  createCertification: (cert: Omit<CertificationItem, 'id' | 'displayOrder'>) => CertificationItem;
  updateCertification: (id: string, updates: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => boolean;

  uploadNewCV: (filename: string, version: string, notes?: string) => CVDocument;
  setCurrentCV: (id: string) => void;

  updateSettings: (updates: Partial<PortfolioSettings>) => void;
  resetToDefaults: () => void;
}

const PortfolioContentContext = createContext<PortfolioContentContextType | undefined>(undefined);

export const PortfolioContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(contentRepository.getProfile());
  const [allProjects, setAllProjects] = useState<Project[]>(contentRepository.getProjects(true));
  const [allSkills, setAllSkills] = useState<SkillItem[]>(contentRepository.getSkills(true));
  const [allExperiences, setAllExperiences] = useState<LeadershipExperience[]>(contentRepository.getExperiences(true));
  const [education, setEducation] = useState<EducationItem>(contentRepository.getEducation());
  const [allCertifications, setAllCertifications] = useState<CertificationItem[]>(contentRepository.getCertifications(true));
  const [settings, setSettings] = useState<PortfolioSettings>(contentRepository.getSettings());
  const [cvDocuments, setCvDocuments] = useState<CVDocument[]>(contentRepository.getCVs());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(contentRepository.getAuditLogs());

  useEffect(() => {
    const unsubscribe = contentRepository.subscribe((data) => {
      setProfile({ ...data.profile });
      setAllProjects([...data.projects]);
      setAllSkills([...data.skills]);
      setAllExperiences([...data.experiences]);
      setEducation({ ...data.education });
      setAllCertifications([...data.certifications]);
      setSettings({ ...data.settings });
      setCvDocuments([...data.cvDocuments]);
      setAuditLogs([...data.auditLogs]);
    });
    return unsubscribe;
  }, []);

  // Filtered public collections
  const projects = allProjects
    .filter((p) => p.status === 'published')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const skills = allSkills
    .filter((s) => s.status === 'published')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const experiences = allExperiences
    .filter((e) => e.status === 'published')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const certifications = allCertifications
    .filter((c) => c.status === 'published')
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const currentCV = cvDocuments.find((cv) => cv.status === 'current');

  // Compute grouped skill categories for public display
  const skillCategories: SkillCategory[] = [
    {
      title: 'PROGRAMMING & DEVELOPMENT',
      description: 'Languages, frameworks, and backend fundamentals for building real systems.',
      skills: skills.filter((s) => s.category === 'PROGRAMMING & DEVELOPMENT').map((s) => s.name)
    },
    {
      title: 'AI & AUTOMATION',
      description: 'Deliberate use of generative AI as an engineering accelerator, not a crutch.',
      skills: skills.filter((s) => s.category === 'AI & AUTOMATION').map((s) => s.name)
    },
    {
      title: 'SOFTWARE TESTING & QA',
      description: 'Verification mindset ensuring systems behave correctly under edge conditions.',
      skills: skills.filter((s) => s.category === 'SOFTWARE TESTING & QA').map((s) => s.name)
    },
    {
      title: 'DATABASES & DATA',
      description: 'Structured data modeling, querying, and exploratory data analysis.',
      skills: skills.filter((s) => s.category === 'DATABASES & DATA').map((s) => s.name)
    },
    {
      title: 'UI/UX & DESIGN THINKING',
      description: 'Bridging engineering rigor with clear, user-focused interface clarity.',
      skills: skills.filter((s) => s.category === 'UI/UX & DESIGN THINKING').map((s) => s.name)
    },
    {
      title: 'PROFESSIONAL CAPABILITIES',
      description: 'Communication, project execution, and collaborative teamwork.',
      skills: skills.filter((s) => s.category === 'PROFESSIONAL CAPABILITIES').map((s) => s.name)
    }
  ].filter((cat) => cat.skills.length > 0);

  return (
    <PortfolioContentContext.Provider
      value={{
        profile,
        projects,
        allProjects,
        skills,
        allSkills,
        skillCategories,
        experiences,
        allExperiences,
        education,
        certifications,
        allCertifications,
        settings,
        cvDocuments,
        currentCV,
        auditLogs,

        updateProfile: (u) => contentRepository.updateProfile(u),
        createProject: (p) => contentRepository.createProject(p),
        updateProject: (id, u) => contentRepository.updateProject(id, u),
        deleteProject: (id) => contentRepository.deleteProject(id),
        duplicateProject: (id) => contentRepository.duplicateProject(id),
        reorderProjects: (ids) => contentRepository.reorderProjects(ids),

        createSkill: (s) => contentRepository.createSkill(s),
        updateSkill: (id, u) => contentRepository.updateSkill(id, u),
        deleteSkill: (id) => contentRepository.deleteSkill(id),

        createExperience: (e) => contentRepository.createExperience(e),
        updateExperience: (id, u) => contentRepository.updateExperience(id, u),
        deleteExperience: (id) => contentRepository.deleteExperience(id),

        updateEducation: (u) => contentRepository.updateEducation(u),

        createCertification: (c) => contentRepository.createCertification(c),
        updateCertification: (id, u) => contentRepository.updateCertification(id, u),
        deleteCertification: (id) => contentRepository.deleteCertification(id),

        uploadNewCV: (fn, v, n) => contentRepository.uploadNewCV(fn, v, n),
        setCurrentCV: (id) => contentRepository.setCurrentCV(id),

        updateSettings: (s) => contentRepository.updateSettings(s),
        resetToDefaults: () => contentRepository.resetToDefaults()
      }}
    >
      {children}
    </PortfolioContentContext.Provider>
  );
};

export const usePortfolioContent = (): PortfolioContentContextType => {
  const context = useContext(PortfolioContentContext);
  if (!context) {
    throw new Error('usePortfolioContent must be used within a PortfolioContentProvider');
  }
  return context;
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolioContent } from '../../context/PortfolioContentContext';
import {
  LayoutDashboard,
  User,
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  FileText,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { OverviewTab } from './sections/OverviewTab';
import { ProfileEditorTab } from './sections/ProfileEditorTab';
import { ProjectsManagerTab } from './sections/ProjectsManagerTab';
import { SkillsManagerTab } from './sections/SkillsManagerTab';
import { ExperienceManagerTab } from './sections/ExperienceManagerTab';
import { EducationCertificationsTab } from './sections/EducationCertificationsTab';
import { CVManagerTab } from './sections/CVManagerTab';
import { SettingsHistoryTab } from './sections/SettingsHistoryTab';

interface OwnerDashboardProps {
  onClose: () => void;
}

type DashboardTab = 'overview' | 'profile' | 'projects' | 'skills' | 'experience' | 'education' | 'cv' | 'settings';

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ onClose }) => {
  const { signOut, user, isOwner } = useAuth();
  const { allProjects, allSkills, allExperiences } = usePortfolioContent();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  // If unauthorized, do not render dashboard
  if (!isOwner) {
    return null;
  }

  const navItems: { id: DashboardTab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: 'overview', label: 'OVERVIEW', icon: LayoutDashboard },
    { id: 'profile', label: 'PROFILE & BIO', icon: User },
    { id: 'projects', label: 'PROJECTS', icon: FolderGit2, badge: allProjects.length },
    { id: 'skills', label: 'SKILLS', icon: Cpu, badge: allSkills.length },
    { id: 'experience', label: 'EXPERIENCE', icon: Award, badge: allExperiences.length },
    { id: 'education', label: 'EDUCATION & CERTS', icon: GraduationCap },
    { id: 'cv', label: 'CV / RESUME', icon: FileText },
    { id: 'settings', label: 'SETTINGS & LOGS', icon: Settings }
  ];

  return (
    <div id="owner-cms-root" className="min-h-screen bg-[#090a0c] text-[#f4f4f5] flex flex-col font-sans">
      {/* Top Fixed Header */}
      <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-[#26282e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              OWNER CMS
            </span>
            <span className="hidden sm:inline text-xs font-mono text-[#a1a1aa]">
              {user?.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 border border-[#26282e] hover:border-[#3f3f46] text-[#e4e4e7] hover:text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>RETURN TO SITE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                signOut();
                onClose();
              }}
              className="px-3.5 py-1.5 bg-[#26282e] hover:bg-[#3f3f46] text-[#f4f4f5] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SIGN OUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="pb-3 border-b border-[#26282e] mb-3">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#71717a]">
              CONTENT CONTROLS
            </p>
          </div>

          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-2 lg:pb-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                    isActive
                      ? 'bg-[#16181d] text-emerald-400 border-l-2 border-emerald-400 font-bold'
                      : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#121316]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-[#71717a]'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className="ml-2 px-1.5 py-0.2 text-[10px] bg-[#26282e] text-[#a1a1aa]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <OverviewTab onNavigate={(tab) => setActiveTab(tab)} onExitDashboard={onClose} />
          )}
          {activeTab === 'profile' && <ProfileEditorTab />}
          {activeTab === 'projects' && <ProjectsManagerTab />}
          {activeTab === 'skills' && <SkillsManagerTab />}
          {activeTab === 'experience' && <ExperienceManagerTab />}
          {activeTab === 'education' && <EducationCertificationsTab />}
          {activeTab === 'cv' && <CVManagerTab />}
          {activeTab === 'settings' && <SettingsHistoryTab />}
        </main>
      </div>
    </div>
  );
};

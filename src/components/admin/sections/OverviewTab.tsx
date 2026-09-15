import React from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { useAuth } from '../../../context/AuthContext';
import { ShieldCheck, FolderGit2, Cpu, Award, GraduationCap, FileText, CheckCircle, Clock, ExternalLink } from 'lucide-react';

type DashboardTab = 'overview' | 'profile' | 'projects' | 'skills' | 'experience' | 'education' | 'cv' | 'settings';

interface OverviewTabProps {
  onNavigate: (tab: DashboardTab) => void;
  onExitDashboard: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate, onExitDashboard }) => {
  const { profile, allProjects, allSkills, allExperiences, allCertifications, currentCV, settings } = usePortfolioContent();
  const { user } = useAuth();

  const publishedProjects = allProjects.filter((p) => p.status === 'published').length;
  const draftProjects = allProjects.length - publishedProjects;

  const publishedSkills = allSkills.filter((s) => s.status === 'published').length;
  const publishedExperiences = allExperiences.filter((e) => e.status === 'published').length;
  const publishedCerts = allCertifications.filter((c) => c.status === 'published').length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Identity & Status Card */}
      <div className="p-6 bg-[#16181d] border border-[#26282e] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#121316] border border-[#26282e] flex items-center justify-center text-emerald-400 font-mono text-xl font-bold">
            UB
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#f4f4f5]">{profile.name}</h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono uppercase">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED OWNER
              </span>
            </div>
            <p className="text-xs text-[#a1a1aa] font-mono">{profile.email} • {profile.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitDashboard}
            className="px-4 py-2 border border-[#26282e] hover:border-[#3f3f46] text-[#e4e4e7] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>VIEW PUBLIC SITE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="p-4 bg-[#121316] border border-[#26282e] hover:border-emerald-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#f4f4f5]">{allProjects.length}</span>
            <span className="text-[11px] font-mono text-emerald-400">({publishedProjects} live)</span>
          </div>
          {draftProjects > 0 && (
            <p className="text-[10px] text-amber-400 font-mono mt-1">{draftProjects} draft item(s)</p>
          )}
        </div>

        {/* Skills */}
        <div
          onClick={() => onNavigate('skills')}
          className="p-4 bg-[#121316] border border-[#26282e] hover:border-emerald-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">VERIFIED SKILLS</span>
            <Cpu className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#f4f4f5]">{publishedSkills}</span>
            <span className="text-[11px] font-mono text-[#71717a]">across 6 domains</span>
          </div>
          <p className="text-[10px] text-[#71717a] font-mono mt-1">No arbitrary percentages</p>
        </div>

        {/* Experience */}
        <div
          onClick={() => onNavigate('experience')}
          className="p-4 bg-[#121316] border border-[#26282e] hover:border-emerald-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">LEADERSHIP & EXP</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-[#f4f4f5]">{publishedExperiences}</span>
            <span className="text-[11px] font-mono text-[#71717a]">verified roles</span>
          </div>
          <p className="text-[10px] text-[#71717a] font-mono mt-1">Techspire IT Club & Hult</p>
        </div>

        {/* CV Status */}
        <div
          onClick={() => onNavigate('cv')}
          className="p-4 bg-[#121316] border border-[#26282e] hover:border-emerald-500/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#71717a] mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider">CANONICAL CV</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-mono font-bold text-[#f4f4f5] truncate">
              {currentCV?.version || 'v1.0'}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400">
              ACTIVE
            </span>
          </div>
          <p className="text-[10px] text-[#71717a] font-mono mt-1">
            {settings.showCvButton ? 'Public download enabled' : 'Download hidden'}
          </p>
        </div>
      </div>

      {/* Quick Launchpad */}
      <div className="border border-[#26282e] bg-[#121316] p-6 space-y-4">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#a1a1aa]">
          PORTFOLIO MANAGEMENT QUICK ACTIONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          <button
            onClick={() => onNavigate('projects')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Manage Projects & Case Studies</div>
            <div className="text-[11px] text-[#71717a] mt-1">Edit CitiConnect, Attendance System, or draft new work</div>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Update Profile & Availability</div>
            <div className="text-[11px] text-[#71717a] mt-1">Change headline, location, and internship status</div>
          </button>

          <button
            onClick={() => onNavigate('skills')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Review Technical Skills</div>
            <div className="text-[11px] text-[#71717a] mt-1">Add verified frameworks, database tools & QA competencies</div>
          </button>

          <button
            onClick={() => onNavigate('cv')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Upload CV Version</div>
            <div className="text-[11px] text-[#71717a] mt-1">Archive old versions and update public download link</div>
          </button>

          <button
            onClick={() => onNavigate('education')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Education & Certifications</div>
            <div className="text-[11px] text-[#71717a] mt-1">Techspire / APU coursework & verified certificates</div>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="p-3 bg-[#16181d] border border-[#26282e] hover:border-[#3f3f46] text-left transition-colors cursor-pointer"
          >
            <div className="font-mono text-xs font-bold text-[#f4f4f5]">Audit Log & Settings</div>
            <div className="text-[11px] text-[#71717a] mt-1">View content change history and safety fallback</div>
          </button>
        </div>
      </div>
    </div>
  );
};

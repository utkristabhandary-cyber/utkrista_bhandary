import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { Project, ContentStatus } from '../../../types';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Copy,
  Trash2,
  Star,
  Check,
  X,
  Eye,
  AlertTriangle,
  FileCode,
  Tag
} from 'lucide-react';

export const ProjectsManagerTab: React.FC = () => {
  const {
    allProjects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
    reorderProjects
  } = usePortfolioContent();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');
  const [capabilityInput, setCapabilityInput] = useState('');

  // Move up/down
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= allProjects.length) return;

    const newProjects = [...allProjects];
    const [moved] = newProjects.splice(index, 1);
    newProjects.splice(targetIndex, 0, moved);

    const ids = newProjects.map((p) => p.id);
    reorderProjects(ids);
  };

  const handleToggleStatus = (project: Project) => {
    const nextStatus: ContentStatus = project.status === 'published' ? 'draft' : 'published';
    updateProject(project.id, { status: nextStatus });
  };

  const handleToggleFeatured = (project: Project) => {
    updateProject(project.id, { isFeatured: !project.isFeatured });
  };

  // Form handlers
  const handleStartCreate = () => {
    const defaultProject: Project = {
      id: '',
      number: String(allProjects.length + 1).padStart(2, '0'),
      title: '',
      category: 'FULL-STACK WEB APPLICATION',
      period: '2026',
      statusBadge: 'NEW PROJECT',
      tagline: '',
      description: '',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      capabilities: ['Component Architecture', 'Automated Verification'],
      keyLesson: '',
      highlightType: 'standard',
      hasCaseStudy: false,
      abstractVisualType: 'data',
      problem: '',
      approach: '',
      githubUrl: 'https://github.com',
      liveUrl: '',
      displayOrder: allProjects.length + 1,
      status: 'draft',
      isFeatured: false
    };
    setEditingProject(defaultProject);
    setIsCreating(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (isCreating) {
      createProject(editingProject);
    } else {
      updateProject(editingProject.id, editingProject);
    }

    setEditingProject(null);
    setIsCreating(false);
  };

  const addTechnology = () => {
    if (!techInput.trim() || !editingProject) return;
    if (!editingProject.technologies.includes(techInput.trim())) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, techInput.trim()]
      });
    }
    setTechInput('');
  };

  const removeTechnology = (tech: string) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      technologies: editingProject.technologies.filter((t) => t !== tech)
    });
  };

  const addCapability = () => {
    if (!capabilityInput.trim() || !editingProject) return;
    setEditingProject({
      ...editingProject,
      capabilities: [...editingProject.capabilities, capabilityInput.trim()]
    });
    setCapabilityInput('');
  };

  const removeCapability = (index: number) => {
    if (!editingProject) return;
    setEditingProject({
      ...editingProject,
      capabilities: editingProject.capabilities.filter((_, idx) => idx !== index)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26282e]">
        <div>
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5]">
            PROJECT INVENTORY & EDITORIAL CONTROLS
          </h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Add new projects, reorder public display hierarchy, toggle draft/published status, and manage technical case studies.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD PROJECT</span>
        </button>
      </div>

      {/* Projects Table / Card List */}
      <div className="space-y-3">
        {allProjects.map((project, idx) => (
          <div
            key={project.id}
            className={`p-4 bg-[#121316] border ${
              project.status === 'published' ? 'border-[#26282e]' : 'border-amber-500/30 bg-amber-950/5'
            } transition-all`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left Details */}
              <div className="flex items-start gap-4">
                {/* Number & Reorder */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="font-mono text-sm font-bold text-[#71717a]">{project.number}</span>
                  <div className="flex flex-col gap-0.5">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 hover:text-white disabled:opacity-20 text-[#71717a] transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      disabled={idx === allProjects.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 hover:text-white disabled:opacity-20 text-[#71717a] transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm text-[#f4f4f5]">{project.title}</h3>
                    {project.status === 'published' ? (
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        DRAFT
                      </span>
                    )}

                    {project.isFeatured && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-cyan-400" />
                        FEATURED
                      </span>
                    )}

                    {project.statusBadge && (
                      <span className="text-[10px] font-mono text-[#71717a]">
                        [{project.statusBadge}]
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#a1a1aa] line-clamp-1">{project.tagline}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 text-[10px] font-mono bg-[#1c1e24] text-[#a1a1aa]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="text-[10px] font-mono text-[#71717a] self-center">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-center">
                <button
                  onClick={() => handleToggleFeatured(project)}
                  className={`p-2 border ${
                    project.isFeatured
                      ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/20'
                      : 'border-[#26282e] text-[#71717a] hover:text-[#f4f4f5]'
                  } transition-colors cursor-pointer`}
                  title="Toggle Featured"
                >
                  <Star className={`w-3.5 h-3.5 ${project.isFeatured ? 'fill-cyan-400' : ''}`} />
                </button>

                <button
                  onClick={() => handleToggleStatus(project)}
                  className={`px-2.5 py-1.5 border text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    project.status === 'published'
                      ? 'border-[#26282e] text-[#a1a1aa] hover:text-amber-300'
                      : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/20'
                  }`}
                >
                  {project.status === 'published' ? 'UNPUBLISH' : 'PUBLISH'}
                </button>

                <button
                  onClick={() => {
                    setEditingProject({ ...project });
                    setIsCreating(false);
                  }}
                  className="p-2 border border-[#26282e] text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#3f3f46] transition-colors cursor-pointer"
                  title="Edit Project"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => duplicateProject(project.id)}
                  className="p-2 border border-[#26282e] text-[#a1a1aa] hover:text-[#f4f4f5] hover:border-[#3f3f46] transition-colors cursor-pointer"
                  title="Duplicate Project"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setProjectToDelete(project)}
                  className="p-2 border border-[#26282e] text-[#71717a] hover:text-rose-400 hover:border-rose-500/40 transition-colors cursor-pointer"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-rose-500/50 p-6 space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-mono text-sm font-bold uppercase">CONFIRM DELETION</h3>
            </div>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Are you sure you want to delete <strong className="text-white font-mono">{projectToDelete.title}</strong>? This action will remove it from the CMS repository and public views.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                DELETE PROJECT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Edit / Create Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#121316] border border-[#26282e] p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#26282e]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider">
                  {isCreating ? 'NEW INVENTORY ENTRY' : 'PROJECT EDITOR'}
                </span>
                <h3 className="text-base font-bold text-[#f4f4f5]">
                  {isCreating ? 'Add New Portfolio Project' : `Editing: ${editingProject.title}`}
                </h3>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="text-[#71717a] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Project Title</label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Category Label</label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Period / Timeline</label>
                  <input
                    type="text"
                    value={editingProject.period || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, period: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Status Badge (e.g. Core Academic Platform)</label>
                  <input
                    type="text"
                    value={editingProject.statusBadge || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, statusBadge: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Tagline / Concise Punchline</label>
                <input
                  type="text"
                  value={editingProject.tagline}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] p-3 text-xs text-[#f4f4f5] font-sans leading-relaxed focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Problem & Approach */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Problem Statement</label>
                  <textarea
                    rows={2}
                    value={editingProject.problem || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, problem: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] p-2.5 text-xs text-[#f4f4f5] font-sans focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Engineering Approach</label>
                  <textarea
                    rows={2}
                    value={editingProject.approach || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, approach: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] p-2.5 text-xs text-[#f4f4f5] font-sans focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Technologies Tag Manager */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Technologies Stack</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add technology (e.g. Django, PostgreSQL)..."
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology();
                      }
                    }}
                    className="flex-1 bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-3 py-1.5 bg-[#26282e] text-xs font-mono uppercase text-[#f4f4f5] hover:bg-[#3f3f46]"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {editingProject.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-[#1c1e24] text-xs font-mono text-emerald-400 flex items-center gap-1.5"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => removeTechnology(t)}
                        className="text-[#71717a] hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities Manager */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Domain Capabilities</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add capability point..."
                    value={capabilityInput}
                    onChange={(e) => setCapabilityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCapability();
                      }
                    }}
                    className="flex-1 bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addCapability}
                    className="px-3 py-1.5 bg-[#26282e] text-xs font-mono uppercase text-[#f4f4f5] hover:bg-[#3f3f46]"
                  >
                    ADD
                  </button>
                </div>
                <div className="space-y-1 pt-1">
                  {editingProject.capabilities.map((cap, cIdx) => (
                    <div
                      key={cIdx}
                      className="flex items-center justify-between p-2 bg-[#16181d] border border-[#26282e] text-xs text-[#e4e4e7]"
                    >
                      <span>• {cap}</span>
                      <button
                        type="button"
                        onClick={() => removeCapability(cIdx)}
                        className="text-[#71717a] hover:text-rose-400 text-xs px-1"
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Lesson */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Key Engineering Lesson</label>
                <textarea
                  rows={2}
                  value={editingProject.keyLesson || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, keyLesson: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] p-2.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              {/* URLs & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">GitHub Repository URL</label>
                  <input
                    type="url"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Status</label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ContentStatus })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="published">PUBLISHED (Visible to all visitors)</option>
                    <option value="draft">DRAFT (Hidden from public site)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-[#26282e]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="rounded-none accent-emerald-500"
                  />
                  <span className="text-xs font-mono uppercase text-[#f4f4f5]">Feature on Top</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.hasCaseStudy}
                    onChange={(e) => setEditingProject({ ...editingProject, hasCaseStudy: e.target.checked })}
                    className="rounded-none accent-emerald-500"
                  />
                  <span className="text-xs font-mono uppercase text-[#f4f4f5]">Include Full Case Study View</span>
                </label>
              </div>

              {/* Save & Cancel */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#26282e]">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  SAVE PROJECT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

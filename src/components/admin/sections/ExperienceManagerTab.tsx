import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { LeadershipExperience, ExperienceType, ContentStatus } from '../../../types';
import { Plus, Edit2, Trash2, Tag, Calendar, Building, Check, X } from 'lucide-react';

const EXPERIENCE_TYPES: ExperienceType[] = [
  'Leadership',
  'Club',
  'Volunteer',
  'Project',
  'Internship',
  'Employment',
  'Event'
];

export const ExperienceManagerTab: React.FC = () => {
  const { allExperiences, createExperience, updateExperience, deleteExperience } = usePortfolioContent();
  const [editingItem, setEditingItem] = useState<LeadershipExperience | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleStartAdd = () => {
    const newItem: LeadershipExperience = {
      id: '',
      role: '',
      organization: '',
      period: '2026 — PRESENT',
      type: 'Leadership',
      description: '',
      tags: ['Leadership'],
      displayOrder: allExperiences.length + 1,
      status: 'published'
    };
    setEditingItem(newItem);
    setIsAdding(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isAdding) {
      createExperience(editingItem);
    } else {
      updateExperience(editingItem.id, editingItem);
    }

    setEditingItem(null);
    setIsAdding(false);
  };

  const addTag = () => {
    if (!tagInput.trim() || !editingItem) return;
    if (!editingItem.tags.includes(tagInput.trim())) {
      setEditingItem({
        ...editingItem,
        tags: [...editingItem.tags, tagInput.trim()]
      });
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    if (!editingItem) return;
    setEditingItem({
      ...editingItem,
      tags: editingItem.tags.filter((t) => t !== tag)
    });
  };

  const toggleStatus = (item: LeadershipExperience) => {
    const nextStatus: ContentStatus = item.status === 'published' ? 'draft' : 'published';
    updateExperience(item.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26282e]">
        <div>
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5]">
            LEADERSHIP & EXPERIENCE MANAGEMENT
          </h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Manage student club leadership roles, technical event planning, graphics, and community initiatives.
          </p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD EXPERIENCE</span>
        </button>
      </div>

      {/* Experience list */}
      <div className="space-y-3">
        {allExperiences.map((exp) => (
          <div
            key={exp.id}
            className={`p-4 bg-[#121316] border ${
              exp.status === 'published' ? 'border-[#26282e]' : 'border-amber-500/30 bg-amber-950/10'
            } space-y-3`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase text-emerald-400">
                  {exp.type}
                </span>
                <span className="text-[#3f3f46]">•</span>
                <h3 className="font-bold text-sm text-[#f4f4f5]">{exp.role}</h3>
                <span className="text-xs text-[#a1a1aa] font-mono">at {exp.organization}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#71717a]">{exp.period}</span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono uppercase ${
                    exp.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {exp.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#a1a1aa] leading-relaxed">{exp.description}</p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1c1e24]">
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-[#1c1e24] text-[#a1a1aa]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(exp)}
                  className="px-2 py-1 text-[11px] font-mono uppercase text-[#71717a] hover:text-[#f4f4f5] border border-[#26282e] hover:border-[#3f3f46]"
                >
                  {exp.status === 'published' ? 'SET DRAFT' : 'PUBLISH'}
                </button>
                <button
                  onClick={() => {
                    setEditingItem({ ...exp });
                    setIsAdding(false);
                  }}
                  className="p-1.5 text-[#71717a] hover:text-[#f4f4f5] border border-[#26282e]"
                  title="Edit Experience"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-1.5 text-[#71717a] hover:text-rose-400 border border-[#26282e]"
                  title="Delete Experience"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#121316] border border-[#26282e] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#26282e]">
              <h3 className="font-mono text-sm font-bold uppercase text-[#f4f4f5]">
                {isAdding ? 'ADD LEADERSHIP / EXPERIENCE' : `EDIT: ${editingItem.role}`}
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-[#71717a] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Role Title</label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Organization / Club</label>
                  <input
                    type="text"
                    value={editingItem.organization}
                    onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Experience Type</label>
                  <select
                    value={editingItem.type}
                    onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value as ExperienceType })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  >
                    {EXPERIENCE_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Period</label>
                  <input
                    type="text"
                    value={editingItem.period}
                    onChange={(e) => setEditingItem({ ...editingItem, period: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Description of Responsibilities</label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] p-3 text-xs text-[#f4f4f5] font-sans leading-relaxed focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Tag manager */}
              <div className="space-y-2">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Tags / Competencies</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add tag (e.g. Leadership, Event Planning)..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                    className="flex-1 bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-1.5 bg-[#26282e] text-xs font-mono uppercase text-[#f4f4f5] hover:bg-[#3f3f46]"
                  >
                    ADD
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {editingItem.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-[#1c1e24] text-xs font-mono text-emerald-400 flex items-center gap-1"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="text-[#71717a] hover:text-rose-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Status</label>
                <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as ContentStatus })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option value="published">PUBLISHED</option>
                  <option value="draft">DRAFT</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  SAVE EXPERIENCE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

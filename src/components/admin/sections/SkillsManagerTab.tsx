import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { SkillItem, ContentStatus } from '../../../types';
import { Plus, Edit2, Trash2, Check, AlertCircle, ShieldCheck, Tag } from 'lucide-react';

const CATEGORIES = [
  'PROGRAMMING & DEVELOPMENT',
  'AI & AUTOMATION',
  'SOFTWARE TESTING & QA',
  'DATABASES & DATA',
  'UI/UX & DESIGN THINKING',
  'PROFESSIONAL CAPABILITIES'
];

export const SkillsManagerTab: React.FC = () => {
  const { allSkills, createSkill, updateSkill, deleteSkill } = usePortfolioContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState(CATEGORIES[0]);
  const [newSkillStatus, setNewSkillStatus] = useState<ContentStatus>('published');

  const filteredSkills = selectedCategory === 'ALL'
    ? allSkills
    : allSkills.filter((s) => s.category === selectedCategory);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    createSkill({
      name: newSkillName.trim(),
      category: newSkillCategory,
      status: newSkillStatus
    });

    setNewSkillName('');
    setIsAdding(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name.trim()) return;

    updateSkill(editingSkill.id, {
      name: editingSkill.name.trim(),
      category: editingSkill.category,
      status: editingSkill.status
    });

    setEditingSkill(null);
  };

  const handleToggleStatus = (skill: SkillItem) => {
    const nextStatus: ContentStatus = skill.status === 'published' ? 'draft' : 'published';
    updateSkill(skill.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26282e]">
        <div>
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5]">
            TECHNICAL SKILLS & CAPABILITY MANAGEMENT
          </h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Add, update, categorize, or retire verified technical skills across programming, AI workflows, testing, and UI/UX.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>ADD SKILL</span>
        </button>
      </div>

      {/* Anti-Slop Discipline Banner */}
      <div className="p-4 bg-[#121316] border border-[#26282e] flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-1">
          <p className="font-mono font-bold text-[#f4f4f5] uppercase text-[11px]">
            PORTFOLIO VERIFICATION RULE: NO ARBITRARY PERCENTAGE BARS
          </p>
          <p>
            Skills are presented purely as clean, verified categorical competencies. Avoid misleading "Python 90%" or "React 85%" progress bars. Real engineering ability is demonstrated through architectural separation and automated test suites.
          </p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#1c1e24]">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
            selectedCategory === 'ALL'
              ? 'bg-[#26282e] text-[#f4f4f5] border border-[#3f3f46]'
              : 'text-[#71717a] hover:text-[#f4f4f5]'
          }`}
        >
          ALL ({allSkills.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = allSkills.filter((s) => s.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono uppercase transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#26282e] text-[#f4f4f5] border border-[#3f3f46]'
                  : 'text-[#71717a] hover:text-[#f4f4f5]'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className={`p-3 bg-[#121316] border ${
              skill.status === 'published' ? 'border-[#26282e]' : 'border-amber-500/30 bg-amber-950/10'
            } flex items-center justify-between gap-3 group`}
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#f4f4f5] truncate">
                  {skill.name}
                </span>
                {skill.status === 'draft' && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    DRAFT
                  </span>
                )}
              </div>
              <p className="text-[10px] font-mono text-[#71717a] truncate">{skill.category}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => handleToggleStatus(skill)}
                className="p-1.5 text-[#71717a] hover:text-emerald-400 transition-colors"
                title={skill.status === 'published' ? 'Set as Draft' : 'Publish Skill'}
              >
                <Tag className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setEditingSkill({ ...skill })}
                className="p-1.5 text-[#71717a] hover:text-[#f4f4f5] transition-colors"
                title="Edit Skill"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="p-1.5 text-[#71717a] hover:text-rose-400 transition-colors"
                title="Delete Skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-[#26282e] p-6 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase text-[#f4f4f5]">
              ADD VERIFIED TECHNICAL SKILL
            </h3>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Skill / Tool Name</label>
                <input
                  type="text"
                  placeholder="e.g. FastAPI, Jest, GitHub Actions..."
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Domain Category</label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Initial Status</label>
                <select
                  value={newSkillStatus}
                  onChange={(e) => setNewSkillStatus(e.target.value as ContentStatus)}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option value="published">PUBLISHED (Live)</option>
                  <option value="draft">DRAFT (Hidden)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  ADD SKILL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-[#26282e] p-6 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase text-[#f4f4f5]">
              EDIT SKILL: {editingSkill.name}
            </h3>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Skill Name</label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Domain Category</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Visibility Status</label>
                <select
                  value={editingSkill.status}
                  onChange={(e) => setEditingSkill({ ...editingSkill, status: e.target.value as ContentStatus })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                >
                  <option value="published">PUBLISHED</option>
                  <option value="draft">DRAFT</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  SAVE CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

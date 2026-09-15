import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { EducationItem, CertificationItem, ContentStatus } from '../../../types';
import { Plus, Edit2, Trash2, Check, GraduationCap, Award, ShieldAlert, X } from 'lucide-react';

export const EducationCertificationsTab: React.FC = () => {
  const {
    education,
    updateEducation,
    allCertifications,
    createCertification,
    updateCertification,
    deleteCertification
  } = usePortfolioContent();

  const [eduData, setEduData] = useState<EducationItem>({ ...education });
  const [eduSaved, setEduSaved] = useState(false);
  const [courseworkInput, setCourseworkInput] = useState('');

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);

  // Education handlers
  const handleSaveEducation = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(eduData);
    setEduSaved(true);
    setTimeout(() => setEduSaved(false), 3000);
  };

  const addCoursework = () => {
    if (!courseworkInput.trim()) return;
    if (!eduData.coursework.includes(courseworkInput.trim())) {
      setEduData({
        ...eduData,
        coursework: [...eduData.coursework, courseworkInput.trim()]
      });
    }
    setCourseworkInput('');
  };

  const removeCoursework = (item: string) => {
    setEduData({
      ...eduData,
      coursework: eduData.coursework.filter((c) => c !== item)
    });
  };

  // Certification handlers
  const handleStartAddCert = () => {
    const newCert: CertificationItem = {
      id: '',
      title: '',
      organization: 'Techspire College',
      focus: '',
      date: '2026',
      credentialId: '',
      credentialUrl: '',
      displayOrder: allCertifications.length + 1,
      status: 'published'
    };
    setEditingCert(newCert);
    setIsAddingCert(true);
  };

  const handleSaveCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (isAddingCert) {
      createCertification(editingCert);
    } else {
      updateCertification(editingCert.id, editingCert);
    }

    setEditingCert(null);
    setIsAddingCert(false);
  };

  const toggleCertStatus = (cert: CertificationItem) => {
    const nextStatus: ContentStatus = cert.status === 'published' ? 'draft' : 'published';
    updateCertification(cert.id, { status: nextStatus });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#26282e]">
          <div>
            <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              ACADEMIC DEGREE & INSTITUTION
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Update formal degree credentials, university affiliations, and syllabus coursework modules.
            </p>
          </div>

          {eduSaved && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>Saved live</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSaveEducation} className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Degree Program</label>
              <input
                type="text"
                value={eduData.degree}
                onChange={(e) => setEduData({ ...eduData, degree: e.target.value })}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Institution</label>
              <input
                type="text"
                value={eduData.institution}
                onChange={(e) => setEduData({ ...eduData, institution: e.target.value })}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">University Affiliation</label>
              <input
                type="text"
                value={eduData.affiliation}
                onChange={(e) => setEduData({ ...eduData, affiliation: e.target.value })}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Period & Status</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={eduData.period}
                  onChange={(e) => setEduData({ ...eduData, period: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
                <input
                  type="text"
                  value={eduData.status}
                  onChange={(e) => setEduData({ ...eduData, status: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Coursework Modules */}
          <div className="space-y-2 pt-2 border-t border-[#1c1e24]">
            <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Core Academic Coursework</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add module (e.g. Programming in Python, Relational Databases)..."
                value={courseworkInput}
                onChange={(e) => setCourseworkInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCoursework();
                  }
                }}
                className="flex-1 bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={addCoursework}
                className="px-3 py-1.5 bg-[#26282e] text-xs font-mono uppercase text-[#f4f4f5] hover:bg-[#3f3f46]"
              >
                ADD
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {eduData.coursework.map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 bg-[#1c1e24] text-xs font-mono text-[#e4e4e7] flex items-center gap-1.5"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removeCoursework(c)}
                    className="text-[#71717a] hover:text-rose-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              SAVE ACADEMIC DETAILS
            </button>
          </div>
        </form>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4 pt-4 border-t border-[#26282e]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#26282e]">
          <div>
            <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              VERIFIED CERTIFICATIONS & WORKSHOPS
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Add technical credentials, data science certificates, design thinking workshops, and verify legitimacy.
            </p>
          </div>

          <button
            onClick={handleStartAddCert}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>ADD CERTIFICATION</span>
          </button>
        </div>

        {/* Verification Rule Notice */}
        <div className="p-3 bg-[#121316] border border-[#26282e] flex items-start gap-2.5 text-[11px] text-[#a1a1aa] font-mono">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Strict Context Rule: Never invent fake credential verification URLs or ID hashes. If a workshop certificate does not supply an online verification ID, leave the field empty.
          </span>
        </div>

        {/* Certifications List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allCertifications.map((cert) => (
            <div
              key={cert.id}
              className={`p-4 bg-[#121316] border ${
                cert.status === 'published' ? 'border-[#26282e]' : 'border-amber-500/30 bg-amber-950/10'
              } space-y-2`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs text-[#f4f4f5]">{cert.title}</h3>
                  <p className="text-[11px] font-mono text-emerald-400">{cert.organization} ({cert.date || '2026'})</p>
                </div>
                <span
                  className={`px-1.5 py-0.2 text-[9px] font-mono uppercase ${
                    cert.status === 'published'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {cert.status}
                </span>
              </div>

              <p className="text-xs text-[#a1a1aa]">{cert.focus}</p>

              {cert.credentialId && (
                <p className="text-[10px] font-mono text-[#71717a]">ID: {cert.credentialId}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1c1e24]">
                <button
                  onClick={() => toggleCertStatus(cert)}
                  className="text-[10px] font-mono uppercase text-[#71717a] hover:text-[#f4f4f5] px-1.5 py-0.5 border border-[#26282e]"
                >
                  {cert.status === 'published' ? 'DRAFT' : 'PUBLISH'}
                </button>
                <button
                  onClick={() => {
                    setEditingCert({ ...cert });
                    setIsAddingCert(false);
                  }}
                  className="p-1 text-[#71717a] hover:text-white border border-[#26282e]"
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteCertification(cert.id)}
                  className="p-1 text-[#71717a] hover:text-rose-400 border border-[#26282e]"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Create Certification Modal */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-[#26282e] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#26282e]">
              <h3 className="font-mono text-sm font-bold uppercase text-[#f4f4f5]">
                {isAddingCert ? 'ADD CERTIFICATION' : `EDIT: ${editingCert.title}`}
              </h3>
              <button onClick={() => setEditingCert(null)} className="text-[#71717a] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCert} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Certification Title</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Issuing Organization</label>
                <input
                  type="text"
                  value={editingCert.organization}
                  onChange={(e) => setEditingCert({ ...editingCert, organization: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Focus / Covered Topic</label>
                <input
                  type="text"
                  value={editingCert.focus}
                  onChange={(e) => setEditingCert({ ...editingCert, focus: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Issue Date / Year</label>
                  <input
                    type="text"
                    value={editingCert.date || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, date: e.target.value })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Visibility</label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as ContentStatus })}
                    className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="published">PUBLISHED</option>
                    <option value="draft">DRAFT</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">
                  Credential ID (Optional - Leave blank if unissued)
                </label>
                <input
                  type="text"
                  value={editingCert.credentialId || ''}
                  onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-1.5 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  SAVE CERTIFICATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { FileText, Upload, Check, Eye, EyeOff, Archive, Clock, AlertCircle, X, Download } from 'lucide-react';

export const CVManagerTab: React.FC = () => {
  const { cvDocuments, currentCV, uploadNewCV, setCurrentCV, settings, updateSettings } = usePortfolioContent();

  const [isUploading, setIsUploading] = useState(false);
  const [versionInput, setVersionInput] = useState('');
  const [filenameInput, setFilenameInput] = useState('utkrista_bhandary.pdf');
  const [notesInput, setNotesInput] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filenameInput.trim()) return;

    uploadNewCV(filenameInput.trim(), versionInput.trim() || `v${cvDocuments.length + 1}.0`, notesInput.trim());
    setIsUploading(false);
    setVersionInput('');
    setNotesInput('');
    setSuccessMsg('New CV version registered and set as current active version.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleTogglePublicDownload = () => {
    const nextVal = !settings.showCvButton;
    updateSettings({ showCvButton: nextVal });
    setSuccessMsg(nextVal ? 'CV Download button is now VISIBLE on public portfolio.' : 'CV Download button is now HIDDEN from public portfolio.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26282e]">
        <div>
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            CANONICAL CV & RESUME ASSET MANAGEMENT
          </h2>
<p className="text-xs text-[#a1a1aa] mt-0.5">
              Manage your official curriculum vitae document, toggle public visitor downloads, and maintain versioned archive history.
            </p>
            <p className="text-[11px] text-[#71717a] mt-1 font-mono">
              Note: the public download always serves /utkrista_bhandary.pdf from the app&apos;s public assets folder. Registering a new version here updates the CMS record; place the actual PDF at public/utkrista_bhandary.pdf before deploying.
            </p>
        </div>

        <button
          onClick={() => setIsUploading(true)}
          className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>UPLOAD NEW VERSION</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Current Active CV Box */}
      <div className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono font-bold text-sm text-[#f4f4f5]">
                  {currentCV?.filename || 'utkrista_bhandary.pdf'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  CURRENT ACTIVE
                </span>
              </div>
              <p className="text-xs text-[#a1a1aa] font-mono mt-0.5">
                Version: <span className="text-[#f4f4f5]">{currentCV?.version || '1.0.0'}</span> • Uploaded: {currentCV?.uploadDate || '2026-09-15'} • Size: {currentCV?.fileSize || '184 KB'}
              </p>
            </div>
          </div>

          {/* Visibility Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePublicDownload}
              className={`px-3 py-2 border text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                settings.showCvButton
                  ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/20'
                  : 'border-[#26282e] text-[#71717a] hover:text-[#f4f4f5]'
              }`}
            >
              {settings.showCvButton ? (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>PUBLIC DOWNLOAD: ON</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>PUBLIC DOWNLOAD: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {currentCV?.notes && (
          <div className="p-3 bg-[#16181d] border border-[#26282e] text-xs text-[#a1a1aa] font-mono leading-relaxed">
            <span className="text-[#71717a] uppercase text-[10px] block mb-0.5">VERSION NOTES:</span>
            {currentCV.notes}
          </div>
        )}
      </div>

      {/* Version History Table */}
      <div className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
        <h3 className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa] font-bold">
          DOCUMENT VERSION ARCHIVE ({cvDocuments.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#26282e] text-[#71717a] uppercase text-[10px]">
                <th className="py-2.5 px-3">VERSION</th>
                <th className="py-2.5 px-3">FILENAME</th>
                <th className="py-2.5 px-3">UPLOAD DATE</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c1e24]">
              {cvDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#16181d]/50">
                  <td className="py-2.5 px-3 font-bold text-[#f4f4f5]">{doc.version}</td>
                  <td className="py-2.5 px-3 text-[#a1a1aa]">{doc.filename}</td>
                  <td className="py-2.5 px-3 text-[#71717a]">{doc.uploadDate}</td>
                  <td className="py-2.5 px-3">
                    {doc.status === 'current' ? (
                      <span className="px-1.5 py-0.2 text-[9px] uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        ACTIVE
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 text-[9px] uppercase bg-zinc-800 text-zinc-400">
                        ARCHIVED
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {doc.status !== 'current' && (
                      <button
                        onClick={() => setCurrentCV(doc.id)}
                        className="px-2 py-1 text-[10px] uppercase text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950/30 transition-colors"
                      >
                        SET ACTIVE
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-[#26282e] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#26282e]">
              <h3 className="font-mono text-sm font-bold uppercase text-[#f4f4f5]">
                REGISTER NEW CV VERSION
              </h3>
              <button onClick={() => setIsUploading(false)} className="text-[#71717a] hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Document Filename</label>
                <input
                  type="text"
                  value={filenameInput}
                  onChange={(e) => setFilenameInput(e.target.value)}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Semantic Version Code</label>
                <input
                  type="text"
                  placeholder="e.g. 1.3.0 or 2026.09"
                  value={versionInput}
                  onChange={(e) => setVersionInput(e.target.value)}
                  className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Version Notes / Highlights</label>
                <textarea
                  rows={3}
                  placeholder="Describe recent additions (e.g. Added CitiConnect case study, updated IT Club role)..."
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full bg-[#16181d] border border-[#26282e] p-3 text-xs text-[#f4f4f5] font-sans focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploading(false)}
                  className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider"
                >
                  SAVE & ACTIVATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

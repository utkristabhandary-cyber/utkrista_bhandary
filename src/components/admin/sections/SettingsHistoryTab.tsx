import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { Settings, History, RotateCcw, Check, AlertTriangle, Sparkles, Shield, Lock } from 'lucide-react';
import { PortfolioSettings } from '../../../types';

export const SettingsHistoryTab: React.FC = () => {
  const { settings, updateSettings, auditLogs, resetToDefaults } = usePortfolioContent();
  const [formData, setFormData] = useState<PortfolioSettings>({ ...settings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Settings Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#26282e]">
          <div>
            <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" />
              PORTFOLIO GLOBAL CONFIGURATION
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-0.5">
              Control public website presentation, visibility switches, and site metadata.
            </p>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <Check className="w-3.5 h-3.5" />
              <span>Settings saved</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="bg-[#121316] border border-[#26282e] p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Browser Window / Meta Site Title</label>
            <input
              type="text"
              value={formData.siteTitle}
              onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
              className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-[#1c1e24]">
            <h4 className="text-[11px] font-mono uppercase text-[#a1a1aa] font-bold">
              PUBLIC SECTION VISIBILITY SWITCHES
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 bg-[#16181d] border border-[#26282e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showCvButton}
                  onChange={(e) => setFormData({ ...formData, showCvButton: e.target.checked })}
                  className="rounded-none accent-emerald-500"
                />
                <span className="text-xs font-mono text-[#f4f4f5]">Show CV Download Button</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#16181d] border border-[#26282e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showExperience}
                  onChange={(e) => setFormData({ ...formData, showExperience: e.target.checked })}
                  className="rounded-none accent-emerald-500"
                />
                <span className="text-xs font-mono text-[#f4f4f5]">Show Leadership & Experience</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#16181d] border border-[#26282e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showCertifications}
                  onChange={(e) => setFormData({ ...formData, showCertifications: e.target.checked })}
                  className="rounded-none accent-emerald-500"
                />
                <span className="text-xs font-mono text-[#f4f4f5]">Show Certifications Section</span>
              </label>

              <label className="flex items-center gap-3 p-3 bg-[#16181d] border border-[#26282e] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.showContactSection}
                  onChange={(e) => setFormData({ ...formData, showContactSection: e.target.checked })}
                  className="rounded-none accent-emerald-500"
                />
                <span className="text-xs font-mono text-[#f4f4f5]">Show Contact Section</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              SAVE CONFIGURATION
            </button>
          </div>
        </form>
      </div>

      {/* Audit Log & History Section */}
      <div className="space-y-4 pt-4 border-t border-[#26282e]">
        <div className="pb-3 border-b border-[#26282e]">
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5] flex items-center gap-2">
            <History className="w-4 h-4 text-emerald-400" />
            CONTENT AUDIT LOG & REVISION HISTORY ({auditLogs.length})
          </h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Immutable tracking of all profile updates, project status changes, skill additions, and CV uploads.
          </p>
        </div>

        <div className="bg-[#121316] border border-[#26282e] p-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-[#26282e] text-[#71717a] uppercase text-[10px]">
                  <th className="py-2 px-3">TIMESTAMP</th>
                  <th className="py-2 px-3">ACTION</th>
                  <th className="py-2 px-3">ITEM</th>
                  <th className="py-2 px-3">CATEGORY</th>
                  <th className="py-2 px-3">AUTHOR</th>
                  <th className="py-2 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1c1e24]">
                {auditLogs.slice(0, 20).map((log) => (
                  <tr key={log.id} className="hover:bg-[#16181d]/50">
                    <td className="py-2.5 px-3 text-[#71717a] whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-bold text-[#f4f4f5]">{log.action}</td>
                    <td className="py-2.5 px-3 text-[#a1a1aa]">{log.item}</td>
                    <td className="py-2.5 px-3 text-[#71717a]">{log.category}</td>
                    <td className="py-2.5 px-3 text-emerald-400/80 truncate max-w-[150px]">{log.user}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`px-1.5 py-0.2 text-[9px] uppercase ${
                          log.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : log.status === 'deleted'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Future AI-Assisted Architecture Blueprint */}
      <div className="bg-[#121316] border border-[#26282e] p-6 space-y-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
            FUTURE EXTENSION: AI-ASSISTED CV EXTRACTION PIPELINE
          </h3>
        </div>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          The CMS is architecturally structured so that an intelligent parsing agent (any language-model API service) can analyze uploaded PDF documents or syllabus files, extract verified competencies, and stage changes in <code className="text-amber-400 font-mono">DRAFT</code> mode. The owner retains absolute approval authority before anything is published live.
        </p>
      </div>

      {/* Safety Fallback / Reset Zone */}
      <div className="p-6 border border-rose-500/30 bg-rose-950/10 space-y-4">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider">
            SAFETY RESTORATION / RESET TO DEFAULTS
          </h3>
        </div>
        <p className="text-xs text-[#a1a1aa] leading-relaxed">
          If unintended modifications were saved during testing or development, you can reset the entire CMS repository back to the verified canonical state from <code className="text-white font-mono">/docs/portfolio-context.md</code>.
        </p>

        <button
          onClick={() => setShowResetConfirm(true)}
          className="px-4 py-2 border border-rose-500/40 hover:bg-rose-500/20 text-rose-300 font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          RESTORE CANONICAL DEFAULTS
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#121316] border border-rose-500/60 p-6 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              CONFIRM CANONICAL RESTORATION
            </h3>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              This will overwrite all current CMS modifications with the baseline canonical data verified in <strong className="text-white font-mono">portfolio-context.md</strong>. Are you sure?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-[#26282e] text-xs font-mono uppercase text-[#a1a1aa] hover:text-white"
              >
                CANCEL
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                CONFIRM RESET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

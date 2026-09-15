import React, { useState } from 'react';
import { usePortfolioContent } from '../../../context/PortfolioContentContext';
import { Check, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import { ProfileData } from '../../../types';

export const ProfileEditorTab: React.FC = () => {
  const { profile, updateProfile } = usePortfolioContent();
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (key: 'github' | 'linkedin', value: string) => {
    setFormData((prev) => ({
      ...prev,
      links: { ...prev.links, [key]: value }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    setFormData({ ...profile });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#26282e]">
        <div>
          <h2 className="text-base font-bold font-mono uppercase tracking-wider text-[#f4f4f5]">
            PROFILE & IDENTITY CONTROLS
          </h2>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Manage your headline, availability status, role titles, contact coordinates and professional links.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Check className="w-3.5 h-3.5" />
            <span>Profile updated & synchronized live</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Identity */}
        <div className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            01 / CORE IDENTITY & POSITIONING
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Full Legal Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Primary Professional Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">
              Hero Display Headline (All-Caps Editorial)
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              required
            />
            <p className="text-[10px] text-[#71717a] font-mono">
              Canonical: "I BUILD SOFTWARE WITH AI, THEN TEST WHAT I BUILD."
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">
              Subheadline / Executive Summary
            </label>
            <textarea
              rows={3}
              value={formData.subheadline}
              onChange={(e) => handleChange('subheadline', e.target.value)}
              className="w-full bg-[#16181d] border border-[#26282e] p-3 text-xs text-[#f4f4f5] leading-relaxed font-sans focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">
              Availability Status Badge
            </label>
            <input
              type="text"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-emerald-400 font-mono focus:outline-none focus:border-emerald-500"
              required
            />
          </div>
        </div>

        {/* Contact & Physical Coordinates */}
        <div className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            02 / CONTACT & LOCATION COORDINATES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Email Address (Owner)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">GPS Coordinates</label>
              <input
                type="text"
                value={formData.coordinates}
                onChange={(e) => handleChange('coordinates', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-[#121316] border border-[#26282e] p-6 space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            03 / PROFESSIONAL SOCIAL PROFILES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">GitHub URL</label>
              <input
                type="url"
                value={formData.links.github}
                onChange={(e) => handleLinkChange('github', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase text-[#a1a1aa]">LinkedIn URL</label>
              <input
                type="url"
                value={formData.links.linkedin}
                onChange={(e) => handleLinkChange('linkedin', e.target.value)}
                className="w-full bg-[#16181d] border border-[#26282e] px-3 py-2 text-xs text-[#f4f4f5] font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 border border-[#26282e] hover:border-[#3f3f46] text-[#a1a1aa] hover:text-[#f4f4f5] text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>DISCARD EDITS</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-[#090a0c] font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>SAVE PROFILE CHANGES</span>
          </button>
        </div>
      </form>
    </div>
  );
};

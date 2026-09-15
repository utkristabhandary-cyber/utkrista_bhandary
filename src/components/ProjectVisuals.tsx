import React from 'react';
import { MapPin, Shield, BrainCircuit, CheckCircle2, AlertCircle, FileCheck, Layers, GitBranch, Calendar } from 'lucide-react';

interface VisualProps {
  type: 'citiconnect' | 'attendance' | 'candidate' | 'data';
}

export const ProjectVisual: React.FC<VisualProps> = ({ type }) => {
  if (type === 'citiconnect') {
    return (
      <div className="w-full bg-[#111317] border border-neutral-800 rounded-lg p-5 sm:p-7 font-mono text-xs overflow-hidden relative group">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Visual Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-neutral-800 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-semibold text-neutral-200 uppercase tracking-wider">
              CitiConnect Architecture Diagram
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/60 text-neutral-400">
            Domain: Kathmandu Ward Workflows
          </span>
        </div>

        {/* The Workflow Diagram: Citizen Complaint -> AI Triage -> Human Officer -> Issue Resolution */}
        <div className="relative mt-6 space-y-4">
          {/* Step 1: Citizen Submission */}
          <div className="p-3.5 rounded bg-neutral-900/90 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-neutral-800 text-cyan-400 shrink-0 mt-0.5 sm:mt-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-neutral-200 font-medium">1. Citizen Submission (Complaint #1084)</div>
                <div className="text-neutral-400 text-[11px] mt-0.5">
                  Lat: 27.6782° N, Lng: 85.3891° E • Ward 04 • Photo evidence attached
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-neutral-800 text-neutral-300 font-semibold w-fit">
              Citizen Layer
            </span>
          </div>

          {/* Connector Arrow */}
          <div className="flex items-center justify-center -my-2 text-neutral-600">
            <div className="h-4 w-px bg-neutral-700" />
          </div>

          {/* Step 2: AI Triage & Fallback */}
          <div className="p-3.5 rounded bg-neutral-900/90 border border-cyan-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-cyan-950/80 text-cyan-300 shrink-0 mt-0.5 sm:mt-0">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div>
                <div className="text-neutral-200 font-medium flex items-center gap-2">
                  2. AI Triage Pipeline (Groq + Deterministic Mock)
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/60">
                    Confidence: 94%
                  </span>
                </div>
                <div className="text-neutral-400 text-[11px] mt-0.5">
                  Suggested Category: <span className="text-neutral-200">Road Infrastructure</span> • Urgency: <span className="text-amber-300">High</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-cyan-950 text-cyan-300 font-semibold w-fit">
              Advisory Only
            </span>
          </div>

          {/* Connector Arrow */}
          <div className="flex items-center justify-center -my-2 text-neutral-600">
            <div className="h-4 w-px bg-neutral-700" />
          </div>

          {/* Step 3: Human Officer & Issue Grouping */}
          <div className="p-3.5 rounded bg-neutral-900/90 border border-emerald-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-emerald-950/80 text-emerald-400 shrink-0 mt-0.5 sm:mt-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-neutral-200 font-medium flex items-center gap-2">
                  3. Ward Officer Review & Grouping (Issue #302)
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-neutral-400 text-[11px] mt-0.5">
                  Officer confirmed category • Linked 4 duplicate complaints to 1 operational issue
                </div>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-emerald-950 text-emerald-400 font-semibold w-fit">
              Accountability
            </span>
          </div>
        </div>

        {/* Footer Insight Box */}
        <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
            Core Domain Distinction: <strong className="text-white">Complaint ≠ Issue</strong>
          </span>
          <span className="text-neutral-500 hidden sm:inline-block">
            REST API + PostgreSQL Spatially Indexed
          </span>
        </div>
      </div>
    );
  }

  if (type === 'attendance') {
    return (
      <div className="w-full bg-[#111317] border border-neutral-800 rounded-lg p-5 sm:p-7 font-mono text-xs overflow-hidden relative group">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Visual Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-neutral-800 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <span className="font-semibold text-neutral-200 uppercase tracking-wider">
              AAMS Academic Relational Logic
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/60 text-neutral-400">
            PostgreSQL + Django REST
          </span>
        </div>

        {/* Relational Schema & Role Matrix representation */}
        <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
          {/* Admin Role */}
          <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-400 font-semibold text-[10px] tracking-wider uppercase mb-1">
              Role 01: Admin
            </div>
            <div className="text-neutral-200 font-medium text-xs mb-2">Institutional Setup</div>
            <ul className="space-y-1 text-neutral-400 text-[10px]">
              <li>• Define Semester & Sections</li>
              <li>• Assign Subject to Teacher</li>
              <li>• Register Gazetted Holidays</li>
              <li>• Audit System Logs</li>
            </ul>
          </div>

          {/* Teacher Role */}
          <div className="p-3 rounded bg-neutral-900 border border-indigo-950/80 bg-indigo-950/10">
            <div className="text-indigo-400 font-semibold text-[10px] tracking-wider uppercase mb-1">
              Role 02: Teacher
            </div>
            <div className="text-neutral-200 font-medium text-xs mb-2">Classroom Roster</div>
            <ul className="space-y-1 text-neutral-400 text-[10px]">
              <li>• View Timetable Slot</li>
              <li>• Mark Present/Absent/Late</li>
              <li>• Enforce Holiday Lockouts</li>
              <li>• Generate Section Report</li>
            </ul>
          </div>

          {/* Student Role */}
          <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-400 font-semibold text-[10px] tracking-wider uppercase mb-1">
              Role 03: Student
            </div>
            <div className="text-neutral-200 font-medium text-xs mb-2">Read-Only Analytics</div>
            <ul className="space-y-1 text-neutral-400 text-[10px]">
              <li>• Subject Attendance %</li>
              <li>• 75% Threshold Alert</li>
              <li>• Attendance Dispute Request</li>
              <li>• Holiday Calendar View</li>
            </ul>
          </div>
        </div>

        {/* Business Rule Enforcement Strip */}
        <div className="mt-4 p-3 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-neutral-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Validation: Holiday records strictly lock attendance writes</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Assertion: PASS</span>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
          <span>Relational Schema: Semester ➔ Section ➔ Subject ➔ Timetable ➔ Session</span>
          <span className="text-neutral-400">Automated Backend Validated</span>
        </div>
      </div>
    );
  }

  if (type === 'candidate') {
    return (
      <div className="w-full bg-[#111317] border border-neutral-800 rounded-lg p-5 sm:p-7 font-mono text-xs overflow-hidden relative">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-semibold text-neutral-200 uppercase tracking-wider">
              Recruiter Evaluation Rubric
            </span>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/60 text-neutral-400">
            Relay Hack x Acquire
          </span>
        </div>

        <div className="mt-5 space-y-3">
          <div className="p-3 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-neutral-200 font-medium">Candidate Profile Intake</div>
              <div className="text-neutral-500 text-[11px]">Parsed qualifications against role specifications</div>
            </div>
            <span className="text-emerald-400 text-[11px] font-mono">Stage: 100%</span>
          </div>

          <div className="p-3 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div>
              <div className="text-neutral-200 font-medium">Structured Assessment Rubric</div>
              <div className="text-neutral-500 text-[11px]">Standardized metrics to remove subjective bias</div>
            </div>
            <span className="text-cyan-400 text-[11px] font-mono">Stage: Active</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 flex justify-between">
          <span>Rapid Prototyping Under Competitive Constraints</span>
          <span className="text-neutral-400">React + TypeScript</span>
        </div>
      </div>
    );
  }

  // Data Analysis
  return (
    <div className="w-full bg-[#111317] border border-neutral-800 rounded-lg p-5 sm:p-7 font-mono text-xs overflow-hidden relative">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400" />
          <span className="font-semibold text-neutral-200 uppercase tracking-wider">
            Statistical Analysis Pipeline
          </span>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 border border-neutral-700/60 text-neutral-400">
          Python • Pandas • Seaborn
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-500 text-[10px]">Data Ingestion</div>
          <div className="text-neutral-200 font-semibold mt-1">Raw CSV/SQL</div>
        </div>
        <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-500 text-[10px]">Cleaning</div>
          <div className="text-neutral-200 font-semibold mt-1">Imputation</div>
        </div>
        <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-500 text-[10px]">Correlation</div>
          <div className="text-purple-300 font-semibold mt-1">Matrix Map</div>
        </div>
        <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-500 text-[10px]">Visuals</div>
          <div className="text-neutral-200 font-semibold mt-1">Distributions</div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500 flex justify-between">
        <span>Hypothesis-driven exploratory statistical modeling</span>
        <span className="text-neutral-400">Data-driven summaries</span>
      </div>
    </div>
  );
};

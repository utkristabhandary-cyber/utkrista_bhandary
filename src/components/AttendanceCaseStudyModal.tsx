import React, { useEffect } from 'react';
import { X, Calendar, Database, Lock, CheckCircle2, ShieldAlert, BookOpen, Layers } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AttendanceCaseStudyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="attendance-case-study-modal"
        className="bg-[#0f1115] border border-neutral-800 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">
              <span>ENGINEERING DEEP DIVE</span>
              <span>/</span>
              <span>FULL-STACK ACADEMIC SYSTEM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Attendance Management System (AAMS)
            </h2>
          </div>

          <button
            onClick={onClose}
            id="close-attendance-modal"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 text-sm">
          {/* Core Summary */}
          <div className="p-5 rounded-lg bg-neutral-900/70 border border-neutral-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              PROJECT SCOPE & OBJECTIVE
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              A substantial full-stack academic platform engineered around institutional business rules. Unlike toy attendance apps that merely toggle a boolean flag, AAMS reflects actual collegiate scheduling invariants: semester definitions, section assignments, teacher allocations, gazetted holiday exclusions, and threshold calculations.
            </p>
          </div>

          {/* Academic Business Rules */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              DOMAIN INVARIANTS & BUSINESS RULES ENFORCED
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-white font-semibold flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  1. Holiday Write Lockout
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  The service layer checks whether a target date is registered in the institutional holiday calendar. Any attempt by a faculty member to register attendance on a gazetted holiday throws a validation error.
                </p>
              </div>

              <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-white font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  2. Subject-Section Allotment
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Teachers cannot record attendance for sections or subjects they are not explicitly allotted to by administration. Role-based viewsets enforce this at the database query level.
                </p>
              </div>

              <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-white font-semibold flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-indigo-400" />
                  3. Relational Entity Normalization
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Entities are strictly modeled in PostgreSQL: Semester ➔ Section ➔ Subject ➔ Timetable Slot ➔ Attendance Session ➔ Student Record.
                </p>
              </div>

              <div className="p-4 rounded bg-neutral-900 border border-neutral-800 space-y-2">
                <div className="text-white font-semibold flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  4. Threshold & Eligibility Tracking
                </div>
                <p className="text-neutral-400 leading-relaxed font-sans">
                  Aggregated SQL queries compute current attendance percentages dynamically, triggering automated warnings for students dipping below the 75% examination eligibility boundary.
                </p>
              </div>
            </div>
          </div>

          {/* AI-Assisted Workflow Highlight */}
          <div className="p-5 rounded-lg bg-neutral-900/90 border border-indigo-950/60 space-y-3">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              AI-ASSISTED DEVELOPMENT IN AAMS
            </div>
            <p className="text-neutral-300 leading-relaxed">
              Utkrista leveraged AI tools to rapidly explore database schema normalization options and generate initial boilerplate for Django serializers and test cases. Crucially, every endpoint was manually verified, permissions were audited, and backend test assertions were executed locally to prevent security oversights.
            </p>
          </div>

          {/* Python/Django Test Snippet */}
          <div className="p-4 rounded bg-[#0a0b0d] border border-neutral-800 font-mono text-xs">
            <div className="text-neutral-400 mb-2 pb-2 border-b border-neutral-800 text-[11px] flex justify-between">
              <span>tests/test_academic_business_rules.py</span>
              <span className="text-emerald-400">django.test.TestCase</span>
            </div>
            <pre className="text-neutral-300 leading-relaxed overflow-x-auto text-[11px]">
{`def test_teacher_cannot_mark_unassigned_section(self):
    self.client.force_authenticate(user=self.teacher_physics)
    # Attempting to submit attendance for Section C (unassigned)
    payload = {"section_id": self.section_c.id, "subject_id": self.subject_physics.id}
    response = self.client.post("/api/v1/attendance/sessions/", payload)
    self.assertEqual(response.status_code, 403)
    self.assertIn("not authorized for this section", response.data["detail"])`}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <span>Full-Stack Academic Architecture • 2026 — Present</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

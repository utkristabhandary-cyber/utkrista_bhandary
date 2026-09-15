import React, { useState, useEffect } from 'react';
import { CITICONNECT_CASE_STUDY } from '../data/portfolioData';
import { X, Shield, BrainCircuit, CheckCircle2, GitBranch, ArrowRight, Layers, FileCode, Check, RefreshCw } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitiConnectCaseStudyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'testing'>('overview');
  const [simulatedComplaintIndex, setSimulatedComplaintIndex] = useState(0);
  const [officerApproved, setOfficerApproved] = useState(false);

  // Close on Escape key
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

  const sampleReports = [
    {
      title: 'Water pipe leak flooding pavement',
      location: 'Ward 04, Kathmandu (27.7121° N, 85.3188° E)',
      evidence: 'Photo attached: pipe_burst_01.jpg',
      aiClassification: {
        category: 'Water & Sanitation (KUKL)',
        urgency: 'HIGH',
        confidence: '96%',
        reasoning: 'Active water loss obstructing pedestrian thoroughfare.'
      },
      groupedIssue: 'Issue #402: Ward 04 Water Main Maintenance'
    },
    {
      title: 'Deep pothole causing motor traffic hazard',
      location: 'Ward 08, Kathmandu (27.7089° N, 85.3421° E)',
      evidence: 'Photo attached: road_defect_04.jpg',
      aiClassification: {
        category: 'Roads & Infrastructure',
        urgency: 'CRITICAL',
        confidence: '92%',
        reasoning: 'Immediate vehicle hazard on arterial two-lane road.'
      },
      groupedIssue: 'Issue #418: Ward 08 Asphalt Resurfacing'
    },
    {
      title: 'Uncollected waste accumulation',
      location: 'Ward 16, Kathmandu (27.7245° N, 85.2954° E)',
      evidence: 'Photo attached: waste_dump_12.jpg',
      aiClassification: {
        category: 'Solid Waste Management',
        urgency: 'MEDIUM',
        confidence: '89%',
        reasoning: 'Residential zone container overflow.'
      },
      groupedIssue: 'Issue #399: Ward 16 Scheduled Sanitation Dispatch'
    }
  ];

  const currentReport = sampleReports[simulatedComplaintIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="citiconnect-case-study-modal"
        className="bg-[#0f1115] border border-neutral-800 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-neutral-200"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              <span>PROJECT CASE STUDY</span>
              <span>/</span>
              <span>INDEPENDENT CIVIC-TECH</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              CitiConnect: Municipal Workflow Platform
            </h2>
          </div>

          <button
            onClick={onClose}
            id="close-citiconnect-modal"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-neutral-800 bg-[#0c0d0f] px-5 sm:px-6 gap-2 shrink-0 overflow-x-auto text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 font-medium tracking-wider transition-colors ${
              activeTab === 'overview'
                ? 'border-cyan-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            SYSTEM OVERVIEW & LESSONS
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`py-3 px-3 border-b-2 font-medium tracking-wider transition-colors ${
              activeTab === 'simulation'
                ? 'border-cyan-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            INTERACTIVE AI TRIAGE FLOW
          </button>
          <button
            onClick={() => setActiveTab('testing')}
            className={`py-3 px-3 border-b-2 font-medium tracking-wider transition-colors ${
              activeTab === 'testing'
                ? 'border-cyan-400 text-white font-semibold'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            AUTOMATED QA & TEST SUITE
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 text-sm">
          {activeTab === 'overview' && (
            <>
              {/* Problem & Approach */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    THE PROBLEM
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {CITICONNECT_CASE_STUDY.problem}
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    THE APPROACH
                  </div>
                  <p className="text-neutral-300 leading-relaxed">
                    {CITICONNECT_CASE_STUDY.approach}
                  </p>
                </div>
              </div>

              {/* Major Engineering Lesson: Complaint != Issue */}
              <div className="p-6 rounded-lg bg-neutral-900/90 border border-cyan-900/40 relative overflow-hidden">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
                  <GitBranch className="w-4 h-4" />
                  KEY ENGINEERING DISCOVERY & DOMAIN MODELING
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {CITICONNECT_CASE_STUDY.keyEngineeringLesson.title}:{' '}
                  <span className="text-neutral-400 font-normal">
                    {CITICONNECT_CASE_STUDY.keyEngineeringLesson.concept}
                  </span>
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {CITICONNECT_CASE_STUDY.keyEngineeringLesson.explanation}
                </p>

                <div className="mt-4 p-3 rounded bg-black/40 border border-neutral-800 font-mono text-xs text-neutral-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span>
                    Model Architecture:{' '}
                    <code className="text-cyan-300 font-semibold">Complaint.models.ForeignKey(Issue, null=True)</code>
                  </span>
                  <span className="text-emerald-400">Prevents Redundant Field Dispatches</span>
                </div>
              </div>

              {/* Technical Stack Architecture */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-neutral-300" />
                  FULL-STACK SYSTEM ARCHITECTURE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  <div className="p-4 rounded bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-400 font-semibold mb-2 uppercase">Backend & API</div>
                    <ul className="space-y-1.5 text-neutral-300">
                      {CITICONNECT_CASE_STUDY.architecture.backend.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-400 font-semibold mb-2 uppercase">Client & Maps</div>
                    <ul className="space-y-1.5 text-neutral-300">
                      {CITICONNECT_CASE_STUDY.architecture.frontend.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded bg-neutral-900/80 border border-neutral-800">
                    <div className="text-neutral-400 font-semibold mb-2 uppercase">Data & AI Engine</div>
                    <div className="space-y-2 text-neutral-300">
                      <p>
                        <strong className="text-neutral-400">Database:</strong>{' '}
                        {CITICONNECT_CASE_STUDY.architecture.database}
                      </p>
                      <p>
                        <strong className="text-neutral-400">AI Triage:</strong>{' '}
                        {CITICONNECT_CASE_STUDY.architecture.aiService}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain Capabilities Breakdown */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4">
                  CORE CAPABILITIES & WORKFLOW MODULES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CITICONNECT_CASE_STUDY.domainCapabilities.map((group) => (
                    <div
                      key={group.group}
                      className="p-4 rounded bg-neutral-900/40 border border-neutral-800/80"
                    >
                      <div className="font-semibold text-white text-sm mb-3 font-mono">
                        {group.group}
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-400">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="text-cyan-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'simulation' && (
            <div className="space-y-6">
              <div className="p-4 rounded bg-cyan-950/20 border border-cyan-800/40 text-neutral-300">
                <div className="font-semibold text-cyan-300 mb-1 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4" />
                  Interactive Human-in-the-Loop AI Triage Simulation
                </div>
                <p className="text-xs text-neutral-400">
                  This demo illustrates how CitiConnect leverages AI to draft classifications and urgency scores, while strictly enforcing officer sign-off before allocating municipal field crews.
                </p>
              </div>

              {/* Sample Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Select Test Complaint:</span>
                {sampleReports.map((report, idx) => (
                  <button
                    key={report.title}
                    onClick={() => {
                      setSimulatedComplaintIndex(idx);
                      setOfficerApproved(false);
                    }}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                      simulatedComplaintIndex === idx
                        ? 'bg-neutral-100 text-neutral-950 font-semibold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    Sample {idx + 1}
                  </button>
                ))}
              </div>

              {/* Interactive Pipeline State */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                {/* 1. Citizen Input */}
                <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-400 uppercase text-[10px] tracking-wider mb-2 font-semibold">
                    1. Citizen Submission
                  </div>
                  <div className="text-white font-medium mb-1">{currentReport.title}</div>
                  <div className="text-neutral-400 text-[11px] mb-2">{currentReport.location}</div>
                  <div className="p-2 rounded bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-400">
                    {currentReport.evidence}
                  </div>
                </div>

                {/* 2. AI Parsing */}
                <div className="p-4 rounded bg-neutral-900 border border-cyan-900/50">
                  <div className="text-cyan-400 uppercase text-[10px] tracking-wider mb-2 font-semibold flex items-center justify-between">
                    <span>2. AI Suggestion</span>
                    <span>{currentReport.aiClassification.confidence}</span>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <span className="text-neutral-500">Proposed Dept:</span>{' '}
                      <span className="text-white font-medium">
                        {currentReport.aiClassification.category}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500">Urgency:</span>{' '}
                      <span className="text-amber-400 font-bold">
                        {currentReport.aiClassification.urgency}
                      </span>
                    </div>
                    <div className="p-2 rounded bg-neutral-950/70 border border-cyan-900/30 text-[10px] text-neutral-300 italic">
                      "{currentReport.aiClassification.reasoning}"
                    </div>
                  </div>
                </div>

                {/* 3. Officer Review */}
                <div className={`p-4 rounded border transition-all ${
                  officerApproved
                    ? 'bg-emerald-950/30 border-emerald-800/60'
                    : 'bg-neutral-900 border-neutral-800'
                }`}>
                  <div className="uppercase text-[10px] tracking-wider mb-2 font-semibold flex items-center justify-between">
                    <span className={officerApproved ? 'text-emerald-400' : 'text-neutral-400'}>
                      3. Officer Gatekeeper
                    </span>
                    {officerApproved && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>

                  {officerApproved ? (
                    <div className="space-y-2">
                      <div className="text-emerald-300 font-medium">
                        ✓ Approved & Grouped
                      </div>
                      <div className="text-neutral-400 text-[11px]">
                        Assigned to: <span className="text-white">{currentReport.groupedIssue}</span>
                      </div>
                      <div className="text-xs text-neutral-400">
                        Work crew notified. Citizen status updated to <span className="text-cyan-400">In Progress</span>.
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[11px] text-neutral-400">
                        AI output is strictly advisory. Officer must verify details prior to municipal dispatch.
                      </p>
                      <button
                        onClick={() => setOfficerApproved(true)}
                        className="w-full py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        VERIFY & ASSIGN
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset simulation */}
              {officerApproved && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setOfficerApproved(false)}
                    className="flex items-center gap-1 text-xs font-mono text-neutral-400 hover:text-white"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Simulation
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-6">
              <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
                <h3 className="text-sm font-semibold text-white font-mono mb-2 flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  Django REST Test Suite & Validation Strategy
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Every endpoint and service method in CitiConnect is validated against role permissions, coordinate boundaries, state machine invariants, and third-party AI downtime scenarios.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CITICONNECT_CASE_STUDY.testingStrategy.types.map((t) => (
                  <div key={t.name} className="p-4 rounded bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono font-semibold text-white mb-2">
                        <span>{t.name}</span>
                        <span className="text-emerald-400 text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                          {t.passRate}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {t.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sample Python Test Snippet */}
              <div className="p-4 rounded bg-[#0a0b0d] border border-neutral-800 font-mono text-xs">
                <div className="text-neutral-400 mb-2 pb-2 border-b border-neutral-800 text-[11px] flex justify-between">
                  <span>tests/test_complaints_permissions.py</span>
                  <span className="text-emerald-400">django.test.TestCase</span>
                </div>
                <pre className="text-neutral-300 leading-relaxed overflow-x-auto text-[11px]">
{`class ComplaintPermissionTests(TestCase):
    def setUp(self):
        self.citizen = User.objects.create_user("ram_shrestha", role="CITIZEN")
        self.officer = User.objects.create_user("ward_officer", role="OFFICER")
        self.complaint = Complaint.objects.create(
            title="Road Pothole", citizen=self.citizen, ward=4
        )

    def test_citizen_cannot_alter_status_to_resolved(self):
        self.client.force_authenticate(user=self.citizen)
        response = self.client.patch(
            f"/api/v1/complaints/{self.complaint.id}/",
            {"status": "RESOLVED"}
        )
        self.assertEqual(response.status_code, 403) # Strictly forbidden`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950/80 flex items-center justify-between text-xs font-mono text-neutral-400 shrink-0">
          <span>Independent Civic-Tech Project • Kathmandu Domain Modeling</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
};

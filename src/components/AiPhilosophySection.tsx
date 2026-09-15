import React, { useState } from 'react';
import { Brain, CheckCircle2, ShieldCheck, ArrowRight, Eye, Bug, FileCode, Check, Cpu } from 'lucide-react';
import { motion } from 'motion/react';

interface StageDetail {
  id: string;
  name: string;
  acceleratedByAi: string;
  developerResponsibility: string;
  outcome: string;
}

const STAGES: StageDetail[] = [
  {
    id: 'research',
    name: '01. RESEARCH',
    acceleratedByAi: 'Synthesizing technical documentation, exploring domain terminology, and comparing potential libraries or protocols.',
    developerResponsibility: 'Determining the actual problem constraints, filtering hallucinations, and validating that the problem is worth solving.',
    outcome: 'Synthesized domain brief with verified constraints.'
  },
  {
    id: 'architecture',
    name: '02. ARCHITECTURE EXPLORATION',
    acceleratedByAi: 'Drafting alternative relational entity schemas, suggesting normal forms, and probing REST endpoint conventions.',
    developerResponsibility: 'Selecting the data model, establishing foreign key cascades, enforcing security boundaries, and designing authorization tiers.',
    outcome: 'Relational schema diagram with strict foreign key invariants.'
  },
  {
    id: 'implementation',
    name: '03. AI-ASSISTED IMPLEMENTATION',
    acceleratedByAi: 'Generating boilerplate Django serializers, repetitive views, type definitions, and standard CRUD handlers.',
    developerResponsibility: 'Structuring modular directory layouts, ensuring clean separation of concerns, and writing core custom business logic.',
    outcome: 'Compile-ready codebase with clean typing and zero untrusted snippets.'
  },
  {
    id: 'review',
    name: '04. REVIEW',
    acceleratedByAi: 'Identifying syntax redundancies and stylistic inconsistencies.',
    developerResponsibility: 'Line-by-line manual code audit: checking logic flow, SQL query efficiency, potential N+1 bottlenecks, and security loopholes.',
    outcome: 'Clean code audit confirming zero unverified dependencies.'
  },
  {
    id: 'debugging',
    name: '05. DEBUGGING',
    acceleratedByAi: 'Explaining cryptic stack traces, analyzing log outputs, and suggesting potential candidate root causes.',
    developerResponsibility: 'Systematic root-cause diagnosis using debugger breakpoints, network inspection, and database query logs.',
    outcome: 'Identified root cause with regression guard.'
  },
  {
    id: 'testing',
    name: '06. TESTING',
    acceleratedByAi: 'Suggesting boundary test cases, edge condition payloads, and fuzzing inputs.',
    developerResponsibility: 'Authoring deterministic unit tests, mocking external services, and running test runners locally until 100% green.',
    outcome: 'Automated test suite covering permissions and edge conditions.'
  },
  {
    id: 'validation',
    name: '07. VALIDATION',
    acceleratedByAi: 'Validating JSON output structures against OpenAPI schemas.',
    developerResponsibility: 'Manual end-to-end journey verification: confirming user experience, accessibility, touch states, and domain truth.',
    outcome: 'Production-ready workflow verified against real user behavior.'
  },
  {
    id: 'documentation',
    name: '08. DOCUMENTATION',
    acceleratedByAi: 'Formatting Markdown templates, generating Swagger parameter tables, and drafting changelog summaries.',
    developerResponsibility: 'Ensuring absolute truth in setup steps, explaining non-obvious engineering decisions, and authoring developer handoff guides.',
    outcome: 'Precise technical documentation that matches actual runtime state.'
  }
];

export const AiPhilosophySection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('architecture');
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[1];

  return (
    <section id="ai-workflow" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>ENGINEERING PHILOSOPHY & WORKFLOW</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] max-w-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            AI IS PART OF MY TOOLKIT.
            <br />
            <span className="text-neutral-400">UNDERSTANDING IS STILL MY JOB.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed font-sans">
            I use AI-assisted development to accelerate research, architecture exploration, implementation, debugging and documentation. I still review the result, test the behavior and make the engineering decisions.
          </p>
        </div>

        {/* Contrast Comparison Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-neutral-800/80">
          {/* Passive Approach (What I reject) */}
          <div className="p-6 rounded-lg bg-neutral-900/40 border border-neutral-800">
            <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2 font-semibold">
              Passive "Vibe Coding" (Unchecked)
            </div>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-start gap-2">
                <span className="text-neutral-600 font-bold">✕</span>
                <span>Blindly copying generated code without reading or understanding it.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-600 font-bold">✕</span>
                <span>Treating AI output as authoritative truth without testing edge cases.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-600 font-bold">✕</span>
                <span>Deploying unvalidated endpoints that fail under unexpected user input.</span>
              </li>
            </ul>
          </div>

          {/* Disciplined Engineering (How I work) */}
          <div className="p-6 rounded-lg bg-neutral-900/80 border border-cyan-950 bg-cyan-950/10">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
              Disciplined AI-Assisted Engineering (My Standard)
            </div>
            <ul className="space-y-3 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Using AI as a high-speed research and boilerplate accelerator.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Line-by-line code review, architecture validation, and strict typing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span>Rigorous automated testing for permissions, business rules, and regressions.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive 8-Stage Pipeline Inspector */}
        <div className="pt-12">
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              The 8-Stage Verified Delivery Pipeline (Click to inspect)
            </div>
            <span className="text-xs font-mono text-cyan-400">
              Active Stage: {activeStage.name}
            </span>
          </div>

          {/* Pipeline Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
            {STAGES.map((s) => {
              const isSelected = s.id === activeStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStageId(s.id)}
                  id={`ai-stage-${s.id}`}
                  className={`p-3 rounded text-left transition-all border text-xs font-mono ${
                    isSelected
                      ? 'bg-neutral-100 text-neutral-950 border-white font-bold shadow-lg'
                      : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                  }`}
                >
                  <div className="truncate">{s.name.split('. ')[1]}</div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Breakdown Card */}
          <motion.div
            key={activeStage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-6 sm:p-8 rounded-xl bg-neutral-900/90 border border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-6"
          >
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                Stage Focus
              </div>
              <h3 className="text-xl font-bold text-white font-mono">
                {activeStage.name}
              </h3>
              <div className="p-3 rounded bg-black/40 border border-neutral-800 text-xs font-mono text-neutral-400">
                <span className="text-neutral-500 uppercase block text-[10px] mb-1">
                  Target Outcome:
                </span>
                <span className="text-neutral-200">{activeStage.outcome}</span>
              </div>
            </div>

            <div className="md:col-span-4 space-y-2 p-4 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                <Cpu className="w-3.5 h-3.5" />
                What AI Accelerates
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {activeStage.acceleratedByAi}
              </p>
            </div>

            <div className="md:col-span-4 space-y-2 p-4 rounded-lg bg-neutral-950/60 border border-emerald-950/80">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Utkrista's Responsibility
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                {activeStage.developerResponsibility}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

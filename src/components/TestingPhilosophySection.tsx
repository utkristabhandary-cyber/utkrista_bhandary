import React, { useState } from 'react';
import { TESTING_PILLARS } from '../data/portfolioData';
import { ShieldCheck, Play, CheckCircle, Terminal, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const TestingPhilosophySection: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('permissions');
  const [testRunStatus, setTestRunStatus] = useState<Record<string, boolean>>({
    permissions: true,
    'business-rules': true,
    'api-contracts': true,
    regression: true
  });
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const activePillar = TESTING_PILLARS.find((p) => p.id === selectedPillarId) || TESTING_PILLARS[0];

  const handleRunTest = (id: string) => {
    setIsRunning(true);
    setTimeout(() => {
      setTestRunStatus((prev) => ({ ...prev, [id]: true }));
      setIsRunning(false);
    }, 450);
  };

  return (
    <section id="testing" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SOFTWARE TESTING & RELIABILITY</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.05] max-w-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            I DON'T JUST BUILD FEATURES.
            <br />
            <span className="text-neutral-400">
              I CHECK WHETHER THEY SHOULD HAVE BEEN BUILT THAT WAY.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-neutral-300 max-w-3xl leading-relaxed font-sans">
            Writing code is only half the engineering discipline. I treat automated test suites, permission boundary audits, and edge-case verification as non-negotiable proof that a system actually works.
          </p>
        </div>

        {/* Interactive Testing Matrix */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Pillar Selector list */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
              Validation Layers (Select to Inspect)
            </div>

            {TESTING_PILLARS.map((pillar) => {
              const isSelected = pillar.id === selectedPillarId;
              const isPassed = testRunStatus[pillar.id];

              return (
                <button
                  key={pillar.id}
                  onClick={() => setSelectedPillarId(pillar.id)}
                  id={`testing-pillar-${pillar.id}`}
                  className={`w-full text-left p-4 rounded-lg border transition-all text-xs font-mono flex items-center justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-neutral-700 shadow-md text-white'
                      : 'bg-neutral-950/40 border-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-neutral-200 mb-0.5">
                      {pillar.name}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {pillar.focus}
                    </div>
                  </div>

                  {isPassed && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 font-mono">
                      <CheckCircle className="w-3 h-3" />
                      PASSED
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Testing Competencies List */}
            <div className="mt-6 p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-2">
              <div className="text-neutral-300 font-semibold text-[11px] uppercase tracking-wider">
                Applied Testing Competencies:
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Functional Testing</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">API Testing</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Permission Testing</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Business-Rule Testing</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Regression Testing</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">End-to-End Verification</span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Debugging & Root Cause</span>
              </div>
            </div>
          </div>

          {/* Interactive Test Terminal / Code Assertion Viewer */}
          <div className="lg:col-span-8">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-7 rounded-xl bg-[#0e1014] border border-neutral-800 space-y-5"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 text-xs font-mono">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-neutral-200 font-semibold">{activePillar.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleRunTest(activePillar.id)}
                    disabled={isRunning}
                    id="run-test-assertion-btn"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>ASSERTING...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>RUN ASSERTION</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#08090a] rounded-lg p-4 border border-neutral-900 font-mono text-xs overflow-x-auto text-neutral-300">
                <pre className="leading-relaxed">
                  {activePillar.codeSnippet}
                </pre>
              </div>

              {/* Explanation & Assertion Output */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Test Rationale & Safety Invariant:
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                  {activePillar.explanation}
                </p>

                {/* Simulated test output terminal log */}
                <div className="p-3 rounded bg-black/70 border border-neutral-800/80 font-mono text-xs flex items-center justify-between text-neutral-400">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Ran 1 test in 0.042s: <strong className="text-emerald-400">OK (HTTP Status & Logic Invariant Verified)</strong></span>
                  </span>
                  <span className="text-neutral-600 hidden sm:inline-block">exit code: 0</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

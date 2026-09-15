import React, { useState } from 'react';
import { HOW_I_BUILD_STEPS } from '../data/portfolioData';
import { motion } from 'motion/react';
import { Layers, ArrowRight, Wrench, CheckCircle2 } from 'lucide-react';

export const HowIBuildSection: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const currentStep = HOW_I_BUILD_STEPS[selectedStepIndex];

  return (
    <section id="process" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              <span>METHODOLOGY & EXECUTION</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              HOW I BUILD
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed font-sans">
            A disciplined seven-step cycle turning ambiguous requirements into tested, verified, and documented software systems.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Step navigation list */}
          <div className="lg:col-span-5 space-y-2">
            {HOW_I_BUILD_STEPS.map((step, idx) => {
              const isSelected = idx === selectedStepIndex;
              return (
                <button
                  key={step.step}
                  onClick={() => setSelectedStepIndex(idx)}
                  id={`build-step-${step.step}`}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 flex items-center justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-neutral-700 shadow-md'
                      : 'bg-neutral-950/40 border-neutral-800/60 hover:bg-neutral-900/40 hover:border-neutral-700/60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg sm:text-xl font-mono font-bold ${
                        isSelected ? 'text-white' : 'text-neutral-500'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div>
                      <div
                        className={`text-sm sm:text-base font-bold tracking-tight ${
                          isSelected ? 'text-white' : 'text-neutral-300'
                        }`}
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </div>
                      <div className="text-xs text-neutral-400 line-clamp-1 mt-0.5 font-sans">
                        {step.summary}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-white translate-x-1'
                        : 'text-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Step Inspection Card */}
          <div className="lg:col-span-7">
            <motion.div
              key={currentStep.step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-6 sticky top-28"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold text-neutral-400">
                    {currentStep.step}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 block">
                      CYCLE PHASE
                    </span>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {currentStep.title}
                    </h3>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded bg-neutral-800/80 text-[11px] font-mono text-neutral-300">
                  <Wrench className="w-3 h-3 text-neutral-400" />
                  <span>Phase Tools</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
                {currentStep.description}
              </p>

              {/* AI Role vs Developer Responsibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                  <div className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">
                    How AI Assists
                  </div>
                  <p className="text-neutral-300 font-sans leading-relaxed text-xs">
                    {currentStep.aiRole}
                  </p>
                </div>

                <div className="p-4 rounded bg-neutral-950/60 border border-neutral-800 space-y-1.5">
                  <div className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
                    Utkrista's Ownership
                  </div>
                  <p className="text-neutral-300 font-sans leading-relaxed text-xs">
                    {currentStep.developerResponsibility}
                  </p>
                </div>
              </div>

              {/* Tooling Tags */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">Practiced With:</span>
                {currentStep.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-[11px] font-mono text-neutral-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

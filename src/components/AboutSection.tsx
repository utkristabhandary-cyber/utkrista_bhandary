import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Sparkles, Eye, Compass, Layers, CheckCircle2, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-neutral-400" />
            <span>BACKGROUND & PERSPECTIVE</span>
          </div>

          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BUILDING. TESTING.
            <br />
            <span className="text-neutral-400">LEARNING.</span>
          </h2>
        </div>

        {/* Narrative Columns */}
        <div className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Main Story */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 font-sans text-base sm:text-lg leading-relaxed">
            <p>
              I am a BSc IT student based in <strong className="text-white">Thimi, Bhaktapur, Nepal</strong>, focused on the practical intersection of software development, artificial intelligence, data systems, and user-centered design.
            </p>

            <p>
              I learn primarily by building real systems. Rather than remaining in theoretical tutorials, I design full-stack web applications like <strong className="text-white">CitiConnect</strong> (a civic-tech platform for Kathmandu municipal complaint tracking) and <strong className="text-white">Attendance Management System</strong> (a relational platform implementing institutional scheduling invariants).
            </p>

            <p>
              A defining part of my identity is using generative AI deliberately. I utilize AI tools to accelerate research, explore alternative database normalizations, draft initial boilerplate, and brainstorm edge cases. However, I believe that generated code without deep understanding is a liability. Every model, serializer, and API endpoint must be reviewed line-by-line, validated against business constraints, and backed by automated test suites.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base">
              I am early in my career and actively seeking internships and entry-level opportunities where I can contribute to production software, collaborate with experienced engineers, and continually sharpen my backend, testing, and system design capabilities.
            </p>

            {/* Quick Principles Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Implementation Over Speculation</div>
                  <div className="text-neutral-400 font-sans mt-0.5">Knowledge is solidified when tested against a running server and real database.</div>
                </div>
              </div>

              <div className="p-3.5 rounded bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Responsible AI Acceleration</div>
                  <div className="text-neutral-400 font-sans mt-0.5">Speed up exploration without sacrificing critical thinking or system ownership.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: UI/UX Bridge & Supporting Strengths */}
          <div className="lg:col-span-5 space-y-6">
            {/* Design & UI/UX Bridge Card */}
            <div className="p-6 sm:p-7 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                <Eye className="w-4 h-4" />
                DESIGN THINKING & UI/UX
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                "I care about how software works AND how people experience it."
              </h3>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                Engineering rigor is most impactful when paired with clear, empathetic visual interfaces. Through wireframing in Figma, design thinking workshops, and frontend implementation with Tailwind CSS, I ensure complex state workflows remain intuitive for end users—whether they are citizens submitting reports or teachers marking attendance rosters.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">Figma</span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">Wireframing</span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">Design Thinking</span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">User Flows</span>
                <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700/60 text-neutral-300">Canva</span>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="p-6 rounded-xl bg-neutral-950/60 border border-neutral-800 font-mono text-xs space-y-3">
              <div className="text-neutral-400 uppercase tracking-wider text-[11px] font-semibold">
                PROFILE AT A GLANCE
              </div>

              <div className="space-y-2 text-neutral-300">
                <div className="flex justify-between pb-2 border-b border-neutral-800/80">
                  <span className="text-neutral-500">Education</span>
                  <span className="text-white">BSc IT (First Year)</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800/80">
                  <span className="text-neutral-500">College</span>
                  <span className="text-white">Techspire College / APU</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-neutral-800/80">
                  <span className="text-neutral-500">Location</span>
                  <span className="text-white">Bhaktapur, Nepal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Opportunity Type</span>
                  <span className="text-emerald-400 font-semibold">Internships & Entry-Level</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

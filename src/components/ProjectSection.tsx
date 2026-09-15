import React, { useState } from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { ProjectVisual } from './ProjectVisuals';
import { CitiConnectCaseStudyModal } from './CitiConnectCaseStudyModal';
import { AttendanceCaseStudyModal } from './AttendanceCaseStudyModal';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export const ProjectSection: React.FC = () => {
  const { projects } = usePortfolioContent();
  const [citiconnectModalOpen, setCiticonnectModalOpen] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);

  return (
    <section id="work" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              <span>PORTFOLIO SELECTIONS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              SELECTED WORK
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed font-sans">
            Real projects where I explore software engineering, AI-assisted development, data, testing and user-focused problem solving.
          </p>
        </div>

        {/* Projects List - Large Editorial Presentation */}
        <div className="divide-y divide-neutral-800/80">
          {projects.map((project, index) => {
            const isMajor = project.highlightType === 'major';

            return (
              <motion.article
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`py-16 sm:py-24 ${isMajor ? '' : 'opacity-95'}`}
              >
                {/* Project Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-neutral-500">
                      {project.number || `0${index + 1}`}
                    </span>
                    <span className="h-4 w-px bg-neutral-800 hidden sm:inline-block" />
                    <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.statusBadge && (
                      <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300">
                        {project.statusBadge}
                      </span>
                    )}
                    {project.period && (
                      <span className="text-xs font-mono text-neutral-400">
                        {project.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Project Narrative */}
                  <div className="lg:col-span-5 space-y-6">
                    <h3
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-base text-neutral-300 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Capabilities bullets */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                        Key Capabilities & Architecture
                      </div>
                      <ul className="space-y-2 text-xs text-neutral-400">
                        {(project.capabilities || []).map((cap) => (
                          <li key={cap} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">•</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {(project.technologies || []).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Engineering Lesson / Insight */}
                    {project.keyLesson && (
                      <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 text-xs font-mono text-neutral-400">
                        <div className="text-neutral-300 font-semibold mb-1 flex items-center gap-1.5">
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          Engineering Insight:
                        </div>
                        <p className="text-neutral-400 font-sans leading-relaxed">
                          {project.keyLesson}
                        </p>
                      </div>
                    )}

                    {/* Case Study Trigger Button */}
                    {project.hasCaseStudy && (
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            if (project.id === 'citiconnect') setCiticonnectModalOpen(true);
                            if (project.id === 'attendance-system') setAttendanceModalOpen(true);
                          }}
                          id={`view-case-study-${project.id}`}
                          className="group inline-flex items-center gap-2 px-5 py-3 rounded bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-mono font-semibold tracking-wider transition-all"
                        >
                          <span>
                            {project.id === 'citiconnect' ? 'VIEW CASE STUDY' : 'EXPLORE ARCHITECTURE'}
                          </span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Abstract Architectural UI Composition */}
                  <div className="lg:col-span-7">
                    <ProjectVisual type={project.abstractVisualType} />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Case Study Modals */}
      <CitiConnectCaseStudyModal
        isOpen={citiconnectModalOpen}
        onClose={() => setCiticonnectModalOpen(false)}
      />
      <AttendanceCaseStudyModal
        isOpen={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
      />
    </section>
  );
};

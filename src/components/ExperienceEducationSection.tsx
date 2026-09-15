import React from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { Award, GraduationCap, Users, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceEducationSection: React.FC = () => {
  const { experiences, education, certifications, settings } = usePortfolioContent();

  if (!settings.showExperience) {
    return null;
  }

  return (
    <section id="experience" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              <span>COLLEGIATE INITIATIVES & ACADEMICS</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              LEADERSHIP & EDUCATION
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed font-sans">
            Active leadership within Techspire College's IT community, foundational BSc IT coursework, and focused technical certifications.
          </p>
        </div>

        {/* Leadership & Experience List */}
        <div className="pt-12">
          <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-8 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            LEADERSHIP & EXTRACURRICULAR ROLES
          </h3>

          <div className="divide-y divide-neutral-800/80">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id || exp.role + exp.organization}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                <div className="md:col-span-1 text-2xl font-mono font-bold text-neutral-600">
                  0{idx + 1}
                </div>

                <div className="md:col-span-5 space-y-1">
                  <h4
                    className="text-xl font-bold text-white tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {exp.role}
                  </h4>
                  <div className="text-xs font-mono text-neutral-400">
                    {exp.organization}
                  </div>
                </div>

                <div className="md:col-span-4 space-y-3">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(exp.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-mono text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 text-right">
                  <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800">
                    {exp.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Coursework + Certifications Two-Column Grid */}
        <div className="mt-16 pt-16 border-t border-neutral-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education Card */}
          <div className={`${settings.showCertifications ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              ACADEMIC DEGREE
            </h3>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                    {education.status}
                  </span>
                  <h4
                    className="text-lg sm:text-xl font-bold text-white mt-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {education.degree}
                  </h4>
                  <div className="text-xs font-mono text-neutral-400 mt-1">
                    {education.institution} • {education.affiliation}
                  </div>
                </div>

                <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-2.5 py-1 rounded border border-neutral-800 shrink-0">
                  {education.period}
                </span>
              </div>

              <div className="pt-2 border-t border-neutral-800/80">
                <div className="text-xs font-mono text-neutral-400 mb-2">
                  Relevant Foundation Coursework:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                  {(education.coursework || []).map((course) => (
                    <div key={course} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          {settings.showCertifications && (
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                CERTIFICATIONS & WORKSHOPS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id || cert.title}
                    className="p-4 rounded-lg bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white font-mono mb-1">
                        {cert.title}
                      </div>
                      <div className="text-[11px] text-cyan-400 font-mono mb-2">
                        {cert.organization}
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                      {cert.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

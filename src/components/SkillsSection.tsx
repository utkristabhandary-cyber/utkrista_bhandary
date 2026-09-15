import React from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { motion } from 'motion/react';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = usePortfolioContent();

  return (
    <section id="skills" className="py-24 sm:py-32 border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 border-b border-neutral-800/80 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              <span>CAPABILITIES & STACK</span>
            </div>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              TECHNICAL SKILLS
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md leading-relaxed font-sans">
            Competencies developed through project implementation, backend development, automated testing, and active coursework. No arbitrary percentage bars.
          </p>
        </div>

        {/* Grouped Typographic Matrix */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-neutral-500 font-bold">
                    0{idx + 1}
                  </span>
                  <h3
                    className="text-base font-bold text-white font-mono tracking-wider uppercase"
                  >
                    {cat.title}
                  </h3>
                </div>

                <p className="text-xs text-neutral-400 mb-5 leading-relaxed font-sans">
                  {cat.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-neutral-700 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

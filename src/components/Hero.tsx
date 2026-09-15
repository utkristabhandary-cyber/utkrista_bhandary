import React from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { profile } = usePortfolioContent();

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-neutral-800/60"
    >
      {/* Background subtle architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Top Metadata Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-3 pb-8 sm:pb-12 text-xs font-mono text-neutral-400 border-b border-neutral-900"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-200 tracking-wider font-semibold">
              {profile.status}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-neutral-400" />
              <span>{profile.location}</span>
            </span>
            <span className="hidden sm:inline-block">/</span>
            <span className="hidden sm:inline-block font-mono tracking-widest text-neutral-400">
              {profile.coordinates}
            </span>
          </div>
        </motion.div>

        {/* Oversized Display Typography */}
        <div className="py-10 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6"
          >
            <span className="inline-block px-3 py-1 text-xs font-mono tracking-widest text-neutral-400 uppercase border border-neutral-800 rounded bg-neutral-900/50">
              Early-Career Software & Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight text-neutral-100 uppercase leading-[0.95] max-w-6xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            I BUILD SOFTWARE
            <br />
            <span className="text-neutral-400">WITH AI,</span>
            <br />
            THEN TEST WHAT I BUILD.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            {/* Supporting Copy */}
            <div className="lg:col-span-8">
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 font-normal leading-relaxed max-w-3xl">
                {profile.subheadline}
              </p>

              {/* Core capabilities ticker */}
              <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs font-mono text-neutral-400">
                <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neutral-300" />
                  AI-Assisted Architecture
                </span>
                <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-neutral-300" />
                  Django REST & React
                </span>
                <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Automated QA & Testing
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="#work"
                id="hero-view-work-cta"
                className="w-full group px-6 py-4 rounded bg-neutral-100 hover:bg-white text-neutral-950 font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all flex items-center justify-between"
              >
                <span>VIEW MY WORK</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </a>

              <a
                href="#contact"
                id="hero-get-in-touch-cta"
                className="w-full group px-6 py-4 rounded border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-200 font-mono text-xs sm:text-sm font-medium tracking-wider transition-all flex items-center justify-between"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Philosophy Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="pt-6 sm:pt-8 border-t border-neutral-900 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-neutral-400"
        >
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 uppercase">Core Philosophy:</span>
            <span className="text-neutral-300">
              Responsible AI acceleration + Uncompromising verification
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 text-neutral-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

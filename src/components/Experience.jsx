"use client";

import { useState, useEffect } from 'react';
import { experiences } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMinus, FiPlus, FiLayers, FiBookOpen } from 'react-icons/fi';

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState(0); // Default first open
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">

        {/* Modern Minimalist Header */}
        <div className="flex flex-col ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Career{" "}
              <span className="italic font-light text-orange-600/90">
                Architecture
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Interactive Navigation */}
          <div className="lg:col-span-5 space-y-3 lg:space-y-4">
            {experiences.map((exp, index) => {
              const isTeaching = exp.type === 'teaching';
              const isOpen = expandedCard === index;
              return (
              <motion.div
                key={index}
                onClick={() => setExpandedCard(index)}
                className={`cursor-pointer group relative p-5 sm:p-6 rounded-2xl transition-all duration-500 ${
                  isOpen
                  ? 'bg-white dark:bg-white/5 shadow-2xl shadow-orange-500/10 border border-orange-500/20'
                  : 'hover:bg-gray-100 dark:hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className={`text-xs font-mono mb-1 ${isOpen ? "text-orange-500" : "text-gray-400"}`}>
                      {exp.duration}
                    </p>
                    <h3 className={`text-lg sm:text-xl font-bold wrap-break-word ${isOpen ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700'}`}>
                      {exp.company}
                    </h3>
                    {isTeaching && (
                      <span className="inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[9px] font-bold uppercase tracking-widest border border-orange-200 dark:border-orange-500/20">
                        <FiBookOpen size={10} /> Teaching
                      </span>
                    )}
                  </div>
                  {isOpen
                    ? <FiMinus className="shrink-0 text-orange-500" />
                    : <FiPlus className="shrink-0 text-gray-400" />}
                </div>
                
                {/* Background Large Number */}
                <span className="absolute right-4 bottom-2 text-6xl font-black opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                  0{index + 1}
                </span>
              </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed View */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={expandedCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-[#0c0c0c] border border-gray-100 dark:border-white/5 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
                  <div className="min-w-0">
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 text-balance">
                      {experiences[expandedCard].position}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <span className="font-semibold tracking-wide uppercase text-xs sm:text-sm text-orange-600">
                        {experiences[expandedCard].company}
                      </span>
                      {experiences[expandedCard].website && (
                        <a 
                          href={experiences[expandedCard].website} 
                          className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-orange-500 hover:text-white transition-all"
                        >
                          <FiArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-orange-500/5 border border-orange-500/20 text-orange-600">
                    {experiences[expandedCard].duration}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 text-left sm:text-justify hyphens-auto">
                  {experiences[expandedCard].description}
                </p>

                <div className="space-y-8">
                  {/* Achievements — only rendered when the role lists any */}
                  {experiences[expandedCard].achievements?.length > 0 && (
                    <div className="grid gap-4">
                      <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                        <FiLayers className="text-orange-500" /> Key Deliverables
                      </h5>
                      <ul className="space-y-4">
                        {experiences[expandedCard].achievements.map((item, i) => (
                          <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-orange-500" />
                            <span className="text-sm md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                    {experiences[expandedCard].technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-[10px] font-bold font-mono bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-lg border border-transparent transition-colors hover:border-orange-500/40"
                      >
                        #{tech.replace(/\s+/g, '_').toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
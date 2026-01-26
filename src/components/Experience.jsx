"use client";

import { useState, useEffect } from 'react';
import { experiences } from '../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMinus, FiPlus, FiLayers } from 'react-icons/fi';

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState(0); // Default first open
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section id="experience" className="relative py-32 dark:bg-[#080808] transition-colors duration-700 overflow-hidden">
      
      {/* Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="relative max-w-7xl mx-auto px-6 z-10">
        
        {/* Modern Minimalist Header */}
        <div className="flex flex-col ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Carrer{" "}
              <span className="italic font-light text-indigo-600/90">
                Architecture
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Interactive Navigation */}
          <div className="lg:col-span-5 space-y-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                onClick={() => setExpandedCard(index)}
                className={`cursor-pointer group relative p-6 rounded-2xl transition-all duration-500 ${
                  expandedCard === index 
                  ? 'bg-white dark:bg-white/5 shadow-2xl shadow-indigo-500/10 border border-indigo-500/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-white/[0.02] border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-xs font-mono mb-1 ${expandedCard === index ? 'text-indigo-500' : 'text-gray-400'}`}>
                      {exp.duration}
                    </p>
                    <h3 className={`text-xl font-bold ${expandedCard === index ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-500 group-hover:text-gray-700'}`}>
                      {exp.company}
                    </h3>
                  </div>
                  {expandedCard === index ? <FiMinus className="text-indigo-500" /> : <FiPlus className="text-gray-400" />}
                </div>
                
                {/* Background Large Number */}
                <span className="absolute right-4 bottom-2 text-6xl font-black opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                  0{index + 1}
                </span>
              </motion.div>
            ))}
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
                className="bg-white dark:bg-[#0c0c0c] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                  <div>
                    <h4 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {experiences[expandedCard].position}
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="text-indigo-600 font-semibold tracking-wide uppercase text-sm">
                        {experiences[expandedCard].company}
                      </span>
                      {experiences[expandedCard].website && (
                        <a 
                          href={experiences[expandedCard].website} 
                          className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-indigo-500 hover:text-white transition-all"
                        >
                          <FiArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-indigo-500 font-mono text-xs font-bold">
                    {experiences[expandedCard].duration}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
                  {experiences[expandedCard].description}
                </p>

                <div className="space-y-8">
                  {/* Achievements */}
                  <div className="grid gap-4">
                    <h5 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400">
                      <FiLayers className="text-indigo-500" /> Key Deliverables
                    </h5>
                    <ul className="space-y-4">
                      {experiences[expandedCard].achievements?.map((item, i) => (
                        <li key={i} className="flex gap-4 text-gray-700 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                          <span className="text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 dark:border-white/5">
                    {experiences[expandedCard].technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-[10px] font-bold font-mono bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-lg border border-transparent hover:border-indigo-500/30 transition-colors"
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
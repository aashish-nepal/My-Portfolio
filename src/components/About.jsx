"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscCode } from "react-icons/vsc";
import {
  FaLayerGroup,
  FaReact,
  FaServer,
  FaPython,
  FaTerminal,
  FaGraduationCap,
} from "react-icons/fa";
import { FiArrowUpRight, FiDownload, FiCpu } from "react-icons/fi";
import { DiJavascript1 } from "react-icons/di";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiPostgresql,
  SiArduino,
  SiRaspberrypi,
  SiRos,
} from "react-icons/si";

/* Both halves of the practice live in one list — the web stack I build on and
   the robotics toolchain I teach on. Brand marks keep their own colors; the
   orange system dresses the card, not the logos (same rule as Hero/Teaching). */
const technicalSkills = [
  { name: "HTML5", level: 95, icon: <VscCode className="text-orange-600" />, category: "core" },
  { name: "CSS3", level: 88, icon: <FaLayerGroup className="text-blue-600" />, category: "core" },
  { name: "JavaScript", level: 95, icon: <DiJavascript1 className="text-yellow-400" />, category: "core" },
  { name: "TypeScript", level: 90, icon: <SiTypescript className="text-blue-600" />, category: "core" },
  { name: "Git/GitHub", level: 85, icon: <SiGithub className="text-black dark:text-white" />, category: "core" },
  { name: "React", level: 95, icon: <FaReact className="text-blue-500" />, category: "framework" },
  { name: "Next.js", level: 85, icon: <SiNextdotjs className="text-black dark:text-white" />, category: "framework" },
  { name: "Python", level: 92, icon: <FaPython className="text-[#3776AB] dark:text-[#4B8BBE]" />, category: "robotics" },
  { name: "Arduino", level: 88, icon: <SiArduino className="text-teal-500" />, category: "robotics" },
  { name: "Raspberry Pi", level: 85, icon: <SiRaspberrypi className="text-rose-500" />, category: "robotics" },
  { name: "Embedded C", level: 80, icon: <FiCpu className="text-orange-500" />, category: "robotics" },
  { name: "ROS", level: 78, icon: <SiRos className="text-[#22314E] dark:text-[#8DA2C0]" />, category: "robotics" },
  { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="text-cyan-400" />, category: "design" },
  { name: "Bootstrap", level: 85, icon: <SiBootstrap className="text-purple-700" />, category: "design" },
  { name: "Figma", level: 90, icon: <SiFigma className="text-pink-500" />, category: "design" },
  { name: "PostgreSQL", level: 92, icon: <SiPostgresql className="text-[#336791] dark:text-[#7EA6CE]" />, category: "backend" },
  { name: "Google Firebase", level: 75, icon: <SiFirebase className="text-yellow-500" />, category: "backend" },
  { name: "REST APIs", level: 90, icon: <FaServer className="text-indigo-500" />, category: "backend" },
];

/* `key` drives the filter so the visible label can be renamed freely. */
const skillCategories = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "framework", label: "Frameworks" },
  { key: "design", label: "Design" },
  { key: "backend", label: "Backend" },
  { key: "robotics", label: "Robotics" },
];

/* The two halves of the week. Same icons Hero uses for the dual role, so the
   building/teaching split reads the same wherever it appears. */
const halves = [
  {
    label: "Building",
    Icon: FaTerminal,
    body: "I work mostly in full-stack web: React, Next.js and TypeScript on the front end, with APIs and a database behind it. So far that has meant healthcare platforms, e-commerce sites, and a set of free image tools that run entirely in the browser.",
  },
  {
    label: "Teaching",
    Icon: FaGraduationCap,
    body: "I teach at schools and training institutes around Kathmandu, taking students from their first line of Python through to robots that drive themselves on Arduino and Raspberry Pi. Since I am writing production code the same week I am teaching it, what they learn is what the work actually looks like.",
  },
];

export default function About() {
  const [activeCategory, setActiveCategory] = useState("all");

  const displayedSkills =
    activeCategory === "all"
      ? technicalSkills
      : technicalSkills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="about"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-[#111827] dark:to-[#080808] transition-colors duration-700"
    >
      {/* Same grid + glow treatment as Teaching and Experience */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
        {/* Header — same rhythm as every other section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              About <span className="italic font-light text-orange-600/90">Me</span>.
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: the narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            {/* Lead statement — the whole section in one sentence */}
            <p className="text-xl sm:text-2xl md:text-[2rem] text-gray-900 dark:text-white leading-snug font-light tracking-tight text-balance">
              I build software, and I teach{" "}
              <span className="font-medium text-orange-600 dark:text-orange-400">
                Python, AI and robotics
              </span>
              .
            </p>

            {/* The two halves, each behind its own rule, split by a divider */}
            <div className="mt-10 space-y-8">
              {halves.map(({ label, Icon, body }, i) => (
                <Fragment key={label}>
                  {i > 0 && (
                    <div className="h-px bg-gray-200 dark:bg-white/10" />
                  )}
                  <div className="relative pl-6">
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-orange-500 via-orange-500/40 to-transparent" />
                    <span className="flex items-center gap-2 mb-2.5">
                      <Icon className="text-orange-500 text-sm" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                        {label}
                      </span>
                    </span>
                    {/* Justification only from sm up — on a phone column this
                        narrow it opens rivers of whitespace between words. */}
                    <p className="text-[15px] sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed text-left sm:text-justify hyphens-auto">
                      {body}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="mt-10 flex flex-col xs:flex-row gap-4">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-sm shadow-2xl shadow-gray-400/40 dark:shadow-none hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
              >
                View Portfolio
                <FiArrowUpRight />
              </motion.a>
              <motion.a
                href="/files/Aashish_Nepal_Resume.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-sm text-gray-900 dark:text-gray-200 hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
              >
                <FiDownload />
                Download CV
              </motion.a>
            </div>
          </motion.div>

          {/* Right: the stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/10 shadow-sm p-6 sm:p-8 md:p-9">
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  The Stack
                </h3>
                <div className="h-px flex-1 bg-gray-100 dark:bg-white/10" />
              </div>

              {/* Filters — horizontal scroll on mobile */}
              <div className="flex overflow-x-auto pb-3 mb-7 gap-2 scrollbar-hide -mx-2 px-2">
                {skillCategories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`shrink-0 min-h-11 px-4 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap border transition-all duration-300 ${
                      activeCategory === category.key
                        ? "bg-orange-500 text-white border-transparent shadow-lg shadow-orange-500/25"
                        : "bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:border-orange-300 dark:hover:border-orange-500/40 hover:text-orange-600 dark:hover:text-orange-400"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Skills */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                <AnimatePresence mode="popLayout">
                  {displayedSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="group flex items-center gap-2.5"
                    >
                      <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm text-base group-hover:border-orange-300 dark:group-hover:border-orange-500/40 group-hover:-translate-y-0.5 transition-all duration-300">
                        {skill.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono tabular-nums text-orange-600 dark:text-orange-400">
                            {skill.level}%
                          </span>
                        </span>
                        <span className="mt-1.5 block h-0.75 w-full rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                          <motion.span
                            className="block h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                          />
                        </span>
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

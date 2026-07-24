"use client";

import { motion } from "framer-motion";
import { FaPython, FaRobot, FaMicrochip } from "react-icons/fa";
import { SiRos, SiArduino, SiRaspberrypi } from "react-icons/si";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiCpu,
  FiZap,
  FiTerminal,
  FiTool,
} from "react-icons/fi";
import { courses, teachingApproach } from "../utils/constants";

/* Each track's badge borrows the colour of its own stack — Python blue, Arduino
   teal, ROS navy — matching the toolchain tiles. Everything else stays orange.
   Hover fills the badge: white glyph on light, near-black on the brighter dark
   shade, since the light-mode brand colours go muddy against a dark card. */
const tracks = [
  {
    Icon: FaPython,
    badge:
      "bg-[#3776AB]/10 text-[#3776AB] ring-[#3776AB]/20 dark:bg-[#4B8BBE]/10 dark:text-[#4B8BBE] dark:ring-[#4B8BBE]/25",
    fill:
      "group-hover:bg-[#3776AB] group-hover:shadow-[#3776AB]/30 dark:group-hover:bg-[#4B8BBE]",
  },
  {
    Icon: FaMicrochip,
    badge:
      "bg-teal-500/10 text-teal-600 ring-teal-500/20 dark:bg-teal-400/10 dark:text-teal-400 dark:ring-teal-400/25",
    fill:
      "group-hover:bg-teal-600 group-hover:shadow-teal-500/30 dark:group-hover:bg-teal-400",
  },
  {
    Icon: FaRobot,
    badge:
      "bg-[#22314E]/10 text-[#22314E] ring-[#22314E]/20 dark:bg-[#8DA2C0]/10 dark:text-[#8DA2C0] dark:ring-[#8DA2C0]/25",
    fill:
      "group-hover:bg-[#22314E] group-hover:shadow-[#22314E]/30 dark:group-hover:bg-[#8DA2C0]",
  },
];

/* How many segments of the difficulty meter each level lights up. */
const LEVEL_STEPS = { Beginner: 1, Intermediate: 2, Advanced: 3 };

/* Parallel to teachingApproach — build first, from practice, hardware in hand. */
const approachIcons = [FiZap, FiTerminal, FiTool];

const toolchain = [
  { Icon: FaPython, name: "Python", color: "text-[#3776AB] dark:text-[#4B8BBE]" },
  { Icon: SiArduino, name: "Arduino", color: "text-teal-500" },
  { Icon: SiRaspberrypi, name: "Raspberry Pi", color: "text-rose-500" },
  { Icon: SiRos, name: "ROS", color: "text-[#22314E] dark:text-[#8DA2C0]" },
  { Icon: FiCpu, name: "Embedded C", color: "text-orange-500" },
];

const EASE_OUT = [0.22, 1, 0.36, 1];

function LevelMeter({ level }) {
  const filled = LEVEL_STEPS[level] ?? 1;

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
        {level}
      </span>
      <div className="flex gap-0.75" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
              step <= filled
                ? "bg-orange-500"
                : "bg-gray-200 dark:bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Teaching() {
  return (
    <section
      id="teaching"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white to-orange-50/40 dark:from-[#080808] dark:to-[#0d0a05] transition-colors duration-700"
    >
      {/* Circuit-trace grid — a nod to the hardware side of the classes */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Noise, matching the texture used across the other sections */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.4"/></svg>\')',
        }}
      />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-400/10 dark:bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-[28rem] h-[28rem] rounded-full bg-amber-300/10 dark:bg-orange-600/[0.06] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 z-10">
        {/* Section header — matches the rhythm of the other sections */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 mb-6 py-1 px-3 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 text-xs font-bold tracking-widest uppercase border border-orange-100 dark:border-orange-500/20">
              Currently Enrolling
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Teaching{" "}
              <span className="italic font-light text-orange-600/90">
                Practice
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>

        {/* Intro + pedagogy */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Lead — set large and light; colour alone carries the emphasis */}
            <p className="text-2xl md:text-[1.75rem] font-light tracking-tight leading-snug text-gray-800 dark:text-gray-200">
              I teach{" "}
              <span className="text-gray-900 dark:text-white font-normal">
                Python, AI, and robotics
              </span>{" "}
              at schools and training institutes across Kathmandu, guiding
              students from their first line of code to{" "}
              <span className="text-orange-600 dark:text-orange-400">
                building robots
              </span>{" "}
              that move on their own.
            </p>

            {/* Same rule the About column uses between its blocks */}
            <div className="h-px my-8 bg-gray-200 dark:bg-white/10" />

            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              The rest of my week is production software, which keeps the
              syllabus honest: students leave with the tools, workflow, and
              debugging instincts the work actually asks for.
            </p>

            {/* Toolchain — a parts bin, dashed to read as lab kit next to the solid panel */}
            <div className="mt-auto pt-10">
              <div className="relative rounded-2xl border border-dashed border-gray-300/80 dark:border-white/[0.12] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm p-5">
                <div className="flex items-center gap-3 mb-4">
                  <FiCpu className="text-sm text-orange-500" />
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                    Lab Toolchain
                  </h4>
                  <span className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-white/10" />
                  <span className="text-[9px] font-mono text-gray-400/70">
                    {toolchain.length.toString().padStart(2, "0")}
                  </span>
                </div>
                {/* One tile per column so the kit reads as a single row — but
                    five columns squeezes "Raspberry Pi" past its cell on a
                    phone, so the row only forms from xs up. */}
                <div className="grid grid-cols-3 xs:grid-cols-5 gap-1.5 sm:gap-2">
                  {toolchain.map(({ Icon, name, color }, i) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * i, ease: EASE_OUT }}
                      className="group flex flex-col items-center gap-2 px-1 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-100 dark:border-white/10 text-center shadow-sm hover:-translate-y-0.5 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300"
                    >
                      <Icon
                        className={`text-xl ${color} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-[10px] font-semibold leading-tight text-gray-600 dark:text-gray-400 wrap-break-word">
                        {name}
                      </span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pedagogy — one framed panel, so it reads as a spec sheet for the classes */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="relative h-full rounded-[28px] p-px bg-gradient-to-b from-gray-200/90 via-gray-100/50 to-gray-100/20 dark:from-white/[0.12] dark:via-white/[0.05] dark:to-white/[0.02] shadow-sm hover:shadow-xl hover:shadow-orange-500/[0.06] transition-shadow duration-500">
              <div className="relative h-full flex flex-col rounded-[27px] bg-white/90 dark:bg-[#0b0b0b]/90 backdrop-blur-sm overflow-hidden">
                {/* Corner warmth */}
                <span className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-400/10 dark:bg-orange-500/10 blur-3xl" />

                {/* Window chrome — echoes the editor the classes are taught in */}
                <div className="relative flex items-center gap-3 px-5 py-3.5 border-b border-gray-100 dark:border-white/[0.07] bg-gray-50/80 dark:bg-white/[0.02]">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-white/15" />
                  </span>
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                    how-i-teach.md
                  </span>
                  <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-orange-500/80">
                    {teachingApproach.length} Principles
                  </span>
                </div>

                <motion.ol
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12 } },
                  }}
                  className="relative flex-1 flex flex-col justify-between p-2 sm:p-3"
                >
                  {teachingApproach.map((item, i) => {
                    const Icon = approachIcons[i % approachIcons.length];
                    const isLast = i === teachingApproach.length - 1;

                    return (
                      <motion.li
                        key={item.title}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 90,
                          damping: 20,
                        }}
                        className="group relative flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl hover:bg-orange-50/60 dark:hover:bg-orange-500/[0.05] transition-colors duration-300"
                      >
                        {/* Rail linking one principle to the next */}
                        {!isLast && (
                          <span
                            className="absolute left-[2.375rem] sm:left-[2.625rem] top-[4.25rem] sm:top-[4.5rem] bottom-1 w-px bg-gradient-to-b from-orange-300/70 to-transparent dark:from-orange-500/40"
                            aria-hidden="true"
                          />
                        )}

                        <span className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/60 dark:from-orange-500/15 dark:to-orange-500/[0.04] border border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                          <Icon className="text-lg" />
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-baseline gap-2.5 mb-1.5">
                            <span className="text-[10px] font-mono tracking-widest text-orange-500/70">
                              0{i + 1}
                            </span>
                            <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ol>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Curriculum path */}
        <div className="mb-10 flex items-center gap-4">
          <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-gray-400 shrink-0">
            The Learning Path
          </h3>
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          {/* Both labels plus a rule don't fit a phone; the range is implied by
              the numbered cards below it anyway. */}
          <span className="hidden xs:block text-[10px] font-mono uppercase tracking-widest text-gray-400 shrink-0">
            Beginner → Advanced
          </span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {courses.map((course, index) => {
            const { Icon, badge, fill } = tracks[index % tracks.length];

            return (
              <motion.article
                key={course.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ type: "spring", stiffness: 90, damping: 20 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/80 dark:border-white/[0.07] bg-white dark:bg-[#0b0b0b] p-6 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-300/80 dark:hover:border-orange-500/30 hover:shadow-[0_28px_60px_-30px_rgba(249,115,22,0.45)]"
              >
                {/* Hairline that lights along the top edge on hover */}
                <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Warmth pooling in the corner */}
                <span className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-orange-400/0 blur-3xl transition-colors duration-700 group-hover:bg-orange-400/[0.13] dark:group-hover:bg-orange-500/[0.15]" />

                {/* Header rail — step number, then the level it lands at */}
                <div className="relative mb-8 flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-orange-300/70 dark:border-orange-500/40 text-[11px] font-mono font-bold text-orange-600 dark:text-orange-400 transition-colors duration-500 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white">
                    {index + 1}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-orange-300/60 to-gray-200 dark:from-orange-500/40 dark:to-white/10" />
                  <LevelMeter level={course.level} />
                </div>

                <span
                  className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-inset transition-all duration-500 group-hover:text-white group-hover:shadow-lg group-hover:ring-transparent dark:group-hover:text-[#0b0b0b] ${badge} ${fill}`}
                >
                  <Icon className="text-2xl" />
                </span>

                <span className="relative mb-2 text-[10px] font-mono uppercase tracking-widest text-gray-400">
                  {course.track}
                </span>
                <h4 className="relative text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-balance">
                  {course.title}
                </h4>
                <p className="relative mt-2 text-sm font-medium italic text-orange-600/90 dark:text-orange-400/90">
                  {course.tagline}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {course.description}
                </p>

                {/* Syllabus, in the open — the value of the track shouldn't need a click */}
                <div className="relative mt-6 mb-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                      Syllabus
                    </span>
                    <span className="h-px flex-1 bg-gray-100 dark:bg-white/[0.07]" />
                    <span className="text-[9px] font-mono text-gray-400/70">
                      {course.topics.length.toString().padStart(2, "0")}
                    </span>
                  </div>
                  {/* Cells stretch to a common height per row, so longer topics
                      wrap without breaking the rhythm. Only 2-up until the card
                      is wide enough for 3 — at md a three-column card leaves
                      cells too narrow for words like "communication". */}
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                    {course.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center justify-center rounded-xl border border-gray-200/80 dark:border-white/[0.08] bg-gray-50/70 dark:bg-white/[0.03] px-2 py-2 text-center text-[10px] leading-snug text-balance wrap-break-word text-gray-600 dark:text-gray-400 transition-colors duration-500 group-hover:border-orange-200/80 dark:group-hover:border-orange-500/20"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome — the line students leave with */}
                <div className="relative mt-auto flex items-start gap-3 border-t border-dashed border-gray-200 dark:border-white/10 pt-6">
                  <FiArrowRight className="mt-0.5 flex-shrink-0 text-orange-500 transition-transform duration-500 group-hover:translate-x-0.5" />
                  <span className="text-sm font-semibold leading-snug text-gray-800 dark:text-gray-200 text-balance">
                    {course.outcome}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mt-16 md:mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl md:rounded-4xl bg-gray-900 dark:bg-[#0b0b0b] border border-transparent dark:border-white/10 p-7 sm:p-10 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#f97316 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            {/* Warm glow anchoring the panel */}
            <div className="pointer-events-none absolute -bottom-24 -left-16 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-32 right-1/4 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl" />
            {/* Hairline highlight along the top edge */}
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

            <div className="relative max-w-xl">
              <span className="inline-block mb-4 text-[10px] font-mono uppercase tracking-widest text-orange-400">
                Open for bookings
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3 leading-tight text-balance">
                Running a class, club, or workshop?
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I take on school programmes, institute cohorts, and one-off
                robotics workshops — and I&apos;ll shape the curriculum around
                the level your students are actually at.
              </p>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative shrink-0 inline-flex w-full sm:w-auto justify-center items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-500/25 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Book a Session</span>
              <FiArrowUpRight className="relative group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaTerminal,
  FaGraduationCap,
  FaReact,
  FaPython,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiArduino,
  SiRaspberrypi,
  SiRos,
} from "react-icons/si";
import { useRef } from "react";

/* The two halves of the practice. Both wear the same orange — the icon and the
   copy do the distinguishing, not the hue. */
const ROLE_RING = "border-gray-800 dark:border-white/25";
/* Flat orange, no gradient: the same orange-500 as the corner brackets, while
   the dark card border carries the structure. */
const ROLE_CHIP = "bg-orange-500 text-white";

/* Each half carries the tools it actually runs on. These are brand marks, so
   they keep their own colors — the orange system applies to the card, not the
   logos. */
const roles = [
  {
    Icon: FaTerminal,
    label: "Developer",
    detail: "React · Next.js · Full-Stack",
    tools: [
      { Icon: FaReact, name: "React", color: "text-blue-500" },
      { Icon: SiNextdotjs, name: "Next.js", color: "text-black dark:text-white" },
      { Icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
      { Icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-400" },
      { Icon: SiPostgresql, name: "PostgreSQL", color: "text-[#336791] dark:text-[#7EA6CE]" },
    ],
  },
  {
    Icon: FaGraduationCap,
    label: "Instructor",
    detail: "Python · AI · Robotics",
    tools: [
      { Icon: FaPython, name: "Python", color: "text-[#3776AB] dark:text-[#4B8BBE]" },
      { Icon: SiArduino, name: "Arduino", color: "text-teal-500" },
      { Icon: SiRaspberrypi, name: "Raspberry Pi", color: "text-rose-500" },
      { Icon: SiRos, name: "ROS", color: "text-[#22314E] dark:text-[#8DA2C0]" },
    ],
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh flex items-center justify-center overflow-hidden pt-24 pb-16 md:pt-20 md:pb-0"
    >
      {/* Same max width and gutters as every other section, so the hero doesn't
          run wider than the rest of the page on large monitors. */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Text leads on mobile so the dual role reads before the photo. */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-4">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* flex-wrap matters: an inline-flex defaults to nowrap, which
                  runs this badge off the side of a narrow phone. */}
              <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 max-w-full py-1 px-3 rounded-md bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 border border-orange-100 dark:border-orange-500/20">
                Based in Nepal
                <span className="hidden sm:block w-1 h-1 rounded-full bg-current opacity-40" />
                <span className="text-orange-600 dark:text-orange-400">
                  Developer &amp; Educator
                </span>
              </span>

              <h1 className="text-[2rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[0.95] tracking-tighter mb-6 sm:mb-8 text-balance">
                I{" "}
                  BUILD
                AND{" "}
                  TEACH
                  {" "}
                SOFTWARE.
              </h1>
              <p className="text-sm md:text-[18px] text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-8 sm:mb-10 font-medium">
                I&apos;m a full-stack developer, and I teach Python, AI and
                robotics. Most weeks, both. Everything I teach comes from work
                I&apos;m actually doing, so students learn the tools people are
                hiring for right now.
              </p>

              {/* Each button takes a full row on the narrowest phones so the
                  tap targets stay comfortably wide, then sits inline from xs up. */}
              <div className="flex flex-col xs:flex-row xs:flex-wrap gap-3 sm:gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold shadow-2xl shadow-gray-400/40 dark:shadow-none hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-colors"
                >
                  View Projects
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-center px-6 sm:px-8 md:px-10 py-3.5 sm:py-4 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-gray-900 dark:text-gray-200 hover:border-orange-600 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                >
                  Let&apos;s Connect
                </motion.a>
              </div>

              {/* Dual-role cards — the two things I do, side by side */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mt-10 md:mt-14 flex flex-col sm:flex-row gap-4"
              >
                {/* Corner brackets — echoes the frame around the photo. Held back
                    until lg, where there is gutter to spare; below that they would
                    sit on the viewport edge. */}
                <div className="hidden lg:block absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-orange-500 rounded-tl-3xl pointer-events-none" />
                <div className="hidden lg:block absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-orange-500 rounded-br-3xl pointer-events-none" />

                {roles.map(({ Icon, label, detail, tools }) => (
                  <div
                    key={label}
                    className={`flex-1 min-w-0 flex flex-col gap-4 px-4 sm:px-5 py-4 rounded-2xl border bg-white/70 dark:bg-white/5 backdrop-blur-sm ${ROLE_RING}`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 ${ROLE_CHIP}`}
                      >
                        <Icon className="text-xl" />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block font-bold text-gray-900 dark:text-white tracking-tight">
                          {label}
                        </span>
                        <span className="block text-[11px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 wrap-break-word">
                          {detail}
                        </span>
                      </span>
                    </div>

                    {/* The tools this half actually runs on */}
                    <div className="flex flex-wrap gap-2 pt-3 mt-auto border-t border-gray-200/70 dark:border-white/10">
                      {tools.map(({ Icon: ToolIcon, name, color }) => (
                        <span
                          key={name}
                          title={name}
                          aria-label={name}
                          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm hover:-translate-y-0.5 hover:border-orange-300 dark:hover:border-orange-500/40 transition-all duration-300"
                        >
                          <ToolIcon className={`text-lg ${color}`} />
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE - ASYMMETRIC FRAME */}
          <motion.div style={{ y }} className="w-full lg:w-2/5 relative">
            <div className="relative aspect-4/5 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Decorative Frame Elements — one corner per identity */}
              <div className="absolute -top-4 left-0 sm:-top-6 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 border-t-2 border-l-2 border-orange-500 rounded-tl-3xl" />
              <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-6 w-20 h-20 sm:w-32 sm:h-32 border-b-2 border-r-2 border-orange-500 rounded-br-3xl" />

              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-3xl sm:rounded-4xl overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/profile.jpg" // Ensure this path is correct
                  alt="Aashish Nepal"
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 28rem, 40vw"
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Teaching Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 lg:-right-8 top-4 bg-white dark:bg-gray-800 p-3 lg:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex-shrink-0">
                    <FaGraduationCap className="text-sm" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-bold text-gray-800 dark:text-white tracking-tight">
                      Now teaching
                    </span>
                    <span className="block text-[10px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                      Python · AI · Robotics
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

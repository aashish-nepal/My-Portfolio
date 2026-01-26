"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { VscCode } from "react-icons/vsc";
import { FaLayerGroup, FaReact, FaServer, FaCodeBranch, FaMagic } from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiTwilio,
  SiMysql,
} from "react-icons/si";

const technicalSkills = [
  { name: "HTML5", level: 95, icon: <VscCode className="text-orange-600" />, category: "core" },
  { name: "CSS3", level: 88, icon: <FaLayerGroup className="text-blue-600" />, category: "core" },
  { name: "JavaScript", level: 95, icon: <DiJavascript1 className="text-yellow-400" />, category: "core" },
  { name: "TypeScript", level: 90, icon: <SiTypescript className="text-blue-600" />, category: "core" },
  { name: "React", level: 95, icon: <FaReact className="text-blue-500" />, category: "framework" },
  { name: "Next.js", level: 85, icon: <SiNextdotjs className="text-black dark:text-white" />, category: "framework" },
  { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss className="text-cyan-400" />, category: "styling" },
  { name: "Bootstrap", level: 85, icon: <SiBootstrap className="text-purple-700" />, category: "styling" },
  { name: "Figma", level: 90, icon: <SiFigma className="text-pink-500" />, category: "design" },
  { name: "MySQL", level: 92, icon: <SiMysql className="text-teal-500" />, category: "backend" },
  { name: "Google Firebase", level: 75, icon: <SiFirebase className="text-yellow-500" />, category: "backend" },
  { name: "REST APIs", level: 90, icon: <FaServer className="text-indigo-500" />, category: "integration" },
  { name: "Git/GitHub", level: 85, icon: <SiGithub className="text-black dark:text-white" />, category: "tooling" },
  { name: "Twilio", level: 85, icon: <SiTwilio className="text-red-500" />, category: "integration" },
];

const skillCategories = [
  { name: "All", icon: <FaCodeBranch className="text-gray-600 dark:text-gray-300" /> },
  { name: "Core", icon: <VscCode className="text-blue-600" /> },
  { name: "Framework", icon: <FaReact className="text-blue-500" /> },
  { name: "Backend", icon: <FaServer className="text-indigo-500" /> },
];

export default function About() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [particles, setParticles] = useState([]);
  const [binaryElements, setBinaryElements] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const controls = useAnimation();
  const sectionRef = useRef(null);

  const filteredSkills =
    activeCategory === "All"
      ? technicalSkills
      : technicalSkills.filter(
          (skill) => skill.category === activeCategory.toLowerCase()
        );

  const displayedSkills = showAllSkills
    ? filteredSkills
    : filteredSkills.slice(0, isMobile ? 6 : 8);

  useEffect(() => {
    setIsClient(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    setParticles(
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 5 + 5,
      }))
    );

    setBinaryElements(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        content: Array.from({ length: 20 }).map((_, j) => ({
          id: j,
          value: (i + j) % 2,
          space: j % 5 === 0,
        })),
      }))
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible");
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [controls]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-blue-200 dark:bg-blue-800 opacity-20 md:opacity-30"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
            {binaryElements.map((element) => (
              <div
                key={element.id}
                className="absolute top-0 text-[10px] font-mono text-blue-500 whitespace-nowrap"
                style={{
                  left: `${element.left}%`,
                  animation: `fall ${element.duration}s linear infinite`,
                  animationDelay: `${element.delay}s`,
                }}
              >
                {element.content.map((bit) => (
                  <span key={bit.id}>{bit.value}{bit.space && " "}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              About <span className="italic font-light text-indigo-600/90">Me</span>.
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 md:gap-16 items-start">
          {/* Left: Philosophy */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 30 } }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center mb-6 md:mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <SiFigma className="text-white text-xl md:text-2xl" />
                  </div>
                  <div className="ml-4 md:ml-5">
                    <h3 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white tracking-tight">Design Engineering</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-1.5 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                  As a Frontend Architect, I connect design and technology to build systems that look great and work well. I use both technical skills and creative thinking to make sure my solutions are easy to use, smart, reliable, secure, adaptable, fast, scalable, efficient, innovative, user-friendly and ready for the future.
                  </p>

                  <div className="p-5 md:p-6 bg-gray-50 dark:bg-gray-700/30 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center text-sm uppercase tracking-wider">
                      <FaMagic className="mr-2 text-indigo-500" /> Principles
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                      {[
                        { label: "Modular"},
                        { label: "Performant"},
                        { label: "Responsive"},
                        { label: "Secure"},
                        { label: "Scalable"},
                        { label: "Accessible"},
                      ].map((item) => (
                        <div key={item.label} className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 text-center shadow-sm">
                          <div className="text-xs md:text-sm font-bold text-gray-800 dark:text-white">{item.label}</div>
                          <div className="text-[9px] md:text-[10px] text-gray-500 uppercase mt-1">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <motion.a
                      href="#projects"
                      className="px-8 py-4 bg-gray-900 dark:bg-indigo-600 text-white rounded-xl font-medium text-center text-sm shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Portfolio
                    </motion.a>
                    <motion.button
                      className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-medium text-sm text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Download CV
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Skills List */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <motion.div
              className="lg:sticky lg:top-24"
              initial="hidden"
              animate={controls}
              variants={{ visible: { opacity: 1, x: 0 }, hidden: { opacity: 0, x: 20 } }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Filter - Horizontal Scroll on Mobile */}
              <div className="flex overflow-x-auto pb-4 mb-6 gap-2 scrollbar-hide -mx-2 px-2 scroll-pl-2 scroll-pr-24">
                {skillCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => { setActiveCategory(category.name); setShowAllSkills(false); }}
                    className={`flex-shrink-0 flex items-center px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      activeCategory === category.name 
                        ? "bg-indigo-600 text-white shadow-md" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Skills Grid */}
              <div className="space-y-5 md:space-y-6">
                <AnimatePresence mode="popLayout">
                  {displayedSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{skill.icon}</span>
                          <span className="text-sm font-semibold dark:text-gray-200">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-indigo-500 font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                        <motion.div
                          className="h-full bg-indigo-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {!showAllSkills && filteredSkills.length > 8 && (
                <button
                  onClick={() => setShowAllSkills(true)}
                  className="mt-8 w-full py-3 text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  Show All {filteredSkills.length} Skills
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-100px); }
          100% { transform: translateY(calc(100vh + 100px)); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
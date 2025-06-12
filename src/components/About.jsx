"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { VscCode } from "react-icons/vsc";
import { FaLayerGroup, FaReact, FaServer, FaCodeBranch } from "react-icons/fa";
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
  {
    name: "HTML5",
    level: 95,
    icon: <VscCode className="text-orange-600" />,
    category: "core",
  },
  {
    name: "CSS3",
    level: 88,
    icon: <FaLayerGroup className="text-blue-600" />,
    category: "core",
  },
  {
    name: "JavaScript",
    level: 95,
    icon: <DiJavascript1 className="text-yellow-400" />,
    category: "core",
  },
  {
    name: "TypeScript",
    level: 90,
    icon: <SiTypescript className="text-blue-600" />,
    category: "core",
  },
  {
    name: "React",
    level: 95,
    icon: <FaReact className="text-blue-500" />,
    category: "framework",
  },
  {
    name: "Next.js",
    level: 85,
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    category: "framework",
  },
  {
    name: "Tailwind CSS",
    level: 85,
    icon: <SiTailwindcss className="text-cyan-400" />,
    category: "styling",
  },
  {
    name: "Bootstrap",
    level: 85,
    icon: <SiBootstrap className="text-purple-700" />,
    category: "styling",
  },
  {
    name: "Figma",
    level: 85,
    icon: <SiFigma className="text-pink-500" />,
    category: "design",
  },
  {
    name: "MySQL",
    level: 92,
    icon: <SiMysql className="text-teal-500" />,
    category: "backend",
  },
  {
    name: "Google Firebase",
    level: 75,
    icon: <SiFirebase className="text-yellow-500" />,
    category: "backend",
  },
  {
    name: "REST APIs",
    level: 90,
    icon: <FaServer className="text-indigo-500" />,
    category: "integration",
  },
  {
    name: "Git/GitHub",
    level: 85,
    icon: <SiGithub className="text-black dark:text-white" />,
    category: "tooling",
  },
  {
    name: "Twilio",
    level: 85,
    icon: <SiTwilio className="text-red-500" />,
    category: "integration",
  },
];

const skillCategories = [
  {
    name: "All",
    icon: <FaCodeBranch className="text-gray-600 dark:text-gray-300" />,
  },
  { name: "Core", icon: <VscCode className="text-blue-600" /> },
  { name: "Framework", icon: <FaReact className="text-blue-500" /> },
  { name: "Backend", icon: <FaServer className="text-indigo-500" /> },
];

export default function About() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [particles, setParticles] = useState([]);
  const [binaryElements, setBinaryElements] = useState([]);
  const [isClient, setIsClient] = useState(false);
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
    : filteredSkills.slice(0, 8);

  useEffect(() => {
    setIsClient(true);

    // Initialize particles and binary elements
    setParticles(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        delay: Math.random() * 2,
        duration: Math.random() * 5 + 5,
      }))
    );

    setBinaryElements(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
        content: Array.from({ length: 30 }).map((_, j) => ({
          id: j,
          value: (i + j) % 2,
          space: j % 5 === 0,
        })),
      }))
    );

    // Animate on scroll
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-12 md:py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Floating code particles - only render on client */}
      {isClient &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-200 dark:bg-blue-800 opacity-30"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ y: 0 }}
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Binary code rain effect - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20 pointer-events-none">
          {binaryElements.map((element) => (
            <div
              key={element.id}
              className="absolute top-0 text-xs font-mono text-blue-500 dark:text-blue-300 whitespace-nowrap"
              style={{
                left: `${element.left}%`,
                animation: `fall ${element.duration}s linear infinite`,
                animationDelay: `${element.delay}s`,
              }}
            >
              {element.content.map((bit) => (
                <span key={bit.id} className="opacity-80">
                  {bit.value}
                  {bit.space && " "}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with morphing text */}
        <motion.div
          className="relative mb-12 md:mb-20 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
            hidden: {
              opacity: 0,
              y: 20,
            },
          }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 text-xs font-mono font-medium tracking-wider text-blue-600 dark:text-blue-400 uppercase rounded-full bg-blue-50 dark:bg-gray-800 mb-4 md:mb-5"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Technical Mastery
          </motion.span>

          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                    display: "inline-block",
                  }}
                >
                  Code.
                </motion.span>
              </span>
            </span>{" "}
            <motion.span
              className="relative inline-block mt-1 md:mt-2"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
                Create.
              </span>
            </motion.span>{" "}
            <motion.span
              className="relative inline-block mt-1 md:mt-2"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                Innovate.
              </span>
            </motion.span>
          </motion.h2>

          <motion.div
            className="max-w-3xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Architecting digital experiences through clean code and innovative
              solutions
            </p>
          </motion.div>
        </motion.div>

        {/* 3D Card Grid - Stack on mobile, side by side on larger screens */}
        <div className="grid lg:grid-cols-10 gap-8 md:gap-12 items-start">
          {/* Left Column - Philosophy - Full width on mobile, 6 cols on desktop */}
          <div className="lg:col-span-6">
            <motion.div
              className="relative h-full group perspective-1000"
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.2 },
                },
                hidden: {
                  opacity: 0,
                  y: 30,
                },
              }}
            >
              <div className="relative h-full bg-white dark:bg-gray-800 p-6 sm:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl z-10 border border-gray-100 dark:border-gray-700 transform-style-preserve-3d group-hover:rotate-y-2 transition-transform duration-500">
                <div className="backface-hidden">
                  <div className="flex items-start mb-6 md:mb-8">
                    <div className="flex-shrink-0 relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center shadow-inner">
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                          ></path>
                        </svg>
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-purple-500 border-2 border-white dark:border-gray-800 shadow-md"></div>
                    </div>
                    <div className="ml-4 sm:ml-5">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                        Development Philosophy
                      </h3>
                      <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 sm:mt-3 rounded-full"></div>
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      As a{" "}
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        Frontend Architect
                      </span>
                      , I connect design and technology to build systems that
                      look great and work well. I use both technical skills and
                      creative thinking to make sure my solutions are easy to
                      use, smart, reliable, secure, adaptable, fast, scalable,
                      efficient, innovative, user-friendly and ready for the
                      future.
                    </p>

                    {/* Interactive skill matrix - 2 cols on mobile, 3 on larger */}
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl border border-gray-100 dark:border-gray-700">
                      <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-3 sm:mb-5 flex items-center text-base sm:text-lg">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Architectural Principles
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {[
                          "Modular",
                          "Performant",
                          "Responsive",
                          "Secure",
                          "Scalable",
                          "Accessible",
                        ].map((principle) => (
                          <motion.div
                            key={principle}
                            className="p-2 sm:p-3 bg-white dark:bg-gray-800 rounded-md sm:rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs sm:shadow-sm text-center cursor-pointer hover:shadow-sm sm:hover:shadow-md transition-shadow"
                            whileHover={{ y: -3 }}
                          >
                            <div className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 rounded-full bg-blue-100 dark:bg-gray-700 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                              {principle.charAt(0)}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                              {principle}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Animated action buttons - stacked on mobile, inline on larger */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2">
                      <motion.button
                        className="relative px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 shadow-md sm:shadow-lg rounded-md sm:rounded-lg overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <a
                          href="#projects"
                          className="relative z-10 font-medium flex items-center text-amber-50 text-sm sm:text-base scroll-smooth"
                        >
                          <span>Explore Projects</span>
                          <svg
                            className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>

                      <motion.button
                        className="relative px-4 sm:px-6 py-2 sm:py-3 border border-gray-900 dark:border-gray-900 text-gray-900 dark:text-gray-300 rounded-md sm:rounded-lg bg-transparent text-sm sm:text-base"
                        whileHover={{
                          backgroundColor: "rgba(243, 244, 246, 1)",
                          scale: 1.03,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 font-medium flex items-center">
                          <span>Download CV</span>
                          <svg
                            className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            ></path>
                          </svg>
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills - Full width on mobile, 4 cols on desktop */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <motion.div
              className="lg:sticky lg:top-28"
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, delay: 0.4 },
                },
                hidden: {
                  opacity: 0,
                  y: 30,
                },
              }}
            >
              {/* Interactive skill orb - smaller on mobile */}
              <div className="relative mb-6 sm:mb-8 h-40 sm:h-48 w-full rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-full opacity-30"></div>
                <motion.div
                  className="absolute top-1/2 left-1/2 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg sm:shadow-xl"
                  animate={{
                    x: ["-50%", "-50%"],
                    y: ["-50%", "-50%"],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    x: "-50%",
                    y: "-50%",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white text-3xl sm:text-4xl">
                    <FaReact />
                  </div>
                </motion.div>

                {displayedSkills.slice(0, 6).map((skill, i) => {
                  const angle =
                    i *
                    (360 / displayedSkills.slice(0, 6).length) *
                    (Math.PI / 180);
                  const radius = isClient
                    ? 60 + (window.innerWidth >= 640 ? 20 : 0)
                    : 60;
                  const x = 50 + radius * Math.cos(angle);
                  const y = 50 + radius * Math.sin(angle);

                  return (
                    <motion.div
                      key={skill.name}
                      className={`absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-800 shadow-sm sm:shadow-md flex items-center justify-center text-lg sm:text-xl cursor-pointer z-10 ${
                        hoveredSkill === skill.name
                          ? "scale-110 sm:scale-125 shadow-md sm:shadow-lg"
                          : ""
                      }`}
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        x: [0, 0],
                        y: [0, 0],
                      }}
                      whileHover={{
                        scale: isClient && window.innerWidth >= 640 ? 1.2 : 1.1,
                      }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      {skill.icon}
                    </motion.div>
                  );
                })}
              </div>

              {/* Category filter chips - scrollable on mobile */}
              <div className="flex overflow-x-auto pb-2 mb-4 sm:mb-6 gap-2 sm:gap-3 scrollbar-hide">
                {skillCategories.map((category) => (
                  <motion.button
                    key={category.name}
                    className={`flex-shrink-0 flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      activeCategory === category.name
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    onClick={() => {
                      setActiveCategory(category.name);
                      setShowAllSkills(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-1 sm:mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </div>

              {/* Animated skill list */}
              <div className="space-y-3 sm:space-y-5">
                <AnimatePresence>
                  {displayedSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-1.5 z-10 relative">
                        <div className="flex items-center">
                          <div className="text-base sm:text-lg mr-2 sm:mr-3 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {skill.icon}
                          </div>
                          <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400">
                          {skill.level}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 sm:h-1.5 overflow-hidden relative">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full absolute top-0 left-0"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{
                            duration: 1.5,
                            delay: 0.3,
                            type: "spring",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* View all toggle with animation */}
              {filteredSkills.length > 8 && !showAllSkills && (
                <motion.button
                  onClick={() => setShowAllSkills(true)}
                  className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <span>View All Skills</span>
                  <svg
                    className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS for binary code rain */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(calc(100vh + 100px));
          }
        }
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

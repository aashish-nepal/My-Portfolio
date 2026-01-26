import { projects } from "../utils/constants";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";

// Refined animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    y: 60,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 20,
      mass: 0.8,
    },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden
             bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
             from-indigo-200/20 via-transparent to-transparent
             dark:from-indigo-900/20 dark:via-transparent dark:to-transparent"
    >
      {/* Animated gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#6366f120,#a855f720,#22d3ee20,#6366f120)]
                    blur-3xl opacity-70 animate-[spin_30s_linear_infinite] dark:opacity-40"
        />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0
               bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),
                   linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
               bg-[size:48px_48px]
               dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),
                        linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)]"
      />

      {/* Noise texture (adds depth) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="120" height="120" filter="url(%23n)" opacity="0.4"/></svg>\')',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Minimalist Header with Accent Line */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Selected{" "}
              <span className="italic font-light text-indigo-600/90">Works</span>.
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>

        {/* Projects Grid with Card Overlap Effect */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={item}
              className="relative group"
            >
              {/* Project Number Indicator */}
              <div className="absolute -left-6 -top-6 z-20">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg shadow-lg transform -rotate-6">
                  <span className="text-white font-bold text-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Card with Depth Effect */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                {/* Image Container with Gradient Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent z-10"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Live Preview Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end justify-between p-8">
                    <div>
                      <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                        Live Preview
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/10 hover:bg-white backdrop-blur-sm text-white hover:text-gray-900 rounded-full transition-all duration-300 transform hover:scale-110 border border-white/20"
                          aria-label={`View ${project.title} source code`}
                        >
                          <FiGithub className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center gap-2"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <span className="text-sm font-medium">Visit</span>
                          <FiArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {project.category || "Web Application"}
                      </span>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.year || "2024"}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies Pill */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-100 dark:border-indigo-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Indicator Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Archive CTA with Animated Border */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-0 pt-16 border-t border-gray-100 dark:border-gray-800"
        >
          <div className="text-center">
            <a
              href="https://github.com/aashish-nepal"
              className="group relative inline-flex items-center gap-4 px-8 py-4 text-gray-900 dark:text-white font-medium rounded-full border-2 border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-300 overflow-hidden"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10">View Complete Archive</span>
              <FiArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />

              {/* Animated Background */}
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>

              {/* Animated Border */}
              <span className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-full transition-all duration-500"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

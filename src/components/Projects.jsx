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
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* This section used to carry its own conic mesh and a 48px grid at odds
          with the 40px one everywhere else — both now come from SiteBackground. */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
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
              <span className="italic font-light text-orange-600/90">Works</span>.
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={item}
              className="relative group"
            >
              {/* Project Number Indicator — pulled in on phones, where a -6
                  offset would put it past the page gutter. */}
              <div className="absolute -left-2 -top-3 sm:-left-6 sm:-top-6 z-20">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg transform -rotate-6">
                  <span className="text-white font-bold text-base sm:text-lg">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Card with Depth Effect */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700">
                {/* Image Container with Gradient Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent z-10"></div>
                  {/* `sizes` tracks the grid: single column until lg, two from
                      there. The old 768px breakpoint had the browser download
                      half-width images to fill the full width of a tablet. */}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    quality={100}
                    sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 640px"
                  />

                  {/* Hover flourish only. It is decorative and inert — the real
                      links live in the card body below, because a touch screen
                      has no hover and a zero-opacity link is an invisible tap
                      target sitting on top of the image. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-end p-6 sm:p-8"
                  >
                    <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                      Live Preview
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8">
                  <div className="mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
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
                        className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 text-orange-700 dark:text-orange-300 rounded-full border border-orange-100 dark:border-orange-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions — always on screen, so they work on touch and for
                      keyboard users, neither of which can trigger a hover. */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold shadow-md shadow-orange-500/20 transition-all"
                        aria-label={`Visit ${project.title} live site`}
                      >
                        Visit site
                        <FiArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-11 px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                        aria-label={`View ${project.title} source code`}
                      >
                        <FiGithub className="w-4 h-4" />
                        Source
                      </a>
                    )}
                  </div>

                  {/* Hover Indicator Line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-500"></div>
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
              <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>

              {/* Animated Border */}
              <span className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-full transition-all duration-500"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

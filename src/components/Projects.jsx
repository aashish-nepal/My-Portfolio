import { projects } from '../utils/constants';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';

// Smooth, high-end animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="py-32 bg-gray-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Editorial Header Design */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Selected{" "}
              <span className="italic font-light text-indigo-600/90">
                Works
              </span>
              .
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 dark:bg-gray-800 mx-10 mb-5" />
        </motion.div>

        {/* Asymmetric Staggered Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={item}
              className={`group relative ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Image Container with Custom Frame */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 shadow-2xl transition-all duration-500 group-hover:shadow-indigo-500/10">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                  quality={100}
                />
                
                {/* Modern Hover Overlay */}
                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] flex items-center justify-center gap-5">
                    {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          className="p-4 bg-white/10 hover:bg-white text-white hover:text-indigo-600 border border-white/20 rounded-full transition-all duration-300 transform hover:scale-110"
                        >
                            <FiGithub className="w-6 h-6" />
                        </a>
                    )}
                    {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          className="p-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
                        >
                            <FiArrowUpRight className="w-6 h-6" />
                        </a>
                    )}
                </div>
              </div>

              {/* Content Styling - Aligned with your CSS variables */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                    </h3>
                    <span className="text-sm font-mono text-gray-400 tracking-widest uppercase">
                        prj — 0{index + 1}
                    </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-[11px] uppercase tracking-[0.2em] font-bold text-indigo-600/80 dark:text-indigo-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Link - Using your custom btn-work logic */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-40 text-center"
        >
          <a
            href="https://github.com/aashish-nepal"
            className="group relative inline-flex items-center text-xl font-bold tracking-tight uppercase py-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="relative z-10 text-gray-900 dark:text-white">View Archive</span>
            <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-indigo-600 origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"></div>
            <FiArrowUpRight className="ml-3 text-indigo-600 transition-transform duration-300 group-hover:rotate-45" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
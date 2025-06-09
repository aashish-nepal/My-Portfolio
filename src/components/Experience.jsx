import { experiences } from '../utils/constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { FaMedal, FaChartLine, FaRocket, FaLightbulb } from 'react-icons/fa';
import { GiSpinningSword, GiAchievement } from 'react-icons/gi';
import { useState, useRef } from 'react';

// 3D tilt animation variants
const cardVariants = {
  rest: {
    scale: 1,
    rotateY: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    scale: 1.03,
    rotateY: 3,
    rotateX: -2,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effects for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0.5]);

  const toggleExpand = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-28 bg-gradient-to-b from-gray-50 to-indigo-50 snap-start"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="relative inline-block">
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-200 opacity-60 -z-1"></span>
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
                My Career Odyssey
              </span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A chronicle of growth, challenges, and breakthroughs
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-300 via-blue-400 to-purple-300 rounded-full"></div>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
          style={{ opacity }}
        >
          {/* Decorative floating elements with parallax */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-indigo-100 opacity-20 blur-3xl"
          ></motion.div>
          <motion.div 
            style={{ y: y2 }}
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-blue-100 opacity-20 blur-3xl"
          ></motion.div>
          
          {/* Interactive timeline */}
          <div className="absolute left-4 md:left-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 to-blue-300 -translate-x-1/2 hidden md:block rounded-full"></div>
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group mb-16 last:mb-0"
              whileHover="hover"
              animate="rest"
              viewport={{ margin: "0px 0px -100px 0px", once: true }}
            >
              {/* Animated timeline dot with icon */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-indigo-600 rounded-full -translate-x-1/2 hidden md:flex items-center justify-center transform group-hover:scale-125 group-hover:shadow-xl transition-all duration-300 z-10">
                {index % 2 === 0 ? (
                  <FaRocket className="text-indigo-600 text-xs" />
                ) : (
                  <FaLightbulb className="text-indigo-600 text-xs" />
                )}
              </div>
              
              <motion.div
                variants={cardVariants}
                className={`bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 ml-12 md:ml-0 transition-all duration-500 group-hover:shadow-2xl group-hover:border-indigo-200 relative overflow-hidden ${
                  index % 2 === 0 
                    ? 'md:mr-auto md:max-w-[48%] md:pr-16' 
                    : 'md:ml-auto md:max-w-[48%] md:pl-16'
                }`}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 clip-path-corner"></div>
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center">
                      {exp.position}
                      {index === 0 && (
                        <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full flex items-center">
                          <GiSpinningSword className="mr-1" /> Current
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center">
                      <h4 className="text-lg font-semibold text-indigo-700 flex items-center">
                        {exp.company}
                        {exp.website && (
                          <a 
                            href={exp.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
                            aria-label={`Visit ${exp.company} website`}
                          >
                            <FiExternalLink size={18} />
                          </a>
                        )}
                      </h4>
                    </div>
                  </div>
                  <span className="inline-block mt-3 md:mt-0 px-4 py-1.5 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 rounded-full text-sm font-semibold shadow-sm border border-indigo-200">
                    {exp.duration}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed text-lg relative pl-6 border-l-2 border-indigo-100">
                  {exp.description}
                </p>
                
                {exp.achievements && (
                  <motion.div 
                    initial={{ height: expandedCard === index ? 'auto' : 120 }}
                    animate={{ height: expandedCard === index ? 'auto' : 120 }}
                    className="mb-8 bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400"></div>
                    <h5 className="flex items-center text-indigo-800 font-semibold mb-4">
                      <GiAchievement className="mr-2 text-indigo-600" />
                      Notable Contributions
                    </h5>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-indigo-500 mr-3 mt-1">
                            <FaChartLine size={14} />
                          </span>
                          <span className="text-gray-800">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {exp.achievements.length > 2 && (
                      <button 
                        onClick={() => toggleExpand(index)}
                        className="absolute bottom-0 left-0 w-full h-10 flex items-end justify-center pb-2 bg-gradient-to-t from-white to-transparent text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <motion.div
                          animate={{ rotate: expandedCard === index ? 180 : 0 }}
                        >
                          <FiChevronDown />
                        </motion.div>
                      </button>
                    )}
                  </motion.div>
                )}
                
                <div>
                  <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                    <span className="mr-2">🛠️</span> Tools & Technologies
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech, i) => (
                      <motion.span 
                        key={i} 
                        className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all cursor-default relative group"
                        whileHover={{ y: -2 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-2xl">
            <p className="text-gray-700 text-lg italic mb-2">
              "The expert in anything was once a beginner."
            </p>
            <p className="text-gray-500 font-medium">
              — Helen Hayes
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              {['💡', '🚀', '🧠', '🌟'].map((emoji, i) => (
                <motion.span 
                  key={i}
                  className="text-2xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2 + i * 0.5,
                    ease: "easeInOut"
                  }}
                >
                  {emoji}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .clip-path-corner {
          clip-path: polygon(100% 0, 0% 100%, 100% 100%);
        }
      `}</style>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const techList = [
  {
    name: "React",
    zIndex: 4,
    bgColor: "bg-gradient-to-br from-cyan-500 to-blue-600",
    textColor: "text-white",
    shadow: "shadow-lg shadow-blue-500/20",
  },
  {
    name: "Next",
    zIndex: 3,
    bgColor: "bg-gradient-to-br from-gray-900 to-black",
    textColor: "text-white",
    shadow: "shadow-lg shadow-gray-800/20",
  },
  {
    name: "JS",
    zIndex: 2,
    bgColor: "bg-gradient-to-br from-yellow-400 to-yellow-500", // JS brand yellow gradient
    textColor: "text-gray-900",
    shadow: "shadow-lg shadow-yellow-500/30",
  },
  {
    name: "Web",
    zIndex: 1,
    bgColor: "bg-gradient-to-br from-green-500 to-emerald-600",
    textColor: "text-white",
    shadow: "shadow-lg shadow-green-500/20",
  },
];

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 md:pt-0">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center relative z-10 py-12 md:py-24">
          {/* Text Content - Now comes first on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-last lg:order-first"
          >
            <div className="uppercase tracking-widest text-xs mb-3 md:mb-4 text-indigo-600 font-semibold">
              Web Developer
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-gray-900">Innovative</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                Solutions
              </span>{" "}
              <span className="block">Through Code</span>
            </h1>

            <div className="border-l-4 border-indigo-500 pl-3 md:pl-4 mb-6 md:mb-8">
              <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
                I architect seamless digital experiences by blending
                cutting-edge technology with intuitive design. Specializing in
                React, Next.js, and cloud-native applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#projects"
                className="btn-work flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 bg-gray-900 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explore My Work
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="btn-connect flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3.5 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Let's Connect
              </motion.a>
            </div>

            {/* Tech stack indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            ></motion.div>

            <div className="flex -space-x-3 mr-0 sm:mr-6 items-center">
              {techList.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`
          w-9 h-9 md:w-11 md:h-11 rounded-full ${tech.bgColor} ${tech.shadow}
          border-2 border-white/20 flex items-center justify-center
          backdrop-blur-sm transition-all duration-300 hover:border-white/40
        `}
                  style={{ zIndex: tech.zIndex }}
                >
                  <span
                    className={`text-xs font-semibold ${tech.textColor} tracking-tight`}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              ))}
              <motion.p 
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.8 }}
    transition={{ delay: 0.3 }}
    className="text-sm text-gray-500 font-sm ml-6"
  >
    Technologies I work with daily
  </motion.p>
            </div>
            
            
          </motion.div>

          {/* Image with creative frame - Hidden on smallest screens */}
          <motion.div
            className="relative w-full h-64 sm:h-80 md:h-[32rem] mt-8 sm:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl md:rounded-3xl transform rotate-1 shadow-xl md:shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl md:rounded-3xl transform -rotate-1 shadow-lg md:shadow-xl"></div>
            <div className="absolute inset-0 border-4 md:border-8 border-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md md:shadow-lg">
              <Image
                src="/images/my-img.jpg"
                alt="Aashish Nepal - Web Developer"
                fill
                className="object-cover object-top"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {/* Decorative badge - Hidden on mobile */}
            <div className="hidden sm:flex absolute -right-4 md:-right-6 -bottom-4 md:-bottom-6 bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg border border-gray-100 items-center">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full mr-1 md:mr-2 animate-pulse"></div>
              <span className="text-xs md:text-sm font-medium text-gray-700">
                Available
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaReact, FaJs, FaGlobe } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";
import { useRef } from "react";

const techList = [
  {
    Icon: FaReact,
    zIndex: 4,
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-600",
    textColor: "text-white",
    shadow: "shadow-lg shadow-cyan-500/30",
  },
  {
    Icon: SiNextdotjs,
    zIndex: 3,
    bgColor: "bg-gradient-to-br from-gray-900 to-black",
    textColor: "text-white",
    shadow: "shadow-lg shadow-black/40",
  },
  {
    Icon: FaJs,
    zIndex: 2,
    bgColor: "bg-gradient-to-r from-yellow-400 to-amber-500",
    textColor: "text-gray-900",
    shadow: "shadow-lg shadow-yellow-500/40",
  },
  {
    Icon: FaGlobe,
    zIndex: 1,
    bgColor: "bg-gradient-to-br from-emerald-500 to-green-600",
    textColor: "text-white",
    shadow: "shadow-lg shadow-emerald-500/30",
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 "
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 py-4">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6 border border-indigo-100">
                Based in Nepal &bull; Remote Friendly
              </span>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter mb-8">
                CRAFTING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  DIGITAL
                </span>{" "}
                <br />
                ARTEFACTS.
              </h1>

              <p className="text-sm md:text-xl text-gray-500 max-w-xl leading-relaxed mb-10 font-medium text-justify">
                I architect seamless digital experiences by blending
                cutting-edge technology with intuitive design. Specializing in
                React, Next.js, and cloud-native applications.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 md:px-10 py-4 bg-gray-900 text-white rounded-full font-semibold shadow-2xl shadow-gray-400/40 hover:bg-indigo-600 transition-colors"
                >
                  View Projects
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 md:px-10 py-4 border border-gray-200 rounded-full font-semibold text-gray-900 hover:bg-white transition-all"
                >
                  Let's Connect
                </motion.button>
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, staggerChildren: 0.1 }}
                className="mt-10 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              ></motion.div>

              <div className="flex -space-x-1 mr-0 sm:mr-6 items-center ">
                {techList.map(
                  ({ name, Icon, zIndex, bgColor, textColor, shadow }) => (
                    <div
                      key={name}
                      className={`relative flex items-center gap-3 px-2 py-3 rounded-xl
                  ${bgColor} ${textColor} ${shadow}`}
                      style={{ zIndex }}
                    >
                      <Icon className="text-2xl" />
                      <span className="font-semibold tracking-wide">
                        {name}
                      </span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT IMAGE - ASYMMETRIC FRAME */}
          <motion.div style={{ y }} className="w-full lg:w-2/5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
              {/* Decorative Frame Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-indigo-500 rounded-tl-3xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-indigo-500 rounded-br-3xl" />

              {/* Main Image Container */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)]">
                <Image
                  src="/images/profiles.jpg" // Ensure this path is correct
                  alt="Aashish Nepal"
                  fill
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  priority
                />
              </div>

              {/* Status Floating Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute inset-0" />
                    <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                  </div>
                  <span className="text-sm font-bold text-gray-800 tracking-tight">
                    Available for hire
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

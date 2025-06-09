'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const techList = [
  { name: 'React', zIndex: 4 },
  { name: 'Next', zIndex: 3 },
  { name: 'JS', zIndex: 2 },
  { name: 'Web', zIndex: 1 },
];

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-6 w-full relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10 py-24">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-last lg:order-first"
          >
            <div className="uppercase tracking-widest text-xs mb-4 text-indigo-600 font-semibold">
              Web Developer
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900">Innovative</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                Solutions
              </span>{' '}
              <span className="block">Through Code</span>
            </h1>

            <div className="border-l-4 border-indigo-500 pl-4 mb-8">
              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                I architect seamless digital experiences by blending cutting-edge technology with intuitive design. Specializing in React, Next.js, and cloud-native applications, I bring modern, scalable, and user-focused solutions to life.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#work"
                className="btn-work flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Explore My Work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="btn-connect flex items-center gap-2 px-8 py-3.5 border-2 border-gray-900 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
              >
                Let's Connect
              </motion.a>
            </div>

            {/* Tech stack indicators */}
            <div className="mt-12 flex items-center">
              <div className="flex -space-x-2 mr-4">
                {techList.map((tech) => (
                  <div
                    key={tech.name}
                    className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-md"
                    style={{ zIndex: tech.zIndex }}
                  >
                    <span className="text-xs font-bold text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Technologies I work with daily
              </div>
            </div>
          </motion.div>

          {/* Image with creative frame */}
          <motion.div
            className="relative w-full h-[32rem]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl transform rotate-1 shadow-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl transform -rotate-1 shadow-xl"></div>
            <div className="absolute inset-0 border-8 border-white rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/images/Aashish-Nepal.jpg"
                alt="Aashish Nepal - Web Developer"
                fill
                className="object-cover object-top"
                priority
                quality={100}
              />
            </div>
            {/* Decorative badge */}
            <div className="absolute -right-6 -bottom-6 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Available for work</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

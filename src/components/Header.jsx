import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  // Check for saved theme preference on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      updateActiveSection();
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  const updateActiveSection = () => {
    const sections = ['about', 'experience', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const navItems = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300
      ${scrolled 
        ? 'header-scrolled shadow-sm py-3' 
        : 'py-4 md:py-5'}
      ${
        mobileMenuOpen
          ? 'bg-white dark:bg-gray-900'
          : scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
            : 'bg-transparent'
      }
    `}>
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <Link href="/" className="flex items-center group" aria-label="Home">
    {/* Custom Nepal-Inspired Logo Mark */}
    <span className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-500 dark:from-indigo-700 dark:to-blue-600 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
      
      {/* Hidden "AN" Monogram (Negative Space) */}
      <svg 
        viewBox="0 0 100 100" 
        className="h-6 w-6 fill-current text-white dark:text-indigo-100"
      >
        {/* A + N merged into a single shape with a mountain peak */}
        <path d="M20 80 L50 20 L80 80 L65 80 L50 50 L35 80 Z" />
        
        {/* Moon + Sun (Subtle Nepal Symbolism) */}
        <circle cx="70" cy="30" r="5" fill="currentColor" />
        <path d="M70 20 L70 10 M60 30 L50 30 M70 40 L70 50 M80 30 L90 30" 
              stroke="currentColor" stroke-width="4" />
      </svg>
      
      {/* Floating Dot (Personal Touch) */}
      <motion.span 
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-400 shadow-sm"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </span>

    {/* Text with Custom Styling */}
    <span className="ml-3 text-2xl font-bold tracking-tight">
    </span>
     <span className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Aashish Nepal
              </span>
  </Link>
</motion.div>

          {/* Desktop Navigation - Shown on md screens and up */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <Link 
                  href={item.href} 
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.id 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300'
                  }`}
                  scroll={false}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span 
                      layoutId="activeIndicator"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-400 dark:to-blue-400"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            
            {/* Dark mode toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
            
            <motion.button 
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="ml-2 lg:ml-4 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all"
              onClick={() => handleNavClick('#contact')}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Button - Shown on sm screens and down */}
          <div className="flex md:hidden items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <motion.button 
              className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                transition: { 
                  opacity: { duration: 0.2 },
                  height: { type: 'spring', bounce: 0.1, duration: 0.5 }
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { 
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 }
                }
              }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      href={item.href}
                      className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-indigo-50 dark:bg-gray-800/50 text-indigo-700 dark:text-indigo-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => handleNavClick(item.href)}
                      scroll={false}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-500 dark:to-blue-500 text-white px-4 py-3 rounded-lg text-base font-medium shadow hover:shadow-md transition-all"
                  onClick={() => handleNavClick('#contact')}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
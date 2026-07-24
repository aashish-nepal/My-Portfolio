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

  // Rotating a phone to landscape, or resizing a window past `lg`, swaps in the
  // desktop nav — the mobile panel has to let go of the viewport when it does.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const desktop = window.matchMedia('(min-width: 1024px)');
    const close = () => setMobileMenuOpen(false);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };

    desktop.addEventListener('change', close);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      desktop.removeEventListener('change', close);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const updateActiveSection = () => {
    const sections = ['about', 'teaching', 'experience', 'projects', 'contact'];
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
    { name: 'Teaching', href: '#teaching', id: 'teaching', accent: true },
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
    
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center gap-3">
          {/* Logo */}
          <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="min-w-0"
>
  <Link href="/" className="flex items-center group min-w-0 py-1" aria-label="Home">
    {/* Custom Nepal-Inspired Logo Mark */}
    <span className="relative flex shrink-0 items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-0.5">
      
      {/* Robot head wearing a terminal prompt for a face — the robotics half
          and the developer half in one silhouette. The face is negative space
          in a single evenodd path, so it stays crisp down to favicon size. */}
      <svg
        viewBox="0 0 100 100"
        className="h-6 w-6 fill-current text-white dark:text-orange-100"
        aria-hidden="true"
      >
        <circle cx="50" cy="14" r="6" />
        <rect x="47" y="16" width="6" height="16" rx="3" />
        <path
          fillRule="evenodd"
          d="M28 30 H72 A10 10 0 0 1 82 40 V70 A10 10 0 0 1 72 80 H28 A10 10 0 0 1 18 70 V40 A10 10 0 0 1 28 30 Z
             M28 45 L44 55 L28 65 L28 58 L34 55 L28 52 Z
             M50 60 H70 V66 H50 Z"
        />
      </svg>
    </span>

    {/* Name + dual role */}
    <span className="ml-2.5 sm:ml-3 min-w-0 leading-tight">
      {/* Weight contrast does the work — light given name against a black
          surname, tracking pulled tight to echo the hero headline. */}
      <span className="block truncate text-base sm:text-xl tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
        <span className="font-black">Aashish</span>{" "}
        <span className="font-black">Nepal</span>
      </span>
      <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-gray-400 dark:text-gray-500">
        Developer <span className="text-orange-500">/</span> Instructor
      </span>
    </span>
  </Link>
</motion.div>

          {/* Desktop Navigation - Shown on md screens and up */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 items-center">
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
                      ? 'text-orange-600 dark:text-orange-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-300'
                  }`}
                  scroll={false}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500"
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
                boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="ml-2 lg:ml-4 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-md text-sm font-medium shadow-md hover:shadow-lg transition-all"
              onClick={() => handleNavClick('#contact')}
            >
              Hire Me
            </motion.button>
          </div>

          {/* Mobile Menu Button - Shown on sm screens and down.
              p-2.5 around a 20px icon clears the 40px minimum touch target. */}
          <div className="flex lg:hidden shrink-0 items-center gap-1 sm:gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>

            <motion.button
              className="p-2.5 rounded-md text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-expanded={mobileMenuOpen}
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
              className="lg:hidden overflow-hidden"
            >
              {/* The panel is inside a fixed header, so on a landscape phone the
                  five links plus the CTA can be taller than the screen. Cap it
                  to what's left below the header and let it scroll. */}
              <div className="pt-2 pb-4 space-y-1 max-h-[calc(100dvh-5.5rem)] overflow-y-auto overscroll-contain">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                        activeSection === item.id
                          ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                      }`}
                      onClick={() => handleNavClick(item.href)}
                      scroll={false}
                    >
                      {item.name}
                      {item.accent && (
                        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300">
                          New
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 text-white px-4 py-3 rounded-lg text-base font-medium shadow hover:shadow-md transition-all"
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
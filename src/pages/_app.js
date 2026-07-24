import { useEffect } from 'react';
import Head from 'next/head';
import "../styles/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  // Initialize dark mode from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <>
      <Head>
        {/*
         * Next only injects `width=device-width` by default. `initial-scale=1`
         * is what stops iOS Safari from rendering the page at a zoomed-out
         * desktop width; no `maximum-scale`, so pinch-zoom stays available.
         */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Aashish Nepal | Software Developer &amp; Robotics Instructor</title>
        <meta name="description" content="Aashish Nepal is a full-stack web developer and a Python, AI & Robotics instructor based in Kathmandu, Nepal — building with React and Next.js, and teaching Python, Arduino, Raspberry Pi and ROS." />
        <meta name="keywords" content="Aashish Nepal, Python instructor Nepal, robotics instructor Kathmandu, AI teacher Nepal, Arduino classes, Raspberry Pi training, ROS, full-stack developer Nepal, React, Next.js" />
        <meta name="author" content="Aashish Nepal" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Aashish Nepal | Software Developer & Robotics Instructor" />
        <meta property="og:description" content="Full-stack developer and Python, AI & Robotics instructor based in Kathmandu. I build production software — and teach the people who'll build next." />
        <meta property="og:image" content="https://www.aashish-nepal.com.np/images/profiles.jpg" />
        <meta property="og:url" content="https://www.aashish-nepal.com.np" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aashish Nepal | Software Developer & Robotics Instructor" />
        <meta name="twitter:description" content="Full-stack developer and Python, AI & Robotics instructor based in Kathmandu, Nepal." />
        <meta name="twitter:image" content="https://www.aashish-nepal.com.np/images/profiles.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aashish Nepal",
              "url": "https://www.aashish-nepal.com.np",
              "image": "https://www.aashish-nepal.com.np/images/profiles.jpg",
              "jobTitle": ["Full Stack Developer", "Python, AI & Robotics Instructor"],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Kathmandu",
                "addressCountry": "NP"
              },
              "knowsAbout": [
                "Python",
                "Artificial Intelligence",
                "Robotics",
                "Arduino",
                "Raspberry Pi",
                "ROS",
                "React",
                "Next.js",
                "Full-Stack Web Development"
              ],
              "sameAs": [
                "https://www.linkedin.com/in/aashish-nepal-56247727b/",
                "https://github.com/aashish-nepal",
              ],
              "description": "Aashish Nepal is a full-stack web developer and a Python, AI and Robotics instructor based in Kathmandu, Nepal — skilled in React, Next.js, Firebase, and teaching hands-on robotics with Arduino, Raspberry Pi and ROS."
            }),
          }}
        />
      </Head>

      {/* Sections manage their own horizontal padding so their backgrounds can run full-bleed. */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;

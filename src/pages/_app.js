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
        <title>Aashish Nepal | Software Developer</title>
        <meta name="description" content="Aashish Nepal is a full-stack web developer specializing in React, Next.js, Firebase, and modern web technologies." />
        <meta name="author" content="Aashish Nepal" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Aashish Nepal | Software Developer" />
        <meta property="og:description" content="Explore the portfolio of Aashish Nepal, a full-stack developer based in Nepal." />
        <meta property="og:image" content="https://www.aashish-nepal.com.np/images/profile.jpg" />
        <meta property="og:url" content="https://www.aashish-nepal.com.np" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aashish Nepal | Software Developer" />
        <meta name="twitter:description" content="Explore the portfolio of Aashish Nepal, a full-stack developer based in Nepal." />
        <meta name="twitter:image" content="https://www.aashish-nepal.com.np/images/profile.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Aashish Nepal",
              "url": "https://www.aashish-nepal.com.np",
              "image": "https://www.aashish-nepal.com.np/images/profile.jpg",
              "jobTitle": "Full Stack Developer",
              "sameAs": [
                "https://www.linkedin.com/in/aashish-nepal-56247727b/",
                "https://github.com/aashish-nepal",
                "https://twitter.com/aashishnepal"
              ],
              "description": "Aashish Nepal is a full-stack web developer based in Nepal, skilled in React, Next.js, Firebase, and modern web technologies."
            }),
          }}
        />
      </Head>

      <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        <Header />
        <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default MyApp;

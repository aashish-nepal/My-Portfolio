// pages/_app.js
import { useEffect } from 'react';
import "../styles/globals.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

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
      <title>Aashish Nepal</title>
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
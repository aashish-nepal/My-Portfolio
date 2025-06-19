import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aashish Nepal | Software Developer</title>
        <link rel="canonical" href="https://www.aashish-nepal.com.np/" />
      </Head>

      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}

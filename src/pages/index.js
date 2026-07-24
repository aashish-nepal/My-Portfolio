import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Teaching from '../components/Teaching';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aashish Nepal | Software Developer & Robotics Instructor</title>
        <link rel="canonical" href="https://www.aashish-nepal.com.np/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <About />
      <Teaching />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
}

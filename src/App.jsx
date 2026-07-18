import './lib/gsap';
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/global.css';
import { gsap, ScrollTrigger } from './lib/gsap'; // ضيف السطر ده

// استيراد المكونات
import Navbar from './components/Navbar.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/loader.jsx';
import Footer from './components/Footer.jsx';

// استيراد السكاشن
import Home from './sections/Home.jsx';
import AboutMe from './sections/AboutMe.jsx';
import Projects from './sections/Projects.jsx';
import ScrollP from './sections/scrollp.jsx';
import ProcessPage from './sections/ProcessPage.jsx';
import ExperiencePage from './sections/ExperiencePage.jsx';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // اربط Lenis بـ ScrollTrigger عشان يحسوا ببعض
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf); // تنظيف، احتياطي
    };
  }, []);

  return (
    <div className="App">
      <Loader />
      <CustomCursor />
      <Navbar />

      <main>
        <Home />
        <AboutMe /> 
        <ExperiencePage /> 
        <ProcessPage />
        <Projects />
        <ScrollP />
      </main>

      <Footer />
    </div>
  );
}

export default App;
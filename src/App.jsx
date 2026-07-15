import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/global.css';

// استيراد المكونات
import Navbar from './components/Navbar.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/loader.jsx';
import Footer from './components/Footer.jsx';

// استيراد السكاشن
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import WebExperiences from './sections/WebExperiences.jsx';
import AboutMe from './sections/AboutMe.jsx';
import Projects from './sections/Projects.jsx';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,        // كل ما زودت الرقم كل ما بقت الحركة أبطأ (جرب من 1 لحد 2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // منحنى الحركة (سلس بشكل طبيعي)
      smoothWheel: true,    // تفعيل السلاسة مع الماوس/التراك باد
      touchMultiplier: 1.5, // حساسية اللمس على الموبايل
      wheelMultiplier: 1,   // حساسية عجلة الماوس
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // تنظيف الكود لما الكومبوننت يتشال
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <Loader />
      <CustomCursor />
      <Navbar />

      <main>
        <Home />
        <About />
        <WebExperiences />
        <AboutMe />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}

export default App;
import './lib/gsap';
import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import './styles/global.css';
import { gsap, ScrollTrigger } from './lib/gsap';

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
  // ✅ كود الـ Reveal اتحط هنا مباشرة بدل الهوك المنفصل
  useEffect(() => {
    const threshold = 0.15;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal:not(.active)');
      elements.forEach((el) => observer.observe(el));
    };

    // راقب أي تغييرات في الـ DOM (زي ظهور محتوى بعد اختفاء الـ Loader)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // ونفذها فورًا كمان لأي عناصر موجودة بالفعل
    observeAll();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

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
      gsap.ticker.remove(raf);
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
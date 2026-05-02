import './styles/global.css';

// استيراد المكونات (تأكد من مطابقة الأسامي للصورة بالظبط)
import Navbar from './components/Navbar.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Loader from './components/loader.jsx'; // لاحظ الحرف الأول l سمول زي الصورة
import Footer from './components/Footer.jsx';

// استيراد السكاشن
import Home from './sections/Home.jsx';
import About from './sections/About.jsx';
import WebExperiences from './sections/WebExperiences.jsx';
import AboutMe from './sections/AboutMe.jsx';
import Projects from './sections/Projects.jsx';

function App() {
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
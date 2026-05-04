import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    // الحالة الخاصة بالتحكم في شكل الناف بار عند السكرول
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // --- الجزء الأول: مراقبة السكاشن (كودك الأصلي) ---
        const sectionIds = ['home', 'about', 'work', 'footer'];
        
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        // --- الجزء الثاني: مراقبة السكرول لتغيير الخلفية ---
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // تنظيف الـ observers والـ events
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        /* هنا بنضيف الـ class "scrolled" لو الـ state بقت true */
        <nav className={`nav ${isScrolled ? 'scrolled' : ''}`}>
            <a href="#home">
                <img 
                    className="logo" 
                    src="/img/Asset 3@2x-8.png" 
                    alt="Logo" 
                />
            </a>
            <ul>
                <li>
                    <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>
                        <span>About me</span>
                    </a>
                </li>
                <li>
                    <a href="#work" className={`nav-link ${activeSection === 'work' ? 'active' : ''}`}>
                        <span>Projects</span>
                    </a>
                </li>
                <li>
                    <a href="#footer" className={`nav-link ${activeSection === 'footer' ? 'active' : ''}`}>
                        <span>Contact</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
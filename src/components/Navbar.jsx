import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        // تحديد السكاشن اللي عايزين نراقبها بناءً على الروابط الموجودة
        const sectionIds = ['home', 'about', 'work', 'footer'];
        
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // تحديث الحالة بالـ ID بتاع السكشن الظاهر حالياً
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // مراقبة كل سكشن
        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });

        // تنظيف الـ observer عند إغلاق المكون
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="nav">
            <a href="#home">
                <img 
                    className="logo" 
                    src="/img/ChatGPT Image Mar 18, 2026, 07_35_21 PM.png" 
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
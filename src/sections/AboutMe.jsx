
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutMe  = () => {
    const sectionRef = useRef(null);
    const imageWrapperRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const image = imageWrapperRef.current;
        const content = contentRef.current;

        // أنيميشن ناعم لظهور العناصر عند السكرول
        gsap.fromTo(image, 
            { opacity: 0, x: -40 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 1, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            }
        );

        gsap.fromTo(content.children, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.15, 
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            }
        );
    }, []);

    return (
        <section className="about-section" id='about' ref={sectionRef}>
            <div className="about-container">
                
                {/* الجزء الأيسر: الصورة والـ Badge */}
                <div className="about-image-column" ref={imageWrapperRef}>
                    <div className="image-wrapper">
                        <img 
                            src="/img/sef.jpeg" 
                            alt="Profile" 
                            className="profile-img"
                            id="seif"
                        />
                        {/* بطاقة الموقع الصغيرة أسفل الصورة */}
                        <div className="location-badge">
                            <span className="location-city">Cairo</span>
                            <span className="location-country">EGYPT</span>
                        </div>
                    </div>
                </div>

                {/* الجزء الأيمن: النصوص والكلمات الدلالية */}
                <div className="about-content-column" ref={contentRef}>
                    <span className="about-meta">[ ABOUT ]</span>
                    
                    <h2 className="about-main-title">
                         I develop for the people who didn't choose the software.
                   </h2>
                    
                    <p className="about-paragraph">
                   I'm Seif Tarek a Full-Stack Developer passionate about building modern, responsive, and user-focused web applications. I enjoy turning ideas into real products through clean code, intuitive interfaces, and scalable solutions. My journey began with web development, and today I continue to grow by working on freelance projects, professional client work, and personal applications while constantly learning new technologies. </p>
                    
                    <p className="about-paragraph">
                    I focus on building fast, responsive, and user-friendly web applications with clean, maintainable code. I enjoy turning ideas into real products, solving complex problems, and collaborating with clients to deliver modern, high-quality digital experiences from concept to deployment.</p>

                    {/* الكبسولات الدلالية (Tags) */}
                    <div className="about-tags-container">
                        <span className="about-tag">Web Design</span>
                        <span className="about-tag">Web Developer</span>
                        <span className="about-tag">AI For UX</span>
                        <span className="about-tag">Creative</span>
                        <span className="about-tag">Problem Solver</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutMe ;
import { useEffect, useRef } from 'react';

const About = () => {
    const marqueeRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        // --- 1. Logic الـ Reveal Animation ---
        const handleReveal = () => {
            const reveals = sectionRef.current.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };

        // --- 2. Logic الـ Marquee Animation ---
        const marqueeTrack = marqueeRef.current;
        let animationFrameId;
        let scrollX = 0;

        if (marqueeTrack) {
            // تكرار المحتوى لضمان استمرارية الحركة
            const content = marqueeTrack.innerHTML;
            marqueeTrack.innerHTML += content;

            const animateMarquee = () => {
                scrollX -= 0.5;
                if (Math.abs(scrollX) >= marqueeTrack.scrollWidth / 2) {
                    scrollX = 0;
                }
                marqueeTrack.style.transform = `translateX(${scrollX}px)`;
                animationFrameId = requestAnimationFrame(animateMarquee);
            };

            animateMarquee();
        }

        // إضافة مستمعات الأحداث
        window.addEventListener('scroll', handleReveal);
        handleReveal(); // تشغيل أولي

        // تنظيف الأحداث والـ Animation Frame
        return () => {
            window.removeEventListener('scroll', handleReveal);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const skills = [
        { name: 'HTML', icon: 'devicon-html5-plain', color: 'orange' },
        { name: 'CSS', icon: 'devicon-css3-plain', color: '#0091ff' },
        { name: 'J.S', icon: 'devicon-javascript-plain', color: '#b9b954' },
        { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', color: '#7952b3' },
        { name: 'React', icon: 'devicon-react-plain fa-flip-both', color: '#61dafb' },
        { name: 'Git', icon: 'devicon-git-plain', color: '#f05032' },
        { name: 'GitHub', icon: 'devicon-github-plain', color: '#008b8b' },
        { name: 'C++', icon: 'devicon-cplusplus-plain', color: '#00599c' },
        { name: 'Tailwind', icon: 'devicon-tailwindcss-plain', color: '#38b2ac' },
    ];

  return (
    <section className="about-section" ref={sectionRef}>
        <div className="content">
            <div className="coder s1">
                <h1 className="reveal">Creative Coder</h1>
                <ul className="ul reveal">
                    <li>I’m a creative coder driven by a deep passion for programming, especially in the world of web development.</li>
                    <li>I enjoy turning ideas into interactive and visually engaging digital experiences.</li>
                    <li>For me, coding is not just about functionality—it’s about creativity, problem-solving, and building something meaningful.</li>
                    <li>I’m constantly exploring new technologies, improving my skills, and pushing myself to create modern, innovative web solutions.</li>
                </ul>
            </div>

            {/* الـ 3D Model - شيلنا الـ width الثابت */}
            <model-viewer 
                class="parallax-media" 
                id="my" 
                src="/3D/sci_-_fi_computer_game_ready.glb" 
                alt="A 3D model" 
                auto-rotate 
                camera-controls /* ضفت دي عشان المستخدم يقدر يلفه بنفسه */
                enable-zoom={false} /* عشان ميبوظش السكرول في الموبايل */
                environment-image="neutral" 
                exposure="1" 
                ar 
                style={{ width: '100%', maxWidth: '500px', height: '60vh' }}
            ></model-viewer>

            {/* شريط المهارات - تكرار الداتا للحصول على Seamless Loop */}
            <div className="skills-marquee">
                <div className="marquee-track0" ref={marqueeRef}>
                    {[...skills, ...skills].map((skill, index) => (
                        <div 
                            key={index} 
                            className="skill-item" 
                            style={{ '--item-color': skill.color }}
                        >
                            <i className={`${skill.icon} fa-2xl`}></i>
                            <p>{skill.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="spacer"></div>
        </div>
    </section>
);};

export default About;
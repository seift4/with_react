import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);
    const marqueeContainerRef = useRef(null);
    const marqueeTrackRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = marqueeContainerRef.current;
        const track = marqueeTrackRef.current;

        let animationId;
        let isPaused = false;
        const scrollSpeed = 1.5; // سرعة التحرك التلقائي

        // 1. منطق التمرير اليدوي اللانهائي
        const handleManualScroll = () => {
            if (!container || !track) return;
            // إذا وصل المستخدم لنهاية النسخة الأولى (نصف التراك)
            if (container.scrollLeft >= track.scrollWidth / 2) {
                container.scrollLeft = 1;
            } 
            // إذا رجع للخلف ووصل للبداية
            else if (container.scrollLeft <= 0) {
                container.scrollLeft = track.scrollWidth / 2;
            }
        };

        // 2. منطق الأنيميشن التلقائي
        if (container && track) {
            const startAnimation = () => {
                if (!isPaused) {
                    container.scrollLeft += scrollSpeed;
                    
                    // العودة للبداية بسلاسة عند الوصول لنصف العرض
                    if (container.scrollLeft >= track.scrollWidth / 2) {
                        container.scrollLeft = 0;
                    }
                }
                animationId = requestAnimationFrame(startAnimation);
            };

            // أحداث الماوس للتوقف والتشغيل
            container.onmouseenter = () => { isPaused = true; };
            container.onmouseleave = () => { isPaused = false; };

            // إضافة مستمع السكرول اليدوي
            container.addEventListener('scroll', handleManualScroll);
            
            // بدء الأنيميشن
            animationId = requestAnimationFrame(startAnimation);
        }

        // 3. تأثيرات ظهور العناصر (GSAP Reveal)
        const revealElements = section.querySelectorAll('.reveal');
        revealElements.forEach((el) => {
            gsap.fromTo(el, 
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        // 4. التنظيف (Cleanup) عند إغلاق المكون
        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            if (container) {
                container.removeEventListener('scroll', handleManualScroll);
                container.onmouseenter = null;
                container.onmouseleave = null;
            }
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const projectsData = [
        { src: "/img/Mavero.mp4", title: "Mavero Agency" },
        { src: "/img/Avatar.mp4", title: "Avatar Characters" },
        { src: "/img/Resturant.mp4", title: "Food Lover" },
        { src: "/img/planets.mp4", title: "List of Planets" },
        { src: "/img/PORT.mp4", title: "Portfolio" }
    ];

    return (
        <section className="works" id="work" ref={sectionRef}>
            <p className="p reveal">
                I focus on building elegant, performance-driven websites that feel modern, meaningful, and memorable. I also enjoy exploring motion and interaction, feel free to visit my Playground:
            </p>

            <div><h1 className="reveal">Selected Work</h1></div>
            
            <div className="projects">
                {[
                    { name: "Mavero", link: "https://maveroagency.com/", class: "r1" },
                    { name: "Avatar", link: "https://seift4.github.io/AVATAR/", class: "r2" },
                    { name: "Food Lover", link: "https://seift4.github.io/Restaurant-/", class: "r3" },
                    { name: "List of planets", link: "https://seift4.github.io/Space/", class: "r4" },
                    { name: "portfolio", link: "https://seift4.github.io/Seif_Tarek-/", class: "r5" }
                ].map((project, index) => (
                    <a href={project.link} key={index} target="_blank" rel="noreferrer">
                        <div className={`row reveal ${project.class}`}>
                            <div className="title-area">
                                <svg xmlns="http://www.w3.org/2000/svg" height="58px" viewBox="0 -960 960 960" width="58px" fill="#e3e3e3">
                                    <path d="M480-276 275-480.5l16.5-15.5L469-320v-413h22v413.5l177-177 16 16.5-204 204Z"/>
                                </svg>
                                <p>{project.name}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            {/* تم إخفاء الـ scrollbar في الـ CSS الخاص بك غالباً، ولكن هنا تأكدنا من تنسيق الـ Marquee */}
            <div className="imgs reveal" ref={marqueeContainerRef} style={{ overflowX: 'auto', whiteSpace: 'nowrap', cursor: 'grab' }}>
                <div className="marquee-track" ref={marqueeTrackRef} style={{ display: 'inline-flex' }}>
                    {/* المجموعة الأولى */}
                    {projectsData.map((item, idx) => (
                        <div className="img" key={idx} style={{ display: 'inline-block' }}>
                            <video className="v2" src={item.src} autoPlay loop muted playsInline></video>
                            <p>{item.title}</p>
                        </div>
                    ))}
                    {/* المجموعة الثانية (التكرار لضمان الاستمرارية) */}
                    {projectsData.map((item, idx) => (
                        <div className="img" key={`dup-${idx}`} style={{ display: 'inline-block' }}>
                            <video className="v2" src={item.src} autoPlay loop muted playsInline></video>
                            <p>{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
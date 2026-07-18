import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperiencePage = () => {
    const containerRef = useRef(null);
    const leftSideRef = useRef(null);
    const progressFillRef = useRef(null);
    const cardsRef = useRef([]);
    const rightNodesRef = useRef([]);

    const experiences = [
        {
            company: "CAIRO UNIVERSITY · FACULTY OF COMPUTERS AND ARTIFICIAL INTELLIGENCE", 
            role: "Student", 
            period: "2024-2028", 
            tags: "Date",
            title: "Where it began",
            desc: "Started my programming journey at Cairo University, building a solid foundation in computer science, software development, and problem-solving through academic learning and practical projects."
        },
        {
            company: "NTI - National Telecommunication Institute", 
            role: "Learn WEB DESIGNER & DEVELOPER", 
            period: "2025", 
            tags: "WEB & FRONT-END",
            title: "Learn web Developer",
            desc: "Started my web development journey through the NTI Web Design & Development program, where I learned HTML, CSS, JavaScript, Bootstrap, responsive web design, UI principles, and built real-world web projects."
        },
        {
            
            company: "Mavero Agency", 
            role: "Frontend Developer", 
            period: "2026-1", 
            tags: "Web Developer",
            title: "Career Beginning",
            desc: "Began my first professional role at MAVERO Agency, working on real client projects and turning my skills into practical experience. This was the starting point of my journey as a professional web developer."
        },
        {
            company: "Freelance", 
            role: "Web Developer", 
            period: "2026-5", 
            tags: "Web Developer",
            title: "Freelance Beginning",
            desc: "Started my freelance career as a Web Developer, delivering custom websites for clients and successfully completing 3 projects. Continuing to grow through real-world experience and new opportunities."
        }
    ];

    useEffect(() => {
        const container = containerRef.current;
        const leftSide = leftSideRef.current;
        if (!container || !leftSide) return;

        cardsRef.current = cardsRef.current.slice(0, experiences.length);
        rightNodesRef.current = rightNodesRef.current.slice(0, experiences.length);

        // استخدام matchMedia للتحكم في سلوك الأنيميشن حسب حجم الشاشة
        let mm = gsap.matchMedia();

        mm.add({
            // شاشات الديسكتوب (أكبر من 768 بكسل)
            isDesktop: "(min-width: 769px)",
            // شاشات الموبايل والتابلت (أقل من أو تساوي 768 بكسل)
            isMobile: "(max-width: 768px)"
        }, (context) => {
            let { isDesktop } = context.conditions;

            // 1. التثبيت (Pin) يُفعل فقط على الديسكتوب
         // 1. التثبيت (Pin) يُفعل فقط على الديسكتوب
let pinTrigger;
if (isDesktop) {
    pinTrigger = ScrollTrigger.create({
        trigger: container,
        start: "top 8%",
        end: "bottom bottom", 
        pin: leftSide,
        pinSpacing: false,
        // ⬇️ إضافة الكلاس تلقائياً فور بدء التثبيت وإزالته عند الصعود ⬇️
        toggleClass: { targets: leftSide, className: "is-pinned" }
    });
}
            // 2. تحريك شريط الـ Progress الأفقي (يعمل في الحالتين ولكن بنسب مريحة لكل شاشة)
            gsap.to(progressFillRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: isDesktop ? "top 15%" : "top 30%",
                    end: "bottom bottom", 
                    scrub: 0.5
                }
            });

            // 3. مراقبة وإضاءة الكروت بشكل مستقل ومتوافق مع الموبايل والديسكتوب
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                ScrollTrigger.create({
                    trigger: card,
                    // في الموبايل نجعل التفعيل عند 60% من الشاشة ليكون مريحاً للعين أثناء السكرول بالإصبع
                    start: isDesktop ? "top 50%" : "top 60%", 
                    end: isDesktop ? "bottom 50%" : "bottom 60%",
                    onEnter: () => {
                        card.classList.add("active-card");
                        rightNodesRef.current[index]?.classList.add("active-node");
                    },
                    onLeaveBack: () => {
                        card.classList.remove("active-card");
                        rightNodesRef.current[index]?.classList.remove("active-node");
                    },
                    onEnterBack: () => {
                        card.classList.add("active-card");
                        rightNodesRef.current[index]?.classList.add("active-node");
                    },
                    onLeave: () => {
                        if (index !== experiences.length - 1) {
                            card.classList.remove("active-card");
                            rightNodesRef.current[index]?.classList.remove("active-node");
                        }
                    }
                });
            });
        });

        ScrollTrigger.refresh();

        return () => {
            mm.revert(); // يقوم بتنظيف كل الـ triggers تلقائياً عند مغادرة الصفحة
        };
    }, [experiences.length]);

    return (
        <div className="experience-container" ref={containerRef}>
            {/* الجزء الأيسر */}
            <div className="experience-left" ref={leftSideRef}>
                <div className="meta-journey">[ MY JOURNEY ]</div>
                <h2 className="main-title" >My Background</h2>
                <p className="left-desc">
                    Building modern web applications and user-focused digital experiences with clean code, responsive design, and scalable solutions across front-end and full-stack development.
                </p>
                
                {/* التايملاين الأفقي السفلي */}
                <div className="timeline-horizontal">
                    <div className="th-labels">
                        <span>FOUNDATIONS</span>
                        <span>TODAY</span>
                    </div>
                    <div className="th-track">
                        <div className="th-line"></div>
                        <div className="th-fill" ref={progressFillRef}></div>
                    </div>
                </div>
            </div>

            {/* الجزء الأيمن المتحرك */}
            <div className="experience-right">
                {experiences.map((exp, index) => (
                    <div 
                        className="exp-wrapper" 
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                    >
                        {/* النقطة الفسفورية الرأسية */}
                        <div className="node-column">
                            <div 
                                className="live-node"
                                ref={el => rightNodesRef.current[index] = el}
                            ></div>
                        </div>

                        {/* محتوى الكارت */}
                        <div className="exp-card">
                            <div className="card-header">
                                <span className="company-name">{exp.company}</span>
                                <span className="separator">·</span>
                                <span className="role-name">{exp.role}</span>
                            </div>
                            <div className="card-sub-header">
                                <span className="tags-text">{exp.tags}</span>
                                <span className="separator">-</span>
                                <span className="period">{exp.period}</span>
                            </div>
                            <h3 className="exp-title">{exp.title}</h3>
                            <p className="exp-desc">{exp.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperiencePage;
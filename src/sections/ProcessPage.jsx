import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProcessPage = () => {
    const sectionRef = useRef(null);
    const trackFillRef = useRef(null);
    const stepsRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const totalSteps = stepsRef.current.length;

        if (!section) return;

        // 1. أنيميشن ظهور فوري ناعم لعناصر الهيدر والـ track عند التحميل
        const revealElements = section.querySelectorAll('.reveal');
        gsap.fromTo(revealElements, 
            { y: 20, opacity: 0 }, 
            {
                y: 0,
                opacity: 1, 
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            }
        );

        // 2. أنيميشن تعبئة الخط ونقاط التتبع بسرعة أبطأ ونعومة أعلى
        const pinTimeline = gsap.to(trackFillRef.current, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: section,         // الاعتماد على السكشن الرئيسي بالكامل كـ Trigger
                start: "top 72%",         // يبدأ التنوير مبكراً فور دخول السكشن الشاشة
                end: "bottom center",     // يمتد على مساحة السكشن كاملة ليكون أبطأ، ويكتمل 100% في منتصف الشاشة
                scrub: 1.5,               // زيادة القيمة هنا (من 0.5 إلى 1.5) بتبطئ حركة الخط وتجعلها انسيابية جداً
                onUpdate: (self) => {
                    const progress = self.progress;
                    
                    stepsRef.current.forEach((step, index) => {
                        if (step) {
                            const stepTrigger = index / (totalSteps - 1);
                            if (progress >= stepTrigger && progress > 0) {
                                step.classList.add("done");
                            } else {
                                step.classList.remove("done");
                            }
                        }
                    });
                }
            }
        });

        // 3. تنظيف وتفريغ الذاكرة عند الخروج من المكون
        return () => {
            pinTimeline.scrollTrigger?.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const stepsData = [
        { num: 1, title: "Discover", desc: "Goals, audience, and product data mapped out." },
        { num: 2, title: "Design", desc: "Wireframes and visual system approved." },
        { num: 3, title: "Build", desc: "Theme, apps, and integrations developed." },
        { num: 4, title: "Launch", desc: "Tested, optimized, and shipped live." }
    ];

    return (
        <div className="process-page-container">
            <section id="process" ref={sectionRef}>
                <div className="section-head reveal">
                    <div className="section-eyebrow">ORDER TRACKING</div>
                    <h2>How a project ships</h2>
                </div>
                
                <div className="track reveal">
                    <div className="track-line"></div>
                    <div className="track-fill" ref={trackFillRef}></div>
                    
                    {stepsData.map((step, index) => (
                        <div 
                            className="track-step" 
                            key={index} 
                            ref={(el) => (stepsRef.current[index] = el)}
                        >
                            <div className="track-node">{step.num}</div>
                            <h4>{step.title}</h4>
                            <p>{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProcessPage;
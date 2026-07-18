import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
const ProcessPage = () => {
    const sectionRef = useRef(null);
    const trackFillRef = useRef(null);
    const stepsRef = useRef([]);

    useEffect(() => {
        // تسجيل الـ plugin جوه الـ effect نفسه، ضمان إنه client-side بس
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const totalSteps = stepsRef.current.length;

        if (!section) return;

        // استخدام gsap.context() لعمل scope للأنيميشن على الكومبوننت ده بس
        const ctx = gsap.context(() => {
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

            gsap.to(trackFillRef.current, {
                width: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top 72%",
                    end: "bottom center",
                    scrub: 1.5,
                    invalidateOnRefresh: true, // يعيد حساب القيم عند الـ refresh
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
        }, sectionRef);

        // إعادة حساب القياسات بعد ما كل حاجة (خطوط/صور) تخلص تحميل
        const handleLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", handleLoad);

        // تأخير بسيط كمان كـ fallback لو فيه أنيميشنز/خطوط بتتحمل بعد الـ load event
        const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
            ctx.revert(); // بيمسح بس اللي اتعمله جوه الكومبوننت ده
            window.removeEventListener("load", handleLoad);
            clearTimeout(refreshTimeout);
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
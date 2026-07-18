import { useEffect, useRef } from 'react';

const ProcessPage = () => {
    const sectionRef = useRef(null);
    const trackFillRef = useRef(null);
    const stepsRef = useRef([]);
    const rafRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const totalSteps = stepsRef.current.length;
        if (!section) return;

        // 1. ظهور ناعم للهيدر والـ track عند التحميل (وقتي، مش مربوط بسكرول)
        const revealElements = section.querySelectorAll('.reveal');
        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                setTimeout(() => {
                    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, i * 150);
            });
        });

        // 2. حلقة قراءة الموضع الحقيقي للعنصر على الشاشة في كل فريم
        //    getBoundingClientRect() بيرجع الموضع البصري الفعلي حتى لو Lenis
        //    بيحرك المحتوى بـ transform بدل ما يحرك السكرول الحقيقي للمتصفح
        const updateProgress = () => {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // نفس منطق start: "top 72%" و end: "bottom center" بتاعت GSAP
            const startPoint = viewportHeight * 0.72;
            const endPoint = viewportHeight * 0.5;
            const sectionHeight = rect.height;

            // المسافة اللي هيقطعها الـ top بتاع السكشن من نقطة البداية لنقطة النهاية
            const totalDistance = startPoint - endPoint + sectionHeight;
            const distanceTravelled = startPoint - rect.top;

            let progress = distanceTravelled / totalDistance;
            progress = Math.max(0, Math.min(1, progress));

            if (trackFillRef.current) {
                trackFillRef.current.style.width = `${progress * 100}%`;
            }

            stepsRef.current.forEach((step, index) => {
                if (step) {
                    const stepTrigger = index / (totalSteps - 1);
                    if (progress >= stepTrigger && progress > 0) {
                        step.classList.add('done');
                    } else {
                        step.classList.remove('done');
                    }
                }
            });

            rafRef.current = requestAnimationFrame(updateProgress);
        };

        rafRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
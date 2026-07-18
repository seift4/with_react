import { useEffect, useRef, useState } from 'react';

/**
 * ScrollSections
 * -----------------
 * فكرة الكومبوننت:
 * - المستخدم بيعمل سكرول عادي لفوق وتحت (زي أي صفحة عادية).
 * - بس بصريًا، السكشن التاني بيدخل من اليمين بحركة أفقية (زي إنه واقف جنب
 *   السكشن الأول)، مش نازل من تحت.
 * - كل سكشن له نفس تأثير البارالاكس اللي كان موجود في ScrollP الأصلي
 *   (الصور بتتحرك من مركز الشاشة لمكانها النهائي مع scale + fade).
 *
 * إزاي بيشتغل:
 * الحاوية الكبيرة (wrapper) بيبقى ارتفاعها = (عدد السكاشن * 100vh) +
 * ((عدد السكاشن - 1) * 100vh) للانتقالات بين السكاشن.
 * يعني لكل سكشن: مرحلة "reveal" (الصور بتتجمع) بطول 100vh،
 * وبينهم مرحلة "transition" بطول 100vh (السلايد الأفقي).
 *
 * جوه الـ wrapper في عنصر sticky بياخد الشاشة كلها (100vh) وبيفضل ثابت،
 * وجواه "track" بعرض (عدد السكاشن * 100vw) بيتحرك أفقيًا (translateX)
 * حسب نسبة تقدم مرحلة الـ transition الحالية.
 */

// ------------------------------------------------------------------
// بيانات السكاشن - غيّر النصوص والصور والألوان زي ما تحب
// ------------------------------------------------------------------
const sectionsData = [
    {
        id: 'section-shopify',
        bgColor: '#0D0D0D',
        title: (
            <>
                Build Your Brand With <span>Shopify</span>
            </>
        ),
        text: 'I build professional Shopify e-commerce stores with a strong focus on performance, user experience, and conversion.',
        images: [
            '/img/scroll_1.jpeg',
            '/img/scroll_2.jpeg',
            '/img/scroll_3.jpeg',
            '/img/scroll_4.jpeg',
        ],
        desktopConfig: [
            { x: -360, y: -120, start: 0.00, end: 0.7 },
            { x: 400, y: -100, start: 0.22, end: 0.7 },
            { x: -260, y: 160, start: 0.44, end: 0.7 },
            { x: 280, y: 150, start: 0.66, end: 0.7 },
        ],
        mobileConfig: [
            { x: -100, y: -180, start: 0.00, end: 0.7 },
            { x: 100, y: -180, start: 0.22, end: 0.7 },
            { x: -100, y: 220, start: 0.44, end: 0.7 },
            { x: 100, y: 220, start: 0.66, end: 0.7 },
        ],
    },
    {
        id: 'section-wordpress',
        bgColor: '#0B0C10',
        title: (
            <>
                Build Your Business With <span>WordPress</span>
            </>
        ),
        text: 'I design and develop fast, SEO-friendly WordPress websites tailored to your brand and business goals.',
        images: [
            '/img/scroll_5.jpeg',
            '/img/scroll_6.jpeg',
            '/img/scroll_7.jpeg',
            '/img/scroll_8.jpeg',
        ],
        desktopConfig: [
            { x: -360, y: -120, start: 0.00, end: 0.7 },
            { x: 400, y: -100, start: 0.22, end: 0.7 },
            { x: -260, y: 160, start: 0.44, end: 0.7 },
            { x: 280, y: 150, start: 0.66, end: 0.7 },
        ],
        mobileConfig: [
            { x: -100, y: -180, start: 0.00, end: 0.7 },
            { x: 100, y: -180, start: 0.22, end: 0.7 },
            { x: -100, y: 220, start: 0.44, end: 0.7 },
            { x: 100, y: 220, start: 0.66, end: 0.7 },
        ],
    },
];

// كبّر الرقم ده لو عايز الصور تاخد سكرول أكتر عشان تتجمع/تظهر (يعني تحس إنها أبطأ)
// وصغّره (أقل من 1) لو عايزها تظهر أسرع. 1 = القيمة الأصلية (100vh لكل سكشن)
const REVEAL_SPEED_FACTOR = 3;

// كبّر الرقم ده لو عايز الانتقال الأفقي بين السكاشن يبقى أبطأ (يحتاج سكرول أكتر)
// وصغّره (أقل من 1) لو عايزه أسرع. 1 = نفس سرعة ظهور الصور (100vh لكل انتقال)
const TRANSITION_SPEED_FACTOR = 3 ;

const ScrollSections = () => {
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);
    // مصفوفة فيها refs لكل صور كل سكشن -> imagesRef.current[sectionIndex][imageIndex]
    const imagesRef = useRef(sectionsData.map(() => []));
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        let ticking = false;
        const numSections = sectionsData.length;

        const applySectionTransform = (sectionIndex, localProgress) => {
            const config = isMobile
                ? sectionsData[sectionIndex].mobileConfig
                : sectionsData[sectionIndex].desktopConfig;

            imagesRef.current[sectionIndex].forEach((wrapper, i) => {
                if (!wrapper) return;
                const cfg = config[i];
                const duration = cfg.end - cfg.start;

                const p = Math.min(
                    Math.max((localProgress - cfg.start) / duration, 0),
                    1
                );
                const eased = 1 - Math.pow(1 - p, 3);

                const tx = cfg.x * eased;
                const ty = cfg.y * eased;
                const scale = 0.3 + 0.7 * eased;

                wrapper.style.transform =
                    `translate(-50%, -50%) translate(${tx}px, ${ty}px) scale(${scale})`;
                wrapper.style.opacity = eased.toString();
            });
        };

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const wrapper = wrapperRef.current;
                const track = trackRef.current;
                if (!wrapper || !track) { ticking = false; return; }

                const viewportH = window.innerHeight;
                const rect = wrapper.getBoundingClientRect();

                // اللي اتعمله سكرول فعليًا جوه الـ wrapper (بالبكسل)
                const scrolledPx = Math.min(
                    Math.max(-rect.top, 0),
                    wrapper.offsetHeight - viewportH
                );

                // طول كل مرحلة reveal = ارتفاع الشاشة * معامل سرعة الظهور
                const revealLen = viewportH * REVEAL_SPEED_FACTOR;
                // طول مرحلة الـ transition (السلايد الأفقي) = ارتفاع الشاشة * معامل السرعة
                const transitionLen = viewportH * TRANSITION_SPEED_FACTOR;
                const cycleLen = revealLen + transitionLen; // طول reveal + transition لكل سكشن (ما عدا الأخير)

                let horizontalProgress = 0; // من 0 لحد (numSections - 1)

                for (let i = 0; i < numSections; i++) {
                    const revealStart = i * cycleLen;
                    const revealEnd = revealStart + revealLen;

                    // مرحلة تجمّع صور السكشن الحالي
                    const localReveal = Math.min(
                        Math.max((scrolledPx - revealStart) / revealLen, 0),
                        1
                    );
                    applySectionTransform(i, localReveal);

                    // مرحلة الانتقال الأفقي بعد السكشن ده (لو مش آخر واحد)
                    if (i < numSections - 1) {
                        const t = Math.min(
                            Math.max((scrolledPx - revealEnd) / transitionLen, 0),
                            1
                        );
                        horizontalProgress += t;
                    }
                }

                track.style.transform = `translateX(-${horizontalProgress * 100}vw)`;

                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

    const numSections = sectionsData.length;
    // ارتفاع الـ wrapper: reveal لكل سكشن (100vh * REVEAL_SPEED_FACTOR) +
    // transition بين كل سكشن والي بعده (100vh * TRANSITION_SPEED_FACTOR) +
    // 100vh إضافية لأن العنصر sticky نفسه بياخد 100vh من غير ما "يستهلك" سكرول
    // (المساحة اللي فعليًا بنقدر نسكرول فيها = wrapper.offsetHeight - 100vh)
    const wrapperHeightVh =
        numSections * 100 * REVEAL_SPEED_FACTOR +
        (numSections - 1) * 100 * TRANSITION_SPEED_FACTOR +
        100;

    return (
        <div
            className="scroll-sections-space"
            ref={wrapperRef}
            style={{ height: `${wrapperHeightVh}vh`, position: 'relative' }}
        >
            <div className="scroll-sections-sticky">
                <div className="scroll-sections-track" ref={trackRef}>
                    {sectionsData.map((section, sIndex) => (
                        <div
                            className="horizontal-container"
                            key={section.id}
                            id={section.id}
                            style={{ backgroundColor: section.bgColor }}
                        >
                            <div className="scroll-item"></div>

                            <div className="center-text-box">
                                <h1>{section.title}</h1>
                                <p>{section.text}</p>
                            </div>

                            {section.images.map((src, i) => (
                                <div
                                    key={`${section.id}-img${i + 1}`}
                                    id={`${section.id}-img${i + 1}`}
                                    ref={(el) => (imagesRef.current[sIndex][i] = el)}
                                    className={`scroll-image-wrapper img-${i + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={`${section.id} ${i + 1}`}
                                        className="scroll-image"
                                    />
                                    <div className="glass-overlay"></div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollSections;
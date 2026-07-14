import { useEffect, useRef, useState, useCallback } from 'react';

const SKILLS = [
    { name: 'HTML', icon: 'devicon-html5-plain', color: '#e34f26' },
    { name: 'CSS', icon: 'devicon-css3-plain', color: '#2496ed' },
    { name: 'J.S', icon: 'devicon-javascript-plain', color: '#e8d44d' },
    { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', color: '#9b7fd4' },
    { name: 'React', icon: 'devicon-react-plain fa-flip-both', color: '#61dafb' },
    { name: 'Git', icon: 'devicon-git-plain', color: '#f05032' },
    { name: 'GitHub', icon: 'devicon-github-plain', color: '#c9a15c' },
    { name: 'C++', icon: 'devicon-cplusplus-plain', color: '#5f9fd1' },
    { name: 'Tailwind', icon: 'devicon-tailwindcss-plain', color: '#38b2ac' },
];

const EYEBROW = 'BUILDING AT THE CROSSPATHS OF FRONTEND — BACKEND — AI.';
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________';

/** Decodes a line of text character-by-character, like a terminal locking onto a signal. */
function useScramble(text, { trigger, speed = 28 } = {}) {
    const [output, setOutput] = useState('');
    const frame = useRef(0);
    const rafId = useRef(null);
    const queue = useRef([]);

    useEffect(() => {
        if (!trigger) return;

        queue.current = text.split('').map((ch, i) => ({
            from: '',
            to: ch,
            start: Math.floor(i * 1.1),
            end: Math.floor(i * 1.1) + speed / 2,
        }));
        frame.current = 0;
        cancelAnimationFrame(rafId.current);

        const tick = () => {
            let complete = 0;
            let result = '';

            for (const q of queue.current) {
                if (frame.current >= q.end) {
                    complete++;
                    result += q.to;
                } else if (frame.current >= q.start) {
                    if (q.to === ' ') {
                        result += ' ';
                    } else {
                        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    }
                } else {
                    result += '';
                }
            }

            setOutput(result);

            if (complete === queue.current.length) {
                cancelAnimationFrame(rafId.current);
                return;
            }
            frame.current++;
            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, text]);

    return output;
}

const About = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const badgeRef = useRef(null);
    const [eyebrowTriggered, setEyebrowTriggered] = useState(false);

    const eyebrowText = useScramble(EYEBROW, { trigger: eyebrowTriggered, speed: 22 });

    // --- Reveal on scroll (IntersectionObserver, staggered) ---
    useEffect(() => {
        const els = sectionRef.current.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const delay = Number(el.dataset.revealDelay || 0);
                        setTimeout(() => el.classList.add('active'), delay);
                        if (el.dataset.eyebrow) setEyebrowTriggered(true);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold: 0.15 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // --- Cursor spotlight glow across the whole section ---
    useEffect(() => {
        const section = sectionRef.current;
        const handleMove = (e) => {
            const rect = section.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            section.style.setProperty('--spot-x', `${x}%`);
            section.style.setProperty('--spot-y', `${y}%`);
        };
        section.addEventListener('mousemove', handleMove);
        return () => section.removeEventListener('mousemove', handleMove);
    }, []);



    // --- Magnetic badge ---
    const handleBadgeMove = useCallback((e) => {
        const el = badgeRef.current;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    }, []);
    const handleBadgeLeave = useCallback(() => {
        badgeRef.current.style.transform = 'translate(0px, 0px)';
    }, []);

    // --- Marquee: duplicate content once for a seamless loop, animate with rAF ---
    useEffect(() => {
        const track = marqueeRef.current;
        if (!track) return;
        track.innerHTML += track.innerHTML;

        let x = 0;
        let raf;
        let paused = false;
        const speed = 0.45;

        const step = () => {
            if (!paused) {
                x -= speed;
                if (Math.abs(x) >= track.scrollWidth / 2) x = 0;
                track.style.transform = `translateX(${x}px)`;
            }
            raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);

        const pause = () => (paused = true);
        const resume = () => (paused = false);
        track.parentElement.addEventListener('mouseenter', pause);
        track.parentElement.addEventListener('mouseleave', resume);

        return () => {
            cancelAnimationFrame(raf);
            track.parentElement.removeEventListener('mouseenter', pause);
            track.parentElement.removeEventListener('mouseleave', resume);
        };
    }, []);

    return (
        <section className="about-section" ref={sectionRef}>
            <div className="about-spotlight" aria-hidden="true" />

            <div className="about-grid">
                <h1 className="about-title reveal" data-reveal-delay="0">
                    About
                </h1>

                <div className="about-copy">
                    <p className="about-bio reveal" data-reveal-delay="80">
                        <span className="about-name">Seif</span>
                        <span className="about-pronoun">(he/him)</span> is a full-stack
                        developer and designer with a passion for art and technology. He
                        designs in Figma and Framer and builds with code — crafting clean,
                        premium, one-of-a-kind digital experiences end to end. Available
                        worldwide and ready to take on any challenge.
                    </p>

                    <p
                        className="about-eyebrow reveal"
                        data-reveal-delay="160"
                        data-eyebrow="true"
                    >
                        {eyebrowText || '\u00A0'}
                        <span className="about-cursor">▌</span>
                    </p>

                    <div
                        className="about-badge reveal"
                        data-reveal-delay="220"
                        ref={badgeRef}
                        onMouseMove={handleBadgeMove}
                        onMouseLeave={handleBadgeLeave}
                    >
                        <span className="about-badge-icon">
                            <i className="devicon-react-plain" />
                        </span>
                        <span className="about-badge-text">
                            <strong>Full-Stack Developer &amp; Designer</strong>
                            <em>Freelance</em>
                        </span>
                        <span className="about-badge-dot" />
                    </div>
                </div>

                <div className="about-marquee reveal" data-reveal-delay="320">
                    <div className="about-marquee-fade about-marquee-fade--left" />
                    <div className="about-marquee-fade about-marquee-fade--right" />
                    <div className="about-marquee-track" ref={marqueeRef}>
                        {SKILLS.map((skill, index) => (
                            <div
                                key={index}
                                className="about-skill"
                                style={{ '--item-color': skill.color }}
                            >
                                <i className={`${skill.icon} fa-2xl`}></i>
                                <p>{skill.name}</p>
                            </div>
                        ))}
                        
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default About;
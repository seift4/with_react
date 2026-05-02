import { useEffect, useRef } from 'react';
const AboutMe = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleReveal = () => {
            if (!sectionRef.current) return;
            const reveals = sectionRef.current.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 150) {
                    el.classList.add('active');
                }
            });
        };

        // تشغيل الـ Reveal عند السكرول
        window.addEventListener('scroll', handleReveal);
        handleReveal(); // تشغيل أولي

        return () => window.removeEventListener('scroll', handleReveal);
    }, []);

    return (
        <section className="seif-section" ref={sectionRef}>
                    <video 
        src='/img/bg3.mp4'
            autoPlay 
            loop 
            muted 
            playsInline 
            className="background-2"
        >
        </video>
            <div className="content" id="about">
                <div className="coder sec3">
                    <h1 className="reveal">About Me</h1>
                    <ul className="reveal">
                        <li>Name: Seif Tarek</li>
                        <li>20 years old.</li>
                        <li>Egyptian nationality.</li>
                        <li>Student at the Faculty of Computers and Artificial Intelligence Cairo university.</li>
                        <li>Currently in the 2nd semester.</li>
                        <li>Started in 2024 and expected to graduate in 2028.</li>
                        <li>Received a scholarship from NTI - National Telecommunication Institute.</li>
                        <li>Specialized in Web Design through the scholarship.</li>
                    </ul>
                </div>

                {/* كارت الصورة الشخصية (Flip Card) */}
                <div className="seif" id="seif">
                    <div className="card-inner">
                        <div className="front">
                            <img src="/img/Smiling.png" alt="Seif Tarek" />
                        </div>
                        <div className="back">
                            <h2 className="reveal">FRONTEND DEVELOPER</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
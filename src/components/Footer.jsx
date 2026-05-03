import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        // 1. منطق الساعة (Update every second)
        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: 'Africa/Cairo',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
            setTime(timeString);
        };

        const timerId = setInterval(updateClock, 1000);
        updateClock(); // تشغيل فوري أول ما السكشن يحمل

        // 2. منطق الـ Reveal Animation (بسيط وسريع)
        const handleReveal = () => {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach((el) => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 50) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleReveal);
        handleReveal(); // تشغيل عند التحميل

        return () => {
            clearInterval(timerId);
            window.removeEventListener('scroll', handleReveal);
        };
    }, []);

    return (
        <section className="foter" id="footer">
            <p className="p2 reveal">
                Let’s build and ship something remarkable. Open to agency collaborations, freelance work, and fully remote full-time opportunities.
            </p>
            
            <div className="contact">
                {/* تأكد من مسار اللوجو في فولدر public/img */}
                <img 
                    className="logoo" 
                    src="/img/Asset 4@2x-8.png" 
                    alt="Logo" 
                />
                
                <div className="c reveal">
                    <a className="a" href="mailto:seift4685@gmail.com">seift4685@gmail.com</a>
                    <a className="a" href="https://www.linkedin.com/in/seiftarekismail?utm_source=share_via&utm_content=profile&utm_medium=member_android" rel="noreferrer">LINKED IN</a>
                    <a className="a" href="https://www.instagram.com/seif.tarek26?igsh=NDQwMDB2MjhzeTFk"  rel="noreferrer">INSTAGRAM</a>
                    <a className="a" href="https://www.facebook.com/share/17PBMESMhB/"  rel="noreferrer">FACEBOOK</a>
                    <a className="a" href="https://wa.me/qr/CNAWOHFP7PW6O1"  rel="noreferrer">WHATSAPP</a>
                </div>

                <div className="c reveal">
                    <a className="a" href="#home">BACK TO TOP</a>
                    <a className="a" href="#about">ABOUT</a>
                    <a className="a" href="#work">PROJECTS</a>
                </div>

                <div className="c reveal">
                    <a className="a">Designed by SEIF TAREK</a>
                    <div className="clock">
                        <span className="label">Egypt -</span>
                        <span id="time">{time}</span>
                    </div>
                </div>
            </div>

            <h1 className="name pr">SEIF TAREK</h1>
        </section>
    );
};

export default Footer;
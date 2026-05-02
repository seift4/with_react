import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const interval = setInterval(() => {
            start += Math.floor(Math.random() * 5) + 2; 
            if (start >= 100) {
                start = 100;
                clearInterval(interval);
                runFinalAnimation();
            }
            setCount(start);
        }, 100);

        const runFinalAnimation = () => {
            const tl = gsap.timeline({
                onComplete: () => onComplete() 
            });

            // 1. اختفاء العداد
            tl.to(".counter", { 
                opacity: 0, 
                duration: 0.4 
            })
            
            // 2. ظهور الاسم (set بتخلي الكلمة تظهر فجأة قبل ما تبدأ تتحرك)
            .set(".loader-text h1", { visibility: "visible" }) 
            .from(".loader-text h1", { 
                y: 150, 
                skewY: 7, 
                duration: 1.2, 
                ease: "power4.out",
                delay: 0.5 // الـ Delay اللي طلبته عشان تظهر متأخر بعد العداد
            })

            // 3. رفع الستارة
            .to(".preloader-bg", { 
                y: "-100%", 
                duration: 1.5, 
                ease: "expo.inOut", 
                delay: 1 
            });
        };

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="preloader-bg" style={loaderStyle}>
            <div className="counter" style={counterStyle}>{count}</div>
            <div className="loader-text" style={textWrapperStyle}>
                {/* لاحظ إضافة visibility: hidden هنا */}
                <h1 style={{ ...h1Style, visibility: "hidden" }}>SEIF TAREK</h1>
            </div>
        </div>
    );
};

// Styles
const loaderStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: '#e1ff8e ', color: '#000000 ', zIndex: 1000000000000000000,
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
};
const counterStyle = { position: 'absolute', bottom: '10%', right: '10%', fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 'bold' };
const textWrapperStyle = { overflow: 'hidden' };
const h1Style = { fontSize: '10vw', fontWeight: '900', margin: 0, lineHeight: 1 };

export default Preloader;
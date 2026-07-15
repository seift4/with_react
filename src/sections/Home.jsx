import { useEffect, useRef, useState } from 'react';
import Preloader from './Preloader'; // تأكد من المسار

const Home = () => {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);
    const homeRef = useRef(null);
    const sharpBgRef = useRef(null);

    useEffect(() => {
        if (loading) return; // متعملش حاجة طول ما إحنا بنحمل

        const handleScroll = () => {
            const video = videoRef.current;
            if (!video) return;

            const scrollValue = window.scrollY;
            const winWidth = window.innerWidth;
            const isMobile = winWidth < 768;

            const startWidthVW = isMobile ? 80 : (400 / winWidth) * 100; 
            const startHeightVH = isMobile ? 20 : 30;

            if (scrollValue > 50) { 
                if (!video.classList.contains('img-fixed')) {
                    video.classList.add('img-fixed');
                    document.body.style.overflowX = 'hidden'; 
                }
                
                let newWidthVW = startWidthVW + (scrollValue * 0.15); 
                let newHeightVH = startHeightVH + (scrollValue * 0.1); 

                const maxWidthVW = 97;
                const maxHeightVH = 90;

                if (newWidthVW > maxWidthVW) newWidthVW = maxWidthVW;
                if (newHeightVH > maxHeightVH) newHeightVH = maxHeightVH;

                video.style.width = newWidthVW + 'vw';
                video.style.height = newHeightVH + 'vh';
            } else {
                video.classList.remove('img-fixed');
                video.style.width = startWidthVW + 'vw';
                video.style.height = startHeightVH + 'vh';
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    // تتبع حركة الماوس عشان تأثير الـ blur
    useEffect(() => {
        if (loading) return;

        const homeEl = homeRef.current;
        if (!homeEl) return;

        const handleMouseMove = (e) => {
            const rect = homeEl.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (sharpBgRef.current) {
                sharpBgRef.current.style.setProperty('--x', `${x}px`);
                sharpBgRef.current.style.setProperty('--y', `${y}px`);
            }
        };

        homeEl.addEventListener('mousemove', handleMouseMove);

        return () => homeEl.removeEventListener('mousemove', handleMouseMove);
    }, [loading]);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            
            <section className="home" id="home" ref={homeRef} style={{ visibility: loading ? 'hidden' : 'visible' }}>
                <div className="home__bg home__bg--blur"></div>
                <div className="home__bg home__bg--sharp" ref={sharpBgRef}></div>

                <div className="text">
                    <div className="top pr">
                        <h1>HELLO!</h1>
                        <p>I’m Seif Tarek, a web developer and engineer. Welcome to my portfolio!</p>
                    </div>
                    <div className="bottom">
                        <p className='creative-text'>Creative</p>
                        <div className="img-container">
                            <video ref={videoRef} id="myModel" loop muted autoPlay playsInline>
                                <source src="/img/coding.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <p className='creative-text'>dev</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
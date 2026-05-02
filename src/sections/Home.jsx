import { useEffect, useRef, useState } from 'react';
import Preloader from './Preloader'; // تأكد من المسار

const Home = () => {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

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
    }, [loading]); // الـ Effect ده هيشتغل أول ما الـ loading يبقى false

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            
            <section className="home" id="home" style={{ visibility: loading ? 'hidden' : 'visible' }}>
              
                <div className="text">
                    <div className="top pr">
                        <h1>HELLO!</h1>
                        <p>I’m Seif Tarek, a web developer and engineer. Welcome to my portfolio!</p>
                    </div>
                    <div className="bottom">
                        <p>Creative</p>
                        <div className="img-container">
                            <video ref={videoRef} id="myModel" loop muted autoPlay playsInline>
                                <source src="/img/Vibe.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <p>dev</p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
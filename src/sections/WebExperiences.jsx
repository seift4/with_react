import { useEffect, useRef } from 'react';

const WebExperiences = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const modelRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;

        // 1. Reveal Animation Logic
        const handleReveal = () => {
            const reveals = section.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 150) {
                    el.classList.add('active');
                }
            });
        };

        // 2. 3D Model Gradient Texture Logic
        const applyGradient = async () => {
            const modelViewer = modelRef.current;
            if (!modelViewer) return;

            modelViewer.addEventListener('load', async () => {
                const material = modelViewer.model.materials[0];
                if (!material) return;

                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');

                const gradient = ctx.createLinearGradient(0, 0, 0, 512);
                gradient.addColorStop(0, '#0059ff72');
                gradient.addColorStop(0.3, '#54b7f59a');
                gradient.addColorStop(0.6, '#d6e6f2af');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 512);

                try {
                    const texture = await modelViewer.createTexture(canvas.toDataURL("image/png"));
                    const pbr = material.pbrMetallicRoughness;
                    
                    if (pbr.baseColorTexture) {
                        pbr.baseColorTexture.setTexture(texture);
                    } else {
                        await pbr.baseColorTexture.setTexture(texture);
                    }
                    pbr.setBaseColorFactor([1, 1, 1, 1]);
                    material.setAlphaMode("BLEND");
                } catch (error) {
                    console.error("Error applying gradient:", error);
                }
            });
        };
// 3. Gallery Marquee Logic
const marqueeTrack = marqueeRef.current;
let animationFrameId;
let scrollX = 0;

if (marqueeTrack) {
    // منع تكرار الدوبليكيت كل مرة يعمل فيها rerender
    if (!marqueeTrack.dataset.cloned) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
        marqueeTrack.dataset.cloned = "true";
    }

    const speed = 0.7;

    const animate = () => {
        scrollX -= speed;

        // لما يوصل لنص المحتوى يرجع للبداية بسلاسة
        if (Math.abs(scrollX) >= marqueeTrack.scrollWidth / 2) {
            scrollX = 0;
        }

        marqueeTrack.style.transform = `translate3d(${scrollX}px, 0, 0)`;

        animationFrameId = requestAnimationFrame(animate);
    };

    animate();
}

window.addEventListener('scroll', handleReveal);
handleReveal();
applyGradient();

        return () => {
            window.removeEventListener('scroll', handleReveal);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const galleryImages = [
        "/img/mav1.png", "/img/planets.png", "/img/res1.png", 
        "/img/av1.png", "/img/mav6.png"
    ];

    return (
        <section className="work-section" ref={sectionRef}>
            <div className="content2">
                <div className="coder2">
                    <h1 className="reveal">Web Experiences</h1>
                    <ul className="ul2 reveal">
                        <li>I’m currently working with Mavero, where I developed and built their official website.</li>
                        <li>I’ve also worked on multiple web projects, gaining hands-on experience in creating responsive, modern, and user-focused websites.</li>
                        <li>Through these experiences, I’ve improved my ability to turn ideas into real, functional products while maintaining clean code and strong visual design.</li>
                    </ul>
                </div>

                <model-viewer 
                    ref={modelRef}
                    className="parallax-media2" 
                    id="Model" 
                    src="/3D/22222.gltf" 
                    alt="A 3D model" 
                    auto-rotate 
                    environment-image="neutral" 
                    exposure="1" 
                    ar 
                />

                <div className="imgs gallary">
                    <div className="marquee-track1" ref={marqueeRef}>
                        {galleryImages.map((src, idx) => (
                            <div className="imag" key={idx}>
                                <img src={src} alt={`Project ${idx}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebExperiences;
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [cursorClass, setCursorClass] = useState("");

    useEffect(() => {
        const cursor = cursorRef.current;

        const moveCursor = (e) => {
            if (cursor) {
                cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
            }
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            // تأثير التكبير العام
            if (
                target.closest(
                    'button, .a, li, h1, h2, span, img, p, .dv, video, .nav-link'
                )
            ) {
                setCursorClass("cursor-active");
            }

            // صورة سيف
            if (target.closest('#seif')) {
                setCursorClass("cursor-photo");
                return;
            }

            // فيديو الموديل
            if (target.closest('#Model')) {
                setCursorClass("cursor-video");
                return;
            }

            // مشاريع r1-r7
            const projectRow = target.closest(
                '.r1, .r2, .r3, .r4, .r5, .r6, .r7, .r8, .r9'
            );

            if (projectRow) {
                const cls = Array.from(projectRow.classList).find((c) =>
                    ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9' ].includes(c)
                );

                if (cls) {
                    setCursorClass(`cursor-${cls}`);
                }
            }
        };

        const handleMouseOut = () => {
            setCursorClass("");
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <div ref={cursorRef} className={`cursor-dot ${cursorClass}`}>
            <video className="v1" src="/img/Mavero.mp4" autoPlay loop muted playsInline />
            <video className="v2" src="/img/Avatar.mp4" autoPlay loop muted playsInline />
            <video className="v3" src="/img/Resturant.mp4" autoPlay loop muted playsInline />
            <video className="v4" src="/img/planets.mp4" autoPlay loop muted playsInline />
            <video className="v5" src="/img/PORT.mp4" autoPlay loop muted playsInline />
            <video className="v6" src="/img/gpa.mp4" autoPlay loop muted playsInline />
            <video className="v7" src="/img/book.mp4" autoPlay loop muted playsInline />
            <video className="v8" src="/img/beauty.mp4" autoPlay loop muted playsInline />
            <video className="v9" src="/img/Boukak.mp4" autoPlay loop muted playsInline />
        </div>
    );
};

export default CustomCursor;
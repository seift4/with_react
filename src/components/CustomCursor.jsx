import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [cursorClass, setCursorClass] = useState("");

    useEffect(() => {
        const cursor = cursorRef.current;

        // 1. حركة الماوس
        const moveCursor = (e) => {
            if (cursor) {
                cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
            }
        };

        // 2. الـ Hover Logic (Event Delegation)
        // بنراقب الصفحة كلها وبنشوف العنصر اللي الماوس عليه واخد class إيه
        const handleMouseOver = (e) => {
            const target = e.target;

            // التأثير العام (تكبير الماوس)
            if (target.closest('button, .a, li, h1, h2, span, img, p, .dv, video, .nav-link')) {
                setCursorClass("cursor-active");
            }

            // تأثير الصورة (سكشن سيف)
            if (target.closest('#seif')) {
                setCursorClass("cursor-photo");
            }

            // تأثير فيديو الموديل
            if (target.closest('#Model')) {
                setCursorClass("cursor-video");
            }

            // تأثير فيديوهات المشاريع (r1, r2, r3, r4, r5)
            const projectRow = target.closest('.r1, .r2, .r3, .r4, .r5');
            if (projectRow) {
                const cls = Array.from(projectRow.classList).find(c => ['r1', 'r2', 'r3', 'r4', 'r5'].includes(c));
                setCursorClass(`cursor-${cls}`);
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
            <video className="v1" src="/img/Mavero.mp4" autoPlay loop muted playsInline></video>
            <video className="v2" src="/img/Avatar.mp4" autoPlay loop muted playsInline></video>
            <video className="v3" src="/img/Resturant.mp4" autoPlay loop muted playsInline></video>
            <video className="v4" src="/img/planets.mp4" autoPlay loop muted playsInline></video>
            <video className="v5" src="/img/PORT.mp4" autoPlay loop muted playsInline></video>
        </div>
    );
};

export default CustomCursor;
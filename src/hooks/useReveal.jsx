import { useEffect } from 'react';

export default function useReveal(threshold = 0.15) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll('.reveal:not(.active)');
      elements.forEach((el) => observer.observe(el));
    };

    // راقب أي تغييرات في الـ DOM (زي ظهور محتوى بعد الـ Loader)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // وأيضًا نفذها فورًا لأي عناصر موجودة بالفعل
    observeAll();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold]);
}
import { useEffect } from 'react';

/**
 * Custom Hook for Scroll Reveal Animation
 * @description Uses IntersectionObserver to trigger animations when elements enter the viewport.
 */
const useReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

export default useReveal;

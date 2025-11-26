
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll = ({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    let x = 0, y = 0;
    if (direction === 'up') y = 50;
    if (direction === 'down') y = -50;
    if (direction === 'left') x = 50;
    if (direction === 'right') x = -50;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { 
          opacity: 0, 
          x: x, 
          y: y 
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: delay / 1000, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%", 
            toggleActions: "play none none reverse" 
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default RevealOnScroll;
import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      
      const moveCursor = (e) => {
        const { clientX, clientY } = e;
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
        if (followerRef.current) {
          followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      };

      const handleMouseOver = (e) => {
        if (
          e.target.tagName === 'A' || 
          e.target.tagName === 'BUTTON' || 
          e.target.closest('a') || 
          e.target.closest('button') ||
          e.target.classList.contains('cursor-pointer')
        ) {
          cursorRef.current?.classList.add('is-hovering');
          followerRef.current?.classList.add('is-hovering');
        } else {
          cursorRef.current?.classList.remove('is-hovering');
          followerRef.current?.classList.remove('is-hovering');
        }
      };

      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        window.removeEventListener('mouseover', handleMouseOver);
      };
    }
  }, []);
  if (typeof navigator !== 'undefined' && typeof window !== 'undefined' && window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  );
};

export default Cursor;
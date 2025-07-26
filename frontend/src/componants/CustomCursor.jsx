import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;
    
    const onMouseMove = (e) => {
      // Set position with GSAP for smooth animation
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    // Check for interactive elements
    const onMouseOver = (e) => {
      const target = e.target;
      
      // Check if hovering over interactive elements
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      }
    };
    
    const onMouseOut = () => {
      setIsHovering(false);
    };
    
    const onMouseDown = () => {
      setIsClicking(true);
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  // Apply different styles based on state
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;
    
    if (isHovering) {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: '#FFFF00',
        mixBlendMode: 'difference',
        duration: 0.3
      });
      
      gsap.to(follower, {
        scale: 3,
        opacity: 0.2,
        duration: 0.3
      });
    } else {
      gsap.to(cursor, {
        scale: isClicking ? 0.8 : 1,
        backgroundColor: isClicking ? '#FFFF00' : '#FFFFFF',
        mixBlendMode: 'difference',
        duration: 0.3
      });
      
      gsap.to(follower, {
        scale: isClicking ? 0.8 : 1,
        opacity: 0.5,
        duration: 0.3
      });
    }
  }, [isHovering, isClicking]);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed w-5 h-5 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      <div 
        ref={followerRef} 
        className="fixed w-10 h-10 rounded-full bg-white/50 pointer-events-none z-40 mix-blend-difference"
        style={{
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  );
};

export default CustomCursor;
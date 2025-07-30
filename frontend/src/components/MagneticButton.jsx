import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, className, onClick, strength = 50 }) => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    
    if (!button || !text) return;
    
    let bounds;
    
    const handleMouseMove = (e) => {
      // Get button dimensions and position
      bounds = button.getBoundingClientRect();
      
      // Calculate the center of the button
      const buttonCenterX = bounds.left + bounds.width / 2;
      const buttonCenterY = bounds.top + bounds.height / 2;
      
      // Calculate the distance between mouse and button center
      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;
      
      // Calculate the magnetic pull (stronger when closer to center)
      const magneticPullX = distanceX / strength;
      const magneticPullY = distanceY / strength;
      
      // Apply the magnetic effect to the button
      gsap.to(button, {
        x: magneticPullX,
        y: magneticPullY,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Apply a subtle counter-movement to the text for a 3D effect
      gsap.to(text, {
        x: magneticPullX * 0.3,
        y: magneticPullY * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      // Reset position when mouse leaves
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
      
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };
    
    const handleMouseEnter = () => {
      // Optional: Add an entrance animation
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    // Add event listeners
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mouseenter', handleMouseEnter);
    
    // Cleanup
    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
        button.removeEventListener('mouseleave', handleMouseLeave);
        button.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, [strength]);
  
  return (
    <button 
      ref={buttonRef} 
      className={`relative overflow-hidden interactive ${className}`}
      onClick={onClick}
      style={{ transform: 'translate(0, 0)' }} // Initial transform for GSAP
    >
      <span ref={textRef} className="relative z-10 block">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;

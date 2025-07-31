import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../../animated/SplitText';
import TextPressure from '../../animated/TextPressure';
import MagneticButton from './MagneticButton';
import PixelTransition from '../../animated/PixelTransition';
import seedImage from "../assets/paddy_seed.svg"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Benefits = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  
  // Mouse follower state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const followerRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    if (!followerRef.current) return;
    
    gsap.to(followerRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.8,
      ease: 'power2.out'
    });
  }, [mousePosition]);

  useGSAP(() => {
    // Parallax effect for the image
    gsap.fromTo(imageRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );
    
    // Stats counter animation
    const statElements = statsRef.current.querySelectorAll('.stat-item');
    
    statElements.forEach((stat, index) => {
      const numberElement = stat.querySelector('.stat-number');
      const targetValue = parseInt(numberElement.getAttribute('data-value'), 10);
      
      gsap.fromTo(numberElement,
        { innerText: 0 },
        {
          innerText: targetValue,
          duration: 2,
          delay: index * 0.2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top bottom-=100',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
      
      // Fade in animation for each stat
      gsap.fromTo(stat,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    });
    
    // Content animation
    gsap.fromTo(contentRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // About section animation (add this block)
    const aboutTitle = document.getElementById('about-title');
    const aboutDesc = document.getElementById('about-desc');
    if (aboutTitle && aboutDesc) {
      gsap.fromTo(aboutTitle,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutTitle,
            start: 'top 80%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
      gsap.fromTo(aboutDesc,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutDesc,
            start: 'top 85%',
            end: 'bottom 65%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} id="about" className="min-h-screen bg-gradient-to-b from-green-900 to-black py-20 px-4 relative overflow-hidden">
      {/* We're now using the global CustomCursor component */}
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <TextPressure 
            text="GROW BETTER" 
            className="text-6xl font-bold text-white mb-4"
            textColor="#FFFFFF"
            weight={true}
            width={true}
            italic={false}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the benefits of our revolutionary paddy seeds and transform your agricultural output.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold text-white mb-6">Why Choose Our Paddy Seeds?</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Sustainable Farming</h4>
                  <p className="text-gray-300">Our seeds require less water, fertilizer, and pesticides, making them environmentally friendly and cost-effective.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Higher Profit Margins</h4>
                  <p className="text-gray-300">Increased yield and reduced input costs lead to significantly higher profit margins for farmers.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">Climate Resilience</h4>
                  <p className="text-gray-300">Our seeds are designed to withstand extreme weather conditions, ensuring consistent harvests even in challenging climates.</p>
                </div>
              </div>
            </div>
            
            <MagneticButton 
            onClick={() => window.location.href = 'http://localhost:5173/#buy'} className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all">
              Start Growing Today
            </MagneticButton>
          </div>
          
          <div ref={imageRef} className="order-1 lg:order-2 relative">
            <div className="relative overflow-hidden rounded-xl shadow-2xl">

              
<PixelTransition
  firstContent={
    <img
      src={seedImage}
      alt="default pixel transition content, a seed!"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  }
  secondContent={
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeItems: "center",
        
      }}
    >
      <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Thank you!</p>
    </div>
  }
  gridSize={12}
  pixelColor='#ffffff'
  animationStepDuration={0.4}
  className="custom-pixel-card w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
/>
              {/* <img 
                src="/src/assets/paddy_seed.svg" 
                alt="Paddy Seed" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
               */}
              {/* Stats overlay */}
              <div ref={statsRef} className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-6 grid grid-cols-3 gap-4">
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-yellow-400" data-value="30">0</div>
                  <div className="text-sm text-white">% Higher Yield</div>
                </div>
                
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-yellow-400" data-value="40">0</div>
                  <div className="text-sm text-white">% Less Water</div>
                </div>
                
                <div className="stat-item text-center">
                  <div className="stat-number text-3xl font-bold text-yellow-400" data-value="25">0</div>
                  <div className="text-sm text-white">% More Profit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../../animated/SplitText';
import MagneticButton from './MagneticButton';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, description, icon, index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to card center
    const distanceX = e.clientX - cardCenterX;
    const distanceY = e.clientY - cardCenterY;
    
    // Magnetic effect strength (adjust as needed)
    const strength = 20;
    
    // Calculate new position with magnetic effect
    setPosition({
      x: distanceX / strength,
      y: distanceY / strength
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  useGSAP(() => {
    // Animation for card appearance
    gsap.fromTo(cardRef.current,
      { y: 60, opacity: 0 , x:-30 },
      { 
        y: 0, 
        x: 0,
        opacity: 1, 
        duration: 0.8, 
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          end: 'bottom top+=200',
          toggleActions: 'play reverse play reverse',
          scrub: true,
        }
      }
    );
    // Animate icon
    gsap.fromTo(iconRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.2 + 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          end:'bottom top+=200',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
    // Animate title
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.2 + 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
    // Animate description
    gsap.fromTo(descRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: index * 0.2 + 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-xl transition-all duration-300  ${isHovered ? 'scale-105' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) ${isHovered ? 'scale(1.05)' : 'scale(1)'}`,
        transition: isHovered ? 'transform 0.2s ease' : 'transform 0.5s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={iconRef} className="text-yellow-400 text-4xl mb-4">{icon}</div>
      <h3 ref={titleRef} className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p ref={descRef} className="text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const featuresRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Custom cursor
  const cursorRef = useRef(null);
  
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
    if (!cursorRef.current) return;
    
    gsap.to(cursorRef.current, {
      x: mousePosition.x,
      y: mousePosition.y,
      duration: 0.2,
      ease: 'power2.out'
    });
  }, [mousePosition]);

  useGSAP(() => {
    // Create scroll trigger for the 3D model zoom effect from Hero section
    const modelZoomTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      }
    });
    
    // This will be connected to the 3D model in the App component
    modelZoomTl.to('.hero-model', {
      scale: 0.5,
      y: '-30%',
      duration: 1
    });
    
    // Title animation
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  }, { scope: sectionRef });

  const features = [
    {
      title: 'High Yield',
      description: 'Our paddy seeds produce 30% more yield compared to traditional varieties.',
      icon: '🌾'
    },
    {
      title: 'Drought Resistant',
      description: 'Engineered to thrive in low water conditions, saving up to 40% water.',
      icon: '💧'
    },
    {
      title: 'Pest Resistant',
      description: 'Natural resistance to common pests, reducing the need for pesticides.',
      icon: '🐛'
    },
    {
      title: 'Quick Maturation',
      description: 'Harvest in just 100 days, compared to 120-150 days for traditional varieties.',
      icon: '⏱️'
    },
    {
      title: 'Nutrient Rich',
      description: 'Higher protein content and essential micronutrients for better nutrition.',
      icon: '🥗'
    },
    {
      title: 'Climate Adaptable',
      description: 'Performs well across various climate zones and seasonal changes.',
      icon: '🌡️'
    }
  ];

  return (
    <div ref={sectionRef} id="features" className=" min-h-screen bg-gradient-to-b from-black to-green-900 py-20 px-4 relative overflow-hidden shadow-[0_-20px_30px_30px_black]">
      {/* We're now using the global CustomCursor component */}
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-green-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-yellow-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <SplitText
            text="Revolutionary Features"
            className="text-5xl font-bold text-white mb-4"
            animation={{
              y: 100,
              opacity: 0,
              stagger: 0.05,
              ease: "back.out(1.7)",
              duration: 1,
              
            }}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our paddy seeds are engineered with cutting-edge technology to maximize yield while minimizing environmental impact.
          </p>
          <MagneticButton className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-lg font-medium transition-all">
            Explore All Features
          </MagneticButton>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
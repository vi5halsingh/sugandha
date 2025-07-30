import React, { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../../animated/SplitText';
import TextPressure from '../../animated/TextPressure';
import MagneticButton from './MagneticButton';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PriceCard = ({ title, price, features, popular, index }) => {
  const cardRef1 = useRef(null);

  
  useGSAP(() => {
    // Animation for card appearance
    gsap.fromTo(cardRef1.current,
      { y: 50, opacity: 0 ,x:30},
      { 
        y: 0, 
        x:0,
        opacity: 1, 
        duration: 0.8, 
        delay: index * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef1.current,
          start: 'top bottom-=300',
          end:'bottom top+=300',
          toggleActions: 'play reverse play reverse',
        }
      }
    );
  }, []);

  return (
    <div 
      ref={cardRef1}
      className={`${popular ? 'bg-yellow-400 text-black scale-105 z-10' : 'bg-white/10 backdrop-blur-sm text-white'} p-6 rounded-xl shadow-xl transition-all duration-300 relative overflow-hidden`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      <h3 className={`text-2xl font-bold mb-2 ${popular ? 'text-black' : 'text-white'}`}>{title}</h3>
      <div className="flex items-end mb-6">
        <span className={`text-4xl font-bold ${popular ? 'text-black' : 'text-yellow-400'}`}>₹{price}</span>
        <span className={`ml-1 ${popular ? 'text-black/70' : 'text-gray-300'}`}>/kg</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 mt-0.5 ${popular ? 'text-green-700' : 'text-green-500'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className={popular ? 'text-black/80' : 'text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>
      <MagneticButton
        className={`w-full py-3 rounded-lg font-medium transition-all ${popular ? 'bg-green-700 hover:bg-green-800 text-white' : 'bg-yellow-400 hover:bg-yellow-500 text-black'}`}
        onClick={() => alert(`Proceed to buy the ${title}`)}
      >
        Buy Now
      </MagneticButton>
    </div>
  );
};

const Buy = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  useGSAP(() => {
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
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Content animation
    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
  }, { scope: sectionRef });

  const priceOptions = [
    {
      title: 'Basic Package',
      price: '1,499',
      features: [
        '5kg High-Yield Paddy Seeds',
        'Basic Growing Guide',
        'Standard Germination Rate (85%)',
        '30-Day Support',
        'Standard Shipping'
      ],
      popular: false
    },
    {
      title: 'Premium Package',
      price: '2,999',
      features: [
        '10kg High-Yield Paddy Seeds',
        'Advanced Growing Guide',
        'Premium Germination Rate (95%)',
        '90-Day Expert Support',
        'Free Express Shipping',
        'Soil Testing Kit Included'
      ],
      popular: true
    },
    {
      title: 'Commercial Package',
      price: '9,999',
      features: [
        '50kg High-Yield Paddy Seeds',
        'Commercial Farming Manual',
        'Guaranteed Germination Rate (98%)',
        '1-Year Expert Consultation',
        'Priority Shipping',
        'Soil & Water Testing Kits',
        'Seasonal Planning Calendar'
      ],
      popular: false
    }
  ];

  return (
    <div id="buy" ref={sectionRef} className="min-h-screen bg-gradient-to-b from-black to-green-900 py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-yellow-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <TextPressure 
            text="BUY NOW" 
            className="text-6xl font-bold text-white mb-4"
            textColor="#FFFFFF"
            weight={true}
            width={true}
            italic={false}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect package for your farming needs and transform your yield today.
          </p>
        </div>
        
        <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {priceOptions.map((option, index) => (
            <PriceCard 
              key={index}
              index={index}
              title={option.title}
              price={option.price}
              features={option.features}
              popular={option.popular}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Need a Custom Solution?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            For bulk orders, specialized farming needs, or custom packages, our agricultural experts are ready to help you find the perfect solution.
          </p>
          <MagneticButton className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-lg font-medium transition-all">
            Contact Our Experts
          </MagneticButton>
        </div>
      </div>
    </div>
  );
};

export default Buy;
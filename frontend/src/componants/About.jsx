import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const para1Ref = useRef(null);
  const para2Ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
    gsap.fromTo([para1Ref.current, para2Ref.current],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 max-w-5xl mx-auto">
      <h2 ref={headingRef} className="text-4xl font-bold mb-6">About Paddy Seed</h2>
      <p ref={para1Ref} className="mb-4">
        Our paddy seed is a revolutionary agricultural product designed to provide sustainable and high-yield crops for farmers worldwide.
      </p>
      <p ref={para2Ref} className="mb-4">
        It is developed with advanced breeding techniques to ensure resistance to pests and diseases, while requiring less water and fertilizer.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Higher Yield</h3>
          <p>Produces up to 30% more yield compared to traditional seeds.</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Less Water</h3>
          <p>Requires 25% less water, promoting water conservation.</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">More Profit</h3>
          <p>Improves farmer income through better crop quality and quantity.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
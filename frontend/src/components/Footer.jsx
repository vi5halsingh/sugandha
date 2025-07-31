import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import GlassIcons from '../../animated/GlassIcons.jsx';
import { FaSquareInstagram, FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const lightRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const titleRef = useRef(null);
  const iconsRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    // Animate footer container
    gsap.fromTo(
      footerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play reverse reverese reverse",
        },
      }
    );
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Animate icons
    gsap.fromTo(
      iconsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: iconsRef.current,
          start: "top 97%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Animate nav links
    gsap.fromTo(
      linksRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        delay: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
    // Animate copyright
    gsap.fromTo(
      copyrightRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    const handleMove = e => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (!lightRef.current) return;
    gsap.to(lightRef.current, {
      x: mouse.x - (footerRef.current?.getBoundingClientRect().left || 0) - 100,
      y: mouse.y - (footerRef.current?.getBoundingClientRect().top || 0) - 100,
      duration: 0.3,
      ease: 'power2.out'
    });
  }, [mouse]);

  const handleHover = (idx, enter) => {
    gsap.to(linksRef.current[idx], {
      scale: enter ? 1.15 : 1,
      color: enter ? "#22d3ee" : "#fff",
      duration: 0.3,
      ease: "power2.out"
    });
  };
  const items = [
    { icon: <FaSquareInstagram />, color: 'blue', label: 'insta', link: 'https://www.instagram.com/0._vishal?igsh=MTgwaWtkajd5ZHRnNQ%3D%3D' },
    { icon: <FaSquareGithub />, color: 'purple', label: 'github', link: 'https://github.com/vi5halsingh' },
    { icon: <FaLinkedin />, color: 'red', label: 'linkedIn', link: 'https://www.linkedin.com/in/vi5halsingh/' },
  ];
  const [link, setLink] = useState('https://linkedin.com/');

  return (
    <footer ref={footerRef} className="w-full bg-gradient-to-r from-black via-gray-900 to-black text-white py-10 px-6 relative overflow-hidden">
      {/* Cursor light effect */}
      <div ref={lightRef} style={{ pointerEvents: 'none' }} className="absolute z-20 w-52 h-52 rounded-full bg-cyan-400/10 blur-3xl opacity-80" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div ref={titleRef} className="text-2xl font-bold tracking-widest mb-4 md:mb-0">
          Paddy Seed Revolution
        </div>
        <div ref={iconsRef} style={{ height: '200px', position: 'relative', display: "flex" }}>
          <GlassIcons
            items={items.map(item => ({
              ...item,
              onClick: () => window.open(item.link, '_blank')
            }))}
            className="custom-class h-[50px] "
          />
        </div>
        <nav className="flex-col flex gap-8 text-lg">
          {["Home", "Features", "About", "Buy"].map((label, idx) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              ref={el => (linksRef.current[idx] = el)}
              className="transition-colors duration-300 hover:text-cyan-300 cursor-pointer"
              onMouseEnter={() => handleHover(idx, true)}
              onMouseLeave={() => handleHover(idx, false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      <div ref={copyrightRef} className="text-sm text-center opacity-80 mt-4 md:mt-0 relative z-10">
        &copy; {new Date().getFullYear()} sugandha. All rights reserved.
      </div>
      {/* <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 animate-pulse"></div> */}
    </footer>
  );
};

export default Footer;
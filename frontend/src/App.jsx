import { useState, useRef, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import Navbar from './componants/Navbar'
import Hero from './componants/Hero'
import Features from './componants/Features'
import Benefits from './componants/Benefits'
import Buy from './componants/Buy'
import CustomCursor from './componants/CustomCursor'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis' 
import { ReactLenis, useLenis } from 'lenis/react'
import Footer from './componants/Footer'
import MainRoutes from './routes/MainRoutes'

function App() {
  const lenis = useLenis(()=>{

  })
  const appRef = useRef(null);
  const modelRef = useRef(null);
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    // Create a scroll trigger for the 3D model transition
    const modelTransition = ScrollTrigger.create({
      trigger: appRef.current,
      start: 'top top',
      end: '+=100%',
      pin: false,
      onUpdate: (self) => {
        // This will be used to coordinate with the Features component
        // to create a smooth transition effect
        if (modelRef.current) {
          modelRef.current.setAttribute('data-scroll-progress', self.progress);
        }
      }
    });
    
    return () => {
      modelTransition.kill();
    };
  }, []);
  
  return (
    <div ref={appRef} className="relative">
      <ReactLenis root/>
      <CustomCursor />
   
      <Navbar />
      <div ref={modelRef} className="hero-model-container">
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="about">
          <Benefits />
        </section>
        <section id="buy">
          <Buy />
        </section>
          <section id="footer">
          <Footer/>
        </section>
      </div>
    </div>  
  )
}

export default App

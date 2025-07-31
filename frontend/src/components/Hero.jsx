import React, { useRef, useEffect, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei'
import SplitText from '../../animated/SplitText'
import MagneticButton from './MagneticButton'
import video from '../assets/tmpp4l06w1c.mp4'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// 3D Model component
function SeedModel() {
  const { scene } = useGLTF('/assets/seed.glb')
  const modelRef = useRef(null);
  
  useEffect(() => {
    // Change the color of the 3D model to yellow
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set('#FFFF00') // Yellow color
      }
    })
  }, [scene])
 
  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.hero-model-container');
      if (!container || !modelRef.current) return;
      
      const scrollProgress = parseFloat(container.getAttribute('data-scroll-progress') || 0);
  
      if (scrollProgress > 0) {
        modelRef.current.rotation.y = Math.PI / 4 + (scrollProgress * Math.PI);
        modelRef.current.scale.setScalar(2.5 - (scrollProgress * 3)); // Faster zoom out effect
        modelRef.current.position.z = scrollProgress * 2; // Move backward (zoom out)
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <PresentationControls
      global
      rotation={[0, 0, 0]}
      polar={[-Math.PI / 4, Math.PI / 4]}
      azimuth={[-Math.PI / 4, Math.PI / 4]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 300 }}
    >
      // In SeedModel component, adjust position Y from -1.5 to -1.0
      <primitive 
          ref={modelRef}
          object={scene} 
          scale={2.5} 
          position={[0, 0, 0]} // Centered position
          rotation={[0, Math.PI / 4, 0]}
          className="hero-model"
        />
    </PresentationControls>
  )
}

// Preload the 3D model
useGLTF.preload('/assets/seed.glb')

const Hero = () => {
  const heroRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const buttonsRef = useRef(null)
  const videoRef = useRef(null)

  // GSAP animations
  useGSAP(() => {
    // Create a timeline for the hero section animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    })

    // Video fade in
    tl.fromTo(videoRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )

    // Heading animation
    tl.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.8"
    )

    // Description animation
    tl.fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.6"
    )

    // Buttons animation
    // tl.fromTo(buttonsRef.current.children,
    //   { y: 20, opacity: 0 },
    //   { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
    //   "-=0.4"
    // )

    // Create scroll trigger for parallax effect
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 0,
      opacity: 0.5,
      ease: 'none'
    })

    // Scroll-triggered zoom animations for text elements
    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.5,
      y: -50,
      x:200,
      ease: 'power2.out'
    })

    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      scale: 1.3,
      y: -30,
      x:200,
      ease: 'power2.out'
    })
  }, { scope: heroRef })

  return (
    <div ref={heroRef} className='top-0  h-screen w-full relative overflow-hidden'>
      <video 
        ref={videoRef}                                               
        autoPlay
        muted
        className=' w-full h-full object-cover absolute top-0 left-0'
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className='absolute inset-0 bg-black/50 flex flex-col md:flex-row items-center justify-center text-white px-4'>
        <div className='w-full md:w-full flex flex-col items-center md:items-start justify-center'>
          <div ref={headingRef} className='mb-4'>
            <SplitText
              text="Paddy Seed"
              className="text-8xl font-bold"
              animation={{
                y: 100,
                opacity: 0,
                stagger: 0.05,
                ease: "back.out(1.7)",
                duration: 1
              }}
            />
          </div>
          <div ref={descriptionRef} className='mb-6 max-w-2xl text-center md:text-left'>
            <SplitText
              text="Revolutionizing agriculture with sustainable and high-yield paddy seeds for farmers worldwide"
              className="text-xl"
              animation={{
                y: 50,
                opacity: 0,
                stagger: 0.02,
                ease: "power3.out",
                duration: 0.8
              }}
            />
          </div>
          {/* <div ref={buttonsRef} className='flex gap-4'>
            <MagneticButton className='bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all'>Explore Products</MagneticButton>
            <MagneticButton className='border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-lg font-medium transition-all'>Learn More</MagneticButton>
          </div> */}
        </div>
        
        {/* 3D Model */}
     
        <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
          <Canvas camera={{ position: [0, 0, 8], fov: 35 }} className='w-full h-full'>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
            <Suspense fallback={null}>
              <SeedModel />
              <Environment preset="sunset" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default Hero
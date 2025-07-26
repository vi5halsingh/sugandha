import React, { useState } from 'react'
import TextPressure from '../../animated/TextPressure'
import { NavLink } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from "../../animated/SplitText";
import paddySeedLogo from "../assets/paddy seed.svg";


const Navbar = () => {
  const [hoverAbout, setHoverAbout] = useState(false)
  const [hoverFeature, setHoverFeature] = useState(false)
  const [hoverContact, setHoverContact] = useState(false)
    // useGSAP(() => {
  //   const navLinks = document.querySelectorAll('.navitem');
  //   navLinks.forEach((link) => {
  //     link.addEventListener('mouseenter', () => {
  //       gsap.from(link, {
  //        y:80,
  //       duration: 0.3,
  //       });
  //     });
  //     link.addEventListener('mouseleave', () => {
  //       gsap.to(link, {
  //         color: 'white',
  //         duration: 0.3,
  //       });
  //     });
  //   });
  // });

  return (
    <div className='z-100 w-full top-2 fixed bg-transparent  flex justify-between items-center h-[50px] py-5 '>
        <div id='navFirst' className='p-4 w-full '>
          <ul className='px-2 border rounded-full flex gap-8 justify-between items-center w-[70%]'>
             <a href='#home' className=' navitem text-white text-lg font-medium  w-full h-[50px] cursor-context-menu'>
             <img src={paddySeedLogo} alt="logo" className='h-full cursor-pointer'/>
            </a>
            <a href="#about" className=' navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400 w-full' onMouseEnter={() => setHoverAbout(true)} onMouseLeave={() => setHoverAbout(false)}>
              {hoverAbout ? 
             <SplitText 
             text="About"
             duration={0.5}
             ease='power2.out'
             splitType='chars'
             from={{opacity:0 ,  y:-20}}
             to={{opacity:100,  y:0 }}
               threshold={0.1}
               rootMargin="-100px"
               textAlign="center"
               delay={50}
             /> 
            : "About" }
            </a>
           <a href="#features" className='  navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400 w-full' onMouseEnter={() => setHoverFeature(true)} onMouseLeave={() => setHoverFeature(false)}>
              {hoverFeature ? 
             <SplitText 
             className=''
             text="Feature"
             duration={0.5}
             ease='power2.out'
             splitType='chars'
             from={{opacity:0 ,  y:-20}}
             to={{opacity:100,  y:0 }}
               threshold={0.1}
               delay={50}
              //  rootMargin="-100px"
              //  textAlign="center"
             /> 
            : "Features" }
            </a>
         
          </ul>
        </div>
        <div id='navSecond' className='backdrop-blur-sm border rounded-md mt-3 pl-25  flex justify-center w-full py-2 text-center'> <TextPressure 
        text='SUGANDHA'
        flex={true}
        stroke={false}
        weight={false}
        italic={false}
        width={true}
        textColor="#ffffff"
    strokeColor="#ff0000"
minFontSize={25}
     className='w-[80%]  m-auto text-center logo text-2xl h-full'
     
        /></div>
        <div id='navThird' className='w-full flex justify-end  items-center  px-5'>  
           <a href="#buy" className='border border-white h-[40px] text-center rounded-full px-3 py-1 navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400 ' onMouseEnter={() => setHoverContact(true)} onMouseLeave={() => setHoverContact(false)}>
              {hoverContact ? 
             <SplitText 
             text="Buy"
             duration={0.5}
             ease='power2.out'
             splitType='chars'
             from={{opacity:0 ,  y:-20}}
             to={{opacity:100,  y:0 }}
               threshold={0.1}
               rootMargin="-100px"
               textAlign="center"
               delay={50}
             /> 
            : "Buy" }
            </a></div>
    </div>
  )
}

export default Navbar
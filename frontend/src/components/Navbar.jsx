import React, { useState, useEffect } from 'react'
import TextPressure from '../../animated/TextPressure'
import { NavLink } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from "../../animated/SplitText";
import paddySeedLogo from "../assets/paddy_seed.svg";
import AuthForms from './AuthForms';


const Navbar = () => {
  const [hoverAbout, setHoverAbout] = useState(false)
  const [hoverFeature, setHoverFeature] = useState(false)
  const [hoverContact, setHoverContact] = useState(false)
  const [hoverLogin, setHoverLogin] = useState(false)
  const [hoverSignup, setHoverSignup] = useState(false)
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [authFormType, setAuthFormType] = useState('login')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Scroll handling for navbar hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  const openAuthForm = (type) => {
    setAuthFormType(type);
    setShowAuthForm(true);
  };

  const closeAuthForm = () => {
    setShowAuthForm(false);
  };

  const switchAuthForm = (type) => {
    setAuthFormType(type);
  };

  const handleAuthSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <>
      <div 
        className={`z-100 w-full ${
          isVisible ? 'top-2' : 'top-0'} ${
          isVisible ? 'top-2' : 'top-0'} fixed bg-transparent flex justify-between items-center h-[50px]  ${
          isVisible ? 'py-5' : 'py-0'} transition-transform duration-300 ease-in-out  ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
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
        <div id='navThird' className='w-full flex justify-end  items-center  px-5 gap-4'>  
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
            </a>

            {!isLoggedIn ? (
              <>
                <button 
                  onClick={() => openAuthForm('login')}
                  className='border border-white h-[40px] text-center rounded-full px-3 py-1 navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400'
                  onMouseEnter={() => setHoverLogin(true)} 
                  onMouseLeave={() => setHoverLogin(false)}
                >
                  {hoverLogin ? 
                    <SplitText 
                      text="Login"
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
                    : "Login" 
                  }
                </button>

                <button 
                  onClick={() => openAuthForm('signup')}
                  className='border border-white h-[40px] text-center rounded-full px-3 py-1 navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400'
                  onMouseEnter={() => setHoverSignup(true)} 
                  onMouseLeave={() => setHoverSignup(false)}
                >
                  {hoverSignup ? 
                    <SplitText 
                      text="Sign Up"
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
                    : "Sign Up" 
                  }
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">Welcome, {user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className='border border-white h-[40px] text-center rounded-full px-3 py-1 navitem text-white text-lg font-medium transition-transform duration-500 hover:text-blue-400'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
    </div>

    {/* Auth Forms Modal */}
    <AuthForms 
      isOpen={showAuthForm}
      onClose={closeAuthForm}
      formType={authFormType}
      onSwitchForm={switchAuthForm}
      onAuthSuccess={handleAuthSuccess}
    />
  </>
  )
}

export default Navbar
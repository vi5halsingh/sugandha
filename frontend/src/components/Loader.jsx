import React, { useEffect, useState } from 'react';
import TextPressure from '../../animated/TextPressure';

const Loader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [loadingSteps, setLoadingSteps] = useState([
    { name: 'Initializing...', completed: false },
    { name: 'Loading assets...', completed: false },
    { name: 'Preparing components...', completed: false },
    { name: 'Finalizing...', completed: false }
  ]);

  useEffect(() => {
    let currentStep = 0;
    
    const simulateLoading = () => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsVisible(false);
              onLoadingComplete();
            }, 500);
            return 100;
          }
          
          // Update loading steps
          if (prev >= 25 && !loadingSteps[0].completed) {
            setLoadingSteps(prev => prev.map((step, i) => 
              i === 0 ? { ...step, completed: true } : step
            ));
          } else if (prev >= 50 && !loadingSteps[1].completed) {
            setLoadingSteps(prev => prev.map((step, i) => 
              i === 1 ? { ...step, completed: true } : step
            ));
          } else if (prev >= 75 && !loadingSteps[2].completed) {
            setLoadingSteps(prev => prev.map((step, i) => 
              i === 2 ? { ...step, completed: true } : step
            ));
          } else if (prev >= 95 && !loadingSteps[3].completed) {
            setLoadingSteps(prev => prev.map((step, i) => 
              i === 3 ? { ...step, completed: true } : step
            ));
          }
          
          return prev + Math.random() * 8 + 2; // Slower, more realistic progress
        });
      }, 150);

      return () => clearInterval(interval);
    };

    const cleanup = simulateLoading();
    return cleanup;
  }, [onLoadingComplete, loadingSteps]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
      <div className="text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <TextPressure 
            text="SUGANDHA"
            flex={true}
            stroke={false}
            weight={false}
            italic={false}
            width={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={40}
            className="text-4xl md:text-6xl mb-4"
          />
          <p className="text-white/60 text-lg">Loading your experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 md:w-96 bg-white/20 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="text-white/80 text-sm mb-6">
          {Math.round(progress)}%
        </div>

        {/* Loading Steps */}
        <div className="space-y-2 mb-6">
          {loadingSteps.map((step, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                step.completed ? 'bg-green-400' : 'bg-white/40'
              }`}></div>
              <span className={`text-sm transition-all duration-300 ${
                step.completed ? 'text-green-400' : 'text-white/60'
              }`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader; 
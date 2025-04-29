import { useState, useEffect } from 'react';

export function ScrollIndicator({ isVisible = true }) {
  const [animateIcon, setAnimateIcon] = useState(false);
  
  // Create a pulsing animation effect
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setAnimateIcon(prev => !prev);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
      <p className="text-white mb-2 text-sm">Scroll Down</p>
      <div 
        className={`w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center 
                   transition-transform duration-1000 ease-in-out ${animateIcon ? 'translate-y-2' : ''}`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-white" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </div>
  );
}
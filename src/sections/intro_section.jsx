import { useState, useEffect } from 'react';

export function IntroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="h-screen flex items-center justify-center relative z-10">
      <div 
        className={`text-center transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <h1 className="text-8xl font-bold mb-4 text-white">Hello</h1>
        <p className="text-xl text-white opacity-80 mt-4">Welcome to my portfolio</p>
      </div>
    </section>
  );
}
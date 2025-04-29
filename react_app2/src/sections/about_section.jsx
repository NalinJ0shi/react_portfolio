import { useState, useEffect } from 'react';

export function AboutSection({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show section when scroll progress reaches a certain threshold
  useEffect(() => {
    if (scrollProgress > 0.1 && scrollProgress < 0.4) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollProgress]);
  
  return (
    <section className="h-screen flex items-center justify-start pt-16 relative z-10">
      <div 
        className={`bg-opacity-75 p-6 rounded-lg max-w-lg ml-10 transition-all duration-700 ease-in-out ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-20'
        }`}
      >
        <h2 className="text-4xl font-bold mb-4 text-white">About Me</h2>
        <p className="text-white mb-4">
          I am a creative developer with a passion for building immersive digital experiences 
          that blend technical expertise with artistic vision.
        </p>
        <p className="text-white mb-4">
          With a background in both design and development, I create unique web experiences 
          that engage users and tell compelling stories.
        </p>
        <p className="text-white">
          My work focuses on the intersection of 3D visualization, interactive design, 
          and cutting-edge web technologies.
        </p>
      </div>
    </section>
  );
}
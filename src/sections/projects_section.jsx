import { useState, useEffect } from 'react';

export function ProjectsSection({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show section when scroll progress reaches a certain threshold
  useEffect(() => {
    if (scrollProgress > 0.4 && scrollProgress < 0.7) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollProgress]);
  
  const projects = [
    "Project 1: Interactive 3D Experience",
    "Project 2: Web Development Portfolio",
    "Project 3: Mobile App Development"
  ];
  
  return (
    <section className="h-screen flex items-center justify-start pt-16 relative z-10">
      <div 
        className={`bg-opacity-75 p-6 rounded-lg max-w-lg ml-10 transition-all duration-700 ease-in-out ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-20'
        }`}
      >
        <h2 className="text-4xl font-bold mb-4 text-white">My Projects</h2>
        <ul className="space-y-2">
          {projects.map((project, index) => (
            <li 
              key={index}
              className="p-2 bg-white bg-opacity-10 rounded text-white"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease, transform 500ms ease'
              }}
            >
              {project}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
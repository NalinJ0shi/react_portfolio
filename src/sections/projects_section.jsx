import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export function ProjectsSection({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show section when scroll progress reaches a certain threshold
  // Expanded range to keep projects visible longer
  useEffect(() => {
    if (scrollProgress > 0.4 && scrollProgress < 0.85) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollProgress]);
  
  const projects = [
    {
      title: "Weather App",
      githubUrl: "https://github.com/NalinJ0shi/weather_app",
      demoUrl: "https://github.com/NalinJ0shi/weather_app"
    },
    {
      title: "Theremin Simulator",
      githubUrl: "https://github.com/NalinJ0shi/theremin_simulator",
      demoUrl: "https://github.com/NalinJ0shi/theremin_simulator"
    },
    {
      title: "Whack-a-Mole Game",
      githubUrl: "https://github.com/NalinJ0shi/Whack_A_Mole",
      demoUrl: "https://github.com/NalinJ0shi/Whack_A_Mole"
    }
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
        <h2 className="text-4xl font-bold mb-6 text-white">My Projects</h2>
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li 
              key={index}
              className="p-3 bg-white bg-opacity-10 rounded text-gray-100"
              style={{
                transitionDelay: `${index * 150}ms`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease, transform 500ms ease'
              }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">{project.title}</h3>
                <div className="flex space-x-4">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label={`GitHub for ${project.title}`}
                  >
                    <FaGithub size={22} />
                  </a>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-200 hover:text-white transition-colors"
                    aria-label={`Demo for ${project.title}`}
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

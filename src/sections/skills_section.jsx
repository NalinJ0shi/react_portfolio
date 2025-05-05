import { useState, useEffect } from 'react';
import { FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { SiThreedotjs } from "react-icons/si";
import { IoLogoHtml5 } from "react-icons/io";
import { SiVite } from "react-icons/si";
import { BiLogoBlender } from "react-icons/bi";
import { SiWebgl } from "react-icons/si";

export function SkillsSection({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show section when scroll progress reaches a certain threshold
  useEffect(() => {
    if (scrollProgress > 0.25 && scrollProgress < 0.55) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollProgress]);
  
  // Skills organized by category with their icons
  const skillsWithIcons = {
    "Programming Languages": [
      { name: "JavaScript", icon: <IoLogoJavascript className="inline mr-2 text-xl" /> },
      { name: "HTML", icon: <IoLogoHtml5 className="inline mr-2 text-xl" /> },
      { name: "CSS", icon: <FaCss3 className="inline mr-2 text-xl" /> }
    ],
    "Libraries & Frameworks": [
      { name: "React", icon: <FaReact className="inline mr-2 text-xl" /> },
      { name: "Three.js", icon: <SiThreedotjs className="inline mr-2 text-xl" /> },
      { name: "React Three Fiber", icon: <FaReact className="inline mr-2 text-xl" /> },
      { name: "TailwindCSS", icon: <RiTailwindCssFill className="inline mr-2 text-xl" /> }
    ],
    "Tools & Technologies": [
      { name: "WebGL", icon: <SiWebgl className="inline mr-2 text-xl" /> },
      { name: "Blender", icon: <BiLogoBlender className="inline mr-2 text-xl" /> },
      { name: "Vite", icon: <SiVite className="inline mr-2 text-xl" /> }
    ]
  };
  
  return (
    <section className="h-screen flex items-center justify-end pt-16 relative z-10">
      <div 
        className={`p-6 rounded-lg max-w-lg mr-10 transition-all duration-700 ease-in-out ${
          isVisible 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 translate-x-20'
        }`}
      >
        <h2 className="text-4xl font-bold mb-6 text-white">Skills</h2>
        
        {Object.entries(skillsWithIcons).map(([category, skills], categoryIndex) => (
          <div key={category} className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-white">{category}</h3>
            <ul className="list-disc pl-5">
              {skills.map((skill, index) => (
                <li 
                  key={skill.name}
                  className="text-white text-lg mb-2"
                  style={{
                    transitionDelay: `${(categoryIndex * skills.length + index) * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 500ms ease, transform 500ms ease'
                  }}
                >
                  {skill.icon}{skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import { ScrollableScene } from './scroll/scrollable_character';
import { IntroSection } from './sections/intro_section';
import { AboutSection } from './sections/about_section';
import { SkillsSection } from './sections/skills_section';
import { ProjectsSection } from './sections/projects_section';
import { ContactSection } from './sections/contact_section';
import { ScrollIndicator } from './scroll/scroll_indicator';
import { LoadingScreen } from './loading';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActivelyScrolling, setIsActivelyScrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const scrollTimeout = useRef(null);
  
  // Set the void color - a very dark purple matching the first image
  const voidColor = "#1a1626"; // Very dark purple/almost black
  
  // Simulate loading progress
  useEffect(() => {
    // Start at 0
    setLoadProgress(0);
    
    // Gradually increase progress
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        // Accelerate loading as it progresses
        const increment = 0.01 + (prev * 0.05);
        const newProgress = prev + increment;
        
        // Cap at 0.9 (90%) to wait for actual completion
        if (newProgress >= 0.9) {
          clearInterval(interval);
          return 0.9;
        }
        
        return newProgress;
      });
    }, 100);
    
    // Cleanup interval
    return () => clearInterval(interval);
  }, []);
  
  // Handle model load completion
  const handleModelLoaded = () => {
    // Bump to 100% and finish loading
    setLoadProgress(1);
    setTimeout(() => setLoading(false), 500);
  };
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(window.scrollY / totalHeight, 1);
      setScrollProgress(progress);
      
      // Set actively scrolling to true
      setIsActivelyScrolling(true);
      
      // Clear any existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Set a timeout to detect when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setIsActivelyScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen 
        progress={loadProgress} 
        isLoaded={!loading} 
        onComplete={() => console.log('Loading complete')} 
      />
      
      <div className="min-h-[500vh] text-white" style={{ backgroundColor: voidColor, transition: 'background-color 0.5s ease' }}>
        <div className="fixed inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <ScrollableScene 
                scrollProgress={scrollProgress} 
                isActivelyScrolling={isActivelyScrolling}
                modelUrl="/models/man.glb"
                onLoaded={handleModelLoaded}
              />
              
              {/* Enhanced lighting for the scene */}
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={0.8} color="#e2e2ff" />
              <spotLight 
                position={[0, 10, 0]} 
                intensity={0.8} 
                angle={0.6} 
                penumbra={0.5} 
                castShadow 
                color="#f6e3ff" 
              />
              
              {/* Ground plane */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[1000, 1000]} />
                <meshStandardMaterial 
                  color={voidColor} 
                  roughness={0.75}
                  metalness={0.2}
                  emissive="#291e3a"
                  emissiveIntensity={0.05}
                />
              </mesh>
            </Suspense>
          </Canvas>
        </div>
        
        {/* Content sections */}
        <IntroSection />
        <AboutSection scrollProgress={scrollProgress} />
        <SkillsSection scrollProgress={scrollProgress} />
        <ProjectsSection scrollProgress={scrollProgress} />
        <ContactSection scrollProgress={scrollProgress} />
        
        {/* Scroll indicator */}
        <ScrollIndicator isVisible={scrollProgress < 0.05} />
        
        {/* Visual indicator of scroll progress */}
        <div 
          className="fixed bottom-4 left-4 bg-white bg-opacity-20 rounded-full p-2 z-10"
          title={`Scroll Progress: ${Math.round(scrollProgress * 100)}%`}
        >
          <div className="h-1 w-16 bg-white bg-opacity-20 rounded-full">
            <div 
              className="h-1 bg-white rounded-full" 
              style={{ width: `${scrollProgress * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
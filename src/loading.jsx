import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Rotating Cube Component
function RotatingCube({ progress = 0 }) {
  const meshRef = useRef();
  
  // Rotate the cube on each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Calculate cube scale based on loading progress
  const scale = 0.8 + (progress * 0.2);

  return (
    <mesh ref={meshRef} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#6b46c1" 
        roughness={0.5}
        metalness={0.8}
        emissive="#3b1e73"
        emissiveIntensity={0.3 + (progress * 0.7)}
      />
    </mesh>
  );
}

// Progress Indicator Component
function ProgressIndicator({ progress = 0 }) {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
      <div className="w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress * 100}%` }} 
        />
      </div>
    </div>
  );
}

// Main Loading Screen Component
export function LoadingScreen({ progress = 0, isLoaded = false, onComplete = () => {} }) {
  const [isVisible, setIsVisible] = useState(true);
  
  // Handle transition when loading completes
  useEffect(() => {
    if (isLoaded) {
      // Add a slight delay before hiding for a smooth transition
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);
  
  // Exit early if not visible
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-800 ease-in-out bg-[#1a1626]`}
      style={{ 
        opacity: isLoaded ? 0 : 1 
      }}
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative">
        <Canvas>
          <ambientLight intensity={0.3} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <RotatingCube progress={progress} />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        </Canvas>
      </div>
      
      <div className="mt-8 text-center text-white">
        <h2 className="text-xl font-bold mb-1">Loading Experience</h2>
        <p className="text-sm text-white text-opacity-70">
          {progress < 1 ? 'Initializing 3D environment...' : 'Ready to explore!'}
        </p>
      </div>
      
      <ProgressIndicator progress={progress} />
    </div>
  );
}
import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { findAnimationByName, transitionAnimation, detectAnimations } from '../model';

export function ScrollableScene({ modelUrl = '/models/man.glb', scrollProgress = 0, isActivelyScrolling = false, onLoaded = () => {} }) {
  const group = useRef();
  const { scene, animations } = useGLTF(modelUrl);
  const { actions } = useAnimations(animations, group);
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const cameraRef = useRef();
  const pathRef = useRef();
  
  // Preload the model
  useEffect(() => {
    useGLTF.preload(modelUrl);
  }, [modelUrl]);
  
  // Signal that the model is loaded
  useEffect(() => {
    if (scene && animations) {
      // Allow a brief delay for everything to initialize
      const timer = setTimeout(() => {
        onLoaded();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [scene, animations, onLoaded]);
  
  // Create a path for the character to follow
  useEffect(() => {
    // Simple path - can be replaced with a more complex curve
    pathRef.current = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 0, 5),
      new THREE.Vector3(10, 0, 0),
      new THREE.Vector3(15, 0, -5),
      new THREE.Vector3(20, 0, 0),
    ]);
  }, []);

  // Switch animations based on scroll and active scrolling state
  useEffect(() => {
    if (!actions || animations.length < 2) return;
  
    // Get animation names
    const detectedAnimations = detectAnimations(animations);
    const idleAnim = detectedAnimations.idle || animations[0].name;
    const walkAnim = detectedAnimations.walk || (animations.length > 1 ? animations[1].name : animations[0].name);
    
    if (scrollProgress > 0.05 && isActivelyScrolling) {
      // If scrolling and not already walking
      if (currentAnimation !== walkAnim) {
        transitionAnimation(actions, currentAnimation, walkAnim, 0.5);
        setCurrentAnimation(walkAnim);
      }
    } else {
      // If not scrolling and not already idle
      if (currentAnimation !== idleAnim) {
        transitionAnimation(actions, currentAnimation, idleAnim, 0.5);
        setCurrentAnimation(idleAnim);
      }
    }
  }, [actions, animations, scrollProgress, currentAnimation, isActivelyScrolling]);

  // Start with idle animation
  useEffect(() => {
    if (actions && animations.length > 0) {
      // Use helper to find animation names
      const detectedAnimations = detectAnimations(animations);
      
      // Start with idle animation if available, otherwise use first animation
      const idleAnimation = detectedAnimations.idle || animations[0].name;
      actions[idleAnimation]?.reset().play();
      setCurrentAnimation(idleAnimation);
    }
  }, [actions, animations]);

  // Position character and camera based on scroll
  useFrame(() => {
    if (!group.current || !pathRef.current || !cameraRef.current) return;

    // Move character along the path based on scroll progress
    if (scrollProgress > 0) {
      const position = pathRef.current.getPoint(scrollProgress);
      group.current.position.set(position.x, position.y, position.z);

      // Calculate the tangent to make the character face the direction of movement
      if (scrollProgress > 0.01) {
        const lookAtPoint = pathRef.current.getPoint(
          Math.min(scrollProgress + 0.01, 1)
        );
        const direction = new THREE.Vector3()
          .subVectors(lookAtPoint, position)
          .normalize();
        
        if (direction.length() > 0) {
          const lookAtTarget = new THREE.Vector3()
            .addVectors(position, direction);
          group.current.lookAt(lookAtTarget);
        }
      }

      // Update camera position for third-person view with slower transition
      const cameraFollowDistance = 4;
      const cameraHeight = 1.8;
      
      // Calculate camera target position (behind and above character)
      const characterDirection = new THREE.Vector3();
      group.current.getWorldDirection(characterDirection);
      characterDirection.negate(); // Camera follows from behind
      
      const targetCameraPosition = new THREE.Vector3()
        .copy(group.current.position)
        .add(
          new THREE.Vector3(
            characterDirection.x * cameraFollowDistance,
            cameraHeight,
            characterDirection.z * cameraFollowDistance
          )
        );
      
      // Initial camera position
      const initialCameraPosition = new THREE.Vector3(5, 8, 10);
      
      // Interpolate between initial and target positions based on scroll
      // Slower transition (0.02 instead of 0.05)
      cameraRef.current.position.lerp(
        scrollProgress < 0.25
          ? initialCameraPosition 
          : targetCameraPosition,
        0.02 // Slower transition for smoother camera movement
      );
      
      // Make camera look at character
      cameraRef.current.lookAt(group.current.position);
    }
  });

  return (
    <>
      <PerspectiveCamera 
        ref={cameraRef}
        makeDefault
        position={[5, 8, 10]}
        fov={50}
      />
      <primitive ref={group} object={scene} scale={1} />
    </>
  );
}
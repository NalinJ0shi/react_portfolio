/**
 * Helper functions for working with 3D models and animations
 */

/**
 * Find animation by name or partial match in a set of animations
 * @param {Array} animations - Array of animation clips
 * @param {string} nameHint - Full or partial name to match
 * @param {number} defaultIndex - Default index to use if no match is found
 * @returns {string} Animation name
 */
export const findAnimationByName = (animations, nameHint, defaultIndex = 0) => {
  if (!animations || animations.length === 0) {
    return null;
  }
  
  // Try to find exact match
  const exactMatch = animations.find(a => 
    a.name.toLowerCase() === nameHint.toLowerCase()
  );
  
  if (exactMatch) {
    return exactMatch.name;
  }
  
  // Try to find partial match
  const partialMatch = animations.find(a => 
    a.name.toLowerCase().includes(nameHint.toLowerCase())
  );
  
  if (partialMatch) {
    return partialMatch.name;
  }
  
  // Return default animation if available
  return animations[defaultIndex]?.name || null;
};

/**
 * Create a smooth transition between animations
 * @param {Object} actions - Animation actions from useAnimations
 * @param {string} current - Current animation name
 * @param {string} next - Next animation name
 * @param {number} duration - Crossfade duration in seconds
 */
export const transitionAnimation = (actions, current, next, duration = 0.5) => {
  if (!actions || !actions[current] || !actions[next]) {
    return;
  }
  
  // Fade out current animation
  actions[current].fadeOut(duration);
  
  // Fade in and play next animation
  actions[next].reset().fadeIn(duration).play();
};

/**
 * Detect common animation names in model
 * @param {Array} animations - Array of animation clips
 * @returns {Object} Object with common animation types mapped to their names
 */
export const detectAnimations = (animations) => {
  if (!animations || animations.length === 0) {
    return {};
  }
  
  const result = {};
  const commonTypes = ['idle', 'walk', 'run', 'jump', 'attack', 'death'];
  
  commonTypes.forEach(type => {
    result[type] = findAnimationByName(animations, type);
  });
  
  return result;
};
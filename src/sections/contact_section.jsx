import { useState, useEffect } from 'react';

export function ContactSection({ scrollProgress }) {
  const [isVisible, setIsVisible] = useState(false);
  
  // Show section when scroll progress reaches a certain threshold
  useEffect(() => {
    if (scrollProgress > 0.65) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [scrollProgress]);
  
  return (
    <section className="h-screen flex items-center justify-center pt-16 relative z-10">
      <div 
        className={`bg-opacity-75 p-6 rounded-lg max-w-lg transition-all duration-700 ease-in-out ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95'
        }`}
      >
        <h2 className="text-4xl font-bold mb-4 text-white">Contact Me</h2>
        <div className="space-y-4">
          <div 
            className="p-4 bg-white bg-opacity-10 rounded text-white flex items-center"
            style={{
              transitionDelay: '100ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 500ms ease, transform 500ms ease'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:your.email@example.com" className="hover:underline">your.email@example.com</a>
          </div>
          
          <div 
            className="p-4 bg-white bg-opacity-10 rounded text-white flex items-center"
            style={{
              transitionDelay: '200ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 500ms ease, transform 500ms ease'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            <a href="https://linkedin.com/in/yourprofile" className="hover:underline">linkedin.com/in/yourprofile</a>
          </div>
        </div>
      </div>
    </section>
  );
}
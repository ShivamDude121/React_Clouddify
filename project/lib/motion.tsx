"use client";

// Simplified motion library for animations
export const motion = {
  div: function MotionDiv({ 
    children, 
    initial, 
    animate, 
    transition, 
    className, 
    ...props 
  }: any) {
    return (
      <div 
        className={`transition-all ${className || ''}`}
        style={{
          opacity: animate?.opacity ?? 1,
          transform: `translateY(${animate?.y ?? 0}px)`,
          transitionDuration: `${transition?.duration ?? 0.3}s`,
          transitionProperty: 'opacity, transform',
          transitionTimingFunction: 'ease-out',
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
};
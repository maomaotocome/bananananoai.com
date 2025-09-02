"use client"
import React from 'react';

// Stable background component to prevent CLS issues
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static gradient orbs - no animation to prevent CLS */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl opacity-80" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl opacity-70" />
      
      {/* Static particles - positioned absolutely to prevent layout shifts */}
      <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-yellow-400/30 rounded-full" />
      <div className="absolute top-[25%] left-[70%] w-2 h-2 bg-yellow-400/20 rounded-full" />
      <div className="absolute top-[40%] left-[15%] w-1 h-1 bg-orange-400/40 rounded-full" />
      <div className="absolute top-[60%] left-[80%] w-2 h-2 bg-yellow-400/25 rounded-full" />
      <div className="absolute top-[75%] left-[30%] w-1 h-1 bg-orange-400/30 rounded-full" />
      <div className="absolute top-[90%] left-[60%] w-2 h-2 bg-yellow-400/35 rounded-full" />
    </div>
  );
};

// Interactive button component with micro-interactions
interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  'data-testid'?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
  'data-testid': dataTestId
}) => {
  return (
    <button
      className={`relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 w-full sm:w-auto min-h-[60px] min-w-[200px] flex items-center justify-center ${
        variant === 'primary' 
          ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white shadow-[0_8px_32px_rgba(255,165,0,0.3)] hover:shadow-[0_12px_40px_rgba(255,165,0,0.5)] hover:transform hover:-translate-y-1' 
          : 'bg-white/70 backdrop-blur-md border border-orange-200/50 text-orange-600 shadow-[0_8px_32px_rgba(255,165,0,0.15)] hover:bg-white/80 hover:text-orange-700 hover:shadow-[0_12px_40px_rgba(255,165,0,0.25)] hover:transform hover:-translate-y-1'
      } ${className}`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};

export default AnimatedBackground;
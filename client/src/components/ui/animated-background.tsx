"use client"
import React from 'react';
import { motion } from 'framer-motion';

// Animated background component for enhanced visual appeal
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs for dynamic background effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute top-1/2 left-3/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -60, 0],
          y: [0, -40, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
        />
      ))}
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
      className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 min-h-[60px] ${
        variant === 'primary' 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]' 
          : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:scale-[1.02]'
      } ${className} active:scale-[0.98]`}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default AnimatedBackground;
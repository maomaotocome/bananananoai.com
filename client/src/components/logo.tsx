
import React from "react";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bananaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* 香蕉主体形状 */}
      <path 
        d="M30 75 Q25 55 30 40 Q35 25 50 20 Q70 15 80 30 Q85 40 80 55 Q75 70 60 80 Q45 85 30 75 Z" 
        fill="url(#bananaGradient)" 
        stroke="#FFB000"
        strokeWidth="1"
      />
      
      {/* 香蕉亮点 */}
      <ellipse 
        cx="45" 
        cy="45" 
        rx="8" 
        ry="15" 
        fill="#FFF" 
        opacity="0.3"
        transform="rotate(-15 45 45)"
      />
      
      {/* AI 科技元素 */}
      <circle cx="50" cy="40" r="3" fill="url(#techGradient)" opacity="0.8" />
      <circle cx="60" cy="55" r="2" fill="url(#techGradient)" opacity="0.6" />
      <circle cx="40" cy="60" r="1.5" fill="url(#techGradient)" opacity="0.7" />
      
      {/* 连接线 */}
      <line x1="50" y1="40" x2="60" y2="55" stroke="url(#techGradient)" strokeWidth="1.5" opacity="0.5" />
      <line x1="60" y1="55" x2="40" y2="60" stroke="url(#techGradient)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

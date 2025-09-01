
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
          <stop offset="30%" stopColor="#FFA500" />
          <stop offset="70%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF6B35" />
        </linearGradient>
        <linearGradient id="nanoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main banana shape */}
      <path 
        d="M25 70 Q20 50 25 35 Q30 20 45 15 Q65 10 75 25 Q80 35 75 50 Q70 65 55 75 Q40 80 25 70 Z" 
        fill="url(#bananaGradient)" 
        filter="url(#glow)"
      />
      
      {/* Banana curve highlight */}
      <path 
        d="M30 60 Q25 45 30 35 Q35 25 45 22 Q55 20 60 30" 
        stroke="#FFF" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.6"
      />
      
      {/* AI circuit pattern overlay */}
      <g opacity="0.4">
        <circle cx="40" cy="35" r="2" fill="url(#nanoGradient)" />
        <circle cx="55" cy="45" r="1.5" fill="url(#nanoGradient)" />
        <circle cx="45" cy="55" r="1" fill="url(#nanoGradient)" />
        <line x1="40" y1="35" x2="55" y2="45" stroke="url(#nanoGradient)" strokeWidth="1" />
        <line x1="55" y1="45" x2="45" y2="55" stroke="url(#nanoGradient)" strokeWidth="1" />
      </g>
      
      {/* Nano sparkles */}
      <g fill="url(#nanoGradient)" opacity="0.8">
        <circle cx="70" cy="20" r="1.5" />
        <circle cx="80" cy="40" r="1" />
        <circle cx="15" cy="30" r="1" />
        <circle cx="85" cy="60" r="1.5" />
      </g>
    </svg>
  );
}

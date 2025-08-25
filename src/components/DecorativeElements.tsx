import React from 'react';

// Botanical flower inspired by brand boards
export const FloralDecor: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-8 h-8", 
  color = "#FCA669" 
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6">
      {/* Petals */}
      <path
        d="M12 8c-1.5-2-4-2-4 0s2.5 2 4 0z"
        fill={color}
        fillOpacity="0.7"
      />
      <path
        d="M16 12c2-1.5 2-4 0-4s-2 2.5 0 4z"
        fill={color}
        fillOpacity="0.7"
      />
      <path
        d="M12 16c1.5 2 4 2 4 0s-2.5-2-4 0z"
        fill={color}
        fillOpacity="0.7"
      />
      <path
        d="M8 12c-2 1.5-2 4 0 4s2-2.5 0-4z"
        fill={color}
        fillOpacity="0.7"
      />
      {/* Center */}
      <circle cx="12" cy="12" r="2" fill={color} fillOpacity="0.8" />
    </g>
  </svg>
);

// Leaf element inspired by botanical patterns
export const LeafDecor: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-6 h-6", 
  color = "#83ABAD" 
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
      <path
        d="M7 20c0-6 2-8 5-8s5 2 5 8c0 0-2.5-2-5-2s-5 2-5 0z"
        fill={color}
        fillOpacity="0.6"
      />
      <path
        d="M12 12v8"
        stroke={color}
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />
    </g>
  </svg>
);

// Star/sparkle element inspired by brand boards
export const StarDecor: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-4 h-4", 
  color = "#FFE28A" 
}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4">
      <path
        d="M12 2l1.5 7.5L21 12l-7.5 1.5L12 22l-1.5-7.5L3 12l7.5-1.5L12 2z"
        fill={color}
        fillOpacity="0.8"
      />
    </g>
  </svg>
);

// Simple botanical branch
export const BranchDecor: React.FC<{ className?: string; color?: string }> = ({ 
  className = "w-12 h-12", 
  color = "#C5D9E7" 
}) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.4">
      {/* Main stem */}
      <path
        d="M24 8v32"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.6"
      />
      {/* Leaves */}
      <path
        d="M24 16c-3-2-6-1-6 2s3 1 6-2z"
        fill={color}
        fillOpacity="0.5"
      />
      <path
        d="M24 16c3-2 6-1 6 2s-3 1-6-2z"
        fill={color}
        fillOpacity="0.5"
      />
      <path
        d="M24 24c-3-2-6-1-6 2s3 1 6-2z"
        fill={color}
        fillOpacity="0.5"
      />
      <path
        d="M24 24c3-2 6-1 6 2s-3 1-6-2z"
        fill={color}
        fillOpacity="0.5"
      />
      <path
        d="M24 32c-3-2-6-1-6 2s3 1 6-2z"
        fill={color}
        fillOpacity="0.5"
      />
      <path
        d="M24 32c3-2 6-1 6 2s-3 1-6-2z"
        fill={color}
        fillOpacity="0.5"
      />
    </g>
  </svg>
);

// Decorative border element
export const FloralBorder: React.FC<{ className?: string }> = ({ 
  className = "w-full h-8" 
}) => (
  <div className={`${className} flex items-center justify-center space-x-4 opacity-30`}>
    <LeafDecor color="#83ABAD" />
    <FloralDecor color="#FCA669" className="w-6 h-6" />
    <StarDecor color="#FFE28A" />
    <FloralDecor color="#F48EAB" className="w-6 h-6" />
    <LeafDecor color="#C5D9E7" />
  </div>
);

// Section divider with botanical elements
export const SectionDivider: React.FC<{ className?: string }> = ({ 
  className = "my-16" 
}) => (
  <div className={`${className} flex items-center justify-center`}>
    <div className="flex items-center space-x-3 opacity-20">
      <div className="h-px bg-coral-200 w-16"></div>
      <FloralDecor color="#FCA669" className="w-8 h-8" />
      <div className="h-px bg-coral-200 w-16"></div>
    </div>
  </div>
);

// Floating decorative elements for backgrounds
export const FloatingDecor: React.FC<{ className?: string }> = ({ 
  className = "absolute inset-0 pointer-events-none overflow-hidden" 
}) => (
  <div className={className}>
    {/* Top left area */}
    <div className="absolute top-20 left-10 opacity-20">
      <FloralDecor color="#FCA669" className="w-12 h-12" />
    </div>
    <div className="absolute top-40 left-32 opacity-15">
      <LeafDecor color="#83ABAD" className="w-8 h-8" />
    </div>
    <div className="absolute top-60 left-16 opacity-10">
      <StarDecor color="#FFE28A" className="w-6 h-6" />
    </div>
    
    {/* Top right area */}
    <div className="absolute top-32 right-20 opacity-20">
      <BranchDecor color="#C5D9E7" className="w-16 h-16" />
    </div>
    <div className="absolute top-56 right-40 opacity-15">
      <FloralDecor color="#F48EAB" className="w-10 h-10" />
    </div>
    
    {/* Bottom left area */}
    <div className="absolute bottom-40 left-24 opacity-15">
      <LeafDecor color="#C5E1E0" className="w-10 h-10" />
    </div>
    <div className="absolute bottom-60 left-48 opacity-10">
      <StarDecor color="#FDD19C" className="w-5 h-5" />
    </div>
    
    {/* Bottom right area */}
    <div className="absolute bottom-32 right-16 opacity-20">
      <FloralDecor color="#EAE3EA" className="w-14 h-14" />
    </div>
    <div className="absolute bottom-56 right-32 opacity-15">
      <LeafDecor color="#E4CEDB" className="w-8 h-8" />
    </div>
  </div>
);
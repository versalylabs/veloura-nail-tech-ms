import React, { useState, useRef, useId } from 'react';

export interface LiquidGlassSurfaceProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  blur?: number; // Blur intensity in px
  backgroundOpacity?: number; // Opacity of tinted glass
  distortionScale?: number; // Displacement scale for liquid refraction
  tint?: 'light' | 'dark' | 'gold' | 'champagne';
  interactive?: boolean; // Follows cursor for liquid specular highlight
  refractionHighlight?: boolean;
  borderGlow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * LiquidGlassSurface (Inspired by React Bits Glass Surface & Fluid Glass)
 * Provides Apple-style physics glassmorphism with dynamic liquid refraction,
 * specular edge lighting, and interactive cursor sheen.
 */
export const LiquidGlassSurface: React.FC<LiquidGlassSurfaceProps> = ({
  children,
  className = '',
  contentClassName = '',
  blur = 16,
  backgroundOpacity = 0.2,
  distortionScale = 10,
  tint = 'light',
  interactive = true,
  refractionHighlight = true,
  borderGlow = true,
  onClick,
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterId = useId().replace(/:/g, '_');
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  // Tint palette variables
  const tintConfigs = {
    light: {
      bg: `rgba(255, 255, 255, ${backgroundOpacity})`,
      border: 'rgba(255, 255, 255, 0.45)',
      sheen: 'rgba(255, 255, 255, 0.5)',
      shadow: '0 12px 36px -6px rgba(140, 109, 70, 0.12), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.65), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
      glow: 'rgba(197, 168, 128, 0.25)',
    },
    dark: {
      bg: `rgba(25, 23, 22, ${Math.max(backgroundOpacity, 0.45)})`,
      border: 'rgba(197, 168, 128, 0.3)',
      sheen: 'rgba(197, 168, 128, 0.35)',
      shadow: '0 16px 40px -8px rgba(0, 0, 0, 0.5), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.6)',
      glow: 'rgba(197, 168, 128, 0.35)',
    },
    gold: {
      bg: `rgba(197, 168, 128, ${Math.max(backgroundOpacity, 0.18)})`,
      border: 'rgba(234, 216, 199, 0.55)',
      sheen: 'rgba(255, 245, 230, 0.6)',
      shadow: '0 16px 40px -8px rgba(140, 109, 70, 0.2), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.7), inset 0 -1px 2px 0 rgba(140, 109, 70, 0.15)',
      glow: 'rgba(213, 185, 144, 0.4)',
    },
    champagne: {
      bg: `rgba(250, 248, 245, ${Math.max(backgroundOpacity, 0.35)})`,
      border: 'rgba(255, 255, 255, 0.65)',
      sheen: 'rgba(255, 255, 255, 0.6)',
      shadow: '0 12px 32px -4px rgba(74, 68, 62, 0.08), inset 0 1px 1px 0 rgba(255, 255, 255, 0.8), inset 0 -1px 1px 0 rgba(140, 109, 70, 0.08)',
      glow: 'rgba(234, 216, 199, 0.3)',
    },
  };

  const currentConfig = tintConfigs[tint];

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: currentConfig.bg,
        backdropFilter: `blur(${blur}px) saturate(160%)`,
        WebkitBackdropFilter: `blur(${blur}px) saturate(160%)`,
        border: `1px solid ${currentConfig.border}`,
        boxShadow: currentConfig.shadow,
        ...style,
      }}
    >
      {/* SVG Liquid Refraction Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={`liquid-filter-${filterId}`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.03"
              numOctaves="2"
              result="noise"
              seed="17"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top Refraction Prism Highlight Edge */}
      {refractionHighlight && (
        <div 
          className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-10 opacity-70"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 30%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.8) 70%, transparent 100%)',
          }}
        />
      )}

      {/* Interactive Liquid Specular Sheen (Moves with Cursor) */}
      {interactive && mousePos.isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${currentConfig.sheen} 0%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Subtle Ambient Liquid Wave Undercurrent */}
      <div 
        className="absolute -inset-full opacity-35 pointer-events-none z-0 transform -rotate-12 animate-pulse"
        style={{
          background: 'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.25) 50%, transparent 60%)',
          transition: 'transform 0.8s ease',
        }}
      />

      {/* Border Corner Glow */}
      {borderGlow && (
        <div
          className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none blur-2xl opacity-40"
          style={{ backgroundColor: currentConfig.glow }}
        />
      )}

      {/* Content Canvas */}
      <div className={`relative z-20 w-full h-full ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface HeroBeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
}

export const HeroBeforeAfter: React.FC<HeroBeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-[16/10]',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl group`}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (background layer) */}
      <img
        src={afterImage}
        alt="After Build2Flow Digital transformation"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-md bg-[#080D16]/80 backdrop-blur-md border border-[#E5B94F]/40 text-[#E5B94F] text-xs font-bold tracking-wider uppercase">
        {afterLabel}
      </div>

      {/* Before image (clipped overlay) */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImage}
          alt="Before Build2Flow Digital transformation"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: '100%', minWidth: '100%', height: '100%' }}
        />
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-wider uppercase">
          {beforeLabel}
        </div>
      </div>

      {/* Center divider line & handle */}
      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-[#E5B94F] shadow-[0_0_12px_#E5B94F]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#E5B94F] text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* Drag instruction badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[11px] text-white/70 font-medium pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        Drag slider to compare
      </div>
    </div>
  );
};

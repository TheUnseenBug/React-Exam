import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomSliderProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const CustomSlider = ({
  min,
  max,
  value,
  step = 1,
  onChange,
  className,
}: CustomSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const width = rect.width;
      const left = rect.left;

      let newPercentage = ((clientX - left) / width) * 100;
      newPercentage = Math.max(0, Math.min(100, newPercentage));

      const newValue =
        Math.round(((newPercentage / 100) * (max - min)) / step) * step + min;
      onChange?.(newValue);
    },
    [min, max, step, onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative h-1  group cursor-pointer rounded-full",
        className
      )}
      onMouseDown={handleMouseDown}
    >
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-white/20" />

      {/* Filled track */}
      <div
        className="absolute h-full bg-white rounded-full"
        style={{ width: `${percentage}%` }}
      />

      {/* Thumb */}
      <div
        className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full opacity-0 group-hover:opacity-100 top-1/2"
        style={{ left: `${percentage}%` }}
      />
    </div>
  );
};

export default CustomSlider;

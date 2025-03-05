import React, { useEffect, useRef } from 'react';
import rangesliderJs from 'rangeslider-js';
import './main.css';
import { executeClient } from '#/shared/api/rage';

interface RangeSliderProps {
  id?: string;
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
  className?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  id = `slider-${Math.random().toString(36).substring(2, 9)}`,
  min,
  max,
  value,
  step = 1,
  onChange,
  onChangeStart,
  onChangeEnd,
  className = ''
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const instanceRef = useRef<any>(null);

  // Initialize rangeslider
  useEffect(() => {
    if (!sliderRef.current) return;

    // Clean up any existing instance
    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    try {
      // Create new instance
      instanceRef.current = rangesliderJs.create(sliderRef.current, {
        min,
        max,
        value,
        step,
        onSlide: (value: number | string) => {
          // Ensure value is a number before calling onChange
          const numericValue = typeof value === 'string' ? parseFloat(value) : value;
          onChange(numericValue);
          executeClient("client.camera.toggled", false);
        },
        onSlideStart: () => {
          if (onChangeStart) onChangeStart();
          executeClient("client.camera.toggled", false);
        },
        onSlideEnd: () => {
          if (onChangeEnd) onChangeEnd();
          executeClient("client.camera.toggled", true);
        }
      });
    } catch (error) {
      console.error("Failed to initialize rangeslider:", error);
    }

    return () => {
      try {
        if (instanceRef.current) {
          instanceRef.current.destroy();
          instanceRef.current = null;
        }
      } catch (error) {
        console.error("Error cleaning up rangeslider:", error);
      }
    };
  }, [min, max, step, onChange, onChangeStart, onChangeEnd]); // Added callbacks to dependencies

  // Update value if it changes externally
  useEffect(() => {
    try {
      if (instanceRef.current && instanceRef.current.value !== value) {
        instanceRef.current.update({ value });
      }
    } catch (error) {
      console.error("Error updating rangeslider value:", error);
    }
  }, [value]);

  return (
    <input
      ref={sliderRef}
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      className={className || 'rangeslider-js'}
      readOnly // Let the library handle changes
    />
  );
};

export default RangeSlider;
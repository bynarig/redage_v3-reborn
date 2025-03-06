import React, { useEffect, useRef } from 'react';
import rangeslider from 'rangeslider-js';
import { executeClient } from '#/shared/api/rage';

interface InputItemProps {
  id: string;
  style?: string;
  leftText?: string;
  centerText?: string;
  rightText?: string;
  min: number;
  max: number;
  step?: number;
  callback: (value: number) => void;
  value: number;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  style = '',
  leftText = '',
  centerText = '',
  rightText = '',
  min,
  max,
  step = 1,
  callback,
  value
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sliderInstanceRef = useRef<any>(null);

  // Initialize rangeslider
  useEffect(() => {
    if (!inputRef.current) return;
    
    // Don't re-initialize if slider already exists
    if (sliderInstanceRef.current) return;
    
    try {
      // Create new slider instance
      sliderInstanceRef.current = rangeslider.create(inputRef.current, {
        min: min,
        max: max, 
        value: value, 
        step: step,
        onSlide: (value: number | string) => {
          callback(Number(value));
          executeClient("client.camera.toggled", false);
        },
        onSlideStart: () => {
          executeClient("client.camera.toggled", false);
        },
        onSlideEnd: () => {
          executeClient("client.camera.toggled", true);
        },
      });
    } catch (error) {
      console.error("Failed to initialize rangeslider:", error);
    }

    // Cleanup function
    return () => {
      try {
        if (sliderInstanceRef.current) {
          sliderInstanceRef.current.destroy();
          sliderInstanceRef.current = null;
        }
      } catch (error) {
        console.error("Error cleaning up rangeslider:", error);
      }
    };
  }, [min, max, step, id]); // Re-initialize if these core props change

  // Update value if it changes externally
  useEffect(() => {
    try {
      if (sliderInstanceRef.current && sliderInstanceRef.current.value !== value) {
        sliderInstanceRef.current.update({ value: value });
      }
    } catch (error) {
      console.error("Error updating rangeslider value:", error);
    }
  }, [value]);

  return (
    <div className={`slider ${style}`}>
      <input 
        ref={inputRef}
        type="range" 
        id={id} 
        min={min}
        max={max}
        step={step}
        value={value}
        readOnly
      />
      <div className="info">
        <span>{leftText}</span>
        <span>{centerText}</span>
        <span>{rightText}</span>
      </div>
    </div>
  );
};

export default InputItem;
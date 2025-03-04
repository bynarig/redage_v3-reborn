import React, { useEffect, useRef } from 'react';
import { executeClient } from '#api/rage';

interface InputItemProps {
  id: string;
  leftText: string;
  centerText?: string;
  rightText: string;
  min: number;
  max: number;
  step: number;
  value: number;
  callback: (value: number) => void;
  className?: string;
}

const InputItem: React.FC<InputItemProps> = ({
  id,
  leftText,
  centerText,
  rightText,
  min,
  max,
  step,
  value,
  callback,
  className,
}) => {
  const rangeRef = useRef<HTMLInputElement>(null);

  // Handle value changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    callback(newValue);
  };

  // Handle camera toggling
  const handleInteractionStart = () => executeClient("client.camera.toggled", false);
  const handleInteractionEnd = () => executeClient("client.camera.toggled", true);

  return (
    <div className={`w-full ${className || ''}`}>
      <input
        ref={rangeRef}
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        className="range range-primary w-full"
      />
      <div className="flex justify-between text-xs mt-1 px-2">
        <span>{leftText}</span>
        {centerText && <span>{centerText}</span>}
        <span>{rightText}</span>
      </div>
    </div>
  );
};

export default InputItem;
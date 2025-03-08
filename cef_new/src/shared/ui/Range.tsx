import React, { forwardRef, ChangeEvent, useState, useEffect } from 'react';
import clsx from 'clsx';

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

export interface RangeProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Current value (controlled component) */
  value?: number;
  /** Default value (uncontrolled component) */
  defaultValue?: number;
  /** Step increment */
  step?: number;
  /** Handler for value changes */
  onChange?: (value: number, event: ChangeEvent<HTMLInputElement>) => void;
  /** DaisyUI color variant */
  color?: ColorVariant;
  /** Size variant */
  size?: SizeVariant;
  /** Whether to show step markers */
  showSteps?: boolean;
  /** Number of steps to show (default: auto-calculated based on step) */
  stepCount?: number;
  /** Label for the range input */
  label?: string;
  /** Whether to show min/max labels */
  showMinMaxLabels?: boolean;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Format function for displayed values */
  formatValue?: (value: number) => string;
  /** Custom CSS class */
  className?: string;
  /** Whether to take full width */
  fullWidth?: boolean;
  /** Whether the range is disabled */
  disabled?: boolean;
  /** Helper text to show beneath the range */
  helperText?: string;
  /** Additional class for the container */
  containerClassName?: string;
  /** ID for the input element */
  id?: string;
  /** Whether to show tooltips on hover/focus */
  showTooltip?: boolean;
  /** Custom tooltip format */
  tooltipFormat?: (value: number) => string;
  /** Custom min label */
  minLabel?: string;
  /** Custom max label */
  maxLabel?: string;
}

/**
 * Reusable DaisyUI Range component
 * 
 * @example
 * // Basic usage
 * <Range min={0} max={100} defaultValue={50} onChange={(value) => console.log(value)} />
 * 
 * @example
 * // With steps and labels
 * <Range
 *   min={0}
 *   max={100}
 *   step={10}
 *   showSteps
 *   showMinMaxLabels
 *   showValue
 *   color="secondary"
 * />
 * 
 * @example
 * // With formatted value
 * <Range
 *   min={0}
 *   max={1000}
 *   formatValue={(value) => `$${value.toFixed(2)}`}
 *   showValue
 *   showTooltip
 * />
 */
const Range = forwardRef<HTMLInputElement, RangeProps>(({
  min,
  max,
  value,
  defaultValue,
  step = 1,
  onChange,
  color = 'primary',
  size,
  showSteps = false,
  stepCount,
  label,
  showMinMaxLabels = false,
  showValue = false,
  formatValue = (value: number) => value.toString(),
  className = '',
  fullWidth = false,
  disabled = false,
  helperText,
  containerClassName = '',
  id,
  showTooltip = false,
  tooltipFormat,
  minLabel,
  maxLabel,
  ...rest
}, ref) => {
  // For controlled component
  const [currentValue, setCurrentValue] = useState<number>(
    value !== undefined ? value : (defaultValue !== undefined ? defaultValue : min)
  );
  
  // Update internal state when controlled value changes
  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);
  
  // Generate a unique ID if not provided
  const rangeId = id || `range-${Math.random().toString(36).substring(2, 9)}`;
  
  // Calculate step markers based on step value or provided count
  const calculateSteps = () => {
    if (!showSteps) return [];
    
    const count = stepCount || Math.floor((max - min) / step) + 1;
    // Limit to a reasonable number of steps to prevent performance issues
    const limitedCount = Math.min(count, 20);
    
    return Array.from({ length: limitedCount }, (_, i) => i);
  };
  
  const steps = calculateSteps();
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setCurrentValue(newValue);
    
    if (onChange) {
      onChange(newValue, e);
    }
  };
  
  const containerClasses = clsx(
    'form-control',
    fullWidth && 'w-full',
    containerClassName
  );
  
  const rangeClasses = clsx(
    'range',
    `range-${color}`,
    size && `range-${size}`,
    showSteps && steps.length > 0 && 'range-xs',
    className
  );
  
  const getTooltipText = () => {
    if (tooltipFormat) {
      return tooltipFormat(currentValue);
    }
    return formatValue(currentValue);
  };
  
  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={rangeId} className="label">
          <span className="label-text">{label}</span>
          {showValue && (
            <span className="label-text-alt">{formatValue(currentValue)}</span>
          )}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type="range"
          id={rangeId}
          min={min}
          max={max}
          step={step}
          value={value !== undefined ? value : undefined}
          defaultValue={value !== undefined ? undefined : defaultValue}
          onChange={handleChange}
          className={rangeClasses}
          disabled={disabled}
          data-tooltip={showTooltip ? getTooltipText() : undefined}
          data-tooltip-position="top"
          {...rest}
        />
        
        {showSteps && (
          <div className="flex w-full px-2 justify-between mt-2">
            {steps.map((_, index) => (
              <span 
                key={index} 
                className="w-1 h-1 bg-base-content rounded-full opacity-50"
              />
            ))}
          </div>
        )}
      </div>
      
      {showMinMaxLabels && (
        <div className="flex justify-between px-2 mt-1">
          <span className="text-xs opacity-70">{minLabel || formatValue(min)}</span>
          <span className="text-xs opacity-70">{maxLabel || formatValue(max)}</span>
        </div>
      )}
      
      {helperText && (
        <label className="label">
          <span className="label-text-alt">{helperText}</span>
        </label>
      )}
    </div>
  );
});

Range.displayName = 'Range';

export default Range;
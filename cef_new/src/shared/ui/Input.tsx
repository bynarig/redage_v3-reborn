import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input label */
  label?: string;
  /** Label position */
  labelPosition?: 'top' | 'left' | 'floating';
  /** Input type */
  type?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Input value */
  value?: string | number;
  /** Default input value */
  defaultValue?: string | number;
  /** Handler for value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Input size variant */
  size?: SizeVariant;
  /** Input color variant */
  color?: ColorVariant;
  /** Whether the input has an error */
  hasError?: boolean;
  /** Error message text */
  errorMessage?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Whether to apply bordered style */
  bordered?: boolean;
  /** Icon to show at the start of the input */
  startIcon?: ReactNode;
  /** Icon to show at the end of the input */
  endIcon?: ReactNode;
  /** Helper text to show beneath the input */
  helperText?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional CSS class for the container */
  containerClassName?: string;
  /** ID for the input element */
  id?: string;
  /** Name for the input element */
  name?: string;
  /** Whether to take full width */
  fullWidth?: boolean;
  /** Maximum length of input */
  maxLength?: number;
  /** Minimum length of input */
  minLength?: number;
  /** Pattern for input validation */
  pattern?: string;
  /** Whether input has glass effect */
  glass?: boolean;
}

/**
 * Reusable DaisyUI Input component
 * 
 * @example
 * // Basic usage
 * <Input placeholder="Enter your name" />
 * 
 * @example
 * // With label and error
 * <Input 
 *   label="Email" 
 *   type="email"
 *   required
 *   hasError
 *   errorMessage="Please enter a valid email"
 * />
 * 
 * @example
 * // With icons and helper text
 * <Input
 *   label="Password"
 *   type="password"
 *   startIcon={<LockIcon />}
 *   endIcon={<EyeIcon />}
 *   helperText="Password must be at least 8 characters"
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  labelPosition = 'top',
  type = 'text',
  placeholder = 'Type here',
  value,
  defaultValue,
  onChange,
  size,
  color,
  hasError = false,
  errorMessage,
  disabled = false,
  readOnly = false,
  required = false,
  bordered = true,
  startIcon,
  endIcon,
  helperText,
  className = '',
  containerClassName = '',
  id,
  name,
  fullWidth = false,
  maxLength,
  minLength,
  pattern,
  glass = false,
  ...rest
}, ref) => {
  // Generate a unique ID if not provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const inputClasses = clsx(
    'input',
    // Base styles
    bordered && 'input-bordered',
    glass && 'glass',
    
    // Size variants
    size && `input-${size}`,
    
    // Color and state variants
    color && `input-${color}`,
    hasError && 'input-error',
    
    // Width
    fullWidth && 'w-full',
    
    // Custom classes
    className
  );

  const containerClasses = clsx(
    'form-control',
    labelPosition === 'left' && 'flex-row items-center gap-2',
    fullWidth && 'w-full',
    containerClassName
  );

  // Render the appropriate label based on labelPosition
  const renderLabel = () => {
    if (!label) return null;
    
    return (
      <label 
        htmlFor={inputId}
        className={clsx(
          'label',
          labelPosition === 'floating' && 'label-floating',
          labelPosition === 'left' && 'label-text mb-0 min-w-fit'
        )}
      >
        <span className="label-text">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </span>
      </label>
    );
  };

  return (
    <div className={containerClasses}>
      {labelPosition !== 'floating' && renderLabel()}
      
      <div className="relative w-full">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={clsx(
            inputClasses,
            startIcon && 'pl-10',
            endIcon && 'pr-10'
          )}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          id={inputId}
          name={name}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          {...rest}
        />
        
        {labelPosition === 'floating' && renderLabel()}
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
      
      {(helperText || errorMessage) && (
        <label className="label">
          {helperText && !hasError && (
            <span className="label-text-alt">{helperText}</span>
          )}
          {hasError && errorMessage && (
            <span className="label-text-alt text-error">{errorMessage}</span>
          )}
        </label>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
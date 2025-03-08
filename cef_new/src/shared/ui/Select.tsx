import React, { forwardRef, SelectHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

// Option type for select items
export interface SelectOption {
  value: string;
  label: string | ReactNode;
  disabled?: boolean;
  selected?: boolean;
  description?: string;
}

// Group type for option groups
export interface OptionGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  /** Options for the select dropdown */
  options: SelectOption[] | OptionGroup[];
  /** Handler for selection changes */
  onChange?: (value: string, event: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Input label */
  label?: string;
  /** Label position */
  labelPosition?: 'top' | 'left';
  /** Helper text to display beneath the select */
  helperText?: string;
  /** Whether the select has an error */
  hasError?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** DaisyUI color variant */
  color?: ColorVariant;
  /** Size variant */
  size?: SizeVariant;
  /** Whether the select is bordered */
  bordered?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Placeholder text for empty selection */
  placeholder?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional CSS class for the container */
  containerClassName?: string;
  /** Whether to take full width */
  fullWidth?: boolean;
  /** ID for the select element */
  id?: string;
  /** Whether to show loading state */
  loading?: boolean;
  /** Icon to show at the start of the select */
  startIcon?: ReactNode;
  /** Whether options are grouped */
  isGrouped?: boolean;
  /** Default selected value */
  defaultValue?: string;
  /** Current selected value (controlled component) */
  value?: string;
  /** Whether the select has glass effect */
  glass?: boolean;
  /** Multiple selection mode */
  multiple?: boolean;
  /** Number of visible items when multiple is true */
  size2?: number;
}

/**
 * Reusable DaisyUI Select component
 * 
 * @example
 * // Basic usage
 * <Select 
 *   options={[
 *     { value: "1", label: "Option 1" },
 *     { value: "2", label: "Option 2" }
 *   ]} 
 *   onChange={(value) => console.log(value)}
 * />
 * 
 * @example
 * // With grouped options
 * <Select 
 *   options={[
 *     { 
 *       label: "Group 1", 
 *       options: [
 *         { value: "1.1", label: "Option 1.1" },
 *         { value: "1.2", label: "Option 1.2" }
 *       ]
 *     },
 *     { 
 *       label: "Group 2", 
 *       options: [
 *         { value: "2.1", label: "Option 2.1" },
 *         { value: "2.2", label: "Option 2.2" }
 *       ]
 *     }
 *   ]}
 *   isGrouped
 * />
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  onChange,
  label,
  labelPosition = 'top',
  helperText,
  hasError = false,
  errorMessage,
  color,
  size,
  bordered = true,
  disabled = false,
  required = false,
  placeholder,
  className = '',
  containerClassName = '',
  fullWidth = false,
  id,
  loading = false,
  startIcon,
  isGrouped = false,
  defaultValue,
  value,
  glass = false,
  multiple = false,
  size2,
  ...rest
}, ref) => {
  // Generate a unique ID if not provided
  const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value, e);
    }
  };
  
  const containerClasses = clsx(
    'form-control',
    labelPosition === 'left' && 'flex-row items-center gap-2',
    fullWidth && 'w-full',
    containerClassName
  );
  
  const selectClasses = clsx(
    'select',
    // Base styles
    bordered && 'select-bordered',
    glass && 'glass',
    
    // Size variants
    size && `select-${size}`,
    
    // Color and state variants
    color && `select-${color}`,
    hasError && 'select-error',
    
    // Loading state
    loading && 'animate-pulse',
    
    // Width
    fullWidth && 'w-full',
    
    // Custom classes
    className
  );

  // Check if options are grouped or not
  const isGroupedOptions = (opt: SelectOption[] | OptionGroup[]): opt is OptionGroup[] => {
    return isGrouped && opt.length > 0 && 'options' in opt[0];
  };
  
  // Render options depending on whether they're grouped or not
  const renderOptions = () => {
    if (isGroupedOptions(options)) {
      return options.map((group, groupIndex) => (
        <optgroup key={`group-${groupIndex}`} label={group.label} disabled={group.disabled}>
          {group.options.map((option, optionIndex) => (
            <option
              key={`option-${groupIndex}-${optionIndex}`}
              value={option.value}
              disabled={option.disabled}
              selected={option.selected}
            >
              {option.label}
            </option>
          ))}
        </optgroup>
      ));
    } else {
      return options.map((option, index) => (
        <option
          key={`option-${index}`}
          value={option.value}
          disabled={option.disabled}
          selected={option.selected}
        >
          {option.label}
        </option>
      ));
    }
  };
  
  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label htmlFor={selectId} className={clsx('label', labelPosition === 'left' && 'min-w-fit mb-0')}>
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      
      {/* Select with optional icon */}
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={clsx(selectClasses, startIcon && 'pl-10')}
          onChange={handleChange}
          disabled={disabled || loading}
          required={required}
          defaultValue={defaultValue}
          value={value}
          multiple={multiple}
          size={multiple ? size2 : undefined}
          {...rest}
        >
          {placeholder && !multiple && (
            <option value="" disabled selected={!value && !defaultValue}>
              {placeholder}
            </option>
          )}
          {renderOptions()}
        </select>
        
        {loading && !startIcon && (
          <div className="absolute inset-y-0 left-3 flex items-center">
            <div className="loading loading-spinner loading-sm"></div>
          </div>
        )}
      </div>
      
      {/* Helper text or error message */}
      {(helperText || (hasError && errorMessage)) && (
        <label className="label">
          <span className={clsx('label-text-alt', hasError && 'text-error')}>
            {hasError && errorMessage ? errorMessage : helperText}
          </span>
        </label>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
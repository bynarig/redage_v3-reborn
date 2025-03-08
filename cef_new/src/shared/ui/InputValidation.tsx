import React, { forwardRef, useState, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'ghost';

// Valid input types with predefined validation patterns
type ValidationType = 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'date' | 'time' | 'search' | 'username';

// Validation rules for common input types
const validationData = {
  email: {
    placeholder: 'mail@example.com',
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    hint: 'Please enter a valid email address',
  },
  password: {
    placeholder: 'Password',
    pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
    hint: 'Password must contain at least 8 characters, including uppercase, lowercase letters and numbers',
  },
  tel: {
    placeholder: 'Phone number',
    pattern: '[0-9]{10,}',
    hint: 'Please enter a valid phone number (minimum 10 digits)',
  },
  url: {
    placeholder: 'https://example.com',
    pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
    hint: 'Please enter a valid URL',
  },
  username: {
    placeholder: 'Username',
    pattern: '^[a-zA-Z0-9_]{3,20}$',
    hint: 'Username must be 3-20 characters and may contain letters, numbers, and underscores',
  },
  text: {
    placeholder: 'Type here',
  },
  number: {
    placeholder: '0',
    hint: 'Please enter a valid number',
  },
  date: {
    placeholder: 'YYYY-MM-DD',
  },
  time: {
    placeholder: 'HH:MM',
  },
  search: {
    placeholder: 'Search...',
  },
};

export interface InputValidationProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Input type with predefined validation */
  type: ValidationType;
  /** Custom placeholder text */
  placeholder?: string;
  /** Custom validation pattern */
  pattern?: string;
  /** Whether to show hint text */
  showHint?: boolean;
  /** Custom hint text */
  hint?: string;
  /** Additional CSS class for the input */
  className?: string;
  /** Additional CSS class for the container */
  containerClassName?: string;
  /** Input label */
  label?: string;
  /** Label position */
  labelPosition?: 'top' | 'left' | 'floating';
  /** Input size variant */
  size?: SizeVariant;
  /** Input color variant */
  color?: ColorVariant;
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
  /** Whether to take full width */
  fullWidth?: boolean;
  /** Whether to show validation state */
  showValidation?: boolean;
  /** Custom validation callback */
  customValidator?: (value: string) => { isValid: boolean; message?: string };
  /** Whether input has glass effect */
  glass?: boolean;
  /** Whether to use material design style floating label */
  materialStyle?: boolean;
  /** Input value */
  value?: string;
  /** Default input value */
  defaultValue?: string;
  /** Handler for value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for valid input */
  onValid?: () => void;
  /** Handler for invalid input */
  onInvalid?: () => void;
}

/**
 * Reusable DaisyUI Input Validation component with built-in patterns
 * 
 * @example
 * // Basic email validation
 * <InputValidation type="email" showHint />
 * 
 * @example
 * // Password with custom validation
 * <InputValidation 
 *   type="password"
 *   label="Create Password"
 *   showHint
 *   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{10,}"
 *   hint="Password must have at least 10 characters with uppercase, lowercase, numbers and special chars"
 * />
 * 
 * @example
 * // Phone with icons and custom validation
 * <InputValidation
 *   type="tel"
 *   startIcon={<PhoneIcon />}
 *   showValidation
 *   customValidator={(value) => {
 *     const isValid = value.length >= 10 && /^[0-9]+$/.test(value);
 *     return { isValid, message: isValid ? "Valid phone number" : "Invalid phone format" };
 *   }}
 * />
 */
const InputValidation = forwardRef<HTMLInputElement, InputValidationProps>(({
  type = 'text',
  placeholder,
  pattern,
  showHint = false,
  hint,
  className = '',
  containerClassName = '',
  label,
  labelPosition = 'top',
  size,
  color,
  disabled = false,
  readOnly = false,
  required = true, // Default to required for validation inputs
  bordered = true,
  startIcon,
  endIcon,
  fullWidth = false,
  showValidation = false,
  customValidator,
  glass = false,
  materialStyle = false,
  value,
  defaultValue,
  onChange,
  onValid,
  onInvalid,
  ...rest
}, ref) => {
  const [inputValue, setInputValue] = useState(value || defaultValue || '');
  const [touched, setTouched] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  // Get the validation data for the input type
  const typeData = validationData[type] || validationData.text;
  
  // Only use pattern if provided or available in the validation data
  const inputPattern = pattern || typeData?.pattern;
  
  // Use the provided hint or the default hint for the input type
  const hintText = hint || typeData?.hint;
  
  // Generate a unique ID for the input
  const inputId = rest.id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (onChange) {
      onChange(e);
    }
    
    // Perform validation if showValidation is true
    if (showValidation) {
      validateInput(newValue);
    }
  };
  
  // Handle blur event
  const handleBlur = () => {
    setTouched(true);
    validateInput(inputValue);
  };
  
  // Validate the input
  const validateInput = (val: string) => {
    if (customValidator) {
      // Use custom validator if provided
      const result = customValidator(val);
      setIsValid(result.isValid);
      setValidationMessage(result.message || '');
      
      if (result.isValid && onValid) onValid();
      if (!result.isValid && onInvalid) onInvalid();
    } else if (inputPattern) {
      // Use pattern validation
      const regex = new RegExp(inputPattern);
      const valid = regex.test(val);
      setIsValid(valid);
      
      if (valid && onValid) onValid();
      if (!valid && onInvalid) onInvalid();
    } else if (type === 'email') {
      // Default email validation
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      const valid = emailRegex.test(val);
      setIsValid(valid);
      
      if (valid && onValid) onValid();
      if (!valid && onInvalid) onInvalid();
    }
  };
  
  const inputClasses = clsx(
    'input',
    // Base styles
    bordered && 'input-bordered',
    glass && 'glass',
    materialStyle && 'input-bordered focus:outline-none',
    
    // Size variants
    size && `input-${size}`,
    
    // Color and state variants
    color && `input-${color}`,
    touched && !isValid && showValidation && 'input-error',
    touched && isValid && showValidation && 'input-success',
    
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
          labelPosition === 'left' && 'label-text mb-0 min-w-fit',
          materialStyle && 'absolute left-2 top-0 -translate-y-1/2 bg-base-100 px-2 text-xs transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs'
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
      {labelPosition !== 'floating' && !materialStyle && renderLabel()}
      
      <div className="relative w-full">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          placeholder={placeholder || typeData?.placeholder}
          pattern={inputPattern}
          className={clsx(
            inputClasses,
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            materialStyle && 'peer' // For material design style
          )}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        
        {(labelPosition === 'floating' || materialStyle) && renderLabel()}
        
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
      
      {/* Show validation message or hint */}
      {((showHint && hintText) || (touched && showValidation && validationMessage)) && (
        <label className="label">
          <span className={clsx(
            'label-text-alt',
            touched && !isValid && showValidation && 'text-error',
            touched && isValid && showValidation && 'text-success'
          )}>
            {touched && showValidation && validationMessage ? validationMessage : (showHint && hintText)}
          </span>
        </label>
      )}
    </div>
  );
});

InputValidation.displayName = 'InputValidation';

export default InputValidation;
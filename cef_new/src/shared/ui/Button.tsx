import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx'; // Make sure to install clsx: npm install clsx

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost' | 'link';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

// DaisyUI shape variants
type ShapeVariant = 'circle' | 'square';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Button content */
  children?: ReactNode;
  /** Button text (alternative to children) */
  text?: string;
  /** Icon element to display before text */
  startIcon?: ReactNode;
  /** Icon element to display after text */
  endIcon?: ReactNode;
  /** DaisyUI color variant */
  color?: ColorVariant;
  /** Size variant */
  size?: SizeVariant;
  /** Shape variant */
  shape?: ShapeVariant;
  /** Applies glass effect */
  glass?: boolean;
  /** Applies outline style */
  outline?: boolean;
  /** Applies active state */
  active?: boolean;
  /** Disables the button */
  disabled?: boolean;
  /** Makes the button full width */
  fullWidth?: boolean;
  /** Shows loading spinner */
  loading?: boolean;
  /** Applies no animation */
  noAnimation?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Reusable DaisyUI Button component
 * 
 * @example
 * // Basic usage
 * <Button color="primary" text="Click me" />
 * 
 * @example
 * // With icons
 * <Button 
 *   color="success"
 *   startIcon={<FaCheck />}
 *   endIcon={<FaArrowRight />}
 * >
 *   Confirm
 * </Button>
 * 
 * @example
 * // Loading state
 * <Button loading color="primary">Loading</Button>
 */
const Button = ({
  children,
  text,
  startIcon,
  endIcon,
  color = 'primary',
  size,
  shape,
  glass = false,
  outline = false,
  active = false,
  disabled = false,
  fullWidth = false,
  loading = false,
  noAnimation = false,
  className = '',
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) => {
  const buttonContent = children || text;
  
  const classes = clsx(
    'btn',
    // Color variants
    color && `btn-${color}`,
    // Size variants
    size && `btn-${size}`,
    // Shape variants
    shape && `btn-${shape}`,
    // Other variants
    glass && 'glass',
    outline && 'btn-outline',
    active && 'btn-active',
    disabled && 'btn-disabled',
    fullWidth && 'w-full',
    loading && 'loading',
    noAnimation && 'no-animation',
    className
  );

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
      {buttonContent}
      {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
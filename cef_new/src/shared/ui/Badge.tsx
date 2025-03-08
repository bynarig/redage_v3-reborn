import React, { ReactNode } from 'react';
import clsx from 'clsx';

// DaisyUI color variants
type ColorVariant = 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral' | 'ghost';

// DaisyUI size variants
type SizeVariant = 'lg' | 'md' | 'sm' | 'xs';

// Badge positions for overlays
type PositionVariant = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Badge content */
  children?: ReactNode;
  /** Badge text (alternative to children) */
  text?: string;
  /** Color variant */
  color?: ColorVariant;
  /** Size variant */
  size?: SizeVariant;
  /** Whether the badge is outlined */
  outline?: boolean;
  /** Whether the badge has a border */
  bordered?: boolean;
  /** Position when used as an overlay */
  position?: PositionVariant;
  /** Whether the badge is positioned absolutely */
  absolute?: boolean;
  /** Applies the "badge-neutral" class for a neutral appearance */
  neutral?: boolean;
  /** Custom CSS classes to apply */
  className?: string;
  /** Whether to show a glow effect */
  glow?: boolean;
  /** Badge numeric value (for counters) */
  count?: number | string;
  /** Maximum value to display before showing "+" (e.g., "99+") */
  maxCount?: number;
  /** Icon to display before text */
  startIcon?: ReactNode;
  /** Icon to display after text */
  endIcon?: ReactNode;
  /** Whether badge is interactive (like a button or link) */
  interactive?: boolean;
  /** Whether the badge is large */
  large?: boolean;
  /** Whether the badge is small */
  small?: boolean;
  /** Whether the badge is centered (for text alignment) */
  center?: boolean;
  /** Whether the badge has a pill shape */
  pill?: boolean;
  /** Additional style properties */
  style?: React.CSSProperties;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

/**
 * Reusable DaisyUI Badge component
 * 
 * @example
 * // Basic usage
 * <Badge>Default</Badge>
 * 
 * @example
 * // With color and outline
 * <Badge color="primary" outline>Primary Outline</Badge>
 * 
 * @example
 * // As a counter
 * <Badge color="secondary" count={99} maxCount={99} />
 * 
 * @example
 * // With icons
 * <Badge startIcon={<CheckIcon />} endIcon={<ArrowIcon />}>Verified</Badge>
 * 
 * @example
 * // As an overlay
 * <div className="relative">
 *   <Avatar src="/avatar.jpg" />
 *   <Badge position="bottom-right" absolute color="success" />
 * </div>
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  text,
  color,
  size,
  outline = false,
  bordered = false,
  position,
  absolute = false,
  neutral = false,
  className = '',
  glow = false,
  count,
  maxCount,
  startIcon,
  endIcon,
  interactive = false,
  large = false,
  small = false,
  center = false,
  pill = false,
  style,
  onClick,
  ...rest
}) => {
  // Format count with maxCount if needed
  const formattedCount = count !== undefined && maxCount !== undefined && typeof count === 'number' && count > maxCount
    ? `${maxCount}+`
    : count;

  // Combine props to determine content
  const content = children || text || formattedCount || '';

  // Build classes
  const badgeClasses = clsx(
    'badge',
    // Color variants
    color && `badge-${color}`,
    
    // Other variants
    outline && 'badge-outline',
    neutral && 'badge-neutral',
    bordered && 'badge-bordered',
    
    // Size variants
    size && `badge-${size}`,
    large && 'badge-lg',
    small && 'badge-sm',
    pill && 'rounded-full',
    
    // Positioning
    position && `badge-${position}`,
    absolute && 'absolute',
    
    // Interactive state
    interactive && 'cursor-pointer hover:opacity-80',
    
    // Glow effect
    glow && `badge-glow ${color ? `glow-${color}` : 'glow-neutral'}`,
    
    // Text alignment
    center && 'text-center',
    
    className
  );

  return (
    <span 
      className={badgeClasses} 
      style={style}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...rest}
    >
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {content}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;

// Add to your global CSS for the glow effect:
// .badge-glow {
//   animation: badge-glow 2s infinite alternate;
//   box-shadow: 0 0 10px currentColor;
// }
// 
// @keyframes badge-glow {
//   from { opacity: 0.8; }
//   to { opacity: 1; box-shadow: 0 0 20px currentColor; }
// }
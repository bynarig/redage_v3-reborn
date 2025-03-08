import React, { ReactNode } from 'react';
import clsx from 'clsx';

/**
 * Available alert types that match DaisyUI alert colors
 */
type AlertType = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 */
export interface AlertProps {
  /** Alert content */
  children?: ReactNode;
  /** Alert text (alternative to children) */
  text?: string;
  /** Alert type/color variant */
  type?: AlertType;
  /** Apply soft/pastel variant */
  soft?: boolean;
  /** Apply outline variant */
  outline?: boolean;
  /** Custom icon to display */
  icon?: ReactNode;
  /** Hide the default icon */
  hideIcon?: boolean;
  /** Make alert collapsible */
  dismissible?: boolean;
  /** Function called when dismissible alert is closed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom alert title */
  title?: string;
  /** Additional content beneath the main alert text */
  description?: string;
  /** Make the alert take full width */
  fullWidth?: boolean;
  /** Add custom action buttons to the alert */
  actions?: ReactNode;
}

/**
 * SVG paths for each alert type icon
 */
const iconPaths: Record<AlertType, ReactNode> = {
  info: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  success: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  warning: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  ),
  error: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
};

/**
 * Reusable DaisyUI Alert component
 * 
 * @example
 * // Basic usage
 * <Alert type="success" text="Operation completed successfully" />
 * 
 * @example
 * // With title and description
 * <Alert 
 *   type="warning"
 *   title="Warning"
 *   text="You are about to delete this item"
 *   description="This action cannot be undone"
 * />
 * 
 * @example
 * // Dismissible with actions
 * <Alert 
 *   type="error"
 *   text="Failed to save changes"
 *   dismissible
 *   onDismiss={() => console.log("Alert dismissed")}
 *   actions={<Button color="error">Retry</Button>}
 * />
 */
const Alert = ({
  children,
  text,
  type = 'info',
  soft = false,
  outline = false,
  icon,
  hideIcon = false,
  dismissible = false,
  onDismiss,
  className = '',
  title,
  description,
  fullWidth = false,
  actions,
}: AlertProps) => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  const alertContent = children || text;

  const classes = clsx(
    'alert',
    `alert-${type}`,
    soft && 'bg-opacity-25',
    outline && 'border border-current bg-transparent',
    fullWidth && 'w-full',
    className
  );

  return (
    <div role="alert" className={classes}>
      {!hideIcon && (
        icon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            {iconPaths[type]}
          </svg>
        )
      )}
      
      <div className="flex flex-col">
        {title && <h3 className="font-bold">{title}</h3>}
        <div>{alertContent}</div>
        {description && <div className="text-xs">{description}</div>}
      </div>
      
      {actions && <div className="flex-none">{actions}</div>}
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="btn btn-sm btn-ghost btn-circle ml-auto"
          aria-label="Close alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
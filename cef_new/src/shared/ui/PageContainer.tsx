import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface PageContainerProps {
  /** Page title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Main content */
  children: ReactNode;
  /** Handler for close button */
  onClose?: () => void;
  /** Additional header actions */
  actions?: ReactNode;
  /** Additional CSS classes for container */
  className?: string;
  /** Additional CSS classes for header */
  headerClassName?: string;
  /** Additional CSS classes for content */
  contentClassName?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  subtitle,
  children,
  onClose,
  actions,
  className = '',
  headerClassName = '',
  contentClassName = '',
}) => {
  return (
    <div className={clsx('max-w-7xl mx-auto p-4 min-h-screen flex flex-col', className)}>
      {/* Header */}
      <div className={clsx('flex justify-between items-center pb-4 border-b border-base-300 mb-6', headerClassName)}>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-base-content opacity-70">{subtitle}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          {actions}
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-circle btn-sm btn-ghost"
              aria-label="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className={clsx('flex-grow', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default PageContainer;
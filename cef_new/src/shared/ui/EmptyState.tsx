import React from 'react';
import clsx from 'clsx';

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center p-8', className)}>
      {icon && (
        <div className="text-4xl mb-3">
          {typeof icon === 'string' ? icon : icon}
        </div>
      )}
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      {description && <p className="text-sm opacity-70 text-center mb-4 max-w-md">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

export default EmptyState;
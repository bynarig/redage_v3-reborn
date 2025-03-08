import React, { ReactNode } from 'react';
import clsx from 'clsx';

export interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  bordered?: boolean;
  compact?: boolean;
  bgColor?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  bordered = true,
  compact = false,
  bgColor = 'bg-base-100',
  onClick,
  ...props 
}) => {
  return (
    <div 
      className={clsx(
        'card shadow-md',
        bordered && 'card-bordered',
        hover && 'hover:shadow-lg transition-shadow duration-200',
        compact && 'card-compact',
        bgColor,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={clsx('card-header p-4', className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <h2 className={clsx('card-title', className)}>
    {children}
  </h2>
);

export const CardContent: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={clsx('card-body', className)}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => (
  <div className={clsx('card-footer p-4', className)}>
    {children}
  </div>
);
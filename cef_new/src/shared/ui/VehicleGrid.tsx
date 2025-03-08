import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Badge from './Badge';

export interface VehicleGridProps {
  /** Grid items */
  children: ReactNode;
  /** Number of columns on small screens */
  smCols?: number;
  /** Number of columns on medium screens */
  mdCols?: number;
  /** Number of columns on large screens */
  lgCols?: number;
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export interface VehicleGridItemProps {
  /** Vehicle title */
  title: string;
  /** Image URL */
  imageUrl: string;
  /** Badge text (if any) */
  badge?: 'spawned' | 'new' | 'sale' | string;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const VehicleGridItem: React.FC<VehicleGridItemProps> = ({
  title,
  imageUrl,
  badge,
  onClick,
  className = '',
}) => {
  const getBadgeProps = () => {
    switch (badge) {
      case 'spawned':
        return { color: 'success', text: 'Вызван' };
      case 'new':
        return { color: 'info', text: 'Новинка' };
      case 'sale':
        return { color: 'error', text: 'Скидка' };
      default:
        return { color: 'primary', text: badge };
    }
  };

  return (
    <div 
      className={clsx(
        'card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <figure>
        <img 
          src={imageUrl}
          alt={title}
          className="h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-base">{title}</h3>
          {badge && (
            <Badge color={getBadgeProps().color as any}>
              {getBadgeProps().text}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

const VehicleGrid: React.FC<VehicleGridProps> & {
  Item: React.FC<VehicleGridItemProps>;
} = ({
  children,
  smCols = 1,
  mdCols = 2,
  lgCols = 3,
  gap = 'md',
  className = '',
}) => {
  const gapClass = {
    'none': 'gap-0',
    'xs': 'gap-1',
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
  }[gap];

  return (
    <div 
      className={clsx(
        'grid',
        `grid-cols-${smCols}`,
        `sm:grid-cols-${smCols}`,
        `md:grid-cols-${mdCols}`,
        `lg:grid-cols-${lgCols}`,
        gapClass,
        className
      )}
    >
      {children}
    </div>
  );
};

// Attach Item as a property of VehicleGrid
VehicleGrid.Item = VehicleGridItem;

export default VehicleGrid;
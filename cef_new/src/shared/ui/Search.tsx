import React, { useState } from 'react';
import clsx from 'clsx';

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  debounce?: number;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  className = '',
  size = 'md',
  debounce = 300,
}) => {
  const [localValue, setLocalValue] = useState(value);
  
  // Handle change with optional debounce
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (debounce > 0) {
      // Clear any existing timeout
      const timeoutId = (window as any).searchTimeout;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set new timeout
      (window as any).searchTimeout = setTimeout(() => {
        onChange(newValue);
      }, debounce);
    } else {
      // No debounce
      onChange(newValue);
    }
  };
  
  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      const timeoutId = (window as any).searchTimeout;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);
  
  return (
    <div className={clsx('relative', className)}>
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        className={clsx(
          'input input-bordered w-full pr-10',
          size === 'xs' && 'input-xs',
          size === 'sm' && 'input-sm',
          size === 'lg' && 'input-lg'
        )}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Search;
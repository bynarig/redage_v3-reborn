import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[]; // Update to accept an array of Option objects
  onChange: (selectedValue: string) => void; // Callback for selected value
};

export default function Select({options, onChange}: SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; // Get the selected value
    onChange(selectedValue); // Notify the parent component
  };

  return (
    <select
      className="select select-ghost w-full max-w-xs"
      onChange={handleChange} // Attach the onChange handler
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

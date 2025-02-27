type RangeProps = {
  min: number;
  max: number;
  defaultValue: number;
  step?: number;
  onChange: (selectedValue: string) => void;
};

export default function Range({min, max, defaultValue, step, onChange}: RangeProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e.target.value)}
      className="range range-primary"
    />
  );
}

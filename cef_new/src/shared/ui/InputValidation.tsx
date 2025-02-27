const data = {
  email: {
    placeholder: 'mail@example.com',
  },
  password: {
    placeholder: 'Password',
    pattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}', // Escape backslashes
  },
  tel: {
    placeholder: 'Phone',
    pattern: '[0-9]*',
  },
};

type InputValidationProps = {
  type: 'email' | 'password' | 'tel';
  placeholder?: string;
  pattern?: string;
  isHint?: boolean;
  hint?: string;
  className?: string;
};

export default function InputValidation({ type, placeholder, pattern, isHint, hint, className }: InputValidationProps) {
  // Only use pattern if the type is not 'email'
  const inputPattern = type !== 'email' ? pattern || data[type]?.pattern : undefined;

  return (
    <div className={className}>
      <input
        className="input validator"
        type={type}
        required
        placeholder={placeholder || data[type]?.placeholder}
        pattern={inputPattern} // pattern is undefined for email
      />
      {isHint && hint && <div className="validator-hint">{hint}</div>}
    </div>
  );
}
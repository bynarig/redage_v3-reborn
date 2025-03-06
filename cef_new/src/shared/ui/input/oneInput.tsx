import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface InputCustomProps {
  placeholder?: string;
  type?: 'text' | 'password' | 'number' | 'email';
  setValue?: (value: string) => void;
  value?: string;
  cl?: string;
}

const InputCustom: React.FC<InputCustomProps> = ({
  placeholder = '',
  type = 'text',
  setValue,
  value = '',
  cl = ''
}) => {
  const [focusInput, setFocusInput] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  // Handle input focus
  const onFuncFocus = () => {
    setFocusInput(true);
    dispatch({ type: 'SET_IS_INPUT', payload: true });
  };
  
  // Handle input blur
  const onFuncBlur = () => {
    setFocusInput(false);
    dispatch({ type: 'SET_IS_INPUT', payload: false });
  };
  
  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(event.target.value);
    }
  };
  
  // Common props for input elements
  const inputProps = {
    value,
    placeholder,
    className: cl,
    onFocus: onFuncFocus,
    onBlur: onFuncBlur,
    onChange: handleInputChange,
    ref: inputRef
  };
  
  return (
    <>
      {type === "password" ? (
        <input
          type="password"
          {...inputProps}
        />
      ) : type === "number" ? (
        <input
          type="number"
          {...inputProps}
        />
      ) : (
        <input
          type="text"
          {...inputProps}
        />
      )}
    </>
  );
};

export default InputCustom;
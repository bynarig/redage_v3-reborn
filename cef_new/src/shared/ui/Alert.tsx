import React, {JSX} from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

type AlertProps = {
  text: string;
  type?: AlertType; // Use the union type here
  isSoft?: boolean;
  outline?: boolean;
};

const imagesToPath: Record<AlertType, JSX.Element> = {
  info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  success: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  warning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
  error: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

export default function Alert({ text, type = 'info', isSoft, outline }: AlertProps) {
  // Use the type prop to select the correct path
  const selectedPath = imagesToPath[type];

  return (
    <div role="alert" className={`alert alert-${type} ${isSoft ? 'alert-soft' : ''} ${outline ? 'alert-outline' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
        {/* Render the selected path as JSX */}
        {selectedPath}
      </svg>
      <span>{text}</span>
    </div>
  );
}
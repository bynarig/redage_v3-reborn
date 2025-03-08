import React, { useRef, useEffect, useState, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import './modal.css';
// Modal size variants
type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ModalProps {
  /** Modal title */
  title?: ReactNode;
  /** Modal content */
  children?: ReactNode;
  /** Whether the modal is open */
  isOpen?: boolean;
  /** Handler for when the modal closes */
  onClose?: () => void;
  /** Whether to close when clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether to close when ESC key is pressed */
  closeOnEsc?: boolean;
  /** Size variant */
  size?: SizeVariant;
  /** Whether to show the close button in header */
  showCloseButton?: boolean;
  /** Custom header content */
  header?: ReactNode;
  /** Custom footer content */
  footer?: ReactNode;
  /** Additional CSS class for the modal */
  className?: string;
  /** Additional CSS class for the modal box */
  boxClassName?: string;
  /** Modal position */
  position?: 'middle' | 'top' | 'bottom';
  /** Whether the modal is responsive (full screen on mobile) */
  responsive?: boolean;
  /** Custom ID for the modal dialog */
  id?: string;
  /** Custom backdrop content */
  backdropContent?: ReactNode;
  /** Whether the modal has a backdrop */
  hasBackdrop?: boolean;
  /** Whether to prevent scrolling of the body when modal is open */
  preventScroll?: boolean;
  /** Additional props for the dialog element */
  dialogProps?: React.HTMLAttributes<HTMLDialogElement>;
  /** Animation for the modal */
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'zoom' | 'none';
  /** Custom backdrop click handler */
  onBackdropClick?: () => void;
  /** Whether the modal is loading */
  loading?: boolean;
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

/**
 * Reusable DaisyUI Modal component
 * 
 * @example
 * // Basic usage with controlled state
 * const [isOpen, setIsOpen] = useState(false);
 * <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
 * <Modal 
 *   isOpen={isOpen} 
 *   onClose={() => setIsOpen(false)}
 *   title="Hello World"
 * >
 *   <p>Modal content goes here</p>
 * </Modal>
 * 
 * @example
 * // Using ref to control the modal
 * const modalRef = useRef<ModalRef>(null);
 * <Button onClick={() => modalRef.current?.open()}>Open Modal</Button>
 * <Modal ref={modalRef} title="Using Ref">
 *   <p>This modal is controlled via ref</p>
 * </Modal>
 * 
 * @example
 * // With custom footer
 * <Modal
 *   title="Confirm Action"
 *   footer={
 *     <div className="flex justify-end gap-2">
 *       <Button color="error" onClick={handleDelete}>Delete</Button>
 *       <Button color="neutral" onClick={handleCancel}>Cancel</Button>
 *     </div>
 *   }
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </Modal>
 */
const Modal = forwardRef<ModalRef, ModalProps>(({
  title,
  children,
  isOpen: isOpenProp,
  onClose,
  closeOnClickOutside = true,
  closeOnEsc = true,
  size = 'md',
  showCloseButton = true,
  header,
  footer,
  className = '',
  boxClassName = '',
  position = 'middle',
  responsive = true,
  id,
  backdropContent,
  hasBackdrop = true,
  preventScroll = true,
  dialogProps,
  animation = 'fade',
  onBackdropClick,
  loading = false,
}, ref) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalId = id || `modal-${Math.random().toString(36).substring(2, 9)}`;
  
  // Handle outside prop changes
  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);
  
  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsOpen(true);
    },
    close: () => {
      setIsOpen(false);
      if (onClose) onClose();
    }
  }));
  
  // Open/close the dialog when isOpen changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventScroll]);
  
  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, closeOnEsc]);
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLFormElement>) => {
    if (e.target === e.currentTarget && closeOnClickOutside) {
      e.preventDefault();
      handleClose();
      
      if (onBackdropClick) {
        onBackdropClick();
      }
    }
  };
  
  const modalClasses = clsx(
    'modal',
    {
      'modal-open': isOpen,
      'modal-bottom': position === 'bottom',
      'modal-top': position === 'top',
      'modal-middle': position === 'middle',
    },
    animation === 'slide-up' && 'modal-slide-up',
    animation === 'slide-down' && 'modal-slide-down',
    animation === 'zoom' && 'modal-zoom',
    animation === 'none' && 'no-animation',
    className
  );
  
  const boxClasses = clsx(
    'modal-box',
    `max-w-${size}`,
    responsive && 'sm:max-w-lg',
    loading && 'opacity-70 pointer-events-none',
    boxClassName
  );
  
  const modalContent = (
    <dialog
      id={modalId}
      ref={dialogRef}
      className={modalClasses}
      onClose={handleClose}
      {...dialogProps}
    >
      <div className={boxClasses}>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-50">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
        
        {/* Modal header */}
        {(header || title || showCloseButton) && (
          <div className="flex items-center justify-between pb-2 border-b border-base-200">
            {header || (
              <h3 className="font-bold text-lg">{title}</h3>
            )}
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="btn btn-sm btn-circle btn-ghost"
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        {/* Modal body */}
        <div className="py-4">
          {children}
        </div>
        
        {/* Modal footer */}
        {footer && (
          <div className="mt-4 pt-2 border-t border-base-200">
            {footer}
          </div>
        )}
      </div>
      
      {/* Modal backdrop */}
      {hasBackdrop && (
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={handleBackdropClick}
        >
          {backdropContent || <button>close</button>}
        </form>
      )}
    </dialog>
  );
  
  // Use createPortal to render in the document body for better accessibility
  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
});

Modal.displayName = 'Modal';

export default Modal;
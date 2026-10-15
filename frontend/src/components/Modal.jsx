import { useEffect, useRef } from 'react';

// Fenêtre modale basée sur <dialog> : focus piégé, touche Échap et fond gérés par le navigateur.
export default function Modal({ open, onClose, labelledBy, className = '', children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {open && <div className="modal-inner">{children}</div>}
    </dialog>
  );
}

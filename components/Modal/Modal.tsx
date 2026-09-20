'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Modal({ children, onClose }: Props) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}

        {!onClose && (
          <button
            className={css.closeButton}
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

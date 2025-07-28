import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import Mermaid from '@theme/Mermaid';
import type { Props } from '@theme/Mermaid';
import styles from './styles.module.css';

interface MermaidWithPopoutProps extends Props {
  value: string;
}

export default function MermaidWithPopout(props: MermaidWithPopoutProps): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const mermaidContainerRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      // Focus the modal for accessibility
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // Handle click outside modal to close
  const handleModalClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <div 
        ref={mermaidContainerRef}
        className={styles.mermaidContainer} 
        onClick={openModal}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        }}
        aria-label="Click to open diagram in fullscreen"
        title="Click to open diagram in fullscreen"
      >
        <Mermaid {...props} />
        <div className={styles.expandIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7,14H5v5h5v-2H7V14z M5,10h2V7h3V5H5V10z M17,17h-3v2h5v-5h-2V17z M14,5v2h3v3h2V5H14z"/>
          </svg>
        </div>
      </div>

      {isModalOpen && (
        <div 
          ref={modalRef}
          className={styles.modal}
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-label="Diagram fullscreen view"
          tabIndex={-1}
        >
          <div className={styles.modalContent}>
            <button 
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close fullscreen view"
              type="button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            <div className={styles.modalMermaid}>
              <Mermaid {...props} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
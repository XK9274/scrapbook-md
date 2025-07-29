import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import Mermaid from '@theme/Mermaid';
import type { Props } from '@theme/Mermaid';
import styles from './styles.module.css';

interface MermaidWithPopoutProps extends Props {
  value: string;
}

export default function MermaidWithPopout(props: MermaidWithPopoutProps): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const mermaidContainerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Handle zoom with mouse wheel - zoom at cursor location
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * delta, 0.1), 20);
    
    if (newScale !== scale) {
      // Get cursor position relative to viewport center
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      
      // Calculate offset from center to cursor
      const offsetX = cursorX - centerX;
      const offsetY = cursorY - centerY;
      
      // Adjust position to zoom at cursor location
      const scaleDiff = newScale / scale - 1;
      setPosition(prevPos => ({
        x: prevPos.x - offsetX * scaleDiff,
        y: prevPos.y - offsetY * scaleDiff
      }));
      
      setScale(newScale);
    }
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
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
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
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
          
          <div className={styles.controls}>
            <button onClick={() => setScale(s => Math.min(s * 1.2, 20))}>+</button>
            <span>{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.max(s * 0.8, 0.1))}>-</button>
            <button onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}>Reset</button>
          </div>

          <div 
            ref={diagramRef}
            className={styles.diagramContainer}
            style={{
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
          >
            <Mermaid {...props} />
          </div>
        </div>
      )}
    </>
  );
}
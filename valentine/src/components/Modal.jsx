import React, { useEffect } from 'react';

/**
 * Modal Component
 * Displays clue message and optional media when a hotspot is clicked
 */
const Modal = ({ clue, onClose, isOpen }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !clue) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <h2 id="modal-title" className="text-2xl font-bold">
              Clue Found! 🎉
            </h2>
            <button
              onClick={onClose}
              className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Media (if available) */}
          {clue.mediaUrl && (
            <div className="mb-4 rounded-lg overflow-hidden shadow-md">
              <img
                src={clue.mediaUrl}
                alt="Memory"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Hide image if it fails to load
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Message */}
          <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-r-lg">
            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
              {clue.message}
            </p>
          </div>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 mt-6 text-pink-400">
            <span className="animate-pulse">💕</span>
            <span className="animate-pulse delay-100">❤️</span>
            <span className="animate-pulse delay-200">💕</span>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Continue Searching 💖
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

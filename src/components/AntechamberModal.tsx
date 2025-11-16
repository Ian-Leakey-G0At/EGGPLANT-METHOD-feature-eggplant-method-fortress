'use client';

import React from 'react';

interface AntechamberModalProps {
  isOpen: boolean;
  redirectUrl: string;
  onClose: () => void;
}

export const AntechamberModal = ({ isOpen, redirectUrl, onClose }: AntechamberModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleProceed = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md p-6 bg-[#111111] border border-gray-700 rounded-lg shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="w-full aspect-video bg-gray-900 rounded-md mb-4 flex items-center justify-center">
          {/* TODO: The Commander to replace this with the final "digital keycard" asset. */}
          <span className="text-gray-500 text-sm">Image Placeholder (16:9)</span>
        </div>

        <h2 id="modal-title" className="text-xl font-bold text-white mb-2">
          A Note on Discretion
        </h2>

        <p className="text-gray-400 text-sm mb-6">
          The methods contained in this video are effective and therefore highly guarded. To ensure privacy and protect
          this knowledge from the gatekeepers, all acquisitions are processed discreetly through our partner art
          collective, `VendettaMachine`. This is for your protection and ours. Trust the process.
        </p>

        <button
          onClick={handleProceed}
          className="w-full bg-primary text-gray-900 font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Proceed to Secure Acquisition
        </button>
      </div>
    </div>
  );
};

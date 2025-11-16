import React from 'react';
import Link from 'next/link';
import BackIcon from '@/components/icons/BackIcon';

const ProofGalleryHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background-dark text-gray-50 flex items-center justify-between px-4 z-50">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <BackIcon className="w-6 h-6" />
      </Link>
      <h1 className="text-lg font-semibold text-white">Proof Gallery</h1>
      <div className="w-6" /> {/* Spacer for centering */}
    </header>
  );
};

export default ProofGalleryHeader;

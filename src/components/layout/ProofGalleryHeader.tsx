import React from 'react';
import Link from 'next/link';
import BackIcon from '../icons/BackIcon';

const ProofGalleryHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background-dark text-gray-50 flex items-center px-4 z-50">
      <Link href="/" className="flex items-center text-primary">
        <BackIcon className="mr-1" />
        <span className="font-medium text-base">Home</span>
      </Link>
      <div className="flex-1 text-center">
        <h1 className="font-semibold text-lg">Proof Gallery</h1>
      </div>
      <div className="w-10"></div> {/* Spacer to balance the back link */}
    </header>
  );
};

export default ProofGalleryHeader;

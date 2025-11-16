import React from 'react';
import LogoIcon from '../icons/LogoIcon';
import UploadIcon from '../icons/UploadIcon';

const LandingPageHeader = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-16 bg-background-dark text-gray-50 flex items-center justify-between px-4 z-50">
      <div className="flex items-center">
        <LogoIcon className="mr-2" />
        <span className="font-semibold text-lg">Method</span>
      </div>
      <button
        aria-label="Upload"
        onClick={() => console.log('Upload functionality pending.')}
      >
        <UploadIcon />
      </button>
    </header>
  );
};

export default LandingPageHeader;

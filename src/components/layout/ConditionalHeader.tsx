'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import LandingPageHeader from './LandingPageHeader';
import ProofGalleryHeader from './ProofGalleryHeader';

const ConditionalHeader = () => {
  const pathname = usePathname();

  // A more robust solution might involve a config object for more complex routing
  if (pathname === '/gallery') {
    return <ProofGalleryHeader />;
  }

  // Default to the landing page header for all other routes
  return <LandingPageHeader />;
};

export default ConditionalHeader;

import React from 'react';
import ProofGalleryHeader from '@/components/layout/ProofGalleryHeader';
import { ProofGallery } from '@/components/ProofGallery';
import { ProofBanner } from '@/components/ProofBanner';

const ProofPage = () => {
  return (
    <main className="p-4">
      <div className="flex flex-col space-y-2">
        <ProofGalleryHeader />
        <ProofBanner />
        <ProofGallery />
      </div>
    </main>
  );
};

export default ProofPage;

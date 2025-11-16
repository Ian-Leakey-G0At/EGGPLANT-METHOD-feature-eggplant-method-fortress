import React from 'react';
import ProofGalleryHeader from '@/components/layout/ProofGalleryHeader';
import { ProofGallery } from '@/components/ProofGallery';

const ProofPage = () => {
  return (
    <>
      <ProofGalleryHeader />
      <main className="mt-16">
        <ProofGallery />
      </main>
    </>
  );
};

export default ProofPage;

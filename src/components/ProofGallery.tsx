'use client'

import React from 'react';

// The list of Pinterest video IDs provided by the user
const PINTEREST_IDS = [
  "920423242671398323", "920423242671398320", "920423242671398310", "920423242671398302",
  "920423242671398297", "920423242671398295", "920423242671398279", "920423242671398288",
  "920423242671398284", "920423242671398272", "920423242671398267", "920423242671398248",
  "920423242671398243", "920423242671398235", "920423242671398218", "920423242671398196",
  "920423242671398192", "920423242671398206", "920423242671398186", "920423242671398206",
  "920423242671398179", "920423242671398176", "920423242671398164", "920423242671398183",
  "920423242671398161", "920423242671398144", "920423242671398151", "920423242671398146",
  "920423242671398155", "920423242671398135", "920423242671398098", "920423242671398117",
  "920423242671398103", "920423242671398123", "920423242671398103", "920423242671398092",
  "920423242671398080", "920423242671398072", "920423242671398054", "920423242671398088",
  "920423242671398047", "920423242671398019", "920423242671398011"
];

// Helper to get the full 50 items
const getGridItems = () => {
  const totalSlots = 50;
  const items = [];
  for (let i = 0; i < totalSlots; i++) {
    // Use modulo operator to cycle through the 43 items
    items.push(PINTEREST_IDS[i % PINTEREST_IDS.length]);
  }
  return items;
};

const GridItem = ({ id }: { id: string }) => (
  <div className="relative flex-shrink-0 w-[200px] md:w-[280px] aspect-[9/16] rounded-2xl overflow-hidden border border-gray-800 bg-black mx-3">
    {/* The CROP HACK: Scaling the iframe to 135% to hide Pinterest Logos */}
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <iframe
        src={`https://assets.pinterest.com/ext/embed.html?id=${id}`}
        className="absolute top-1/2 left-1/2 w-[135%] h-[135%] -translate-x-1/2 -translate-y-1/2 object-cover"
        frameBorder="0"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  </div>
);

export function ProofGallery() {
  const allItems = getGridItems();
  const rows = 10;
  const itemsPerRow = 5;

  // Generate row data
  const gridRows = Array.from({ length: rows }, (_, rowIndex) => {
    const startIndex = rowIndex * itemsPerRow;
    const rowItems = allItems.slice(startIndex, startIndex + itemsPerRow);

    // Duplicate items for seamless loop (2x width)
    const displayItems = [...rowItems, ...rowItems, ...rowItems];

    return {
      id: `row-${rowIndex}`,
      items: displayItems,
      direction: rowIndex % 2 === 0 ? 'left' : 'right',
      // Algorithmic offsets to break monotony
      duration: `${45 + (rowIndex * 2)}s`,
      delay: `-${rowIndex * 3}s`
    };
  });

  return (
    <div className="kinetic-stage bg-background-dark py-10 flex flex-col gap-4">
      {gridRows.map((row) => (
        <div
          key={row.id}
          className="flex w-full overflow-visible"
          style={{
            // We use a wrapper to apply the animation
            // The row width needs to be large enough to hold the duplicated items
          }}
        >
          <div
            className={`flex flex-row ${row.direction === 'left' ? 'animate-[oscillating-left_linear_infinite_alternate]' : 'animate-[oscillating-right_linear_infinite_alternate]'}`}
            style={{
              animationDuration: row.duration,
              animationDelay: row.delay,
              width: 'fit-content' // Allow container to grow with content
            }}
          >
            {row.items.map((id, idx) => (
              <GridItem key={`${row.id}-${id}-${idx}`} id={id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

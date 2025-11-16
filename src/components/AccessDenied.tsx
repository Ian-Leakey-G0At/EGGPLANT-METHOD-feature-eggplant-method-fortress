import React from 'react';

export function AccessDenied({ reason }: { reason: string | null }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-300">
        There was a problem verifying your access token.
      </p>
      {reason && (
        <p className="mt-2 text-sm text-gray-500 bg-gray-800 p-2 rounded">
          Reason: {reason}
        </p>
      )}
    </div>
  );
}

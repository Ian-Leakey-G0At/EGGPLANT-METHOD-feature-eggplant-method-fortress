'use client';

import React from 'react';
import ReactPlayer from 'react-player';

// This component will only be rendered on the client
const ClientSideVideoPlayer = (props: any) => {
  return <ReactPlayer {...props} />;
};

export default ClientSideVideoPlayer;
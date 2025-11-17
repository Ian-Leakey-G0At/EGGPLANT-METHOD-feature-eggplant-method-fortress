// This file provides a custom type definition for the 'react-player' module.
// It explicitly defines the component and its props to resolve type inference
// issues with Next.js dynamic imports.

declare module 'react-player' {
  import * as React from 'react';

  export interface ReactPlayerProps {
    url?: string | string[] | any; // Using `any` for MediaStream type compatibility
    playing?: boolean;
    loop?: boolean;
    controls?: boolean;
    light?: boolean | string;
    volume?: number;
    muted?: boolean;
    playbackRate?: number;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    progressInterval?: number;
    playsinline?: boolean;
    pip?: boolean;
    stopOnUnmount?: boolean;
    fallback?: React.ReactNode;
    wrapper?: React.ElementType;
    playIcon?: React.ReactNode;
    previewTabIndex?: number;
    config?: any; // Config object structure is complex
    onReady?: () => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onBuffer?: () => void;
    onBufferEnd?: () => void;
    onEnded?: () => void;
    onError?: (error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) => void;
    onDuration?: (duration: number) => void;
    onSeek?: (seconds: number) => void;
    onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void;
    [otherProps: string]: any;
  }

  export default class ReactPlayer extends React.Component<ReactPlayerProps> {}
}

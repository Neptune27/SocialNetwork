"use client"

import React, { useRef, useEffect } from 'react';

const VideoPlayer = (props: {
    localStream: MediaStream | undefined,
}) => {

    const { localStream } = props

    const localVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }

    }, [localStream]);

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
        </div>
    );
};

export default VideoPlayer;
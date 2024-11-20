"use client"

import React, { useRef, useEffect } from 'react';

const VideoPlayer = (props: {
    localStream: MediaStream | undefined,
    isLocal: boolean
}) => {

    const { localStream, isLocal } = props

    const localVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }

    }, [localStream]);


    if (isLocal) {
        return (
            <div className="absolute w-60 h-40 bottom-0 right-2">
                <video ref={localVideoRef} autoPlay muted />
            </div>
        );
    }

    return (
        <div>
            <video ref={localVideoRef} autoPlay muted />
        </div>
    );
};

export default VideoPlayer;
"use client";

import React, { useEffect, useRef } from 'react';


const VideoBackground = () => {

    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.play()
    }, []);

    return (
        <div className="video-container">
            <video
                ref={videoRef}
                loop
                muted
                className='video-background'
            >
                <source src="StudyQuest.mp4" type="video/mp4" />
            </video>
            <div className="video-opacity"></div>
        </div>
    )
}

export default VideoBackground
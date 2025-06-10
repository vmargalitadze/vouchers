import React, { useEffect, useRef } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      console.log('Trying to load video from:', videoUrl);
      try {
        videoRef.current.load();
      } catch (error) {
        console.error('Error loading video:', error);
      }
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    const video = e.target as HTMLVideoElement;
    console.log('Video error details:', {
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState,
      src: video.src
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl font-bold z-50"
        >
          ✕
        </button>
        
        {/* Responsive video container with 16:9 aspect ratio */}
        <div className="relative pt-[56.25%] bg-black rounded-lg">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full rounded-lg"
            controls
            autoPlay
            onError={handleVideoError}
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            <p className="text-white text-center">თქვენი ბრაუზერი არ უჭერს ვიდეოს</p>
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 
import React, { useState } from 'react';
import VideoModal from './VideoModal';

interface VideoButtonProps {
  videoUrl: string;
  buttonText?: string;
  className?: string;
}

const VideoButton: React.FC<VideoButtonProps> = ({ 
  videoUrl, 
  buttonText = "ნახე ვიდეო",
  className = "px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full transition-all duration-300"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className={className}
      >
        {buttonText}
      </button>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default VideoButton; 
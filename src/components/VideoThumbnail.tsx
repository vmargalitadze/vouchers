import React from 'react';
import { FaPlay } from 'react-icons/fa';
import VideoModal from './VideoModal';

interface VideoThumbnailProps {
  thumbnailUrl: string;
  videoUrl: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ thumbnailUrl, videoUrl }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsModalOpen(true)}
      >
        {/* თამბნეილი */}
        <img 
          src={thumbnailUrl} 
          alt="Video thumbnail" 
          className="w-full  h-[600px] sm:h-full object-contain rounded-lg"
        />
        
        {/* Play ღილაკის ოვერლეი */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-500 bg-opacity-90 group-hover:bg-yellow-600 transition-all duration-300 transform group-hover:scale-110">
            <FaPlay className="text-black text-2xl ml-1" />
          </div>
        </div>

        {/* გამჭვირვალე ოვერლეი ჰოვერისთვის */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg" />
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl={videoUrl}
      />
    </>
  );
};

export default VideoThumbnail; 
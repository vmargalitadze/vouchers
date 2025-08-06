import VideoButton from '../components/VideoButton';

export default function HomePage() {
  return (
    <div>
      <VideoButton 
        videoUrl="/your-video.mp4"  // ჩაანაცვლეთ თქვენი ვიდეოს სახელით
        buttonText="ნახე როგორ მუშაობს"
      />
      {/* სხვა კონტენტი */}
    </div>
  );
} 
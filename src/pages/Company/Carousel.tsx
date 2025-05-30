import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface SlideData {
  image: string;
  discount: string;
  id: number;
}

interface CarouselProps {
  slides: SlideData[];
  renderOverlay?: (slide: SlideData) => React.ReactNode;
}
export default function Carousel({ slides, renderOverlay }: CarouselProps) {
    const [curr, setCurr] = useState<number>(0);
  
    const prev = () =>
      setCurr((curr: number) => (curr === 0 ? slides.length - 1 : curr - 1));
    const next = () =>
      setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  
    return (
      <div className="w-full">
        {/* Image container */}
        <div className="overflow-hidden relative w-full h-[380px]  shadow-lg">
          <div
            className="flex transition-transform ease-out duration-500 h-full"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {slides.map((slide) => (
              <img
                key={slide.id}
                src={slide.image}
                alt=""
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>
  
          {/* Navigation buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-4 z-10">
            <button
              onClick={prev}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={next}
              className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
            >
              <ChevronRight size={40} />
            </button>
          </div>
        </div>
  
        {/* Render overlay BELOW the image */}
        {renderOverlay && (
          <div className="">
            {renderOverlay(slides[curr])}
          </div>
        )}
      </div>
    );
  }
  

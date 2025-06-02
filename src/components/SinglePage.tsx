import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SinglePageProps {
  pdf: string | File | null;
}

interface DocumentLoadSuccessPayload {
  numPages: number;
}

export default function SinglePage({ pdf }: SinglePageProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(window.innerWidth);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: DocumentLoadSuccessPayload) => {
    setError(null);
    setNumPages(numPages);
    setPageNumber(1);
  };

  const previousPage = () => setPageNumber((p) => p - 1);
  const nextPage = () => setPageNumber((p) => p + 1);

  if (!pdf) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>PDF ფაილის ჩატვირთვა ვერ მოხერხდა</p>
        <p className="text-sm mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          სცადეთ თავიდან
        </button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="pdf-container flex flex-col items-center w-full px-2">
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("Error while loading PDF:", error);
          setError(error.message);
        }}
        loading={
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
          </div>
        }
        className="w-full"
      >
        <div className="w-full flex justify-center overflow-auto min-h-[80vh]">
          <Page
            pageNumber={pageNumber}
            width={containerWidth > 1000 ? 1000 : containerWidth}
            renderTextLayer
            renderAnnotationLayer
            className="max-w-full"
          />
        </div>
      </Document>

      {numPages && numPages > 1 && (
        <div className="pdf-controls sticky bottom-4 mt-4 flex justify-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-yellow-600 transition-colors"
          >
            წინა
          </button>
          <p className="flex items-center font-medium">
            გვერდი {pageNumber} / {numPages}
          </p>
          <button
            type="button"
            disabled={pageNumber >= (numPages || 1)}
            onClick={nextPage}
            className="px-4 py-2 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-yellow-600 transition-colors"
          >
            შემდეგი
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
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

  function onDocumentLoadSuccess({ numPages }: DocumentLoadSuccessPayload) {
    setError(null);
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  if (!pdf) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500"></div>
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
    <div className="pdf-container flex flex-col items-center">
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => {
          console.error("Error while loading PDF:", error);
          setError(error.message);
        }}
        loading={
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500"></div>
          </div>
        }
      >
        <Page 
          pageNumber={pageNumber} 
          loading={
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500"></div>
            </div>
          }
          renderTextLayer={true}
          renderAnnotationLayer={true}
          scale={1.2}
          className="max-w-full"
        />
      </Document>
      
      {numPages && numPages > 1 && (
        <div className="pdf-controls z-10 sticky bottom-4 mt-4 flex justify-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <button 
            type="button" 
            disabled={pageNumber <= 1} 
            onClick={previousPage}
            className="px-4 py-2 bg-yellow-500 z-10 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-yellow-600 transition-colors"
          >
            წინა
          </button>
          <p className="flex z-10 items-center font-medium">
            გვერდი {pageNumber} / {numPages}
          </p>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="px-4 py-2 z-10 bg-yellow-500 text-white rounded disabled:opacity-50 disabled:bg-gray-300 hover:bg-yellow-600 transition-colors"
          >
            შემდეგი
          </button>
        </div>
      )}
    </div>
  );
}

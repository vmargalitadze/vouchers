import  { useState, useEffect } from "react";
import SinglePagePDFViewer from "../../components/SinglePage";

function Rules() {
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if the PDF is accessible
    fetch("/rules.pdf")
      .then((response) => {
        if (!response.ok) {
          throw new Error("PDF ფაილი ვერ მოიძებნა");
        }
        setPdfUrl("/rules.pdf");
      })
      .catch((err) => {
        console.error("Error checking PDF:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold py-4 text-center mt-16 sm:mt-20">
        წესები და პირობები
      </h1>

      {error ? (
        <div className="text-red-500 text-center p-3 sm:p-4 bg-red-50 rounded-lg mx-4">
          <p className="text-sm sm:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 sm:mt-4 px-4 py-2 bg-yellow-500 text-white text-sm sm:text-base rounded-md hover:bg-yellow-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
          >
            სცადეთ თავიდან
          </button>
        </div>
      ) : (
        <div className="flex-1 w-full max-w-7xl  mx-auto  px-2 sm:px-4 pb-4">
          <div className="w-full h-full bg-white rounded-lg shadow-md sm:shadow-lg overflow-auto">
            {pdfUrl ? (
              <div className="w-full h-full ">
                <SinglePagePDFViewer pdf={pdfUrl} />
              </div>
            ) : (
              <div className="flex justify-center items-center p-4 h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Rules;

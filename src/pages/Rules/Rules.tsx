import React, { useState, useEffect } from 'react'
import SinglePagePDFViewer from '../../components/SinglePage';

function Rules() {
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Check if the PDF is accessible
    fetch('/rules.pdf')
      .then(response => {
        if (!response.ok) {
          throw new Error('PDF ფაილი ვერ მოიძებნა');
        }
        setPdfUrl('/rules.pdf');
      })
      .catch(err => {
        console.error('Error checking PDF:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div className='min-h-screen mt-24 container mx-auto px-4'>
      <h1 className="text-2xl font-bold mb-6 text-center">წესები და პირობები</h1>
      
      {error ? (
        <div className="text-red-500 text-center p-4">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            სცადეთ თავიდან
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          {pdfUrl ? (
            <SinglePagePDFViewer pdf={pdfUrl} />
          ) : (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-yellow-500"></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Rules;
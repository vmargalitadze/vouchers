import React, { useEffect, useRef, useState } from 'react';
import './CompanyMap.css';

interface CompanyMapProps {
  iframeSrc?: string;
  companyName?: string;
  address?: string;
  className?: string;
}

const CompanyMap: React.FC<CompanyMapProps> = ({
  iframeSrc,
  companyName,
  address,
  className = ""
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;

      const handleLoad = () => {
        setIsLoading(false);
      };

      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
      };

      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, []);

  if (!iframeSrc) {
    return (
      <div className={`w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">რუქა ხელმისაწვდომი არ არის</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">რუქა იტვირთება...</p>
          </div>
        </div>
      )}

      {hasError && (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">რუქის ჩვენება ვერ მოხერხდა</p>
          </div>
        </div>
      )}

      <div className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden company-map-container">
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{
            border: 0,
            borderRadius: 0,
            boxShadow: 'none',
            backgroundColor: 'transparent',
            margin: 0,
            padding: 0
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"

          title={`${companyName || 'Company'} location map`}
          className="w-full h-full company-map-iframe"
        />
      </div>

      {address && (
        <div className="mt-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-900">მისამართი:</p>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default CompanyMap; 
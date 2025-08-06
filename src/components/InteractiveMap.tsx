import React, { useState, useEffect } from 'react';

interface InteractiveMapProps {
  companyName?: string;
  address?: string;
  city?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  companyName,
  address,
  city,
  className = ""
}) => {
  const [mapUrl, setMapUrl] = useState<string>('');

  useEffect(() => {
    if (address || city) {
      // Create a Google Maps search URL
      const searchQuery = encodeURIComponent(`${companyName || ''} ${address || ''} ${city || ''}`.trim());
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
      setMapUrl(googleMapsUrl);
    }
  }, [companyName, address, city]);

  const handleOpenInMaps = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenInGoogleMaps = () => {
    if (mapUrl) {
      window.open(mapUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenInAppleMaps = () => {
    if (address || city) {
      const searchQuery = encodeURIComponent(`${companyName || ''} ${address || ''} ${city || ''}`.trim());
      const appleMapsUrl = `https://maps.apple.com/?q=${searchQuery}`;
      window.open(appleMapsUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!address && !city) {
    return (
      <div className={`w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm">მისამართი ხელმისაწვდომი არ არის</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Map Preview */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {companyName || 'კომპანია'}
            </h3>
            {address && (
              <p className="text-sm text-gray-600 mb-1">{address}</p>
            )}
            {city && (
              <p className="text-sm text-gray-500">{city}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-3">
          <button
            onClick={handleOpenInMaps}
            className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
            <span>რუკაზე გახსნა</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleOpenInGoogleMaps}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google Maps</span>
            </button>

            <button
              onClick={handleOpenInAppleMaps}
              className="bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span>Apple Maps</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 
/**
 * Extracts the src URL from an iframe HTML string
 * @param iframeString - The iframe HTML string
 * @returns The extracted src URL or null if not found
 */
export const extractIframeSrc = (iframeString: string): string | null => {
  if (!iframeString) return null;
  
  // Regular expression to match src attribute in iframe
  const srcMatch = iframeString.match(/src=["']([^"']+)["']/);
  
  if (srcMatch && srcMatch[1]) {
    return srcMatch[1];
  }
  
  return null;
};

/**
 * Validates if a string is a valid Google Maps iframe
 * @param iframeString - The iframe HTML string
 * @returns boolean indicating if it's a valid Google Maps iframe
 */
export const isValidGoogleMapsIframe = (iframeString: string): boolean => {
  if (!iframeString) return false;
  
  const src = extractIframeSrc(iframeString);
  if (!src) return false;
  
  // Check if it's a Google Maps embed URL
  return src.includes('google.com/maps/embed');
};

/**
 * Creates a responsive iframe src URL for Google Maps
 * @param originalSrc - The original Google Maps embed URL
 * @returns The responsive iframe src URL
 */
export const createResponsiveMapSrc = (originalSrc: string): string => {
  if (!originalSrc) return '';
  
  // Add responsive parameters to the URL
  const url = new URL(originalSrc);
  
  // Set responsive width and height
  url.searchParams.set('width', '100%');
  url.searchParams.set('height', '100%');
  
  return url.toString();
}; 
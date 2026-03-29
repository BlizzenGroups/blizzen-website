import { useState, useEffect } from 'react';

interface UseScrollEnquiryOptions {
  scrollThreshold?: number; // Percentage of page scrolled before showing popup
  delay?: number; // Delay in milliseconds after scroll threshold is reached
  showOnce?: boolean; // Whether to show popup only once per session
}

export const useScrollEnquiry = ({
  scrollThreshold = 50, // Show after 50% scroll
  delay = 2000, // Wait 2 seconds after threshold
  showOnce = true
}: UseScrollEnquiryOptions = {}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check localStorage FIRST before doing anything
    const alreadyShown = localStorage.getItem('enquiry-popup-shown');
    if (showOnce && alreadyShown) {
      setHasShown(true);
      return;
    }

    // Check if popup was already shown in this session
    if (showOnce && hasShown) return;

    let timeoutId: NodeJS.Timeout;
    let hasTriggered = false;

    const handleScroll = () => {
      if (hasTriggered) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // If scrollThreshold is very low (like 1%), trigger on any scroll
      if (scrollThreshold <= 1 && scrollTop > 0) {
        hasTriggered = true;
        
        timeoutId = setTimeout(() => {
          setShowPopup(true);
          setHasShown(true);
          
          if (showOnce) {
            localStorage.setItem('enquiry-popup-shown', 'true');
          }
        }, delay);
      } else if (scrollPercentage >= scrollThreshold) {
        hasTriggered = true;
        
        timeoutId = setTimeout(() => {
          setShowPopup(true);
          setHasShown(true);
          
          if (showOnce) {
            localStorage.setItem('enquiry-popup-shown', 'true');
          }
        }, delay);
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [scrollThreshold, delay, showOnce, hasShown]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const resetPopup = () => {
    setHasShown(false);
    localStorage.removeItem('enquiry-popup-shown');
  };

  return {
    showPopup,
    closePopup,
    resetPopup,
    hasShown
  };
};
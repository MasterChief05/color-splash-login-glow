
import { useState, useEffect } from 'react';

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getSidebarWidth = () => {
    if (isMobile) return '16'; // En móvil siempre 16 (4rem)
    return isExpanded ? '64' : '16'; // En web: expandido 64 (16rem), colapsado 16 (4rem)
  };

  return {
    isExpanded,
    setIsExpanded,
    isMobile,
    sidebarWidth: getSidebarWidth()
  };
};

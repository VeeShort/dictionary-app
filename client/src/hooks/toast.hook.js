import { useCallback } from 'react';

export const useToast = () => {
  return useCallback((text = '', type = '') => {
    if (window.M && text) {
      window.M.toast({
        html: text,
        classes: type === 'error' ? 'red lighten-1' : ' blue lighten-2' 
      });
    }
  }, []);
};

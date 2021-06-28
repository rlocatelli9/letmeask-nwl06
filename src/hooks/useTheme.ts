import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'

function useTheme () {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado com um AuthProvider');
  }
  return context;
}

export default useTheme;

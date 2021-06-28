import React, { useEffect, useState, createContext, useCallback } from 'react';

interface ThemeContextProps {
  current: string;
}

interface ThemeContextProviderProps {
  current: string;
  toggleTheme(): void;
}
const ThemeContext = createContext<ThemeContextProviderProps>({} as ThemeContextProviderProps)

const ThemeContextProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<ThemeContextProps>({current: 'light'});

  useEffect(() => {
    const getTheme = localStorage.getItem('@Letmeask:Theme');
    if(getTheme) {
      if(getTheme === 'dark')
      document.body.classList.add('dark-mode');
      setTheme({current: getTheme})
    }
  },[])

  const toggleTheme = useCallback(() => {
    if (theme.current === 'light') {
      localStorage.setItem('@Letmeask:Theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('@Letmeask:Theme', 'light');
      document.body.classList.remove('dark-mode');
    }
    setTheme(oldState => oldState.current === 'light' ? {current: 'dark'} : {current: 'light'});
  }, [theme]);

  return (
    <ThemeContext.Provider value={{current: theme.current, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContextProvider, ThemeContext};

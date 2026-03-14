import { useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import useUserPreferencesStore from '@/store/useUserPreferencesStore.ts';

const usePreferencesInitializer = () => {
  const { theme } = useUserPreferencesStore();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') {
      setColorMode(theme);
    } else {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setColorMode(systemDark ? 'dark' : 'light');
    }
  }, [theme, setColorMode]);
};

export default usePreferencesInitializer;

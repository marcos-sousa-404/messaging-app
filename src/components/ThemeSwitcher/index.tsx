import { Button, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import useUserPreferencesStore from '@/store/useUserPreferencesStore.ts';

const ThemeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { theme, setTheme } = useUserPreferencesStore();

  const handleToggleColorMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    toggleColorMode();
  };

  return (
    <Button size={'sm'} onClick={handleToggleColorMode}>
      {colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ThemeSwitcher;

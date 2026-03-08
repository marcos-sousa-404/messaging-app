import { useColorMode } from '@chakra-ui/react';

const useDarkMode = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return { isDarkMode };
};

export default useDarkMode;

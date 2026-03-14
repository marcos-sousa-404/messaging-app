import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Router from '@/router';
import theme from '@/theme';
import '@fontsource/montserrat';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;

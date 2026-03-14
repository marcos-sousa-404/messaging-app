import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import '@fontsource-variable/montserrat';
import { mode } from '@chakra-ui/theme-tools';
import type { StyleFunctionProps } from '@chakra-ui/icons';

export const colors = {
  brand: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  dark: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    500: '#334155',
    600: '#1e293b',
    700: '#0f172a',
    800: '#020617',
    900: '#000000',
    950: '#000000',
  },
  light: {
    50: '#ffffff',
    100: '#f8fafc',
    200: '#f1f5f9',
    300: '#e2e8f0',
    400: '#cbd5e1',
    500: '#94a3b8',
    600: '#64748b',
    700: '#475569',
    800: '#334155',
    900: '#1e293b',
    950: '#0f172a',
  },
};

export const gradients = {
  primary: {
    light: 'linear-gradient(90deg, #3b82f6, #2563eb)',
    dark: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
  },
};

const fonts = {
  heading: `'Montserrat Variable', sans-serif`,
  body: `'Montserrat Variable', sans-serif`,
};

const styles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global: (props: Record<string, any> | StyleFunctionProps) => ({
    '::selection': {
      background: mode('brand.500', 'brand.600')(props),
      color: 'white',
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  colors,
  config,
  fonts,
  styles,
});

export default theme;

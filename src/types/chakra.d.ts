import '@chakra-ui/react';

declare module '@chakra-ui/react' {
  export interface Theme {
    breakpoints: {
      base: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  }
}

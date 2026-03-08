import { type UseToastOptions, useToast as useToastBase } from '@chakra-ui/react';

const useToast = (options?: UseToastOptions) => {

  return useToastBase({ position: 'top-right', ...options });
};

export default useToast;
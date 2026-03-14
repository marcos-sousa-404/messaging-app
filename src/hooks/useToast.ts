import { useToast as useToastBase, type UseToastOptions } from '@chakra-ui/react';

const useToast = (options?: UseToastOptions) => {
  return useToastBase({ position: 'top-right', isClosable: true, ...options });
};

export default useToast;

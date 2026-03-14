import { createStandaloneToast, type UseToastOptions } from '@chakra-ui/react';

const { toast: standaloneToast, ToastContainer } = createStandaloneToast();

export const showToast = (options?: UseToastOptions) =>
  standaloneToast({ position: 'top-right', ...options });
export { ToastContainer };

import { Center, Spinner } from '@chakra-ui/react';

const Loading = () => (
  <Center height={'100%'}>
    <Spinner size="xl" color="brand.500" />
  </Center>
);

export default Loading;

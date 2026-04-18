import { Center, Text } from '@chakra-ui/react';

const EmptyState = ({ message }: EmptyStateProps) => (
  <Center py={6} px={4}>
    <Text fontSize="sm" color="gray.500" textAlign="center">
      {message}
    </Text>
  </Center>
);

export default EmptyState;

export interface EmptyStateProps {
  message: string;
}

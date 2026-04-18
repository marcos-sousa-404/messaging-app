import { Stack, Text } from '@chakra-ui/react';
import { memo } from 'react';
import type { MessageRendererProps } from './types';

const TextMessage = memo(({ text, time, bg, color, borderRadius }: MessageRendererProps) => {
  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      maxW="75%"
      bg={bg}
      color={color}
      px={4}
      pt={2}
      pb={1}
      {...borderRadius}
      boxShadow="sm"
      position="relative"
    >
      <Stack direction="column" spacing={1} mb={1}>
        <Text fontSize="md" wordBreak="break-word">
          {text}
        </Text>
      </Stack>

      <Text fontSize="xs" textAlign="right" opacity={0.8}>
        {time}
      </Text>
    </Stack>
  );
});

export default TextMessage;

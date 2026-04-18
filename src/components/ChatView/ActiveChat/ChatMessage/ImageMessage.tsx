import { Box, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import type { MessageRendererProps } from './types';

const ImageMessage = memo(
  ({
    text,
    fileUrl,
    fileName,
    time,
    bg,
    color,
    borderRadius,
    onImageClick,
  }: MessageRendererProps) => {
    return (
      <Box
        maxW={{ base: '85%', md: '75%' }}
        bg={bg}
        color={color}
        p="4px"
        {...borderRadius}
        boxShadow="sm"
        position="relative"
      >
        <Box display="block" onClick={onImageClick} cursor="pointer">
          <Image
            src={fileUrl}
            alt={fileName || 'Imagem'}
            borderRadius="md"
            w="100%"
            maxH="400px"
            objectFit="contain"
            bg="blackAlpha.50"
          />
        </Box>

        {text && (
          <Box px={2} pt={2} pb={4}>
            <Text fontSize="md" wordBreak="break-word">
              {text}
            </Text>
          </Box>
        )}

        <Text
          fontSize="11px"
          opacity={0.8}
          position={text ? 'absolute' : 'static'}
          bottom={text ? '4px' : 'auto'}
          right={text ? '10px' : 'auto'}
          textAlign="right"
          mt={text ? 0 : 1}
          mr={text ? 0 : 1}
        >
          {time}
        </Text>
      </Box>
    );
  },
);

export default ImageMessage;

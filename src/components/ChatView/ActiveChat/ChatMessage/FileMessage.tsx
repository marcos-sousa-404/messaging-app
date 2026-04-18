import { Box, Circle, Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { FaFileAlt, FaDownload } from 'react-icons/fa';
import type { MessageRendererProps } from './types';

const FileMessage = memo(
  ({ text, fileUrl, fileName, time, bg, color, borderRadius, isSent }: MessageRendererProps) => {
    const fileLinkBg = useColorModeValue(
      isSent ? 'blackAlpha.100' : 'blackAlpha.50',
      isSent ? 'blackAlpha.300' : 'whiteAlpha.100',
    );
    const fileLinkHoverBg = useColorModeValue(
      isSent ? 'blackAlpha.200' : 'blackAlpha.100',
      isSent ? 'blackAlpha.400' : 'whiteAlpha.200',
    );

    const iconCircleBg = useColorModeValue(
      isSent ? 'blackAlpha.200' : 'brand.100',
      isSent ? 'blackAlpha.400' : 'whiteAlpha.200',
    );

    const iconColor = useColorModeValue(isSent ? 'white' : 'brand.600', 'whiteAlpha.900');

    const metaColor = useColorModeValue(
      isSent ? 'whiteAlpha.900' : 'blackAlpha.700',
      isSent ? 'whiteAlpha.800' : 'whiteAlpha.600',
    );

    const handleDownload = useCallback(
      async (e: React.MouseEvent) => {
        if (!fileUrl) return;

        e.preventDefault();

        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName || 'arquivo';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(error);
          window.open(fileUrl, '_blank');
        }
      },
      [fileUrl, fileName],
    );

    const extension = fileName?.split('.').pop()?.toUpperCase() || 'ARQUIVO';

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
        <Link
          onClick={handleDownload}
          cursor="pointer"
          display="flex"
          alignItems="center"
          gap={3}
          p={2}
          bg={fileLinkBg}
          borderRadius="md"
          transition="all 0.2s"
          _hover={{ textDecoration: 'none', bg: fileLinkHoverBg }}
          role="group"
        >
          <Circle size="40px" bg={iconCircleBg}>
            <Icon as={FaFileAlt} color={iconColor} boxSize={4} />
          </Circle>

          <Box overflow="hidden" flex={1}>
            <Text fontSize="md" lineHeight="short" isTruncated fontWeight="medium">
              {fileName || 'Documento'}
            </Text>
            <Text fontSize="12px" color={metaColor} mt={1} fontWeight="bold">
              {extension}
            </Text>
          </Box>

          <Flex
            alignItems="center"
            justifyContent="center"
            opacity={0.6}
            _groupHover={{ opacity: 1, transform: 'translateY(1px)' }}
            transition="all 0.2s"
            pr={1}
          >
            <Icon as={FaDownload} boxSize={3.5} color={metaColor} />
          </Flex>
        </Link>

        {text && (
          <Box px={2} pt={2} pb={4}>
            <Text fontSize="md" wordBreak="break-word">
              {text}
            </Text>
          </Box>
        )}

        <Text
          fontSize="11px"
          color={metaColor}
          position={text ? 'absolute' : 'static'}
          bottom={text ? '4px' : 'auto'}
          right={text ? '10px' : 'auto'}
          textAlign="right"
          mt={text ? 0 : 1}
          mr={text ? 0 : 1}
          pr={text ? 0 : 1}
        >
          {time}
        </Text>
      </Box>
    );
  },
);

export default FileMessage;

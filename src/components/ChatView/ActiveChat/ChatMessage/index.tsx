import { Flex, useColorModeValue } from '@chakra-ui/react';
import { memo } from 'react';
import computeBorderRadius from './computeBorderRadius.ts';
import ImageMessage from './ImageMessage.tsx';
import FileMessage from './FileMessage.tsx';
import TextMessage from './TextMessage.tsx';

const ChatMessage = memo((props: ChatMessageProps) => {
  const {
    text,
    fileUrl,
    fileType,
    fileName,
    origin,
    createdAt,
    hasMessagesBefore,
    hasMessagesAfter,
    onImageClick,
  } = props;
  const isSent = origin === 'sent';

  const computedBorderRadius = computeBorderRadius(hasMessagesBefore, isSent);

  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(createdAt));

  const sentBackgroundColor = useColorModeValue('brand.500', 'brand.400');
  const receivedBackgroundColor = useColorModeValue('white', 'gray.700');
  const sentColor = useColorModeValue('white', 'white');
  const receivedColor = useColorModeValue('black', 'white');

  const bg = isSent ? sentBackgroundColor : receivedBackgroundColor;
  const color = isSent ? sentColor : receivedColor;

  const isImage = fileType?.startsWith('image/');
  const isFile = fileUrl && !isImage;

  const commonProps = {
    text,
    fileUrl,
    fileName,
    time,
    isSent,
    bg,
    color,
    borderRadius: computedBorderRadius,
    onImageClick,
  };

  return (
    <Flex w="100%" justify={isSent ? 'flex-end' : 'flex-start'} mb={hasMessagesAfter ? 0.5 : 2}>
      {isImage ? (
        <ImageMessage {...commonProps} />
      ) : isFile ? (
        <FileMessage {...commonProps} />
      ) : (
        <TextMessage {...commonProps} />
      )}
    </Flex>
  );
});

export default ChatMessage;

export interface ChatMessageProps {
  text?: string;
  fileUrl?: string;
  fileType?: string;
  fileName?: string;
  origin: 'sent' | 'received';
  createdAt: string;
  hasMessagesBefore: boolean;
  hasMessagesAfter: boolean;
  onImageClick?: () => void;
}

import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaFileAlt, FaImage, FaPaperclip, FaPaperPlane, FaTimes } from 'react-icons/fa';
import type { ChangeEventHandler } from 'react';
import Button from '@/components/Button';
import useChatInput from './useChatInput';

export interface ChatInputProps {
  onMessageInputTextChange: ChangeEventHandler<HTMLInputElement>;
  messageInputText: string;
  handleSendMessage: (file?: File) => Promise<void>;
  isSendingMessage?: boolean;
}

const ChatInput = ({
  onMessageInputTextChange,
  messageInputText,
  handleSendMessage,
  isSendingMessage,
}: ChatInputProps) => {
  const {
    selectedFile,
    fileInputRef,
    textInputRef,
    handleFileChange,
    clearFile,
    onSend,
    onKeyDown,
    handleAttachmentClick,
    sendDisabled,
  } = useChatInput({ messageInputText, handleSendMessage });

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const previewBg = useColorModeValue('white', 'gray.700');

  const activeAlpha = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const iconBase = useColorModeValue('gray.500', 'gray.400');
  const iconActive = useColorModeValue('gray.600', 'gray.300');

  const arrowCommon = {
    content: '""',
    position: 'absolute',
    borderStyle: 'solid',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  };

  return (
    <Box position="relative" width="100%">
      {selectedFile && (
        <Flex
          position="absolute"
          bottom="calc(100% + 12px)"
          left="0px"
          alignItems="center"
          bg={previewBg}
          border="1px solid"
          borderColor={borderColor}
          p={2}
          pl={3}
          borderRadius="md"
          boxShadow="md"
          gap={3}
          zIndex={10}
          _after={{
            ...arrowCommon,
            bottom: '-6px',
            left: '14px',
            borderWidth: '6px 6px 0',
            borderTopColor: borderColor,
          }}
          _before={{
            ...arrowCommon,
            bottom: '-5px',
            left: '15px',
            borderWidth: '5px 5px 0',
            borderTopColor: previewBg,
            zIndex: 1,
          }}
        >
          <Icon
            as={selectedFile.type.startsWith('image/') ? FaImage : FaFileAlt}
            color="brand.500"
            boxSize={4}
          />
          <Text fontSize="sm" noOfLines={2} maxWidth="250px" fontWeight="medium">
            {selectedFile.name}
          </Text>
          <IconButton
            aria-label="Remover"
            icon={<Icon as={FaTimes} />}
            size="xs"
            variant="ghost"
            onClick={clearFile}
          />
        </Flex>
      )}

      <InputGroup size="md">
        <InputLeftElement h="full" w="2.5rem">
          <IconButton
            aria-label="Anexar"
            icon={<Icon as={FaPaperclip} />}
            onClick={handleAttachmentClick}
            variant="ghost"
            size="sm"
            borderRadius="md"
            color={selectedFile ? iconActive : iconBase}
            bg={selectedFile ? activeAlpha : 'transparent'}
            _hover={{ bg: activeAlpha }}
            isDisabled={isSendingMessage}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </InputLeftElement>

        <Input
          ref={textInputRef}
          bg={bg}
          placeholder="Digite uma mensagem"
          value={messageInputText}
          onChange={onMessageInputTextChange}
          onKeyDown={onKeyDown}
          isDisabled={isSendingMessage}
          pl="3rem"
          pr="3.5rem"
          borderRadius="md"
          border="1px solid"
          borderColor={borderColor}
          _focus={{
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }}
        />

        <InputRightElement h="full" w="3rem" pr={1}>
          <Button
            onClick={onSend}
            colorScheme="brand"
            isLoading={isSendingMessage}
            isDisabled={sendDisabled}
            size="sm"
            borderRadius="md"
            minW="2.8rem"
            px={0}
          >
            <Icon as={FaPaperPlane} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default ChatInput;

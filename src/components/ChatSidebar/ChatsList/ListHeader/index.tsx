import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { type ChangeEvent, memo } from 'react';
import { Button } from '@/components';
import { LuArrowLeft, LuPlus } from 'react-icons/lu';

const ListHeader = memo(
  ({
    isCreatingChat,
    searchQuery,
    onSearchChange,
    startCreatingChat,
    stopCreatingChat,
  }: ListHeaderProps) => {
    const inputBg = useColorModeValue('gray.100', 'whiteAlpha.100');
    const inputHoverBg = useColorModeValue('gray.200', 'whiteAlpha.200');
    const iconColor = useColorModeValue('gray.500', 'gray.400');
    const focusedInputColor = useColorModeValue('white', 'gray.800');

    return (
      <Box p={4} display="flex" flexDirection="column" gap={3}>
        <Box display="flex" alignItems="center" justifyContent="space-between" minH="32px">
          <Box display="flex" alignItems="center" gap={2}>
            {isCreatingChat && (
              <Button
                as={IconButton}
                aria-label="Voltar"
                bg={'transparent'}
                // @ts-expect-error icon prop recognized via as={IconButton}
                icon={<LuArrowLeft />}
                variant="ghost"
                size="sm"
                onClick={stopCreatingChat}
              />
            )}
            <Text fontWeight="bold" fontSize="lg">
              {isCreatingChat ? 'Nova conversa' : 'Mensagens'}
            </Text>
          </Box>

          {!isCreatingChat && (
            <Button
              as={IconButton}
              aria-label="Nova conversa"
              // @ts-expect-error icon prop recognized via as={IconButton}
              icon={<LuPlus />}
              size="sm"
              colorScheme="brand"
              onClick={startCreatingChat}
            />
          )}
        </Box>

        <InputGroup size="md">
          <InputLeftElement pointerEvents="none" h="full">
            <FaSearch color={iconColor} />
          </InputLeftElement>
          <Input
            variant="filled"
            placeholder={isCreatingChat ? 'Buscar usuários...' : 'Buscar conversas...'}
            value={searchQuery}
            onChange={onSearchChange}
            bg={inputBg}
            border="1px solid transparent"
            borderRadius="md"
            transition="all 0.2s"
            _hover={{
              bg: inputHoverBg,
            }}
            _focus={{
              bg: focusedInputColor,
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            }}
            _placeholder={{
              fontSize: 'sm',
              color: 'gray.500',
            }}
          />
        </InputGroup>
      </Box>
    );
  },
);

export default ListHeader;

interface ListHeaderProps {
  isCreatingChat: boolean;
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  startCreatingChat: () => void;
  stopCreatingChat: () => void;
}

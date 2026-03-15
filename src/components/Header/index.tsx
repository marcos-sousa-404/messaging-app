import {
  Avatar,
  HStack,
  IconButton,
  Show,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Button, ThemeSwitcher } from '@/components';
import useLogout from '@/hooks/useLogout';
import useAuthStore from '@/store/useAuthStore';
import { useChatStore } from '@/store';
import { FaArrowLeft, FaArrowRightFromBracket } from 'react-icons/fa6';
import { memo } from 'react';

const Header = memo(() => {
  const { logout } = useLogout();
  const { user } = useAuthStore();
  const { setChatsListOpen, otherUser, chatsListOpen } = useChatStore();

  const toggleChatsListOpen = () => setChatsListOpen(!chatsListOpen);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const userDataToUse = isMobile && !chatsListOpen ? otherUser : user;

  return (
    <Stack
      as="header"
      sx={{
        boxShadow: 'md',
        width: '100%',
        height: '4rem',
        alignItems: 'center',
        paddingX: 6,
        flexDir: 'row',
      }}
    >
      {!chatsListOpen && (
        <Show breakpoint="(max-width: 767px)">
          <IconButton
            onClick={toggleChatsListOpen}
            aria-label={'toggle-chats-list'}
            icon={<FaArrowLeft />}
            variant={'ghost'}
          />
        </Show>
      )}
      {userDataToUse && (
        <HStack spacing={3}>
          <Avatar name={userDataToUse?.name} size="sm" />
          <Text fontWeight="semibold">{userDataToUse?.name}</Text>
        </HStack>
      )}

      <HStack ml={'auto'} spacing={3}>
        <Show breakpoint="(max-width: 767px)">
          <Button
            aria-label={'logout'}
            onClick={logout}
            colorScheme="brand"
            size="sm"
            as={IconButton}
            // @ts-expect-error This icon prop is not recognized by the Button component, but it works when using IconButton as the base component
            icon={<FaArrowRightFromBracket />}
          />
        </Show>
        <Show breakpoint="(min-width: 768px)">
          <Button
            rightIcon={<FaArrowRightFromBracket />}
            onClick={logout}
            colorScheme="brand"
            size="sm"
          >
            Sair da conta
          </Button>
        </Show>
        <ThemeSwitcher />
      </HStack>
    </Stack>
  );
});

export default Header;

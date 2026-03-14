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
import { HamburgerIcon } from '@chakra-ui/icons';
import { useChatStore } from '@/store';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthStore();
  const { setChatsDrawerOpen, otherUser } = useChatStore();

  const openMobileDrawer = () => setChatsDrawerOpen(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const userDataToUse = isMobile ? otherUser : user;

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
      <Show breakpoint="(max-width: 767px)">
        <IconButton
          onClick={openMobileDrawer}
          aria-label={'open-drawer'}
          icon={<HamburgerIcon />}
          variant={'ghost'}
        />
      </Show>
      {userDataToUse && (
        <HStack spacing={3}>
          <Avatar name={userDataToUse?.name} size="sm" />
          <Text fontWeight="semibold">{userDataToUse?.name}</Text>
        </HStack>
      )}

      <HStack ml={'auto'} spacing={3}>
        <Button onClick={logout} colorScheme="brand" size="sm">
          Sair da conta
        </Button>
        <ThemeSwitcher />
      </HStack>
    </Stack>
  );
};

export default Header;

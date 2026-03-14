import { Avatar, HStack, IconButton, Show, Stack, Text } from '@chakra-ui/react';
import { Button, ThemeSwitcher } from '@/components';
import useLogout from '@/hooks/useLogout';
import useAuthStore from '@/store/useAuthStore';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useChatStore } from '@/store';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthStore();
  const { setChatsDrawerOpen } = useChatStore();

  const openMobileDrawer = () => setChatsDrawerOpen(true);

  return (
    <Stack
      as="header"
      sx={{
        boxShadow: 'md',
        width: '100%',
        height: '4rem',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      <HStack spacing={3}>
        <Avatar name={user?.name} size="sm" />
        <Text fontWeight="semibold">{user?.name}</Text>
      </HStack>

      <HStack spacing={3}>
        <Button onClick={logout} colorScheme="brand" size="sm">
          Sair da conta
        </Button>
        <ThemeSwitcher />
      </HStack>
    </Stack>
  );
};

export default Header;

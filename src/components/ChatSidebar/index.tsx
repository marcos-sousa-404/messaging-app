import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Show,
  useColorModeValue,
} from '@chakra-ui/react';
import ChatsList, { type ChatsListProps } from '../ChatsList';
import { useChatStore } from '@/store';

const ChatSidebar = (props: ChatsListProps) => {
  const { chatsDrawerOpen, setChatsDrawerOpen } = useChatStore();
  const onClose = () => setChatsDrawerOpen(false);
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const drawerBackgroundColor = useColorModeValue('white', 'gray.800');

  return (
    <>
      <Show breakpoint="(min-width: 768px)">
        <Box
          w="350px"
          borderRight="1px solid"
          borderColor={borderColor}
          boxShadow="4px 0px 8px rgba(0, 0, 0, 0.05)"
        >
          <ChatsList {...props} />
        </Box>
      </Show>

      <Show breakpoint="(max-width: 767px)">
        <Drawer isOpen={chatsDrawerOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent bg={drawerBackgroundColor}>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Minhas conversas</DrawerHeader>
            <DrawerBody p={0}>
              <ChatsList {...props} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
};

export default ChatSidebar;

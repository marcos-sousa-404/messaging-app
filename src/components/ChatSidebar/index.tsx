import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Show,
} from '@chakra-ui/react';
import ChatsList, { type ChatsListProps } from '../ChatsList';
import { useChatStore } from '@/store';

const ChatSidebar = (props: ChatsListProps) => {
  const { chatsDrawerOpen, setChatsDrawerOpen } = useChatStore();
  const onClose = () => setChatsDrawerOpen(false);

  return (
    <>
      <Show breakpoint="(min-width: 768px)">
        <Box
          w="350px"
          borderRight="1px solid"
          borderColor="gray.200"
          boxShadow="4px 0px 8px rgba(0, 0, 0, 0.05)"
        >
          <ChatsList {...props} />
        </Box>
      </Show>

      <Show breakpoint="(max-width: 767px)">
        <Drawer isOpen={chatsDrawerOpen} placement="left" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Minhas conversas</DrawerHeader>
            <DrawerBody p={0}>
              <ChatsList {...props} onClose={onClose} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
};

export default ChatSidebar;

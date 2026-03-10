import { ChatCard, Header } from '@/components';

import {
  Box,
  Divider,
} from '@chakra-ui/react';
import useChat from './useChat';

const Chat = () => {
  const { users = [], usersLoading } = useChat();

  return (
    <Box>
      <Header />
      <Box as={'main'} height={'calc(100vh - 4rem)'} display={'flex'}>
        <Box sx={{ width: '270px', height: '100%', boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.1)' }}>
          {users.map((chat) => <Box>
            <ChatCard lastMessage='' name={chat.name} avatarUrl='' unreadCount={0} />
            <Divider />
          </Box>)}
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;

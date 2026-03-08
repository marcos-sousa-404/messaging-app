import useLogout from '@/hooks/useLogout.ts';
import { Button } from '@/components';
import { Box } from '@chakra-ui/react';

const Chat = () => {
  const {logout} = useLogout();

  return <Box sx={{width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Button onClick={logout} colorScheme={'brand'}>Sair da sua conta</Button>
  </Box>

}

export default Chat;
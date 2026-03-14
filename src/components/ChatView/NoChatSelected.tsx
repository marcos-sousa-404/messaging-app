import { Center, Text } from '@chakra-ui/react';

const NoChatSelected = () => {
  return (
    <Center flex={1} flexDirection={'column'} gap={2}>
      <Text fontWeight={'bold'} fontSize={'2xl'}>
        Nenhuma conversa selecionada
      </Text>
      <Text fontSize={'xl'}>Clique em uma para começar</Text>
    </Center>
  );
};

export default NoChatSelected;

import { Center, Flex, Text } from '@chakra-ui/react';

const NoMessages = () => {
  return (
    <Flex direction="column" height={'100%'} w="100%">
      <Center flex={1} flexDirection={'column'} gap={2}>
        <Text textAlign={'center'} fontWeight={'bold'} fontSize={'2xl'}>
          Nenhuma mensagem nesta conversa
        </Text>
        <Text textAlign={'center'} fontSize={'xl'}>
          Envie uma para começar
        </Text>
      </Center>
    </Flex>
  );
};

export default NoMessages;

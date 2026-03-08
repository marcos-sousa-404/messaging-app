import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { Button, CtaFooter, Form, Input } from '@/components';
import useLogin from '@/pages/Login/useLogin.ts';

const Login = () => {
  const { control, handleSubmit, onSubmit, handleGoToSignUp } = useLogin();

  return (
    <>
      <Box as={'main'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card w={'20%'} minWidth={'300px'}>
          <CardHeader>
            <Text fontSize={'2xl'} fontWeight={700}>Bem vindo de volta!</Text>
          </CardHeader>
          <CardBody>
            <Form display={'flex'} flexDir={'column'} gap={4} alignItems={'center'} onSubmit={handleSubmit(onSubmit)}>

              <Input label={'E-mail'} control={control} name={'email'} />
              <Input type={'password'} label={'Senha'} control={control} name={'password'} />

              <Button sx={{ width: 250 }} colorScheme={'brand'} type="submit">Entrar</Button>

            </Form>
          </CardBody>
        </Card>
      </Box>
      <CtaFooter
        promptText="Não tem conta?"
        actionText="Faça seu cadastro!"
        actionHandler={handleGoToSignUp}
      />
    </>
  );
};

export default Login;
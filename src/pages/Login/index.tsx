import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { Button, CtaFooter, Form, Input } from '@/components';
import useLogin from '@/pages/Login/useLogin.ts';
import ThemeSwitcher from '../../components/ThemeSwitcher';

const Login = () => {
  const { control, handleSubmit, onSubmit, handleGoToSignUp, isLoggingIn } = useLogin();

  return (
    <>
      <Box position="absolute" top={4} right={4}>
        <ThemeSwitcher />
      </Box>
      <Box as={'main'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card w={'20%'} minWidth={'300px'}>
          <CardHeader>
            <Text fontSize={'2xl'} fontWeight={700}>Bem vindo de volta!</Text>
          </CardHeader>
          <CardBody>
            <Form display={'flex'} flexDir={'column'} gap={4} alignItems={'center'} onSubmit={handleSubmit(onSubmit)}>

              <Input label={'E-mail'} control={control} name={'email'} />
              <Input type={'password'} label={'Senha'} control={control} name={'password'} />

              <Button isLoading={isLoggingIn} loadingText='Entrando...' sx={{ width: 250 }} colorScheme={'brand'} type="submit">Entrar</Button>
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
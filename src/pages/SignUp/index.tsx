import { Box, Card, CardBody, CardHeader, Text } from '@chakra-ui/react';
import { Button, CtaFooter, Form, Input } from '@/components';
import useSignUp from '@/pages/SignUp/useSignUp.ts';

const SignUp = () => {
  const { control, handleSubmit, onSubmit, handleGoToLogin } = useSignUp();

  return (
    <>
      <Box as={'main'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Card w={'20%'} minWidth={'300px'}>
          <CardHeader>
            <Text fontSize={'2xl'} fontWeight={700}>Junte-se a nós!</Text>
          </CardHeader>
          <CardBody>
            <Form display={'flex'} flexDir={'column'} gap={4} alignItems={'center'} onSubmit={handleSubmit(onSubmit)}>

              <Input label={'Nome de usuário'} control={control} name={'name'} />
              <Input label={'E-mail'} control={control} name={'email'} />
              <Input type={'password'} label={'Senha'} control={control} name={'password'} />
              <Input type={'password'} label={'Repita sua senha'} control={control} name={'confirmPassword'} />

              <Button sx={{ width: 250 }} colorScheme={'brand'} type="submit">Cadastrar</Button>

            </Form>
          </CardBody>
        </Card>

      </Box>
      <CtaFooter
        promptText="Já tem uma conta?"
        actionText="Faça login"
        actionHandler={handleGoToLogin}
      />
    </>
  );
};

export default SignUp;
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginFormData } from '@/pages/Login/types.ts';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '@/api';
import { useAuthStore } from '@/store';
import { useEffect } from 'react';
import { useToast } from '@/hooks';

const useLogin = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const searchParams = new URLSearchParams(window.location.search);
  const expired = searchParams.get('expired') === 'true';
  const showExpiredTokenMessage = expired;
  const showToast = useToast();

  useEffect(() => {
    if (showExpiredTokenMessage) {
      showToast({
        title: 'Sua sessão expirou. Faça login novamente.',
        status: 'warning',
        duration: 3000,
      });
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [showExpiredTokenMessage, showToast]);

  const { mutateAsync: login, isPending } = useLoginMutation();
  const { setToken, setUser } = useAuthStore();

  const navigate = useNavigate();

  const handleGoToSignUp = () => {
    navigate('/sign-up');
  };

  const onSubmit = (data: LoginFormData) => {
    login(data).then((response) => {
      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      navigate('/chat');
    });
  };

  return { control, handleSubmit, onSubmit, handleGoToSignUp, isLoggingIn: isPending };
};

export default useLogin;

const validationSchema = yup.object({
  email: yup.string().trim().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .trim()
    .min(8, 'A senha precisa ter ao menos 8 caracteres')
    .required('A senha é obrigatória'),
});

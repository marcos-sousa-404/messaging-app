import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginFormData } from '@/pages/Login/types.ts';
import { useNavigate } from 'react-router';
import useLoginMutation from '@/api/mutations/useLoginMutation';
import { useAuthStore } from '@/store/useAuthStore.ts';

const useLogin = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { mutateAsync: login } = useLoginMutation();
  const { setToken } = useAuthStore();

  const navigate = useNavigate();

  const handleGoToSignUp = () => {
    navigate('/sign-up');
  };

  const onSubmit = (data: LoginFormData) => {
    login(data).then((response) => {
      const { token } = response.data;

      setToken(token);
      navigate('/chat');
    });
  };

  return { control, handleSubmit, onSubmit, handleGoToSignUp };
};

export default useLogin;

const validationSchema = yup.object({
  email: yup.string().trim().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().trim().min(8, 'A senha precisa ter ao menos 8 caracteres').required('A senha é obrigatória'),
});
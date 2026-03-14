import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { SignUpFormData } from '@/pages/SignUp/types.ts';
import { useNavigate } from 'react-router';
import { useSignUpMutation } from '@/api';

const useSignUp = () => {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutateAsync: signUp, isPending } = useSignUpMutation();

  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const onSubmit = (data: SignUpFormData) => {
    const { name, password, email } = data;

    signUp({ name, password, email }).then(() => {
      handleGoToLogin();
    });
  };

  return { control, handleSubmit, onSubmit, handleGoToLogin, isSigningIn: isPending };
};

export default useSignUp;

const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(3, 'O nome de usuário precisa ter ao menos 3 caracteres')
    .max(50, 'O nome de usuário deve ter no máximo 50 caracteres')
    .required('Nome de usuário é obrigatório'),
  email: yup.string().trim().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .trim()
    .min(8, 'A senha precisa ter ao menos 8 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: yup
    .string()
    .trim()
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      return value === this.parent.password;
    })
    .required('A confirmação de senha é obrigatória'),
});

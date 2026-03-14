import usePreferencesInitializer from '@/hooks/usePreferencesInitializer.ts';
import useAuthStore from '@/store/useAuthStore.ts';
import PrivateRouter from '@/router/PrivateRouter.tsx';
import PublicRouter from '@/router/PublicRouter.tsx';

const Router = () => {
  usePreferencesInitializer();
  const { token } = useAuthStore();

  return token ? <PrivateRouter /> : <PublicRouter />;
};

export default Router;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '@/pages';
import SignUp from '@/pages/SignUp';

const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route path={'/sign-up'} element={<SignUp />} />
        <Route path={'*'} element={<Navigate to={'/login'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PublicRouter;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Chat } from '@/pages';

const PrivateRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/chat'} element={<Chat />} />
        <Route path={'/*'} element={<Navigate to={'/chat'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRouter;

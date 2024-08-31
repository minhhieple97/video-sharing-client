import { Route, Routes } from 'react-router-dom';
import { Layout } from './ui/Layout';
import PrivateRoute from './ui/PrivateRoute';
import { VideoList } from './features/video/VideoList';
import { LoginForm } from './features/auth/LoginForm';
import { LoadingOverlay } from './ui/LoadingOverlay';

function App() {
  return (
    <Layout>
      <LoadingOverlay />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<PrivateRoute />}>{/* Add private routes here */}</Route>
      </Routes>
    </Layout>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import { VideoList } from './features/video/VideoList';
import { AuthForm } from './features/auth/AuthForm';

import ShareVideoForm from './features/video/ShareVideoForm';
import { Layout } from './components/common/Layout';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { GuestRoute } from './components/common/GuestRoute';

function App() {
  return (
    <Layout>
      <LoadingOverlay />
      <Routes>
        <Route path="/" element={<VideoList />} />
        <Route element={<GuestRoute />}>
          <Route path="/auth" element={<AuthForm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/share" element={<ShareVideoForm />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;

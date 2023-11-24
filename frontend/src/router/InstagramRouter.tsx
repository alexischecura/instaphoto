import { useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '../hooks/useAuthStore';
import { AuthStatus } from '../store/auth/authSlice';
import LoadingPage from '../components/common/LoadingPage';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function AppRouter() {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === AuthStatus.checking) {
    return <LoadingPage />;
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {status === AuthStatus.notAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<p>Is login</p>} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default AppRouter;

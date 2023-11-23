import { useEffect, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuthStore } from '../hooks/useAuthStore';
import { AuthStatus } from '../store/auth/authSlice';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function AppRouter() {
  const { status } = useAuthStore();

  useEffect(() => {
    // checkAuthToken();
  }, []);

  //   if (status === AuthStatus.checking) {
  //     return <h3>Loading...</h3>;
  //   }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {'hithere' ? (
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

import { Suspense, lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import LoadingPage from '../components/common/LoadingPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const LoginPage = lazy(() => import('../pages/LoginPage'));

function AppRouter() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<h1>Is login</h1>} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;

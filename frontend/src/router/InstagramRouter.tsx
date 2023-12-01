import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingPage from '../components/common/LoadingPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const EmailVerificationPage = lazy(
  () => import('../pages/EmailVerificationPage')
);

function AppRouter() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<h1>Is login</h1>} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verification" element={<EmailVerificationPage />}>
          <Route path=":verificationCode" element={<EmailVerificationPage />} />
        </Route>
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;

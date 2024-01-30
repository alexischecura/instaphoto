import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingCircle from '../components/common/LoadingCircle';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import ProfilePage from '../pages/ProfilePage';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const EmailVerificationPage = lazy(
  () => import('../pages/EmailVerificationPage')
);
const HomePage = lazy(() => import('../pages/HomePage'));

function AppRouter() {
  return (
    <Suspense fallback={<LoadingCircle />}>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<h1>Search</h1>} />
          <Route path="/explore" element={<h1>Explore</h1>} />
          <Route path="/messages" element={<h1>Messages</h1>} />
          <Route path="/notifications" element={<h1>Notifications</h1>} />
          <Route path="/create" element={<h1>Create</h1>} />
          <Route path="/:username" element={<ProfilePage />} />
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

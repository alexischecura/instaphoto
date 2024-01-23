import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LoginUserType } from '../types/user';
import { loginUserSchema } from '../schemas/authSchemas';

import Logo from '../components/common/Logo';
import InputForm from '../components/auth/InputForm';
import MainButton from '../components/common/MainButton';
import { useAuthStore } from '../hooks/useAuthStore';

import { AuthStatus } from '../store/auth/authSlice';
import { useForm } from '../hooks/useForm';
import FormDivider from '../components/auth/FormDivider';
import AuthBox from '../components/auth/AuthBox';
import AuthLink from '../components/auth/AuthLink';

const LoginPageStyled = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const LoginImage = styled.img`
  height: 58rem;
`;

const StyledForm = styled.form`
  margin-top: 4rem;
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: 1rem;
  color: inherit;
  font-size: 1.1rem;
  text-decoration: none;
`;

const ErrorMessage = styled.p`
  color: var(--text-color-error);
  font-size: 1.4rem;
  text-align: center;
  margin: 1.4rem 0;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { startLogin, errorMessage, status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  const isLoading = useMemo(() => status === AuthStatus.loading, [status]);

  const initialValues = {
    identifier: '',
    password: '',
  };

  const {
    formValues,
    onInputChange,
    validationResult: { isFormValid },
  } = useForm<LoginUserType>(initialValues, loginUserSchema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLogin(formValues);
  };

  return (
    <LoginPageStyled>
      <LoginImage
        src="./login-image.webp"
        alt="smartphone image where the instagram app is open"
      />
      <FormContainer>
        <AuthBox>
          <Logo variation="medium" />
          <StyledForm onSubmit={handleSubmit}>
            <InputForm
              type="text"
              value={formValues.identifier}
              field="identifier"
              placeholder="Phone number, username, or email"
              disable={isLoading}
              autoComplete="on"
              onChange={onInputChange}
              required
            />
            <InputForm
              type={showPassword ? 'text' : 'password'}
              value={formValues.password}
              field="password"
              placeholder="Password"
              autoComplete="current-password"
              disable={isLoading}
              onChange={onInputChange}
              required
              showBtn={!!formValues.password}
              btnLabel={showPassword ? 'Hide' : 'Show'}
              onClickBtn={() => setShowPassword((show) => !show)}
            />
            <MainButton
              text="Log in"
              isLoading={isLoading}
              disabled={!isFormValid}
              type="submit"
            />
          </StyledForm>
          <FormDivider>or</FormDivider>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ForgotPasswordLink to="/password/reset">
            Forgot password?
          </ForgotPasswordLink>
        </AuthBox>
        <AuthBox>
          <AuthLink linkLabel="Sign up" to="/signup">
            Don't have an account?
          </AuthLink>
        </AuthBox>
      </FormContainer>
    </LoginPageStyled>
  );
}

export default LoginPage;

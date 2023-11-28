import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { LoginUserType } from '../types/user';
import { loginUserSchema } from '../schemas/authSchemas';

import Logo from '../components/common/Logo';
import InputForm from '../components/auth/InputForm';
import AuthButton from '../components/auth/AuthButton';
import { useAuthStore } from '../hooks/useAuthStore';

import { AuthStatus } from '../store/auth/authSlice';
import { useForm } from '../hooks/useForm';

const LoginPageStyled = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const BoxStyled = styled.div`
  border: solid 1px var(--border-gray-700);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 34.8rem;
  padding: 2.4rem 4rem;
`;

const LoginImage = styled.img`
  height: 58rem;
`;

const StyledForm = styled.form`
  margin-top: 4rem;
`;

const Divider = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  & div {
    flex-grow: 1;
    flex-shrink: 1;
    height: 1px;
    background-color: var(--border-gray-700);
  }

  & span {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color-gray);
  }
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: 1rem;
  color: inherit;
  font-size: 1.1rem;
  text-decoration: none;
`;

const SignUpLink = styled(Link)`
  margin-top: 1rem;
  color: var(--bg-btn-color);
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
`;

const SignUpContainer = styled.div`
  & span {
    font-size: 1.3rem;
  }
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

  const isLoading = useMemo(() => status === AuthStatus.checking, [status]);

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
      <LoginImage src="./login-image.webp" />
      <FormContainer>
        <BoxStyled>
          <Logo variation="medium" />
          <StyledForm onSubmit={handleSubmit}>
            <InputForm
              type="text"
              field="identifier"
              placeholder="Phone number, username, or email"
              disable={isLoading}
              autoComplete="on"
              onChange={onInputChange}
              required
            />
            <InputForm
              type={showPassword ? 'text' : 'password'}
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
            <AuthButton
              text="Log in"
              isLoading={isLoading}
              disabled={!isFormValid}
            />
          </StyledForm>
          <Divider>
            <div></div>
            <span>or</span>
            <div></div>
          </Divider>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ForgotPasswordLink to="/password/reset">
            Forgot password?
          </ForgotPasswordLink>
        </BoxStyled>
        <BoxStyled>
          <SignUpContainer>
            <span>Don't have an account? </span>
            <SignUpLink to="/signup">Sign Up</SignUpLink>
          </SignUpContainer>
        </BoxStyled>
      </FormContainer>
    </LoginPageStyled>
  );
}

export default LoginPage;

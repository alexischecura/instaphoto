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
import AuthFormContainer from '../components/auth/AuthFormContainer';

const StyledForm = styled.form`
  margin-top: 4rem;
`;

const ForgotPasswordLink = styled(Link)`
  margin-top: 1rem;
  color: inherit;
  font-size: 1.2rem;
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
  border: none;
  border-radius: 4px;
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { startLogin, errorMessage, status, checkAuthToken } = useAuthStore();
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

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
  const handleDemo = async () => {
    setIsLoadingDemo(true);
    await startLogin({ identifier: 'alexischecura', password: 'pass1234' });
    setIsLoadingDemo(false);
  };

  return (
    <AuthFormContainer>
      <FormContainer>
        <AuthBox>
          <Logo variation="medium" />
          <StyledForm onSubmit={handleSubmit}>
            <InputForm
              type="text"
              value={formValues.identifier}
              field="identifier"
              placeholder="Username or email"
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
              isLoading={isLoading && !isLoadingDemo}
              disabled={!isFormValid}
              type="submit"
            />
            <MainButton
              text="Demo"
              isLoading={isLoadingDemo}
              type="button"
              onClick={handleDemo}
            />
          </StyledForm>
          <FormDivider>or</FormDivider>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ForgotPasswordLink to="/password/reset">
            Reset password
          </ForgotPasswordLink>
          <FormDivider>or</FormDivider>
        </AuthBox>
        <AuthBox>
          <AuthLink linkLabel="Sign up" to="/signup">
            No account yet?
          </AuthLink>
        </AuthBox>
      </FormContainer>
    </AuthFormContainer>
  );
}

export default LoginPage;

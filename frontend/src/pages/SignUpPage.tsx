import { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

import { SignUpUserType } from '../types/user';
import { signUpUserSchema } from '../schemas/authSchemas';
import { AuthStatus } from '../store/auth/authSlice';
import { useAuthStore } from '../hooks/useAuthStore';
import { useForm } from '../hooks/useForm';

import AuthFormContainer from '../components/auth/AuthFormContainer';
import Logo from '../components/common/Logo';
import InputForm from '../components/auth/InputForm';
import MainButton from '../components/common/MainButton';
import AuthBox from '../components/auth/AuthBox';
import AuthLink from '../components/auth/AuthLink';

const FormStyled = styled.form`
  margin-top: 4rem;
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

const HeadingInfo = styled.h3`
  color: var(--text-color-gray);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-top: 2rem;
`;

function SignUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { startSignUp, errorMessage, status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  const isLoading = useMemo(() => status === AuthStatus.loading, [status]);

  const initialValues = {
    email: '',
    fullName: '',
    username: '',
    password: '',
  };

  const {
    formValues,
    onInputChange,
    validationResult: { isFormValid },
  } = useForm<SignUpUserType>(initialValues, signUpUserSchema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startSignUp(formValues);
  };

  return (
    <AuthFormContainer>
      <FormContainer>
        <AuthBox>
          <Logo variation="medium" />
          <HeadingInfo>
            Sign up to see photos and videos from your friends
          </HeadingInfo>
          <FormStyled onSubmit={handleSubmit}>
            <InputForm
              type="text"
              field="email"
              value={formValues.email}
              placeholder="Email"
              disable={isLoading}
              onChange={onInputChange}
              required
            />
            <InputForm
              type="text"
              field="fullName"
              value={formValues.fullName}
              placeholder="Full Name"
              disable={isLoading}
              onChange={onInputChange}
              required
            />
            <InputForm
              type="text"
              value={formValues.username}
              field="username"
              placeholder="Username"
              disable={isLoading}
              onChange={onInputChange}
              required
            />
            <InputForm
              type={showPassword ? 'text' : 'password'}
              field="password"
              value={formValues.password}
              placeholder="Password"
              autoComplete="new-password"
              disable={isLoading}
              onChange={onInputChange}
              required
              showBtn={!!formValues.password}
              btnLabel={showPassword ? 'Hide' : 'Show'}
              onClickBtn={() => setShowPassword((show) => !show)}
            />
            <MainButton
              text="Sign up"
              isLoading={isLoading}
              disabled={!isFormValid}
              type="submit"
            />
          </FormStyled>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </AuthBox>
        <AuthBox>
          <AuthLink to="/login" linkLabel="Log in">
            Have an account?
          </AuthLink>
        </AuthBox>
      </FormContainer>
    </AuthFormContainer>
  );
}

export default SignUpPage;

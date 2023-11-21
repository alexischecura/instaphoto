import styled from 'styled-components';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoginUserType, loginUserSchema } from '../types/userTypes';
import Logo from '../components/Logo';
import InputForm from '../components/FieldHolder';
import AuthButton from '../components/AuthButton';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPageStyled = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  gap: 3rem;
`;

const LoginFormStyled = styled.div`
  border: solid 1px var(--border-gray-700);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 38rem;
  padding: 5.4rem;
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

const LinkForm = styled(Link)`
  margin-top: 1rem;
  color: inherit;
  font-size: 1.1rem;
  text-decoration: none;
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // 🔴 Todo - Replace with auth login hook
  const isLoading = false;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<LoginUserType>({ resolver: zodResolver(loginUserSchema) });

  const watchPassword = watch('password');

  const onSubmit: SubmitHandler<LoginUserType> = (credentials) => {
    console.log(credentials);
  };

  console.log(errors);
  return (
    <LoginPageStyled>
      <LoginImage src="./login-image.webp" />
      <LoginFormStyled>
        <Logo variation="medium" />
        <StyledForm onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
          <InputForm>
            <input
              type="text"
              id="user"
              {...(register('user'), { required: true })}
              disabled={isLoading}
            />
            <label htmlFor="user">Phone number, username, or email</label>
          </InputForm>
          <InputForm>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...(register('password'), { required: true })}
              disabled={isLoading}
              onChange={(e) => setValue('password', e.target.value)}
            />
            <label htmlFor="password">Password</label>
            {watchPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((cur) => !cur)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            )}
          </InputForm>
          <AuthButton text="Log in" isLoading={isLoading} />
        </StyledForm>
        <Divider>
          <div></div>
          <span>or</span>
          <div></div>
        </Divider>
        <LinkForm to={'/password/reset'}>Forgot password?</LinkForm>
      </LoginFormStyled>
    </LoginPageStyled>
  );
}

export default LoginPage;

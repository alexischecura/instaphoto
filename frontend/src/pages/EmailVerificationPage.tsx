import { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { EmailVerificationType } from '../types/user';
import { emailVerificationSchema } from '../schemas/authSchemas';
import { AuthStatus } from '../store/auth/authSlice';
import { useAuthStore } from '../hooks/useAuthStore';
import { useForm } from '../hooks/useForm';

import InputForm from '../components/auth/InputForm';
import MainButton from '../components/common/MainButton';
import AuthBox from '../components/auth/AuthBox';
import AuthLink from '../components/auth/AuthLink';

const EmailVerificationPageStyled = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

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
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  margin: 2rem 0;
`;

const LetterLogo = styled.img`
  height: 7.2rem;
  width: auto;
`;

function EmailVerificationPage() {
  const { verificationCode } = useParams();

  const { startVerificationEmail, errorMessage, status, checkAuthToken } =
    useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  const isLoading = useMemo(() => status === AuthStatus.loading, [status]);

  const initialValues = {
    verificationCode: '',
  };

  const {
    formValues,
    onInputChange,
    validationResult: { isFormValid },
    onResetForm,
  } = useForm<EmailVerificationType>(initialValues, emailVerificationSchema);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startVerificationEmail(formValues);
  };

  useEffect(() => {
    if (verificationCode) {
      onResetForm({ verificationCode });
      startVerificationEmail({ verificationCode });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verificationCode]);

  return (
    <EmailVerificationPageStyled>
      <FormContainer>
        <AuthBox>
          <LetterLogo src="../letter-logo.png" alt="a letter with a heart" />
          <HeadingInfo>Enter Verification Code</HeadingInfo>
          <AuthLink to="/resend" linkLabel="Resend Code">
            Enter the verification code we sent to your email.
          </AuthLink>
          <FormStyled onSubmit={handleSubmit}>
            <InputForm
              type="text"
              value={formValues.verificationCode}
              field="verificationCode"
              placeholder="Verification Code"
              disable={isLoading}
              onChange={onInputChange}
              required
            />
            <MainButton
              text="Next"
              isLoading={isLoading}
              disabled={!isFormValid}
              type='submit'
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
    </EmailVerificationPageStyled>
  );
}

export default EmailVerificationPage;

import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LinkStyled = styled(Link)`
  margin-top: 1rem;
  color: var(--btn-color);
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
`;

const LinkContainer = styled.div`
  & span {
    font-size: 1.3rem;
  }
`;

type AuthLinkProps = {
  to: string;
  linkLabel: string;
};

function AuthLink({
  to,
  linkLabel,
  children,
}: PropsWithChildren<AuthLinkProps>) {
  return (
    <LinkContainer>
      <span>{children}</span> <LinkStyled to={to}>{linkLabel}</LinkStyled>
    </LinkContainer>
  );
}

export default AuthLink;

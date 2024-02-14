import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const SidebarNavLink = styled(NavLink)`
  &,
  &:link,
  &:visited {
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.2rem 2.4rem;
    color: inherit;
    font-size: 1.6rem;
    font-weight: 400;
    transition: all 0.3s;
    border-radius: 0.8rem;
    background: none;
    width: 100%;

    @media (max-width: 1250px) {
      justify-content: center;
      & svg {
        width: 3.4rem;
        height: 3.4rem;
      }
    }
    @media (max-width: 800px) {
      padding: 1.2rem 1rem;
    }
    @media (max-width: 700px) {
      padding: 0;
    }
  }

  &:hover {
    background-color: var(--color-gray-300);
  }

  &.active:link,
  &.active:visited {
    font-weight: 600;
  }
  &:active .profile,
  &.active:link .profile,
  &.active:visited .profile {
    border: 2px solid #000;
  }

  & svg {
    width: 2.6rem;
    height: 2.6rem;
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }

  &:active svg {
    transform: scale(0.9);
  }
  &.active .sharp,
  & .outline {
    display: inline;
  }
  &.active .outline,
  & .sharp {
    display: none;
  }
`;

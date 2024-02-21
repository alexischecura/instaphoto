import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const NotificationsStyled = styled.ul`
  z-index: 99;
  position: absolute;
  top: 2.4rem;
  right: 2rem;
  background-color: var(--color-gray-0);
  border: 1px solid var(--color-gray-700);
  border-radius: 4px;
  width: 30rem;
  box-shadow: var(--box-shadow);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & li {
    border-bottom: 1px solid var(--color-gray-700);
  }

  & li:last-child {
    border-bottom: none;
  }

  @media (max-width: 500px) {
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const Notification = styled.li`
  cursor: pointer;
  list-style: none;
  width: 100%;
  text-align: center;
  padding: 1.8rem 0;
  font-size: 1.2rem;

  &:hover {
    background-color: var(--color-gray-300);
  }
`;

function Notifications({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = (e: globalThis.MouseEvent) => {
      const targetNode = e.target as Node;
      if (ref.current && !ref.current.contains(targetNode)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [onClose]);

  return (
    <NotificationsStyled ref={ref}>
      <Notification>
        <strong>alexischecura</strong> starts following you
      </Notification>
      <Notification>
        <strong>danielanderson</strong> starts following you
      </Notification>
      <Notification>
        <strong>alexischecura</strong> create a new <strong>post</strong>
      </Notification>
    </NotificationsStyled>
  );
}

export default Notifications;

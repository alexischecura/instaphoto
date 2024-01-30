import styled from 'styled-components';

const Loader = styled.div`
  margin: 10rem auto;
  height: 12rem;
  width: 12rem;
  box-sizing: border-box;
  display: flex;
  position: relative;
  justify-content: center;
  perspective-origin: 6rem 6rem;
  transform-origin: 6rem 6rem;
  border: 0px solid rgb(0, 0, 0);
  flex: 0 0 auto;
  flex-flow: column nowrap;

  &:after,
  &:before {
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
    border-style: solid;
    border-width: 2px;
    box-sizing: border-box;
    content: '';
    left: 0;
    position: absolute;
    top: 0;
  }
  &:after {
    -webkit-animation: rotate 2s infinite ease;
    animation: rotate 2s infinite ease;
    border-color: #3897f0 transparent transparent;
    -webkit-transform-origin: 50%;
    transform-origin: 50%;
  }
  &:before {
    border-color: #c7c7c7;
  }
  p {
    display: block;
    font-size: 1.4rem;
    margin: -6rem 0;
    padding: 6rem 0.9rem;
    position: relative;
    text-align: center;
    z-index: 1;
    color: rgb(199, 199, 199);
    text-decoration: none;
    font: normal normal 600 normal 1.4rem / 1.4rem inherit;
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

function LoadingCircle() {
  return (
    <Loader>
      <p>Loading</p>
    </Loader>
  );
}

export default LoadingCircle;

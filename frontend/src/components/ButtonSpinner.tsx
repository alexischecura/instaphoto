import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`;

const calculateDegree = (numBars: number) => 360 / numBars;

const calculateAnimationDelay = (animationTime: number, numBars: number) =>
  animationTime / numBars;

const Spinner = styled.div`
  position: relative;
  width: 3.2rem;
  height: 3.2rem;

  display: inline-block;
`;

type BarProps = {
  animationTime: number;
  animationDelay: number;
};

const Bar = styled.div<BarProps>`
  width: 6%;
  height: 16%;
  background: #fff;
  position: absolute;
  left: 49%;
  top: 43%;
  opacity: 0;
  border-radius: 50px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  animation: ${spin} ${({ animationTime }) => animationTime}s linear infinite;
  animation-delay: ${({ animationDelay }) => animationDelay}s;
`;

type ButtonSpinnerProps = {
  numBars?: number;
  animationTime?: number;
};

function ButtonSpinner({
  numBars = 8,
  animationTime = 0.5,
}: ButtonSpinnerProps) {
  const degree = calculateDegree(numBars);

  return (
    <Spinner>
      {[...Array(numBars)].map((_, index) => (
        <Bar
          key={index}
          style={{
            transform: `rotate(${degree * index + 225}deg) translate(0, -130%)`,
          }}
          animationTime={animationTime}
          animationDelay={
            calculateAnimationDelay(animationTime, numBars) * index
          }
        />
      ))}
    </Spinner>
  );
}

export default ButtonSpinner;

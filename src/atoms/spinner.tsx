import React from 'react';
import styled from 'styled-components';
import { rotate360 } from 'styles/animations';
import { Size } from 'types/types';
import sunIcon from 'assets/icons/day.svg';

interface Props {
  className?: string;
  size?: Size;
}

const Spinner = (props: Props): JSX.Element => {
  const { className, size = 'md' } = props;
  return (
    <img
      className={`${className} ${size} spinner`}
      src={sunIcon}
      alt="spinner"
    />
  );
};

const SpinnerStyled = styled(Spinner)`
  animation: ${rotate360} 1.25s infinite;
  width: 10em;
  height: 10em;

  &.sm {
    font-size: 0.5rem;
  }
  &.md {
    font-size: 1rem;
  }
  &.lg {
    font-size: 1.5rem;
  }
`;

export default SpinnerStyled;

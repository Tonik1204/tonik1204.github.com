import { keyframes } from 'styled-components';

export const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const runningTextLine = keyframes`
  from {
    background-position: -500%;
  }
  to {
    background-position: 500%;
  }
`;

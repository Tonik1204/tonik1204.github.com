import styled from 'styled-components';
import colors from 'styles/colors';

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  color: ${colors.text};
  transform: scale(0.9);
  transition: transform 0.5s;
  :focus,
  :hover {
    transform: scale(0.95);
  }
`;

export default Input;

import styled from 'styled-components';
import colors from 'styles/colors';
import { runningTextLine } from 'styles/animations';

const WarningText = styled.div`
  font-size: 2rem;
  letter-spacing: 4px;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    ${colors.black},
    ${colors.white},
    ${colors.black}
  );
  background-repeat: no-repeat;
  background-size: 80%;
  animation: ${runningTextLine} 3s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${colors.white0};
`;

export default WarningText;

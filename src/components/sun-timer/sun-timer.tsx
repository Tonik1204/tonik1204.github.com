import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const SunTimer = (props: Props) => {
  const { className } = props;
  return <div className={className}>Sunrise</div>;
};

const SunTimerStyled = styled(SunTimer)`
  min-width: 0;
`;

export default SunTimerStyled;

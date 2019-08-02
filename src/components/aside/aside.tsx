import React from 'react';
import styled from 'styled-components';
import { Clock } from 'components/clock';
import { SunTimer } from 'components/sun-timer';

interface Props {
  className?: string;
}

const Aside = (props: Props) => {
  const { className } = props;

  return (
    <aside className={className}>
      <Clock />
      <SunTimer />
    </aside>
  );
};

const AsideStyled = styled(Aside)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 2rem;
`;

export default AsideStyled;

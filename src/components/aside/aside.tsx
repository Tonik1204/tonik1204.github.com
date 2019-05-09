import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { isDayTime } from 'config/config';
import colors from 'styles/colors';
import Clock from 'react-clock';

interface Props {
  className?: string;
}

const Aside = (props: Props) => {
  const { className } = props;
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <aside className={className}>
      <Clock value={date} />
    </aside>
  );
};

const AsideStyled = styled(Aside)`
  display: flex;
  justify-content: center;
  padding: 1rem;

  ${!isDayTime
    ? `
    .react-clock__face {
      border-color: ${colors.white};
    }
    .react-clock__minute-mark__body, .react-clock__hour-mark__body, .react-clock__minute-hand__body, .react-clock__hour-hand__body {
      background-color: ${colors.white};
  `
    : ''}
`;

export default AsideStyled;

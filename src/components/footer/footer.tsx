import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

interface Props {
  className?: string;
}

const Footer = (props: Props) => {
  const { className } = props;
  return (
    <footer className={className}>
      All times are CEST (Europe/Warsaw, GMT +0200) unless otherwise stated.
    </footer>
  );
};

const FooterStyled = styled(Footer)`
  padding: 1.5rem 1rem;
  background-color: ${colors.black800};
  color: ${colors.white};
`;

export default FooterStyled;

import React from 'react';
import styled from 'styled-components';
import { Size } from 'types/types';

export interface Props {
  className?: string;
  src: string;
  alt: string;
  data: any;
  size?: Size;
}

const IconData = (props: Props): JSX.Element => {
  const { className, src, alt, data, size = 'md' } = props;

  return (
    <div className={`${className} ${size} icon-data`}>
      <img src={src} alt={alt} />
      <div className="data">{data}</div>
    </div>
  );
};

const StyledIconData = styled(IconData)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0.5rem;

  &.sm {
    font-size: 0.75rem;
  }
  &.md {
    font-size: 1rem;
  }
  &.lg {
    font-size: 1.25rem;
  }

  .data {
    white-space: pre;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    margin-right: 0.5rem;
    width: 2em;
    height: 2em;
  }
`;

export default StyledIconData;

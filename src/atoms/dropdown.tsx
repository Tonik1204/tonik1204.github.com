import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

export interface Item {
  id: number;
  name: string;
}

interface Props {
  className?: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

const Dropdown = (props: Props): JSX.Element => {
  const { className, items, onSelect } = props;

  const clickHandler = (item: Item) => () => onSelect && onSelect(item);

  return (
    <div className={`${className} dropdown`}>
      {items.map((item, key) => (
        <div
          className="dropdown-item"
          key={item.id || key}
          onMouseDown={clickHandler(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

const DropdownStyled = styled(Dropdown)`
  background-color: ${colors.white};
  border: 1px solid ${colors.black};
  border-top: 0;
  position: absolute;
  z-index: 1;
  width: calc(100% + 2px);
  left: -1px;
  max-height: 21rem;
  overflow: auto;

  .dropdown-item {
    cursor: pointer;
    padding: 0.75rem 1rem;

    :hover {
      background-color: ${colors.lightBlue500};
    }
  }
`;

export default DropdownStyled;

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Search } from 'components/search';
import { MenuContext } from 'components/menu-context';
import colors from 'styles/colors';
import AppTitle from 'atoms/app-title';
import IconButton from 'atoms/icon-button';
import menuImg from 'assets/icons/menu.png';
interface Props {
	className?: string;
}

const Header = (props: Props) => {
	const { className } = props;
	const { isMenuOpen, setMenuState } = useContext(MenuContext);

	const clickMenuHandler = () => setMenuState(!isMenuOpen);

	return (
		<header className={className}>
			<IconButton
				className="app-menu-button"
				src={menuImg}
				alt="app-menu-button"
				size="lg"
				onClick={clickMenuHandler}
			/>
			<AppTitle>Weather</AppTitle>
			<Search />
		</header>
	);
};

const HeaderStyled = styled(Header)`
  display: flex;
  background-color: ${colors.blue400};
  padding: 0.75rem;

  .app-menu-button {
    margin-right: 1rem;
    transition: transform 0.3s;
    :hover {
      transform: rotateZ(-10deg);
    }
  }
`;

export default HeaderStyled;

import React from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

interface Props {
	className?: string;
}

const Nav = (props: Props) => {
	const { className } = props;

	return (
		<nav className={`${className} app-nav`}>
			<a className="nav-signup" href="/">
				Sign Up
			</a>
			<a className="nav-login" href="/">
				Log In
			</a>
		</nav>
	);
};

const NavStyled = styled(Nav)`
	display: flex;
	flex-direction: column;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

  a {
		padding: 1rem 0.65rem;
		color: ${colors.white};
		border-left: 2px solid ${colors.grey10};
		margin-bottom: 1rem;
		text-transform: uppercase;

    :hover {
      color: ${colors.grey10};
    }
  }
`;

export default NavStyled;

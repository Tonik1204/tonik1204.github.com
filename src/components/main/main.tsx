import React from 'react';
import styled from 'styled-components';
import { WeatherTabs } from 'components/weather-tabs';

interface Props {
	className?: string;
}

const Main = (props: Props) => {
	const { className } = props;
	return (
		<main className={className}>
			<WeatherTabs />
		</main>
	);
};

const MainStyled = styled(Main)`
  min-width: 0;
`;

export default MainStyled;

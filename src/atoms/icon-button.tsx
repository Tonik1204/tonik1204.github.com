import React from 'react';
import styled from 'styled-components';
import { Size } from 'types/types';

export interface Props {
	className?: string;
	src: string;
	alt: string;
	size?: Size;
	onClick?: (e: any) => void;
}

const IconButton = (props: Props): JSX.Element => {
	const { className, src, alt, onClick, size = 'md' } = props;

	return (
		<button className={`${className} ${size} icon-button`} onClick={onClick}>
			<img src={src} alt={alt} />
		</button>
	);
};

const StyledIconButton = styled(IconButton)`
	display: flex;
	align-items: center;
	justify-content: center;

	&.sm {
		font-size: 0.75rem;
	}
	&.md {
		font-size: 1rem;
	}
	&.lg {
		font-size: 2rem;
	}

	img {
		width: 1em;
  	height: 1em;
	}
`;

export default StyledIconButton;

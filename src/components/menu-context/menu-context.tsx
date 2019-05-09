import React, { useState } from 'react';

interface Context {
	isMenuOpen: boolean;
	setMenuState: (value: any) => void;
}

const defaultContext: Context = {
	isMenuOpen: false,
	setMenuState: () => null,
};

export const MenuContext = React.createContext<Context>(defaultContext);

const MenuProvider = (props: any): JSX.Element => {
	const [ isMenuOpen, setMenuState ] = useState<boolean>(false);

	return (
		<MenuContext.Provider
			value={{
				isMenuOpen,
				setMenuState,
			}}
		>
			{props.children}
		</MenuContext.Provider>
	);
};

export default MenuProvider;

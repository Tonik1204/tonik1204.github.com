import React, { useContext } from 'react';
import styled from 'styled-components';
import { device, isDayTime } from 'config/config';
import { Header } from 'components/header';
import { Main } from 'components/main';
import { Aside } from 'components/aside';
import { Footer } from 'components/footer';
import { Nav } from 'components/nav';
import { MenuContext } from 'components/menu-context';
import dayImg from 'assets/imgs/day-sky.jpg';
import nightImg from 'assets/imgs/night-sky.jpg';
import spaceImg from 'assets/imgs/space.jpg';

interface Props {
  className?: string;
}

const App = (props: Props) => {
  const { className } = props;
  const { isMenuOpen } = useContext(MenuContext);
  const menuOpenedClass = isMenuOpen ? 'app-menu-opened' : '';

  return (
    <div className={`${className} ${menuOpenedClass}`}>
      {isMenuOpen && <Nav />}
      <div className="app-wrapper">
        <Header className="app-header" />
        <div className="app-container">
          <Main className="app-main" />
          <Aside className="app-aside" />
        </div>
        <Footer className="app-footer" />
      </div>
    </div>
  );
};

const AppStyled = styled(App)`
  background-image: url(${spaceImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  &.app-menu-opened .app-wrapper {
    transform: rotate(-6deg);

    @media ${device.laptop} {
      transform: rotate(-8deg);
    }

    @media ${device.tablet} {
      transform: rotate(-12deg);
    }

    @media ${device.mobile} {
      transform: rotate(-16deg);
    }
  }

  .app-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'container'
      'footer';
    transition: transform 1.25s;
    transform-origin: right top;
    height: 100vh;
  }

  .app-header {
    grid-area: header;
  }

  .app-main {
    grid-area: main;
  }

  .app-aside {
    grid-area: aside;
  }

  .app-footer {
    grid-area: footer;
  }

  .app-container {
    grid-area: container;
    display: grid;
    grid-template-columns: 7fr 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 'main aside';
    background-image: url(${isDayTime ? dayImg : nightImg});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;

    @media ${device.laptop} {
      grid-template-areas:
        'aside aside'
        'main main';
    }
  }
`;

export default AppStyled;

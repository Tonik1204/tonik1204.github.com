import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from 'styles/global';
import { SearchStore } from 'components/search-store';
import { WeatherStore } from 'components/weather-store';
import { MenuProvider } from 'components/menu-context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <SearchStore>
    <WeatherStore>
      <MenuProvider>
        <App />
        <GlobalStyles />
      </MenuProvider>
    </WeatherStore>
  </SearchStore>,
  document.getElementById('root'),
);
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from 'styles/global';
import { GeolocationStore } from 'components/geolocation-store';
import { SearchStore } from 'components/search-store';
import { WeatherStore } from 'components/weather-store';
import { MenuProvider } from 'components/menu-context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <GeolocationStore>
    <SearchStore>
      <WeatherStore>
        <MenuProvider>
          <App />
          <GlobalStyles />
        </MenuProvider>
      </WeatherStore>
    </SearchStore>
  </GeolocationStore>,
  document.getElementById('root'),
);
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import GlobalStyles from 'styles/global';
import { GeolocationStore } from 'components/geolocation-store';
import { SearchStore } from 'components/search-store';
import { ForecastStore } from 'components/forecast-store';
import { WeatherStore } from 'components/weather-store';
import { MenuProvider } from 'components/menu-context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <GeolocationStore>
    <SearchStore>
      <ForecastStore>
        <WeatherStore>
          <MenuProvider>
            <App />
            <GlobalStyles />
          </MenuProvider>
        </WeatherStore>
      </ForecastStore>
    </SearchStore>
  </GeolocationStore>,
  document.getElementById('root'),
);
serviceWorker.unregister();

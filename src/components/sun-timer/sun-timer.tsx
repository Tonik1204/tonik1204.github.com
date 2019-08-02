import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import config, { device } from 'config/config';
import Spinner from 'atoms/spinner';
import { getSunData } from 'utils/helper';
import { GeolocationContext } from 'components/geolocation-store';
import { SearchContext } from 'components/search-store';
import { WeatherContext } from 'components/weather-store';
import { Toast } from 'components/toast-container';
import IconData from 'atoms/icon-data';
import sunriseIcon from 'assets/icons/sunrise.png';
import sunsetIcon from 'assets/icons/sunset.png';

interface Props {
  className?: string;
}

const SunTimer = (props: Props) => {
  const { className } = props;
  const { isGeolocationLoading, coords } = useContext(GeolocationContext);
  const { cityName } = useContext(SearchContext);
  const { isWeatherLoading, isWeatherFetchingError, weatherData } = useContext(
    WeatherContext,
  );

  const weatherStore = useRef(useContext(WeatherContext));

  const { sunrise, sunset } = weatherData;
  const { lat, long } = coords;
  const sunriseData = getSunData('Sunrise', sunrise);
  const sunsetData = getSunData('Sunset', sunset);
  const search = cityName.includes(',')
    ? `&q=${cityName.replace(' ', '')}`
    : lat && long
    ? `&lat=${lat}&lon=${long}`
    : '';

  useEffect(() => {
    if (search) {
      weatherStore.current.doWeatherFetch(config.weather_api_url + search);
    }
  }, [search]);

  return (
    <div className={className}>
      {!sunrise || !sunset || isGeolocationLoading || isWeatherLoading ? (
        <Spinner size="md" />
      ) : (
        <section className="sun-data">
          <IconData
            src={sunriseIcon}
            alt="Sunrise"
            data={sunriseData}
            size="lg"
          />
          <IconData src={sunsetIcon} alt="Sunset" data={sunsetData} size="lg" />
        </section>
      )}
      <Toast show={isWeatherFetchingError} />
    </div>
  );
};

const SunTimerStyled = styled(SunTimer)`
  margin-top: 1rem;

  .sun-data {
    font-weight: bold;

    .icon-data {
      padding: 0.75rem 2.5rem;
    }

    img {
      font-size: 2em;
    }

    @media ${device.laptop} {
      display: flex;
    }
  }
`;

export default SunTimerStyled;

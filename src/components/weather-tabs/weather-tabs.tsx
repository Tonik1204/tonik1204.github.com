import React, { useEffect, useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import config from 'config/config';
import Spinner from 'atoms/spinner';
import WarningText from 'atoms/warning-text';
import { GeolocationContext } from 'components/geolocation-store';
import { SearchContext } from 'components/search-store';
import { ForecastContext } from 'components/forecast-store';
import { Toast } from 'components/toast-container';
import TabContent from './tab-content';
import Tabs from './tabs';

export interface WeatherItem {
  id: number;
  date: string;
  weather_icon: string;
  description: string;
  temp: number;
  clouds: number;
  humidity: number;
  pressure: number;
  wind_deg: number;
  wind_speed: number;
  fallout: number;
}

export interface WeatherTabItem extends WeatherItem {
  max: number;
  min: number;
}

interface Props {
  className?: string;
}

const DAYS_AMOUNT: number = 5;

const transformForecastData = (data: any[]): WeatherItem[] =>
  data.map((item, i) => ({
    id: i,
    date: item.dt_txt,
    weather_icon: item.weather[0].icon,
    description: item.weather[0].description,
    temp: item.main.temp,
    clouds: item.clouds.all,
    humidity: item.main.humidity,
    pressure: item.main.pressure,
    wind_deg: item.wind.deg,
    wind_speed: item.wind.speed,
    fallout: item.hasOwnProperty('rain')
      ? item.rain['3h']
      : item.hasOwnProperty('snow')
      ? item.snow['3h']
      : 0,
  }));

const getGroupedWeather = (data: any[], groupSize: number): any[][] =>
  data.reduce((arr, item, i) => {
    if (!(i % groupSize)) {
      arr[arr.length] = [];
    }
    arr[arr.length - 1].push(item);
    return arr;
  }, []);

const setAvarageTemp = (data: any[][]): void =>
  data.forEach(arr => {
    let max = -Infinity;
    let min = Infinity;
    arr.forEach(({ temp }) => {
      if (temp > max) {
        max = temp;
      } else if (temp < min) {
        min = temp;
      }
    });
    arr[0] = { ...arr[0], max, min };
  });

const getAvarageItems = (data: any[][]): any[] => data.map(arr => arr[0]);

const WeatherTabs = (props: Props) => {
  const { className } = props;
  const { isGeolocationLoading, geolocationError, coords } = useContext(
    GeolocationContext,
  );
  const { cityName } = useContext(SearchContext);
  const {
    isForecastLoading,
    isForecastFetchingError,
    forecastData,
  } = useContext(ForecastContext);

  const forecastStore = useRef(useContext(ForecastContext));

  const { lat, long } = coords;
  const groupSize: number = forecastData.length / DAYS_AMOUNT;
  const search = cityName.includes(',')
    ? `&q=${cityName.replace(' ', '')}`
    : lat && long
    ? `&lat=${lat}&lon=${long}`
    : '';

  useEffect(() => {
    if (search) {
      forecastStore.current.doForecastFetch(config.forecast_api_url + search);
    }
  }, [search]);

  const transformedData = useMemo(() => transformForecastData(forecastData), [
    forecastData,
  ]);

  const groupedWeather = useMemo(
    () => getGroupedWeather(transformedData, groupSize),
    [transformedData, groupSize],
  );

  const avarageWeather = useMemo(() => {
    setAvarageTemp(groupedWeather);
    return getAvarageItems(groupedWeather);
  }, [groupedWeather]);

  const setTabContent = (tab: WeatherTabItem): JSX.Element => {
    const index = tab.id / groupSize;
    return <TabContent data={groupedWeather[index]} />;
  };

  return (
    <div className={className}>
      {isGeolocationLoading || isForecastLoading ? (
        <Spinner size="lg" />
      ) : avarageWeather.length ? (
        <Tabs tabs={avarageWeather} setTabContent={setTabContent} />
      ) : (
        <WarningText>{geolocationError}</WarningText>
      )}
      <Toast show={isForecastFetchingError} />
    </div>
  );
};

const WeatherTabsStyled = styled(WeatherTabs)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${colors.text};
`;

export default WeatherTabsStyled;

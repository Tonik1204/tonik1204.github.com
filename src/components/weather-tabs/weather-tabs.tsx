import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components';
import config from 'config/config';
import Spinner from 'atoms/spinner';
import WarningText from 'atoms/warning-text';
import { WeatherContext } from 'components/weather-store';
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

const transformWeatherData = (data: any[]): WeatherItem[] =>
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
  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [textContent, setTextContent] = useState<string>(
    'Please, enter your city..',
  );
  const {
    isWeatherLoading,
    isWeatherFetchingError,
    weatherData,
    doWeatherFetch,
  } = useContext(WeatherContext);
  const groupSize: number = weatherData.length / DAYS_AMOUNT;

  useEffect(() => {
    function success(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      doWeatherFetch(config.forecast_api_url + `&lat=${lat}&lon=${lon}`);
      setIsLocating(false);
    }

    function error() {
      setIsLocating(false);
      setTextContent(
        'Unable to retrieve your location. Please, enter your city..',
      );
    }

    if (navigator.geolocation) {
      setTextContent('');
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      setIsLocating(false);
    }
  }, [doWeatherFetch]);

  const transformedData = useMemo(() => transformWeatherData(weatherData), [
    weatherData,
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
      {isWeatherLoading || isLocating ? (
        <Spinner size="lg" />
      ) : avarageWeather.length ? (
        <Tabs tabs={avarageWeather} setTabContent={setTabContent} />
      ) : (
        <WarningText>{textContent}</WarningText>
      )}
      <Toast show={isWeatherFetchingError} />
    </div>
  );
};

const WeatherTabsStyled = styled(WeatherTabs)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default WeatherTabsStyled;

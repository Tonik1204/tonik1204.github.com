import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

enum ActionTypes {
  FORECAST_FETCH_INIT = 'forecast/fetch-init',
  FORECAST_FETCH_ERROR = 'forecast/fetch-error',
  FORECAST_FETCH_SUCCESS = 'forecast/fetch-success',
  WEATHER_FETCH_INIT = 'weather/fetch-init',
  WEATHER_FETCH_ERROR = 'weather/fetch-error',
  WEATHER_FETCH_SUCCESS = 'weather/fetch-success',
}

enum FetchingTypes {
  FETCH_FORECAST = 'FORECAST',
  FETCH_WEATHER = 'WEATHER',
}

interface State {
  isForecastLoading: boolean;
  isForecastFetchingError: boolean;
  forecastData: any[];
  isWeatherLoading: boolean;
  isWeatherFetchingError: boolean;
  weatherData: any;
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  doForecastFetch: (urlPath: string) => void;
  doWeatherFetch: (urlPath: string) => void;
}

const defaultState: State = {
  isForecastLoading: false,
  isForecastFetchingError: false,
  forecastData: [],
  isWeatherLoading: false,
  isWeatherFetchingError: false,
  weatherData: {},
};

const defaultContext: Context = {
  ...defaultState,
  doForecastFetch: () => null,
  doWeatherFetch: () => null,
};

export const WeatherContext = React.createContext(defaultContext);

const weatherFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FORECAST_FETCH_INIT:
      return {
        ...state,
        isForecastLoading: true,
        isForecastFetchingError: false,
      };
    case ActionTypes.FORECAST_FETCH_SUCCESS:
      return {
        ...state,
        isForecastLoading: false,
        isForecastFetchingError: false,
        forecastData: [...action.payload],
      };
    case ActionTypes.FORECAST_FETCH_ERROR:
      return {
        ...state,
        isForecastLoading: false,
        isForecastFetchingError: true,
      };
    case ActionTypes.WEATHER_FETCH_INIT:
      return {
        ...state,
        isWeatherLoading: true,
        isWeatherFetchingError: false,
      };
    case ActionTypes.WEATHER_FETCH_SUCCESS:
      return {
        ...state,
        isWeatherLoading: false,
        isWeatherFetchingError: false,
        weatherData: { ...action.payload },
      };
    case ActionTypes.WEATHER_FETCH_ERROR:
      return {
        ...state,
        isWeatherLoading: false,
        isWeatherFetchingError: true,
      };
    default:
      throw new Error();
  }
};

const WeatherStore = (props: any): JSX.Element => {
  const [fetchingType, setFetchingType] = useState<FetchingTypes>(
    FetchingTypes.FETCH_FORECAST,
  );
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(weatherFetchReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async onSuccess => {
      dispatch({ type: ActionTypes[`${fetchingType}_FETCH_INIT`] });

      try {
        const result = await axios(url);

        if (!didCancel && typeof result.data === 'object') {
          dispatch({
            type: ActionTypes[`${fetchingType}_FETCH_SUCCESS`],
            payload: onSuccess(result.data),
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ActionTypes[`${fetchingType}_FETCH_ERROR`] });
        }
      }
    };

    switch (fetchingType) {
      case FetchingTypes.FETCH_FORECAST:
        fetchData(data => data.list);
        break;
      case FetchingTypes.FETCH_WEATHER:
        fetchData(data => data.sys);
        break;
    }

    return () => {
      didCancel = true;
    };
  }, [url, fetchingType]);

  const doForecastFetch = (urlPath: string) => {
    setUrl(urlPath);
    setFetchingType(FetchingTypes.FETCH_FORECAST);
  };

  const doWeatherFetch = (urlPath: string) => {
    setUrl(urlPath);
    setFetchingType(FetchingTypes.FETCH_WEATHER);
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        doForecastFetch,
        doWeatherFetch,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherStore;

import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

enum ActionTypes {
  FETCH_INIT = 'weather-forecast/fetch-init',
  FETCH_ERROR = 'weather-forecast/fetch-error',
  FETCH_SUCCESS = 'weather-forecast/fetch-success',
}

interface State {
  isWeatherLoading: boolean;
  isWeatherFetchingError: boolean;
  weatherData: any[];
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  doWeatherFetch: (urlPath: string) => void;
}

const defaultState: State = {
  isWeatherLoading: false,
  isWeatherFetchingError: false,
  weatherData: [],
};

const defaultContext: Context = {
  ...defaultState,
  doWeatherFetch: () => null,
};

export const WeatherContext = React.createContext(defaultContext);

const weatherFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isWeatherLoading: true,
        isWeatherFetchingError: false,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isWeatherLoading: false,
        isWeatherFetchingError: false,
        weatherData: [...action.payload],
      };
    case ActionTypes.FETCH_ERROR:
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
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(weatherFetchReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({
            type: ActionTypes.FETCH_SUCCESS,
            payload: result.data.list,
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ActionTypes.FETCH_ERROR });
        }
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doWeatherFetch = (urlPath: string) => {
    setUrl(urlPath);
  };

  return (
    <WeatherContext.Provider
      value={{
        ...state,
        doWeatherFetch,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherStore;

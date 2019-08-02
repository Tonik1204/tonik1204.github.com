import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

enum ActionTypes {
  FORECAST_FETCH_INIT = 'forecast/fetch-init',
  FORECAST_FETCH_ERROR = 'forecast/fetch-error',
  FORECAST_FETCH_SUCCESS = 'forecast/fetch-success',
}

interface State {
  isForecastLoading: boolean;
  isForecastFetchingError: boolean;
  forecastData: any[];
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  doForecastFetch: (urlPath: string) => void;
}

const defaultState: State = {
  isForecastLoading: false,
  isForecastFetchingError: false,
  forecastData: [],
};

const defaultContext: Context = {
  ...defaultState,
  doForecastFetch: () => null,
};

export const ForecastContext = React.createContext(defaultContext);

const forecastReducer = (state: State, action: Action) => {
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
    default:
      throw new Error();
  }
};

const ForecastStore = (props: any): JSX.Element => {
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(forecastReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: ActionTypes.FORECAST_FETCH_INIT });

      try {
        const result = await axios(url);

        if (!didCancel && typeof result.data === 'object') {
          dispatch({
            type: ActionTypes.FORECAST_FETCH_SUCCESS,
            payload: result.data.list,
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ActionTypes.FORECAST_FETCH_ERROR });
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

  const doForecastFetch = (urlPath: string) => {
    setUrl(urlPath);
  };

  return (
    <ForecastContext.Provider
      value={{
        ...state,
        doForecastFetch,
      }}
    >
      {props.children}
    </ForecastContext.Provider>
  );
};

export default ForecastStore;

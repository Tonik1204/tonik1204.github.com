import React, { useState, useEffect, useReducer } from 'react';

enum ActionTypes {
  FETCH_INIT = 'geolocation/fetch-init',
  FETCH_ERROR = 'geolocation/fetch-error',
  FETCH_SUCCESS = 'geolocation/fetch-success',
}

interface GeolocationItem {
  lat: number;
  long: number;
}

interface State {
  isGeolocationLoading: boolean;
  geolocationError: string;
  coords: GeolocationItem;
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  doGeolocationFetch: () => void;
}

const defaultState: State = {
  isGeolocationLoading: false,
  geolocationError: '',
  coords: {} as GeolocationItem,
};

const defaultContext: Context = {
  ...defaultState,
  doGeolocationFetch: () => null,
};

export const GeolocationContext = React.createContext(defaultContext);

const geolocationFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isGeolocationLoading: true,
        geolocationError: '',
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isGeolocationLoading: false,
        geolocationError: '',
        coords: { ...action.payload },
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        isGeolocationLoading: false,
        geolocationError: action.payload,
      };
    default:
      throw new Error();
  }
};

const GeolocationStore = (props: any): JSX.Element => {
  const [fetching, setFetching] = useState<boolean>(false);
  const [state, dispatch] = useReducer(geolocationFetchReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = () => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        if (!didCancel) {
          dispatch({
            type: ActionTypes.FETCH_SUCCESS,
            payload: { lat, long },
          });
        }
      }

      function error() {
        if (!didCancel) {
          dispatch({
            type: ActionTypes.FETCH_ERROR,
            payload:
              'Unable to retrieve your location. Please, enter your city..',
          });
        }
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
      } else if (!didCancel) {
        dispatch({
          type: ActionTypes.FETCH_ERROR,
          payload: 'Please, enter your city..',
        });
      }
    };

    if (fetching) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [fetching]);

  const doGeolocationFetch = () => {
    setFetching(true);
  };

  return (
    <GeolocationContext.Provider
      value={{
        ...state,
        doGeolocationFetch,
      }}
    >
      {props.children}
    </GeolocationContext.Provider>
  );
};

export default GeolocationStore;

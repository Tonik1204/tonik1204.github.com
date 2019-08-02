import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

enum ActionTypes {
  FETCH_INIT = 'search-city/fetch-init',
  FETCH_ERROR = 'search-city/fetch-error',
  FETCH_SUCCESS = 'search-city/fetch-success',
  FETCH_BY_COORDS_SUCCESS = 'search-city/fetch-by-coords-success',
  FETCH_BY_QUERY_SUCCESS = 'search-city/fetch-by-query-success',
  SET_CITY_DATA = 'search-city/set-city-data',
  CLEAN_DATA = 'search-city/clean-data',
}

enum FetchingTypes {
  FETCH_CITIY_BY_COORDS = 'CITY_BY_COORDS',
  FETCH_CITIES_BY_QUERY = 'CITIES_BY_QUERY',
}

interface CityItem {
  id: number;
  city: string;
  country: string;
}

interface CityData {
  id: number;
  name: string;
}

interface State {
  isSearchLoading: boolean;
  isSearchFetchingError: boolean;
  cityData: CityData;
  searchData: CityItem[];
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  setCityData: (data: CityData) => void;
  cleanSearchData: () => void;
  doCityFetchByCoords: (urlPath: string) => void;
  doCitiesFetchByQuery: (urlPath: string) => void;
}

const defaultState: State = {
  isSearchLoading: false,
  isSearchFetchingError: false,
  cityData: { id: 0, name: '' },
  searchData: [],
};

const defaultContext: Context = {
  ...defaultState,
  setCityData: () => null,
  cleanSearchData: () => null,
  doCityFetchByCoords: () => null,
  doCitiesFetchByQuery: () => null,
};

export const SearchContext = React.createContext(defaultContext);

const searchFetchReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INIT:
      return {
        ...state,
        isSearchLoading: true,
        isSearchFetchingError: false,
      };
    case ActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        isSearchFetchingError: false,
      };
    case ActionTypes.FETCH_BY_COORDS_SUCCESS:
    case ActionTypes.SET_CITY_DATA:
      return {
        ...state,
        cityData: { ...action.payload },
      };
    case ActionTypes.FETCH_BY_QUERY_SUCCESS:
      return {
        ...state,
        searchData: [...action.payload],
      };
    case ActionTypes.CLEAN_DATA:
      return {
        ...state,
        searchData: [],
      };
    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        isSearchLoading: false,
        isSearchFetchingError: true,
      };
    default:
      throw new Error();
  }
};

const getNearestCityName = (data: any[]): string =>
  data.length ? data[0]._links['location:nearest-city'].name : '';

const getTransformSearchData = (data: any[]): CityItem[] =>
  data.map(item => ({
    id: item._embedded['city:item'].geoname_id,
    city: item._embedded['city:item'].name,
    country: item._embedded['city:item']._embedded['city:country'].name,
  }));

const SearchStore = (props: any): JSX.Element => {
  const [fetchingType, setFetchingType] = useState<FetchingTypes | null>(null);
  const [url, setUrl] = useState<string>('');
  const [state, dispatch] = useReducer(searchFetchReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async onSuccess => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      try {
        const result = await axios(url);

        if (!didCancel && typeof result.data === 'object') {
          onSuccess(result.data);
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: ActionTypes.FETCH_ERROR });
        }
      }
    };

    switch (fetchingType) {
      case FetchingTypes.FETCH_CITIY_BY_COORDS:
        fetchData(data => {
          dispatch({ type: ActionTypes.FETCH_SUCCESS });
          dispatch({
            type: ActionTypes.FETCH_BY_COORDS_SUCCESS,
            payload: {
              id: 0,
              name: getNearestCityName(
                data._embedded['location:nearest-cities'],
              ),
            },
          });
        });
        break;
      case FetchingTypes.FETCH_CITIES_BY_QUERY:
        fetchData(data => {
          dispatch({ type: ActionTypes.FETCH_SUCCESS });
          dispatch({
            type: ActionTypes.FETCH_BY_QUERY_SUCCESS,
            payload: getTransformSearchData(
              data._embedded['city:search-results'],
            ),
          });
        });
        break;
    }

    return () => {
      didCancel = true;
    };
  }, [url, fetchingType]);

  const setCityData = (data: CityData) => {
    dispatch({
      type: ActionTypes.SET_CITY_DATA,
      payload: data,
    });
  };

  const cleanSearchData = () => {
    dispatch({
      type: ActionTypes.CLEAN_DATA,
    });
  };

  const doCityFetchByCoords = (urlPath: string) => {
    setUrl(urlPath);
    setFetchingType(FetchingTypes.FETCH_CITIY_BY_COORDS);
  };

  const doCitiesFetchByQuery = (urlPath: string) => {
    setUrl(urlPath);
    setFetchingType(FetchingTypes.FETCH_CITIES_BY_QUERY);
  };

  return (
    <SearchContext.Provider
      value={{
        ...state,
        setCityData,
        cleanSearchData,
        doCityFetchByCoords,
        doCitiesFetchByQuery,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchStore;

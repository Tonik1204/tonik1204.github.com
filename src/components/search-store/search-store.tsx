import React, { useReducer } from 'react';
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
  const [state, dispatch] = useReducer(searchFetchReducer, defaultState);

  const fetchData = async (url, onSuccess) => {
    dispatch({ type: ActionTypes.FETCH_INIT });

    try {
      const result = await axios(url);

      if (typeof result.data === 'object') {
        dispatch({ type: ActionTypes.FETCH_SUCCESS });
        onSuccess(result.data);
      }
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_ERROR });
    }
  };

  const setCityData = (data: CityData) =>
    dispatch({
      type: ActionTypes.SET_CITY_DATA,
      payload: data,
    });

  const cleanSearchData = () =>
    dispatch({
      type: ActionTypes.CLEAN_DATA,
    });

  const doCityFetchByCoords = (url: string) =>
    fetchData(url, data =>
      dispatch({
        type: ActionTypes.FETCH_BY_COORDS_SUCCESS,
        payload: {
          id: 0,
          name: getNearestCityName(data._embedded['location:nearest-cities']),
        },
      }),
    );

  const doCitiesFetchByQuery = (url: string) =>
    fetchData(url, data =>
      dispatch({
        type: ActionTypes.FETCH_BY_QUERY_SUCCESS,
        payload: getTransformSearchData(data._embedded['city:search-results']),
      }),
    );

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

import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

enum ActionTypes {
  FETCH_INIT = 'search-city/fetch-init',
  FETCH_ERROR = 'search-city/fetch-error',
  FETCH_SUCCESS = 'search-city/fetch-success',
  CLEAN_DATA = 'search-city/clean-data',
}

interface CityItem {
  city: string;
  country: string;
}

interface State {
  isSearchLoading: boolean;
  isSearchFetchingError: boolean;
  searchData: CityItem[];
}

interface Action {
  type: string;
  payload?: any;
}

interface Context extends State {
  cleanSearchData: () => void;
  doSearchFetch: (urlPath: string) => void;
}

const defaultState: State = {
  isSearchLoading: false,
  isSearchFetchingError: false,
  searchData: [],
};

const defaultContext: Context = {
  ...defaultState,
  cleanSearchData: () => null,
  doSearchFetch: () => null,
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

const getTransformCityData = (data: any[]): CityItem[] =>
  data.map(item => ({
    city: item._embedded['city:item'].name,
    country: item._embedded['city:item']._embedded['city:country'].name,
  }));

const SearchStore = (props: any): JSX.Element => {
  const [url, setUrl] = useState('');
  const [state, dispatch] = useReducer(searchFetchReducer, defaultState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: ActionTypes.FETCH_INIT });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({
            type: ActionTypes.FETCH_SUCCESS,
            payload: getTransformCityData(
              result.data._embedded['city:search-results'],
            ),
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

  const cleanSearchData = () => {
    dispatch({
      type: ActionTypes.CLEAN_DATA,
    });
  };

  const doSearchFetch = (urlPath: string) => {
    setUrl(urlPath);
  };

  return (
    <SearchContext.Provider
      value={{
        ...state,
        cleanSearchData,
        doSearchFetch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchStore;

import React, { useState, useEffect, useContext, useMemo } from 'react';
import styled from 'styled-components';
import config from 'config/config';
import { hasOnlyLetters } from 'utils/helper';
import { SearchContext } from 'components/search-store';
import { WeatherContext } from 'components/weather-store';
import { Toast } from 'components/toast-container';
import Spinner from 'atoms/spinner';
import Dropdown from 'atoms/dropdown';
import Input from 'atoms/input';

interface Props {
  className?: string;
}

const Search = (props: Props) => {
  const { className } = props;
  const [search, setSearch] = useState<string>('');
  const [hasFocus, setFocus] = useState<boolean>(false);
  const {
    isSearchLoading,
    isSearchFetchingError,
    searchData,
    cleanSearchData,
    doSearchFetch,
  } = useContext(SearchContext);
  const { doWeatherFetch } = useContext(WeatherContext);

  const showDropdown: boolean = !!searchData.length && hasFocus;
  const dropdownItems = useMemo(
    () => searchData.map(({ city, country }) => `${city}, ${country}`),
    [searchData],
  );

  useEffect(() => {
    if (search.length > 2 && hasOnlyLetters(search)) {
      doSearchFetch(config.city_api_url + search);
    }
  }, [search, doSearchFetch]);

  const dropdownSelectHandler = (value: string): void => {
    const query = value.replace(' ', '');
    setSearch(value);
    cleanSearchData();
    doWeatherFetch(config.forecast_api_url + `&q=${query}`);
  };

  const serachChangeHandler = (e: React.SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;
    setSearch(value);
  };

  const searchFocusHandler = () => setFocus(!hasFocus);

  return (
    <div className={className}>
      {isSearchLoading && <Spinner size="sm" />}
      <Input
        type="search"
        name="search"
        value={search}
        placeholder="Enter a city"
        onChange={serachChangeHandler}
        onFocus={searchFocusHandler}
        onBlur={searchFocusHandler}
      />
      {showDropdown && (
        <Dropdown items={dropdownItems} onSelect={dropdownSelectHandler} />
      )}
      <Toast show={isSearchFetchingError} />
    </div>
  );
};

const SearchStyled = styled(Search)`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 1rem;
  position: relative;

  .spinner {
    position: absolute;
    z-index: 1;
    right: 2rem;
  }

  .dropdown {
    top: 2.9rem;
    transform: scale(0.95);
  }
`;

export default SearchStyled;

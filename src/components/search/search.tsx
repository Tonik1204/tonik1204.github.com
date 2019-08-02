import React, { useState, useEffect, useContext, useMemo, useRef } from 'react';
import styled from 'styled-components';
import config from 'config/config';
import { hasOnlyLetters } from 'utils/helper';
import { GeolocationContext } from 'components/geolocation-store';
import { SearchContext } from 'components/search-store';
import { Toast } from 'components/toast-container';
import Spinner from 'atoms/spinner';
import Dropdown, { Item as DropdownItem } from 'atoms/dropdown';
import Input from 'atoms/input';

interface Props {
  className?: string;
}

const Search = (props: Props) => {
  const { className } = props;
  const [search, setSearch] = useState<string>('');
  const [hasFocus, setFocus] = useState<boolean>(false);

  const { coords } = useContext(GeolocationContext);
  const {
    isSearchLoading,
    isSearchFetchingError,
    cityData,
    searchData,
    setCityData,
    cleanSearchData,
  } = useContext(SearchContext);

  const searchStore = useRef(useContext(SearchContext));

  const showDropdown: boolean = !!searchData.length && hasFocus;
  const dropdownItems = useMemo(
    () =>
      searchData.map(({ id, city, country }) => ({
        id,
        name: `${city}, ${country}`,
      })),
    [searchData],
  );

  useEffect(() => {
    const { lat, long } = coords;
    if (lat && long) {
      searchStore.current.doCityFetchByCoords(
        config.city_by_coords_api_url + `${lat}, ${long}`,
      );
    }
  }, [coords]);

  useEffect(() => {
    setSearch(cityData.name);
  }, [cityData]);

  useEffect(() => {
    if (search.length > 2 && hasOnlyLetters(search)) {
      searchStore.current.doCitiesFetchByQuery(
        config.cities_by_query_api_url + search,
      );
    }
  }, [search]);

  const dropdownSelectHandler = (value: DropdownItem): void => {
    setCityData(value);
    cleanSearchData();
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

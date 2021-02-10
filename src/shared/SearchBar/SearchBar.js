import React, { useState } from 'react';
import { Search, Close } from '@material-ui/icons';
import StylesProvider from '@material-ui/styles/StylesProvider';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import classes from './SearchBar.module.css';

const SearchBar = ({ color, placeholder }) => {
  const [query, setQuery] = useState('');
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [focusIndex, setFocusIndex] = useState(-1);

  const history = useHistory();

  const linkRefs = [];
  const keys = {
    ENTER: 13,
    UP: 38,
    DOWN: 40,
  };

  const handleNavigation = (e) => {
    switch (e.keyCode) {
      case keys.ENTER:
        if (focusIndex !== -1) {
          window.open(linkRefs[focusIndex].href);
        }
        break;
      case keys.UP:
        if (focusIndex > -1) {
          setFocusIndex(focusIndex - 1);
        }
        break;
      case keys.DOWN:
        if (focusIndex < autocompleteOptions.length - 1) {
          setFocusIndex(focusIndex + 1);
        }
        break;
      default: //do nothing
    }
  };

  const handleFormSubmit = () => {
    history.push(`/results/${query}`);
  };

  const handleInputChange = (event) => {
    const {
      target: { value },
    } = event;

    setQuery(value);

    if (value.length < 3) {
      setAutocompleteOptions([]);
    }

    if (value.length >= 3) {
      axios
        .get(`https://unsplash.com/nautocomplete/${value}`)
        .then(({ data }) => {
          const { autocomplete } = data;
          setAutocompleteOptions(autocomplete);
        });
    }
  };

  const handleInputClear = () => {
    setQuery('');
    setAutocompleteOptions([]);
  };

  const noResultsMessage = (() =>
    query.length >= 1 && autocompleteOptions.length < 1 ? (
      <span className={classes.NoResultsMessage}>No results found!</span>
    ) : null)();

  return (
    <StylesProvider injectFirst>
      <form className={classes.InputWraper} onSubmit={handleFormSubmit}>
        <Search className={classes.InputSearchIcon} />
        <input
          className={classes.Input}
          value={query}
          type="text"
          onChange={(event) => handleInputChange(event)}
          onKeyDown={handleNavigation}
          style={{
            backgroundColor: color,
          }}
          placeholder={placeholder}
        />

        <Close
          className={
            query.length >= 1 ? classes.InputClearIcon : classes.Hidden
          }
          onClick={handleInputClear}
        />
        <button className={classes.Button} type="submit"></button>
      </form>
      {noResultsMessage}
      <ul className={classes.AutocompleteOptions}>
        {autocompleteOptions.map((option, index) => (
          <li
            className={
              focusIndex === index
                ? `${classes.AutocompleteOption} ${classes.Active}`
                : classes.AutocompleteOption
            }
          >
            <Link
              to={`/results/${option.query}`}
              key={option.query}
              className={classes.AutocompleteLink}
              ref={(link) => {
                linkRefs[index] = link;
              }}
            >
              {option.query}
            </Link>
          </li>
        ))}
      </ul>
    </StylesProvider>
  );
};

export default SearchBar;

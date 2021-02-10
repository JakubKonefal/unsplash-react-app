import React from 'react';
import classes from './SearchPage.module.css';
import SearchBar from '../shared/SearchBar/SearchBar';

const SearchPage = () => (
  <div className={classes.SearchPage}>
    <div className={classes.Container}>
      <h1 className={classes.Title}>Unsplash</h1>
      <h5 className={classes.Subtitle}>
        <mark className={classes.SubtitleMark}> React </mark> photo finder
      </h5>
      <SearchBar />
    </div>
  </div>
);

export default SearchPage;

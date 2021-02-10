import React from 'react';
import classes from './ErrorMessage.module.css';

const ErrorMessage = () => (
  <span className={classes.ErrorMessage}>Error while fetching image/s!</span>
);

export default ErrorMessage;

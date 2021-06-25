/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useHistory } from 'react-router-dom';
import './not-found.scss';

const NotFound = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div className="not-found">
      Sorry! This user was not found
      <button className="back-button animate-button" onClick={handleClick}>Go back</button>
    </div>
  );
};

export default NotFound;

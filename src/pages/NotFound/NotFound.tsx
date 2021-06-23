/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <div>
      Sorry! This user is unavailable
      <button onClick={handleClick}>Go back</button>
    </div>
  );
};

export default NotFound;

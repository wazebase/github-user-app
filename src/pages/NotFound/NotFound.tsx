import React from 'react';
import BackButton from '../../components/BackButton/BackButton';
import './not-found.scss';

const NotFound = () => (
  <div className="not-found">
    Sorry! This user was not found
    <BackButton />
  </div>
);

export default NotFound;

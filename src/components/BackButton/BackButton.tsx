import React from 'react';
import { useHistory } from 'react-router-dom';

function BackButton() {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <button type="button" className="back-button animate-button" onClick={handleClick}>Go back</button>
  );
}

export default BackButton;

/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link } from 'react-router-dom';

interface ISearchLink {
    userlogin:string;
}

const SearchLink = ({ userlogin }:ISearchLink) => (
  <button className="search-link animate-button"><Link to={`/${userlogin}`}>{userlogin}</Link></button>
);

export default SearchLink;

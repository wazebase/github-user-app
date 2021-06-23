/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link } from 'react-router-dom';

interface ISearchLink {
    userlogin:string;
}

const SearchLink = ({ userlogin }:ISearchLink) => (
  <p><Link to={`/${userlogin}`}>{userlogin}</Link></p>
);

export default SearchLink;

import React from 'react';
import { Link } from 'react-router-dom';

interface ISearchLink {
    login:string;
}

const SearchLink = ({ login }:ISearchLink) => (
  <button type="button" className="search-link animate-button"><Link to={`/${login}`}>{login}</Link></button>
);

export default SearchLink;

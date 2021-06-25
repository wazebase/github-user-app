/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dataService from '../../services/dataService';
import lsService from '../../services/lsService';
import { API_URL } from '../../api/config';
import SearchLink from '../SearchLink/SearchLink';

import './search.scss';

const Search = () => {
  const [user, setUser] = useState('');
  const history = useHistory();
  const [searchlist, setSearchlist] = useState([]);

  useEffect(() => {
    if (lsService.listExists('searchlist')) {
      setSearchlist(lsService.getListFromLs('searchlist'));
    }
  }, []);

  const handleChange = (e:any) => {
    setUser(e.target.value);
  };

  const handleSearch = async () => {
    if (user) {
      const userObj = await dataService.fetchData(`${API_URL}/${user}`);
      if (!userObj.data.message) {
        history.push(`/${user}`);
        lsService.saveToSearchlist(user);
      } else {
        history.push(`/${user}/notfound`);
      }
    } else {
      alert('Please, write user name');
    }
  };

  return (
    <div className="search-box">
      <div className="search">
        <input className="search-input" placeholder="search user from Github" onChange={(e) => handleChange(e)} />
        <button onClick={() => handleSearch()}>Search</button>
      </div>
      {searchlist.length > 0
        ? (
          <div className="search-results">
            <h3>Last three searches:</h3>
            <div className="last-searches">
              {searchlist.map((userlogin:string) => <SearchLink userlogin={userlogin} />)}
            </div>
          </div>
        ) : (<></>)}
    </div>
  );
};
export default Search;

/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import dataService from '../../services/dataService';
import lsService from '../../services/lsService';
import { API_URL } from '../../api/config';
import SearchLink from '../SearchLink/SearchLink';

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
    const userObj = await dataService.fetchData(`${API_URL}/${user}`);
    console.log(userObj);
    if (!userObj.data.message) {
      history.push(`/${user}`);
      lsService.saveToSearchlist(user);
    } else {
      history.push(`/${user}/notfound`);
    }
  };

  return (
    <div>
      <input placeholder="search for users" onChange={(e) => handleChange(e)} />
      <button onClick={() => handleSearch()}>Search</button>
      {searchlist.length > 0
        ? searchlist.map((userlogin:string) => <SearchLink userlogin={userlogin} />) : null}
    </div>
  );
};
export default Search;

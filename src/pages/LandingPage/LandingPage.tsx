/* eslint-disable no-loop-func */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../api/config';
import GithubUser from '../../components/GithubUser/GithubUser';
import Search from '../../components/Search/Search';
import userService from '../../services/userService';
import lsService from '../../services/lsService';
import dataService from '../../services/dataService';
import { IUser } from '../../interfaces/IUser';

const LandingPage = () => {
  const data = useRef([]);
  const [error, setError] = useState('');
  const [currentUserList, setCurrentUserList] = useState<IUser[]>([]);

  const getData = async () => {
    const dataObj = await dataService.fetchData(API_URL);
    if (!dataObj.error) {
      data.current = dataObj.data;
    } else {
      setError(dataObj.error);
    }
  };

  const fillUserList = async () => {
    await getData();
    data.current.forEach((user:any) => {
      dataService.getUserData(user.url);
    });
  };

  const makeList = async () => {
    await fillUserList();
    const checker = setInterval(() => {
      const checkRepos = userService.checkifListReady();
      if (checkRepos === true) {
        userService.sortUsersByPopularity();
        const newList = userService.getList();
        const slicedList = newList.slice(0, 8);
        setCurrentUserList(slicedList);
        lsService.saveToLs(newList);
        clearInterval(checker);
      }
    }, 100);
  };

  const setListFromLs = () => {
    const userlist = lsService.getListFromLs('userlist');
    const newUserList = userlist.slice(0, 8);
    setCurrentUserList(newUserList);
  };

  useEffect(() => {
    if (!lsService.listExists('userlist')) {
      makeList();
    } else {
      setListFromLs();
    }
  }, []);

  return (
    <div>
      <Search />
      <p>{error}</p>
      {currentUserList.map((user) => (
        <GithubUser
          orgs={user.orgs}
          name={user.name}
          login={user.login}
          key={user.id}
          type={user.type}
          orgUrl={user.orgUrl}
          followers={user.followers}
          avatarUrl={user.avatarUrl}
          id={user.id}
          firstThreeRepos={user.firstThreeRepos}
          reposUrl={user.reposUrl}
        />
      ))}
    </div>
  );
};

export default LandingPage;

import React, { useState, useEffect, useRef } from 'react';
import { API_URL } from '../../api/config';

import GithubUser from '../../components/GithubUser/GithubUser';
import Search from '../../components/Search/Search';
import ViewButtons from '../../components/ViewButtons/ViewButtons';

import userService from '../../services/userService';
import lsService from '../../services/lsService';
import dataService from '../../services/dataService';
import { IUser } from '../../interfaces/IUser';

import './landing.scss';

const LandingPage = () => {
  const data = useRef([]);
  const [error, setError] = useState('');
  const [currentUserList, setCurrentUserList] = useState<IUser[]>([]);
  const userAmount = 8;

  const getData = async () => {
    const dataObj = await dataService.fetchData(API_URL);
    const fetchError = dataObj.error || dataObj.data.message;
    if (fetchError) {
      setError(dataObj.data.message);
    } else {
      data.current = dataObj.data;
    }
  };

  const fillUserList = async () => {
    await getData();
    if (data.current.length > 0) {
      data.current.forEach((user:any) => {
        dataService.getUserData(user.url);
      });
    }
  };

  const createNewList = async () => {
    await fillUserList();
    const checker = setInterval(() => {
      const checkRepos = userService.checkifListReady();
      if (checkRepos === true) {
        userService.sortUsersByPopularity();
        const newList = userService.getList();
        lsService.saveToLs(newList);
        const slicedList = newList.slice(0, userAmount);
        setCurrentUserList(slicedList);
        clearInterval(checker);
      }
    }, 100);
  };

  const setListFromLs = () => {
    const userlist = lsService.getListFromLs('userlist');
    const newUserList = userlist.slice(0, userAmount);
    setCurrentUserList(newUserList);
  };

  useEffect(() => {
    if (!lsService.listExists('userlist')) {
      createNewList();
    } else {
      setListFromLs();
    }
  }, []);

  return (
    <div className="landing-page">
      <div className="heading">
        <Search />
      </div>
      <div className="view-chooser">
        <h3>Github most popular users</h3>
        <ViewButtons />
      </div>
      <div id="view">
        {error ? (<p>{error}</p>) : (<></>)}
        {currentUserList.map((user) => (
          <GithubUser
            fromSearch={false}
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
    </div>
  );
};

export default LandingPage;

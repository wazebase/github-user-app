/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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

import gridView from '../../icons/grid_view.svg';
import listView from '../../icons/list_view.svg';

import './landing.scss';

const LandingPage = () => {
  const data = useRef([]);
  const [error, setError] = useState('');
  const [clientWidth, setClientWidth] = useState(0);
  const [currentUserList, setCurrentUserList] = useState<IUser[]>([]);
  const userAmount = 8;

  useEffect(() => {
    setClientWidth(document.documentElement.clientWidth);
  }, []);

  useEffect(() => {
    const users = document.getElementsByClassName('user');
    if (users.length > 0) {
      if (users[0].classList.contains('user-page-view')) {
        for (let i = 0; i < users.length; i += 1) {
          users[i].classList.remove('user-page-view');
          users[i].classList.add('user-list-view');
        }
      }
    }
  }, []);

  const getData = async () => {
    const dataObj = await dataService.fetchData(API_URL);
    if (dataObj.error) {
      setError(dataObj.error);
    } else if (dataObj.data.message) {
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

  const makeList = async () => {
    await fillUserList();
    const checker = setInterval(() => {
      const checkRepos = userService.checkifListReady();
      if (checkRepos === true) {
        userService.sortUsersByPopularity();
        const newList = userService.getList();
        const slicedList = newList.slice(0, userAmount);
        setCurrentUserList(slicedList);
        lsService.saveToLs(newList);
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
      makeList();
    } else {
      setListFromLs();
    }
  }, []);

  const changeToListView = () => {
    const view = document.getElementById('view');
    const users = document.getElementsByClassName('user');
    if (view) {
      view.classList.remove('grid');
      view.classList.add('list');
    }
    if (users) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].classList.remove('user-grid-view');
        users[i].classList.add('user-list-view');
      }
    }
  };

  const changeToGridView = () => {
    const view = document.getElementById('view');
    const users = document.getElementsByClassName('user');
    if (view) {
      view.classList.remove('list');
      view.classList.add('grid');
    }
    if (users) {
      for (let i = 0; i < users.length; i += 1) {
        users[i].classList.remove('user-list-view');
        users[i].classList.add('user-grid-view');
      }
    }
  };

  return (
    <div className="landing-page">
      <div className="heading">
        <Search />
      </div>
      <div className="view-chooser">
        <h3>Github most popular users</h3>
        {clientWidth > 600 ? (
          <div className="view-buttons">
            <button className="list-view animate-button" onClick={changeToListView}><img src={listView} alt="list view" /></button>
            <button className="grid-view animate-button" onClick={changeToGridView}><img src={gridView} alt="grid view" /></button>
          </div>
        ) : (<></>)}

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

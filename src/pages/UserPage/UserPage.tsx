import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import lsService from '../../services/lsService';
import dataService from '../../services/dataService';
import userService from '../../services/userService';
import repoService from '../../services/repoService';
import orgService from '../../services/orgsService';

import { API_URL } from '../../api/config';
import { IUser } from '../../interfaces/IUser';

import GithubUser from '../../components/GithubUser/GithubUser';
import BackButton from '../../components/BackButton/BackButton';

import './user-page.scss';

const UserPage = () => {
  const { userlogin } : {userlogin: string} = useParams();
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [error, setError] = useState('');
  const users = document.getElementsByClassName('user');

  const getCurrentUserFromFetch = async (userLogin:string) => {
    const userDataObj = await dataService.fetchData(`${API_URL}/${userLogin}`);
    const fetchError = userDataObj.error || userDataObj.data.message;

    if (!fetchError) {
      const newUser = userService.createUser(userDataObj.data);
      await repoService.setReposForUser(newUser);
      await orgService.getOrgs(newUser);
      lsService.addItemToLsList('userlist', newUser);
      setCurrentUser(newUser);
    } else {
      setError('Not Found');
    }
  };

  useEffect(() => {
    const userlistFromLs = lsService.getListFromLs('userlist');
    const { user, userExists } = lsService.getUserFromLs(userlistFromLs, userlogin);

    if (!userExists) {
      getCurrentUserFromFetch(userlogin);
    } else {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (users[0]) {
      users[0].classList.remove('user-list-view');
      users[0].classList.remove('user-grid-view');
      users[0].classList.add('user-page-view');
    }
  }, [currentUser]);

  return (
    <div className="user-page">
      <BackButton />
      {error ? (<p>{error}</p>) : (<></>)}
      {currentUser ? (
        <>
          <h1>{currentUser.login}</h1>
          <GithubUser
            fromSearch
            orgs={currentUser.orgs}
            name={currentUser.name}
            login={currentUser.login}
            key={currentUser.id}
            type={currentUser.type}
            orgUrl={currentUser.orgUrl}
            followers={currentUser.followers}
            avatarUrl={currentUser.avatarUrl}
            id={currentUser.id}
            firstThreeRepos={currentUser.firstThreeRepos}
            reposUrl={currentUser.reposUrl}
          />
        </>
      ) : (<></>)}
    </div>
  );
};

export default UserPage;

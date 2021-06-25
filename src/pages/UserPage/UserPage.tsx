/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import lsService from '../../services/lsService';
import dataService from '../../services/dataService';
import userService from '../../services/userService';
import repoService from '../../services/repoService';
import orgService from '../../services/orgsService';
import { API_URL } from '../../api/config';
import { IUser } from '../../interfaces/IUser';
import { User } from '../../classes/User';
import GithubUser from '../../components/GithubUser/GithubUser';

import './user-page.scss';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const UserPage = () => {
  const params = useParams();
  const { userlogin } : any = params;
  const [currentUser, setCurrentUser] = useState<IUser>(new User('', '', '', '', 0, '', 0, '', 0));
  const [error, setError] = useState('');
  const history = useHistory();
  const users = document.getElementsByClassName('user');

  const getCurrentUserFromFetch = async (userLogin:string) => {
    const userDataObj = await dataService.fetchData(`${API_URL}/${userLogin}`);
    if (!userDataObj.data.message) {
      const newUser = userService.createUser(userDataObj.data);
      await repoService.setReposForUser(newUser);
      await orgService.getOrgs(newUser);
      userService.addUser(newUser);
      lsService.addItemToLsList('userlist', newUser);
      setCurrentUser(newUser);
    } else {
      setError('Not Found');
    }
  };

  const getCurrentUserFromLs = async (user:IUser) => {
    if (user.orgs.length === 0) {
      await orgService.getOrgs(user);
      lsService.changeUserOrgsInList(user);
    }
    setCurrentUser(user);
  };

  useEffect(() => {
    const userlistFromLs = lsService.getListFromLs('userlist');
    const { user, userExists } = lsService.getUserFromLs(userlistFromLs, userlogin);
    if (!userExists) {
      getCurrentUserFromFetch(userlogin);
    } else {
      getCurrentUserFromLs(user);
    }
  }, []);

  useEffect(() => {
    if (users[0]) {
      users[0].classList.remove('user-list-view');
      users[0].classList.remove('user-grid-view');
      users[0].classList.add('user-page-view');
    }
  }, [currentUser]);

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className="user-page">
      {error ? (<>{error}</>) : (<></>)}
      <button className="back-button animate-button" onClick={handleClick}>Back</button>
      {currentUser.login ? (
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

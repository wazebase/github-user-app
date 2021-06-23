/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import lsService from '../../services/lsService';
import dataService from '../../services/dataService';
import userService from '../../services/userService';
import repoService from '../../services/repoService';
import orgService from '../../services/orgsService';
import { API_URL } from '../../api/config';
import { IUser } from '../../interfaces/IUser';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const UserPage = () => {
  const params = useParams();
  const { userlogin } : any = params;
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState('');

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

  return (
    <div>
      {error ? (<>{error}</>) : (<>{JSON.stringify(currentUser)}</>)}
    </div>
  );
};

export default UserPage;

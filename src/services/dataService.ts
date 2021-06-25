/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Token } from '../api/config';
import userService from './userService';
import repoService from './repoService';

const dataService = () => {
  const fetchData = async (link:string) => {
    const newToken = new Token();
    let data:any;
    let error = '';
    try {
      const req = await fetch(link, {
        headers: {
          Authorization: `bearer ${newToken.getToken()}`,
        },
      });
      data = await req.json();
    } catch (err) {
      error = err.message;
    }
    return {
      data,
      error,
    };
  };

  const getUserData = async (userUrl:string) => {
    const userObj = await fetchData(userUrl);
    if (!userObj.error) {
      const newUser = userService.createUser(userObj.data);
      await repoService.getReposData(newUser);
      userService.addUser(newUser);
    }
  };

  return {
    fetchData,
    getUserData,
  };
};

export default dataService();

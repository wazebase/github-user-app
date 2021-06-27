import { IUser } from '../interfaces/IUser';
import { User } from '../classes/User';

const userService = () => {
  const userList:IUser[] = [];

  const addUser = (user:IUser) => {
    userList.push(user);
  };

  const createUser = (userData:any) => {
    const newUser = new User(userData.name, userData.login,
      userData.type, userData.organizations_url,
      userData.followers, userData.avatar_url,
      userData.public_repos, userData.repos_url, userData.id);

    return newUser;
  };

  const getList = () => userList;

  const checkIfUserExists = (newUser:IUser) => {
    let userExists = false;
    userList.forEach((user) => {
      if (newUser.id === user.id) {
        userExists = true;
      }
    });
    return userExists;
  };

  const sortUsersByPopularity = () => {
    userList.sort((a, b) => {
      if (a.followers < b.followers) {
        return 1;
      }
      if (a.followers > b.followers) {
        return -1;
      }

      return 0;
    });
  };

  const checkifListReady = () => {
    let reposAreSet = false;
    if (userList.length === 30) {
      const lastItem = userList[userList.length - 1];
      if (lastItem.firstThreeRepos.length > 0 && lastItem.orgs.length > 0) {
        reposAreSet = true;
      }
    }
    return reposAreSet;
  };
  return {
    addUser,
    checkIfUserExists,
    sortUsersByPopularity,
    checkifListReady,
    createUser,
    getList,
  };
};

export default userService();

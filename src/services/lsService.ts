import { IUser } from '../interfaces/IUser';

const lsService = () => {
  const saveToLs = (userlist:IUser[]) => {
    localStorage.setItem('userlist', JSON.stringify(userlist));
  };

  const listExists = (list:'userlist'|'searchlist') => {
    const itemExists = localStorage.getItem(list);
    if (itemExists && itemExists !== '[]') {
      return true;
    }
    return false;
  };

  const getListFromLs = (list:'userlist'|'searchlist') => {
    const lsList = localStorage.getItem(list);
    if (lsList) {
      return JSON.parse(lsList);
    }
    return 'Wrong function call';
  };

  const getUserFromLs = (userlist:IUser[], userLogin:string) => {
    let user = userlist[0];
    let userExists = false;
    for (let i = 0; i < userlist.length; i += 1) {
      if (userlist[i].login === userLogin) {
        user = userlist[i];
        userExists = true;
        break;
      }
    }
    return {
      user,
      userExists,
    };
  };

  const addItemToLsList = (list:'userlist'|'searchlist', item:IUser|string) => {
    const lsList = getListFromLs(list);
    lsList.push(item);
    saveToLs(lsList);
  };

  const saveToSearchlist = (item:string) => {
    if (listExists('searchlist')) {
      const list = getListFromLs('searchlist');
      if (list.length === 3) {
        list.shift();
      }
      list.push(item);
      localStorage.setItem('searchlist', JSON.stringify(list));
    } else {
      const newList = [];
      newList.push(item);
      localStorage.setItem('searchlist', JSON.stringify(newList));
    }
  };

  return {
    saveToLs,
    listExists,
    getListFromLs,
    getUserFromLs,
    addItemToLsList,
    saveToSearchlist,
  };
};

export default lsService();

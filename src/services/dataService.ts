import { TOKEN } from '../api/config';
import userService from './userService';
import repoService from './repoService';
import orgsService from './orgsService';

const dataService = () => {
  const fetchData = async (link:string) => {
    let data:any;
    let error = '';
    try {
      const req = await fetch(link, {
        headers: {
          Authorization: `bearer ${TOKEN}`,
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
    const error = userObj.error || userObj.data.message;
    if (!error) {
      const newUser = userService.createUser(userObj.data);
      await repoService.getReposData(newUser);
      await orgsService.getOrgs(newUser);
      userService.addUser(newUser);
    }
  };

  return {
    fetchData,
    getUserData,
  };
};

export default dataService();

import dataService from './dataService';
import { IUser } from '../interfaces/IUser';

const repoService = () => {
  const checkIfNoRepos = (user:IUser) => user.publicRepos === 0;

  const noRepos = (user:IUser) => {
    user.firstThreeRepos.push(false);
  };

  const getReposData = async (user:IUser) => {
    const repoDataObj = await dataService.fetchData(user.reposUrl);
    const error = repoDataObj.error || repoDataObj.data.message;
    if (!error) {
      const repoData = repoDataObj.data;
      for (let i = 0; i < 3 && i < repoData.length; i += 1) {
        const repoName = repoData[i].name;
        const repoUrl = repoData[i].html_url;
        const { id } = repoData[i];
        user.firstThreeRepos.push({
          name: repoName,
          url: repoUrl,
          id,
        });
      }
    } else {
      noRepos(user);
    }
  };

  const setReposForUser = async (user:IUser) => {
    if (!checkIfNoRepos(user)) {
      await getReposData(user);
    } else {
      noRepos(user);
    }
  };

  return {
    setReposForUser,
    getReposData,
  };
};

export default repoService();

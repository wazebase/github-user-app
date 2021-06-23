/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */
import dataService from './dataService';
import { IUser } from '../interfaces/IUser';

const repoService = () => {
  const checkIfNoRepos = (user:IUser) => user.publicRepos === 0;

  const getReposData = async (user:IUser) => {
    const repoDataObj = await dataService.fetchData(user.reposUrl);
    if (!repoDataObj.error) {
      const repoData = repoDataObj.data;
      for (let i = 0; i < 3 && i < repoData.length; i += 1) {
        const repoName = repoData[i].name;
        const repoUrl = repoData[i].html_url;
        user.firstThreeRepos.push({
          name: repoName,
          url: repoUrl,
        });
      }
    }
  };

  const noRepos = (user:IUser) => {
    user.firstThreeRepos.push('No repos available');
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

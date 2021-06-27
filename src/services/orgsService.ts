import dataService from './dataService';
import { IUser } from '../interfaces/IUser';
import { Organisation } from '../classes/Organisation';

const orgsService = () => {
  const getOrgs = async (user:IUser) => {
    const orgsObj = await dataService.fetchData(user.orgUrl);
    const error = orgsObj.error || orgsObj.data.message;
    if (orgsObj.data.length > 0 && !error) {
      orgsObj.data.forEach((org:any) => {
        const newOrg = new Organisation(org.login, org.avatar_url, org.id);
        user.orgs.push(newOrg);
      });
    } else {
      user.orgs.push(false);
    }
  };

  return {
    getOrgs,
  };
};

export default orgsService();

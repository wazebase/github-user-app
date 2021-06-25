/* eslint-disable @typescript-eslint/explicit-function-return-type */
import dataService from './dataService';
import { IUser } from '../interfaces/IUser';
import { Organisation } from '../classes/Organisation';

const orgsService = () => {
  const getOrgs = async (user:IUser) => {
    const orgsObj = await dataService.fetchData(user.orgUrl);
    console.log(orgsObj);
    if (orgsObj.data.length > 0 && !orgsObj.error) {
      orgsObj.data.forEach((org:any) => {
        const newOrg = new Organisation(org.login, org.avatar_url, org.id);
        user.orgs.push(newOrg);
      });
    }
  };

  return {
    getOrgs,
  };
};

export default orgsService();

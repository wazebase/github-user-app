import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  name: string;

  login: string;

  type: string;

  orgUrl: string;

  followers:number;

  avatarUrl:string;

  publicRepos:number;

  reposUrl:string;

  id:number;

  orgs:[];

  firstThreeRepos:[];

  constructor(name:string, login:string, type:string, orgUrl:string, followers:number,
    avatarUrl:string, publicRepos:number, reposUrl:string, id:number) {
    this.type = type;
    this.orgUrl = orgUrl;
    this.followers = followers;
    this.avatarUrl = avatarUrl;
    this.publicRepos = publicRepos;
    this.reposUrl = reposUrl;
    this.id = id;
    this.firstThreeRepos = [];
    this.orgs = [];
    this.name = name;
    this.login = login;
  }
}

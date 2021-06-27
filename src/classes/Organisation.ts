import { IOrganisation } from '../interfaces/IOrganisation';

export class Organisation implements IOrganisation {
    login:string

    avatar: string

    id: number

    constructor(login:string, avatar:string, id:number) {
      this.login = login;
      this.avatar = avatar;
      this.id = id;
    }
}

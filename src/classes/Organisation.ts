export class Organisation {
    login:string

    avatar: string

    id: number

    constructor(login:string, avatar:string, id:number) {
      this.login = login;
      this.avatar = avatar;
      this.id = id;
    }
}

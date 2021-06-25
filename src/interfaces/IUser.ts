export interface IUser {
    type: string;

    login:string;

    orgUrl: string;

    followers: number;

    avatarUrl: string;

    publicRepos?: number;

    reposUrl: string;

    id: number;

    name: string;

    firstThreeRepos: any[];

    orgs: any[];

    fromSearch?: boolean;
}

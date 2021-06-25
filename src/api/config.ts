/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const API_URL = 'https://api.github.com/users';

export class Token {
    private token:string

    constructor() {
      this.token = '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';
    }

    getToken() {
      return this.token;
    }
}

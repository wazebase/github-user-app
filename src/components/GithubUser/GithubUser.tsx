/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

const GithubUser = (
  {
    name, login, type, orgUrl, followers, avatarUrl, id, firstThreeRepos, reposUrl,
  }:IUser,
) => (
  <div>
    <p>
      <Link to={`/${login}`}>{name}</Link>
    </p>
    <p>
      Type: {type}
    </p>
  </div>
);

export default GithubUser;

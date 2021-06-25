/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

import Repo from '../Repo/Repo';
import Organisation from '../Organisation/Organisation';

import './github-user.scss';

const GithubUser = (
  {
    name, login, type, orgUrl, followers, avatarUrl,
    id, firstThreeRepos, reposUrl, orgs, fromSearch,
  }:IUser,
) => (
  <div className="user user-list-view">
    <div className="img-container">
      <img src={avatarUrl} alt={`avatar img of user ${login}`} />
    </div>
    <div className="name-and-type">
      <h2>
        <Link to={`/${login}`}>{name || login}</Link>
      </h2>
      <p>
        Type: {type}
      </p>
    </div>
    <div className="repos">
      <h3>User repos</h3>
      {firstThreeRepos.length > 0
        ? firstThreeRepos.map((repo) => <Repo name={repo.name} url={repo.url} />)
        : (<p>No repos to display</p>)}
    </div>

    <div className="orgs">
      {fromSearch && orgs.length === 0
        ? (
          <>
            <h3>User organisations</h3>
            <p> No organisations available</p>
          </>
        ) : (<></>)}
      {orgs.length > 0 && fromSearch
        ? (
          <>
            <h3>User organisations</h3>
            {orgs.map((org) => <Organisation login={org.login} avatar={org.avatar} />)}
          </>
        )
        : (<></>)}
    </div>
  </div>
);

export default GithubUser;

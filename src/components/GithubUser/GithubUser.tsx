import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

import Repo from '../Repo/Repo';
import Organisation from '../Organisation/Organisation';

import './github-user.scss';

const GithubUser = (
  {
    name, login, type, avatarUrl, firstThreeRepos, orgs, fromSearch,
  } : IUser,
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
        Type:
        {' '}
        {type}
      </p>
    </div>
    <div className="repos">
      <h3>User repos</h3>
      {firstThreeRepos[0]
        ? firstThreeRepos.map((repo) => <Repo name={repo.name} url={repo.url} key={repo.id} />)
        : (<p id="repo-info">No repos to display</p>)}
    </div>

    <div className="orgs">
      {fromSearch && !orgs[0]
        ? (
          <>
            <h3 id="orgs-heading">User organisations</h3>
            <p id="org-info">No organisations available</p>
          </>
        ) : (<></>)}
      {orgs[0] && fromSearch
        ? (
          <>
            <h3>User organisations</h3>
            {orgs.map((org) => <Organisation login={org.login} avatar={org.avatar} key={org.id} />)}
          </>
        )
        : (<></>)}
    </div>
  </div>
);

export default GithubUser;

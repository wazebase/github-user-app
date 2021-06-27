/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import GithubUser from '../GithubUser/GithubUser';

describe('Github user', () => {
  let mountedUser;
  let emptyUser;
  let landingUser;

  beforeEach(() => {
    const repos = [{ url: 'url', name: 'name', id: 12 }, { url: 'url', name: 'name', id: 121 }];
    const orgs = [{ login: 'login', avatar: 'avatar', id: 323 }];
    mountedUser = shallow(<GithubUser
      name="user"
      login="login"
      type="user"
      avatarUrl="url"
      firstThreeRepos={repos}
      orgs={orgs}
      fromSearch
    />);

    emptyUser = shallow(<GithubUser
      name="user"
      login="login"
      type="user"
      avatarUrl="url"
      firstThreeRepos={[false]}
      orgs={[false]}
      fromSearch
    />);

    landingUser = shallow(<GithubUser
      name="user"
      login="login"
      type="user"
      avatarUrl="url"
      firstThreeRepos={repos}
      orgs={orgs}
      fromSearch={false}
    />);
  });

  it('renders link to user page', () => {
    const link = mountedUser.find('Link');
    expect(link).toHaveLength(1);
  });

  it('renders repos when they are passed', () => {
    const repo = mountedUser.find('Repo');
    expect(repo).toHaveLength(2);
  });

  it('renders informational message when no repos passed', () => {
    const info = emptyUser.find('#repo-info');
    expect(info.text()).toEqual('No repos to display');
  });

  it('renders organisations when they are passed', () => {
    const org = mountedUser.find('Organisation');
    expect(org).toHaveLength(1);
  });

  it('renders informational message when no organisations passed', () => {
    const info = emptyUser.find('#org-info');
    expect(info.text()).toEqual('No organisations available');
  });

  it('does not render user ogranisations on landing page', () => {
    const landingheading = landingUser.find('#orgs-heading');
    const userPageheading = emptyUser.find('#orgs-heading');
    expect(landingheading).toHaveLength(0);
    expect(userPageheading).toHaveLength(1);
  });
});

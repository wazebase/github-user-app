/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import UserPage from '../UserPage/UserPage';
import { User } from '../../classes/User';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    userlogin: '',
  }),
}));
describe('User Page', () => {
  let mountedUserPage;
  let newUser;

  beforeEach(() => {
    newUser = new User('', '', '', '', 0, '', 0, '', 0);
    mountedUserPage = shallow(<UserPage currentUser={newUser} />);
  });

  it('renders back button', () => {
    const backButton = mountedUserPage.find('BackButton');
    expect(backButton).toHaveLength(1);
  });
});

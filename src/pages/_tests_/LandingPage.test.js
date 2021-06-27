import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from '../LandingPage/LandingPage';

describe('Landing Page', () => {
  let mountedLandingPage;

  beforeEach(() => {
    mountedLandingPage = shallow(<LandingPage />);
  });

  it('renders search', () => {
    const search = mountedLandingPage.find('Search');
    expect(search).toHaveLength(1);
  });

  it('renders view buttons', () => {
    const viewButtons = mountedLandingPage.find('ViewButtons');
    expect(viewButtons).toHaveLength(1);
  });
});

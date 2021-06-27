import React from 'react';
import { shallow } from 'enzyme';
import ViewButtons from '../ViewButtons/ViewButtons';

describe('View Buttons', () => {
  let mountedViewButtons;

  beforeEach(() => {
    mountedViewButtons = shallow(<ViewButtons />);
  });

  it('renders 2 buttons', () => {
    const button = mountedViewButtons.find('button');
    expect(button).toHaveLength(2);
  });
});

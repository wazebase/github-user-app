import React from 'react';
import { shallow } from 'enzyme';
import BackButton from '../BackButton/BackButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: () => 0,
  }),
}));

describe('BackButton', () => {
  let mountedBackButton;

  beforeEach(() => {
    mountedBackButton = shallow(<BackButton />);
  });

  it('renders button', () => {
    const button = mountedBackButton.find('button');
    expect(button).toHaveLength(1);
  });

  it('runs history.push function when button is clicked', () => {
    const mockCallBack = jest.fn();
    const buttonWithCallback = shallow(<BackButton onClick={mockCallBack()} />);
    buttonWithCallback.find('button').simulate('click');
    expect(mockCallBack.mock.calls).toHaveLength(1);
  });
});

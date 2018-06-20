import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './Form';
import MessageBox from './../MessageBox/MessageBox';

configure({adapter: new Adapter()});

describe('<Form />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Form />);
  });

  it("shouldn't render any MessageBox", () => {
    expect(wrapper.find(MessageBox)).toHaveLength(0);
  });

  it("should render a MessageBox", () => {
    wrapper.setState({message: 'test message'});
    expect(wrapper.find(MessageBox)).toHaveLength(1);
  });

  it("should give invalid email message", () => {
    wrapper.setState({email: 'something'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state('message')).toEqual('invalid email');
  });

  it("should give invalid password message", () => {
    wrapper.setState({email: 'example@example.pl'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state('message')).toEqual('invalid password');
  });

  it("should give invalid email or password message", () => {
    wrapper.setState({email: 'example@example.pl', password: '1qaz2WSX'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state('message')).toEqual('invalid email or password');
  });

  it("should give login successful message", () => {
    wrapper.setState({email: 'test@test.pl', password: 'Password1'});
    wrapper.find('form').simulate('submit');
    expect(wrapper.state('message')).toEqual('login successful');
  });
});

import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageBox from './MessageBox';

configure({adapter: new Adapter()});

describe('<MessageBox />', () => {
  it("shouldn't render any MessageBox", () => {
    const wrapper = shallow(<MessageBox message="test message" />);
    expect(wrapper.text(MessageBox)).toEqual('test message');
  });
});

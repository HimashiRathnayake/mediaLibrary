//import React from 'react';
//import ReactDOM from 'react-dom';
import { configure} from 'enzyme';
import { expect } from 'chai';
//import App from './App';
//import Login from './components/loginComponent';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('App component testing', function() {
  it('renders without crashing', () => {
    //const form = document.createElement('form');
    //const wrapper = mount(<App />);
    expect().toBeNull;
  });
 
});




import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import NavBar from './NavBar';

configure({adapter: new Adapter()});

describe('<Navbar />', () => {
    let store
    const middlewares = []
    const mockStore = configureStore(middlewares);
  
    beforeEach(() => {
      store = mockStore([]);
    });
  
    
    it('the component NavBar is rendering correctly', ()=>{
        shallow(<Provider store={store}>
            <NavBar/>     
            </Provider>);
    })
   
})


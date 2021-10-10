import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import LandingPage from '../src/components/LandingPage/LandingPage';
import NavBar from '../src/components/NavBar/NavBar';
import Home from '../src/components/Home/Home';
import Game from '../src/components/Game/Game';
import GameDetail from '../src/components/GameDetail/GameDetail';
import CreateGame from '../src/components/CreateGame/CreateGame';

describe('rendering components', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  it('the component App is rendering correctly', ()=>{
    shallow(<App/>);
  })
 
  it('the component LandingPage is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <LandingPage/>     
            </Provider>);
  })

  it('the component NavBar is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <NavBar/>     
            </Provider>);
  })
  
  it('the component Home is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <Home/>     
            </Provider>);
  })

  it('the component Game is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <Game/>     
            </Provider>);
  })
  
  it('the component GameDetail is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <GameDetail/>     
            </Provider>);
  })

  it('the component CreateGame is rendering correctly', ()=>{
    shallow(<Provider store={store}>
            <CreateGame/>     
            </Provider>);
  })

})


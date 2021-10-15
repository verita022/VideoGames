import './App.css';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home'
import CreateGame from './components/CreateGame/CreateGame'
import GameDetail from './components/GameDetail/GameDetail';



function App() {
  return (
    <div className="App">
    
      <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/Home' component={Home}/>
      <Route path='/Home/' component={GameDetail}/>
      <Route path='/createGame' component={CreateGame}/>
      </Switch>
     
    </div>
  );
}

export default App;

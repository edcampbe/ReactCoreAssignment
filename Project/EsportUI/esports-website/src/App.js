import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Organization} from './Components/Orgs/Organization';
import {Player} from './Components/Player/Player';
import {Navigation} from './Components/Navigation';


import {BrowserRouter,Route,Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className ="m-3 d-flex justify-content-center">
            React JS
        </h3>
        <Navigation/>
        <Switch>
            <Route path = '/' component={Home} exact/>
            <Route path = '/Organization' component={Organization} exact/>
            <Route path = '/Player' component={Player} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

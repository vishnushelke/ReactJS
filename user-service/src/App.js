import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import VerifyUser from './components/VerifyUser'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
     <BrowserRouter >
        <Switch>
          <Route path='/Login' exact={true} component={Login} />
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/ForgetPassword' component={ForgetPassword} />
          <Route path='/Register' component={Register} />
          <Route path='/VerifyUser' component={VerifyUser} />
        </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword';
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
     {/* <Login />
     <Register />
     <ForgetPassword /> */}
   

     <Dashboard />

     {/* <BrowserRouter >
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </Switch>
     </BrowserRouter> */}
    </div>
  );
}

export default App;

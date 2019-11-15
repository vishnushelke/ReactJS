import React from 'react';
import './App.css';
import Login from './components/JsFiles/Login';
import Register from './components/JsFiles/Register'
import ForgetPassword from './components/JsFiles/ForgetPassword';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import VerifyUser from './components/JsFiles/VerifyUser'
import Dashboard from './components/JsFiles/Dashboard'
import ResetPassword from './components/JsFiles/ResetPassword';
import VerifyUserToReset from './components/JsFiles/VerifyUserToReset'
import AddNotePopper from './components/JsFiles/AddNotePopper';

function App() {
  return (
    <div className="App">
     <BrowserRouter >
        <Switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/Dashboard' component={Dashboard} />
          <Route path='/ForgetPassword' component={ForgetPassword} />
          <Route path='/Register' component={Register} />
          <Route path='/user/validate/:token' component={VerifyUser} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/VerifyUserToReset' component={VerifyUserToReset} />
          <Route path='/AddNotePopper' component={AddNotePopper} />
        </Switch>
     </BrowserRouter>
     {/* <Dashboard /> */}
    </div>
  );
}

export default App;

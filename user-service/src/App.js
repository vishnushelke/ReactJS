import React from 'react';
import './App.css';
import Login from './components/JsFiles/Login';
import Register from './components/JsFiles/Register'
import ForgetPassword from './components/JsFiles/ForgetPassword';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import VerifyUser from './components/JsFiles/VerifyUser'
import Dashboard from './components/JsFiles/Dashboard'
import ResetPassword from './components/JsFiles/ResetPassword';
import VerifyUserToReset from './components/JsFiles/VerifyUserToReset'
import AddNotePopper from './components/JsFiles/AddNotePopper';
import DisplayAllNotes from './components/JsFiles/DisplayAllNotes';
import DisplayArchiveNotes from './components/JsFiles/DisplayArchiveNotes'
import DisplayTrashedNote from './components/JsFiles/DisplayTrashedNote'
import DisplayNotesOfLabel from './components/JsFiles/DisplayNotesOfLabel'
import DisplayReminderNotes from './components/JsFiles/DisplayReminserNotes';

function App() {
  return (
    <div className="App">
     <Router >       
        <switch>
          <Route path='/' exact={true} component={Login} />
          <Route path='/Dashboard' component={Dashboard} />
          <Route path="/Dashboard/notes" component={DisplayAllNotes} />
          <Route path='/Dashboard/archivenotes'  component={DisplayArchiveNotes} />
          <Route path='/Dashboard/reminder'  component={DisplayReminderNotes} />
          <Route path='/Dashboard/trashnotes' component={DisplayTrashedNote} />    
          <Route path='/Dashboard/:name' component={DisplayNotesOfLabel} />      
          <Route path='/ForgetPassword' component={ForgetPassword} />
          <Route path='/Register' component={Register} />
          <Route path='/user/validate/:token' component={VerifyUser} />
          <Route path='/ResetPassword' component={ResetPassword} />
          <Route path='/VerifyUserToReset' component={VerifyUserToReset} />
          <Route path='/AddNotePopper' component={AddNotePopper} />   
        </switch>
     </Router>
    </div>
  );
}

export default App;

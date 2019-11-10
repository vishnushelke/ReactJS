import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Register from './components/Register'
import ForgetPassword from './components/ForgetPassword';

function App() {
  return (
    <div className="App">
     <Login />
     <Register />
     <ForgetPassword />
    </div>
  );
}

export default App;

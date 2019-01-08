import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/layout/Dashboard';
import NavBar from './components/layout/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Dashboard></Dashboard>
      </div>
    );
  }
}

export default App;

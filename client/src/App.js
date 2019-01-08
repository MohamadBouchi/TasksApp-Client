import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import NavBar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar></NavBar>
        <Dashboard></Dashboard>
        <Footer/>
      </div>
    );
  }
}

export default App;

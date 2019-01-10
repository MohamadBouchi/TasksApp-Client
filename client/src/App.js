import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import SideDrawer from './components/SideDrawer';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <SideDrawer></SideDrawer>
          <Switch>
            <Redirect from='/' to='/login' exact></Redirect>
            <Route path='/login' component={Login}></Route>
            <Route path='/Dashboard' component={Dashboard}></Route>
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;

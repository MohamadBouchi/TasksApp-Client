import React, { Component } from 'react';
import './App.css';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import SideDrawer from './components/sideDrawer/SideDrawer';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
        {this.props.token &&<SideDrawer></SideDrawer>}
          <Switch>
            {!this.props.token && <Redirect from='/' to='/login' exact></Redirect>}
            {!this.props.token && <Redirect from='/dashboard' to='/login' exact></Redirect>}
            {this.props.token && <Redirect from='/' to='/Dashboard' exact></Redirect>}
            {this.props.token && <Redirect from='/login' to='/Dashboard' exact></Redirect>}
            {!this.props.token && <Route path='/login' component={Login}></Route>}
            {this.props.token && <Route path='/Dashboard' component={Dashboard}></Route>}
          </Switch>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    userName: state.auth.userName
  }
}

export default connect(mapStateToProps)(App);

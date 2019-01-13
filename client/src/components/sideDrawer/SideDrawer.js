import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import SideBar from '../sideBar/SideBar';
import NavBar from '../navBar/NavBar'
class TemporaryDrawer extends React.Component {
  state = {
    left: false
  };

  toggleDrawer2 = (open) => {
    this.setState({
      'left': open,
    });
  };

  toggleDrawer = (open) => () => {
    this.setState({
      'left': open,
    });
  };

  render() {
    const sideList = (
      <div style={{width:'330px'}}>
      <SideBar></SideBar>
      </div>
    );

    return (
      <div>
        <NavBar openDrawer={this.toggleDrawer(true)}></NavBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
        
      </div>
    );
  }
}

export default TemporaryDrawer;
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { changePassword } from '../../store/actions/AuthActions';
import Snackbar from '@material-ui/core/Snackbar';
class FormDialog extends React.Component {
  state = {
    open: false,
    password: '',
    openSnack: false
  };


  handleCloseSnack = () => {
    this.setState({ openSnack: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  changePassword = (e) => {
    e.preventDefault();
    this.props.changePassword(this.props.userId, this.state.password);
    this.setState({ openSnack: true  });
    this.setState({ open: false });
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Profile</DialogTitle>
        <form onSubmit={this.changePassword}>
          <DialogContent>
          <TextField
              autoFocus
              style={{display: 'none' }}
              margin="dense"
              id="username"
              label="New Password"
              type="text"
              fullWidth
              autoComplete='new-username'
            />
            <TextField
              onChange={(e) => {this.setState({password: e.target.value})}}
              autoFocus
              margin="dense"
              id="password"
              label="New Password"
              type="password"
              fullWidth
              autoComplete='new-password'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type='submit' color="primary">
              Save
            </Button>
          </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'right'} }
          open={this.state.openSnack}
          onClose={this.handleCloseSnack}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">password has been changed</span>}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    userId: state.auth.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changePassword: (id, password) => dispatch(changePassword(id, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef : true })(FormDialog);
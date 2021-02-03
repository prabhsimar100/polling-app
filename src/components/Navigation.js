import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {withAuth} from './Session';
import { withFirebase } from "./Firebase";


//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class Navigation extends Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {this.props.authUser ? NavigationAuth(this.props.firebase) : NavigationNonAuth()}
        </Toolbar>
      </AppBar>
    );
  }
}

const NavigationAuth = (firebase) => {
  return (
    <div>
      <Button color="inherit" component={Link} to="/">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/profile">
        Profile
      </Button>
      <Button color="inherit" component={Link} to="/create">
        Create
      </Button>
      <Button
        color="inherit"
        component={Link}
        to="/"
        onClick={firebase.doSignOut}
      >
        Signout
      </Button>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/signup">
        Signup
      </Button>
    </div>
  );
};
 
export default withFirebase(withAuth(Navigation));
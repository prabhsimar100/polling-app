import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {withAuth} from './Session';
import Button from "@material-ui/core/Button";
import { withFirebase } from "./Firebase";

// import * as ROUTES from '../../constants/routes';
 
// const Navigation = () => (
//   <div>
//     <ul>
//       <li>
//         <Link to={"/login"}>Login</Link>
//       </li>
//       <li>
//         <Link to={"/"}>Landing</Link>
//       </li>
//       <li>
//         <Link to={"/signup"}>Sign Up</Link>
//       </li>
//     </ul>
//   </div>
// );

class Navigation extends Component {
  constructor(props) {
    super(props);
  }  
  render() {
    return (
      <div>
        <div>{this.props.authUser ? NavigationAuth(this.props.firebase) : NavigationNonAuth() }</div>
        {/* <Button onClick={()=>{console.log(this.props.authUser)}}>Check</Button> */}
      </div>
    );
  }
}

 
const NavigationAuth = (firebase) => (
  <ul>
    <li>
      <Link to={"/"}>Landing</Link>
    </li>
    <li>
      <Link to={"/create"}>Create Poll</Link>
    </li>
    <li>
      <Link to={"/profile"}>Profile</Link>
    </li>
    <li>
      <Button color="primary" component={Link} to="/" onClick = {firebase.doSignOut}>Sign Out</Button>
    </li>
  </ul>
);
 
const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={"/signup"}>Signup</Link>
    </li>
    <li>
      <Link to={"/login"}>Login</Link>
    </li>
  </ul>
);

 
export default withFirebase(withAuth(Navigation));
import React from 'react';
import { Link } from 'react-router-dom';
 
// import * as ROUTES from '../../constants/routes';
 
const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={"/login"}>Login</Link>
      </li>
      <li>
        <Link to={"/"}>Landing</Link>
      </li>
      <li>
        <Link to={"/signup"}>Sign Up</Link>
      </li>
    </ul>
  </div>
);
 
export default Navigation;
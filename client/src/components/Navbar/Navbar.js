import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from 'jwt-decode';


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile'))); //getting the user details from localstorage for ref see reducer>auth.js

  useEffect(()=>{
     // eslint-disable-next-line
    const token = user?.token;

    //JWT token expires and logout the user automatically
    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp*1000 < new Date().getTime()) logOut();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
     // eslint-disable-next-line
  }, [location]);  //once the user is logged in and redirected to the home the user token is set
   // eslint-disable-next-line
  const logOut = () => {
    dispatch({type: LOGOUT});
    navigate('/');
    window.location.reload();
    setUser(null);
  }

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
      <img
        src={memoriesText}
        alt="text"
        height="45px"
      />
      <img
        className={classes.image}
        src={memoriesLogo}
        alt="icon"
        height="40px"
      />
      </Link>
      <Toolbar className={classes.toolbar}>
        {
            user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>

                </div>
            ): (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
            )
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

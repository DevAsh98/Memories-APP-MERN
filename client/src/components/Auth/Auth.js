import React from "react";
import { useState } from "react";
import {
  Avatar,
  Container,
  Paper,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { authData, isLoading } = useSelector((state) => state.authReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupp, setIsSignupp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrorMessage(false);
    if (isSignupp) {
      if (formData.confirmPassword !== formData.password)
        setShowErrorMessage(true);
      else {
        dispatch(signup(formData, navigate));
      }
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const switchMode = () => {
    setIsSignupp((prevIsSignupp) => !prevIsSignupp);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in was unsuccessful");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignupp ? "Sign Up" : "Sign In"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignupp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignupp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            {(showErrorMessage && isSignupp) && (<Alert  severity="error">Passwords Don't Match</Alert>)}
            {!isLoading && authData?.message && (
              <Alert severity="error">{authData?.message}</Alert>
            )}
          </Grid>
          {/* the google login section */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignupp ? "Sign Up" : "Sign In"}
          </Button>
          {/* <GoogleOAuthProvider clientId="198513098220-tkfbmdgjv575tfh0cfije936ajg5555p.apps.googleusercontent.com"> */}

          <GoogleLogin
            clientId="198513098220-tkfbmdgjv575tfh0cfije936ajg5555p.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          {/* </GoogleOAuthProvider> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignupp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

import { AUTH, START_LOADING, END_LOADING } from "../constants/actionTypes";
import * as api from "../api"; //importing everything from api

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    dispatch({ type: END_LOADING });
    if (data?.result) navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};
export const signup = (formData, navigate) => async (dispatch) => {
  try {
    //login the user...
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    //navigate to homepage
    navigate("/");
  } catch (error) {
    console.log(error.message);
  }
};

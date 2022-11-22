import {
  AUTH,
  END_LOADING,
  LOGOUT,
  START_LOADING,
} from "../constants/actionTypes";

const authReducer = (state = { isLoading: true, authData: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case AUTH:
      //storing in localStorage of the browser
      if (action?.data?.result)
        localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();

      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;

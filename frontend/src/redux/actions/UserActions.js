import Axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../../constants/UserConstants';
import Cookie from 'js-cookie'

const signIn = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await Axios.post("/hirewheels/v1/users/access-token", { email, password });
      dispatch({ type: USER_LOGIN_SUCCESS, payload:{...data._doc,jwtToken:data.jwtToken} });
      Cookie.set('userInfo', JSON.stringify({...data._doc,jwtToken:data.jwtToken}));
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
  }

  const signUp = (firstName,lastName,email,mobileNo,password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: {firstName,lastName,email,mobileNo,password } });
    try {
      const { data } = await Axios.post("/hirewheels/v1/users", { firstName,lastName,email,mobileNo,password});
      dispatch({ type: USER_LOGIN_SUCCESS, payload:{...data[0],jwtToken:data.jwtToken} });
      Cookie.set('userInfo', JSON.stringify({...data[0],jwtToken:data.jwtToken}));
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
  }

  const logout=()=>(dispatch)=>{
    dispatch({type:USER_LOGOUT_SUCCESS});
    Cookie.remove("userInfo")
  }



  export {signIn,signUp,logout}
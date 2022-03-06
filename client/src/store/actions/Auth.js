import { apiCall,setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import {addError,removeError} from "./errors"
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


export const LogOut = () => {
  return dispatch => {
    localStorage.clear()
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}



export function setAuthorizationToken(token){
  setTokenHeader(token)
}



export function authUser(type, userData) {
  return async dispatch => {
    try {
      return apiCall("post", `/api/auth/${type}`, userData)
      .then(({ token, ...user }) => {
        if(Object.keys(user)[0] === "message" && !token){
          dispatch(addError(user.message))
          return false
        }
        else {
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token)
          dispatch(setCurrentUser(user));
          dispatch(removeError())
          return true

        }
      })
    } catch (err) {
      return err
    }
    
  };
}
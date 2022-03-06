import {TOGGLE_LIKE} from "../actionTypes"
import {addError,removeError} from "./errors"
import {apiCall} from "../../services/api"
export const toggleLike = (data,id,cType,user_id) => {
  return {
    type : TOGGLE_LIKE,
    data,
    id,
    cType,
    user_id
  }
}

// /api/user/:user_id/content/:content_id/Like
export const addLikeAPI = (user_id,content_id,cType) => {
  return async dispatch => {
    await apiCall("put",`/api/user/${user_id}/content/${content_id}/Like`,{"cType" : cType}).then(data=>{
      if(Object.keys(data)[0] === "message"){
        dispatch(addError(data.message))
      }
      else {
        dispatch(removeError())
        dispatch(toggleLike(data,content_id,cType,user_id))
      }
    })
  }
}
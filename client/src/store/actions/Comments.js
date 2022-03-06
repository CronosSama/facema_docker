import {ADD_COMMENT,MODIFY_COMMENT,DELETE_COMMENT} from "../actionTypes"
import {addError,removeError} from "./errors"
import { apiCall } from "../../services/api"


export const addComment = (data) => {
  return {
    type : ADD_COMMENT,
    data
  }
}

export const ModifyComment = (data,message_id,comment_id) => {
  return {
    type : MODIFY_COMMENT,
    data,
    comment_id,
    message_id
  }
}

export const DeleteComment = (message_id,comment_id) => {
  debugger
  return {
    type : DELETE_COMMENT,
    comment_id,
    message_id
  }
}


export function addCommentAPI(user_id,message_id,input){
  return async dispatch => {
    // prefix - /api/user/:user_id/messages/:message_id/comments
    return await apiCall("post",`/api/user/${user_id}/messages/${message_id}/comments`,input).then(data => {
      dispatch(addComment(data))
    })
  }
}

// prefix - /api/user/:user_id/messages/:message_id/comments/:comment_id

export function ModfiyCommentAPI(user_id,message_id,comment_id,newData){
  return async dispatch => {
    return await apiCall("put",`/api/user/${user_id}/messages/${message_id}/comments/${comment_id}`,newData).then(data=>{
      dispatch(ModifyComment(data,message_id,comment_id))
    })
  }
}
// prefix - /api/user/:user_id/messages/:message_id/comments/:comment_id

export function DeleteCommentAPI(user_id,message_id,comment_id){
  debugger
  return async dispatch => {
    return await apiCall("delete",`/api/user/${user_id}/messages/${message_id}/comments/${comment_id}`).then(_=>{
      dispatch(DeleteComment(message_id,comment_id))
    })
  }
}



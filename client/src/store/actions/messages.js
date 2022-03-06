import {LOAD_MESSAGES,REMOVE_MESSAGE,ADD_MESSAGE,MODIFY_MESSAGE} from "../actionTypes"
import {addError,removeError} from "./errors"
import { apiCall } from "../../services/api"


export const ModifyState = (id,data) => {
  return {
    type : MODIFY_MESSAGE,
    id,
    data
  }
}

export const load_message = (messages) => {
  return {
    type : LOAD_MESSAGES,
    messages
  }
}

export const createM = (message) => {
  return {
    type : ADD_MESSAGE,
    message
  }
} 

export const DeleteMessage = id => {
  return {
    type : REMOVE_MESSAGE,
    id
  }
}

export const fetchMessages = () => {
  return async dispatch => {

    return await apiCall("get","/api/messages").then(data=>{
      dispatch(load_message(data))
    })

  }

}

export const createMessage = (text,user_id) => {
  
  return async dispatch => {
    
    if(!user_id || !text){
      dispatch(addError("You Need To Be Logged In"))
    }
    else {
      await apiCall("post",`/api/user/${user_id}/messages`,text).then(data=>{

        if(Object.keys(data)[0] === "message"){
          dispatch(addError(data.message))
        }
        else {
          dispatch(removeError())
          dispatch(createM(data))
  
        }
      }).catch(err=>err)
    }
  }
}


export const deleteMessageAPI = (message_id,user_id) => {
  return async dispatch => {

    return await apiCall("delete",`/api/user/${user_id}/messages/${message_id}`).then(data=>{

      if(Object.keys(data)[0] === "message"){
        dispatch(addError(data.message))
      }
      else {
        dispatch(removeError())
        dispatch(DeleteMessage(message_id))

      }
      
    })

  }
}
//api/user/user_id/messages/message_id
export const ModifyAPI = (newData,message_id,user_id) => {
  return async dispatch => {
    
    await apiCall("put",`/api/user/${user_id}/messages/${message_id}`,newData).then(data=>{
      
      if(Object.keys(data)[0] === "message"){
        dispatch(addError(data.message))
      }
      else {
        dispatch(removeError())
        dispatch(ModifyState(message_id,data))
      }
    })
  }
}
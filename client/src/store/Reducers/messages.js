import {LOAD_MESSAGES,REMOVE_MESSAGE,ADD_MESSAGE,MODIFY_MESSAGE,ADD_COMMENT,MODIFY_COMMENT, DELETE_COMMENT, TOGGLE_LIKE} from "../actionTypes"


export const  Message = (state = [],action) => {
  switch(action.type){
    case LOAD_MESSAGES : 
      return [...action.messages]
    
    case ADD_MESSAGE : 
      return [...state,action.message]

    case REMOVE_MESSAGE : 
      const changedState = state.filter(el=>el._id !== action.id)
      return [...changedState]
    case MODIFY_MESSAGE : 
      const ModifyedState = state.map(el=>el._id == action.id ? el = action.data : el)
      return [...ModifyedState]

    case ADD_COMMENT : 
      const stateAddComment = state.map(el=> (el._id == action.data.Message ? el.Comments.push(action.data) && el:el))
      return [...stateAddComment]
    case MODIFY_COMMENT : 

      const stateModfiyComment = state.map(msgs=>{
        if(msgs._id === action.message_id){
          msgs.Comments.map((coms,id)=>{
            if(coms._id === action.comment_id) {
              // i tried to change coms and return coms , but didn't work so i added the id params and it worked
              msgs.Comments[id] = action.data
            }
          })
        }
        return msgs
      })
      return [...stateModfiyComment]
    
    case DELETE_COMMENT : 
    const stateDeleteComment = state.map(msgs=>{
      if(msgs._id === action.message_id){
        const newComments = msgs.Comments.filter(coms=>{
          return coms._id !== action.comment_id
        })
        msgs.Comments = newComments
      }
      return msgs
    })
    return [...stateDeleteComment]

    case TOGGLE_LIKE : 
      const stateAddLike = state.map(msgs=>{
        if(action.cType === "Message") {
          if(action.id === msgs._id){
            debugger
            if(msgs.Likes.includes(action.user_id)){
              msgs.Likes = msgs.Likes.filter(el=>el !== action.user_id)
            }
            else {
            msgs.Likes = [...msgs.Likes,action.data]
            }
          }
        }
        else {
          
        }
        return msgs
      })

      return [...stateAddLike]

  default : 
    return state
  }
}
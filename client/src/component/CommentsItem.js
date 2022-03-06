import React from "react"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import {Link} from "react-router-dom"
const CommentsItem = ({comment,currentUser,message_id,CommentForm,stateOfModifyComment,showCommentFormHandler,DeleteComment}) => {
  if(stateOfModifyComment){
    return (
      <li className="list-group-item">
        {CommentForm}
      </li>
      
      )
  }
  return (
    <div>
    <li className="list-group-item">
      <img
          src={comment.user.profileImg || DefaultProfileImg}
          alt={comment.user.username}
          height="20"
          width="20"
          className="comment-image"
        />
        <Link to="/">@{comment.user.username} &nbsp;</Link>
          <span className="text-muted"></span>
      <p>{comment.text}</p>
    </li>
    {(currentUser && currentUser.user.id === comment.user._id) && (
      <span>
        <a className = "btn btn-danger commentline" onClick = {DeleteComment} >
        Delete
      </a>
      <button className = "btn btn-success commentline" onClick = {showCommentFormHandler} >
      Modify
      </button>
      </span>
    ) }
    </div>
   
  )
}


export default CommentsItem
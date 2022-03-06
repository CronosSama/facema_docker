import React from "react"
import moment from "moment"
import {Link} from "react-router-dom"
import DefaultProfileImg from "../images/default-profile-image.jpg"
import CommentsItem from "./CommentsItem"
import CommentForm from "../containers/CommentForm"
const MessageItem = ({date,text,user,profileImg,currentUser,rem,modify,modFunc,forme,Comments,message_id,toggleComments,stateOfToggleComments,showCommentFormHandler,DeleteComment,Likes,addLike,didILikeIt}) => {

  if(modify){
    return (
      <li className="list-group-item"> 
        {forme}
      
      </li>
      )
  }

  else {
    
    debugger
    return (
      <div>
        <li className="list-group-item">
        <img
          src={profileImg || DefaultProfileImg}
          alt={user.username}
          height="100"
          width="100"
          className="timeline-image"
        />
        <div className="message-area">
          <Link to="/">@{user.username} &nbsp;</Link>
          <span className="text-muted">
            {/* <Moment className="text-muted" format="Do MMM YYYY">
              {date}
            </Moment> */}
            {moment(date).fromNow()}

          </span>
          <span>
            <p>{text}</p>
            <p>{Likes.length>0 ? Likes.length : "Be the first one to like"}</p>
            {(currentUser.user.id == user._id) && (
              <span>
            <a className="btn btn-danger timeline" onClick={rem}>
              Delete
            </a>
            <a className="btn btn-success timeline" onClick={modFunc}>
              Modify
            </a>

              </span>

            
        )}
          <a className = "btn btn-dark" onClick = {()=>addLike(message_id,"Message")} >{didILikeIt() ? "Liked" : "Like please"}</a>
          <a className="btn btn-primary timeline" onClick={toggleComments}>
              Comments
            </a>
          </span> 
          <span>
          {stateOfToggleComments && Comments.map(el=>{
           return <CommentsItem 
              message_id = {message_id} 
              key = {el._id}
              currentUser = {currentUser}
              comment = {el} 
              stateOfModifyComment = {el.showCommentForm}
              showCommentFormHandler = {()=>showCommentFormHandler(el._id)}
              CommentForm = {<CommentForm Modify btnText = {"Modify"} message_id = {message_id} comment_id = {el._id} showCommentFormHandler = {()=>showCommentFormHandler(el._id)} />}
              DeleteComment = {()=>DeleteComment(el._id)}
              addLike = {()=>addLike(el._id,"Comment")}
              />
          })}
          </span>
          {stateOfToggleComments && <CommentForm message_id = {message_id}/>}
        </div>
        
      </li>
    </div>
    )
  }
}

export default MessageItem

/*
*/
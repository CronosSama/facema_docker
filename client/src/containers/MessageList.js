import React,{Component} from "react"
import {connect} from "react-redux"
import {fetchMessages,deleteMessageAPI} from "../store/actions/messages"
import {DeleteCommentAPI} from "../store/actions/Comments"
import {addLikeAPI} from "../store/actions/like"
import MessageItem from "../component/MessageItem"
import MessageForm from "./MessageForm"
class MessageList extends Component {

  state = {
    messagesReact : [],
    stateOfToggleComments : false,
  }

  componentDidMount =async()=>{
    await this.props.fetchMessages()
    const messagesReact = [...this.props.messages]
    
    messagesReact.map(el=>{
      el["show"] = false
      el["showComments"] = false
      el.Comments.map(com=>{
        com["showCommentForm"] = false
        return com
      })
      return el
    })
    this.setState({messagesReact})

  }
  componentDidUpdate= async (oldProps)=>{
    console.log("UPDATED ")
    
    if(this.props.messages != oldProps.messages){
      const messagesReact = [...this.props.messages]
      messagesReact.map(el=>{
        el["show"] = false
        el.Comments.map(com=>{
          com["showCommentForm"] = false
          return com
        })
        return el
      })
      this.setState({messagesReact})
    }
  }


  modState = (id,submit) => {
    const messagesReact = this.state.messagesReact.map(el=>{
      if(el._id === id){
        let show = submit ? false : !el.show 
        el.show = show
      }

      return el
    })
    this.setState({messagesReact})

  
  }

  toggleComments = (id) => {
    const messagesReact = this.state.messagesReact.map(el=>{
      if(el._id === id){
        let showComments = !el.showComments
        el.showComments = showComments
      }

      return el
    })
    this.setState({messagesReact})

  }
  
  showCommentFormHandler = (message_id,comment_id,submit) => {
    
    const messagesReact = this.state.messagesReact.map(el=>{

      if(el._id === message_id){
        el.Comments.map(com=> {
          if(com._id === comment_id){
            let show = submit ? false : !com.showCommentForm
            com.showCommentForm = show
          }
          return com
        })
        
      }

      return el
    })
    this.setState({messagesReact})

  
  }
  

  render(){
    const messageList = this.state.messagesReact.map(el => {

      return <MessageItem 
              currentUser = {this.props.currentUser}
              key = {el._id}
              date = {el.createdAt}
              text = {el.text}
              rem = {()=>this.props.deleteMessageAPI(el._id,this.props.currentUser.user.id)}
              modify = {el.show} 
              forme = {<MessageForm id={el._id} firstValue = {el.text} buttonText = {"Modify"} Modify modFunc= {(submit)=>this.modState(el._id,submit)} />}  
              modFunc = {()=>this.modState(el._id)}
              user = {el.user}
              profileImg = {el.user.profileImg}
              message_id = {el._id}
              Comments = {el.Comments}
              Likes = {el.Likes}
              toggleComments = {()=>this.toggleComments(el._id)}
              stateOfToggleComments = {el.showComments}
              showCommentFormHandler = {(comment_id,submit)=>this.showCommentFormHandler(el._id,comment_id,submit)}
              DeleteComment = {(comment_id)=>this.props.DeleteCommentAPI(this.props.currentUser.user.id,el._id,comment_id)}
              addLike = {(content_id,cType)=>this.props.addLikeAPI(this.props.currentUser.user.id,content_id,cType)}
            
              didILikeIt = {()=>el.Likes.includes(this.props.currentUser.user.id)}
              //user_id,message_id,comment_id
    />
    }
    )

    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="messages">
            {messageList}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messages : state.Message,
    currentUser : state.currentUser
  }
}

export default connect(mapStateToProps,{fetchMessages,deleteMessageAPI,DeleteCommentAPI,addLikeAPI})(MessageList)
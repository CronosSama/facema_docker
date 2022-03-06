import React,{Component} from "react"
import {connect} from "react-redux"
import {addError,removeError} from "../store/actions/errors"
import {addCommentAPI,ModfiyCommentAPI} from "../store/actions/Comments"

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    
    if(this.props.Modify){
      if (this.input.current.value.length > 0){
        await this.props.ModfiyCommentAPI(this.props.currentUser.user.id,this.props.message_id,this.props.comment_id ,{text:this.input.current.value})
        const hoho = (submit=true) => this.props.showCommentFormHandler(submit)
      }
      else{
        this.props.showCommentFormHandler()

      }
      
    }
    else {
      await this.props.addCommentAPI(this.props.currentUser.user.id,this.props.message_id,{text :this.input.current.value})
      this.input.current.value = ""

    }
    
    
  }

  render(){
    return(
      <div>
        <form onSubmit = {this.handleSubmit} >
          <input type="text" name = "text" ref={this.input} />
          <button type="submit" className="btn btn-primary" > { this.props.btnText || "Add"} </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser : state.currentUser
  }
}

export default connect(mapStateToProps,{addCommentAPI,ModfiyCommentAPI})(CommentForm)


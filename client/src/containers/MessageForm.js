import React,{Component} from "react"
import {connect} from "react-redux"
import { removeError,addError } from "../store/actions/errors"
import { createMessage,ModifyAPI } from "../store/actions/messages"
class MessageForm extends Component {
  
  state = {
    text : "",
    counter : 0

  }

  submitHandler = async(e) => {
    e.preventDefault();
    if(this.props.Modify){
      if (this.state.text.length > 0){
        await this.props.ModifyAPI(this.state,this.props.id,this.props.currentUser.user.id)
      this.props.modFunc(true)
      }
      else{
        this.props.modFunc()

      }
      
    }
    else {
      await this.props.createMessage(this.state,this.props.currentUser.user.id)
      this.props.history.push("/")

    }
  }

  changeHandler = e => {
    this.setState((prevState)=>({
        [e.target.name] : e.target.value,
        counter : prevState.counter + 1
    }))
  }

  render(){
    const {text,counter} = this.state
    return(
      <div>
        {this.props.error.message && <div className="alert alert-danger">{this.props.error.message}</div> }
        <form onSubmit = {this.submitHandler} >
          
          <label htmlFor="text">Text</label>
          <input
          type="text"
          className="form-control"
          value={text != "" || counter>0 ? text : this.props.firstValue}
          name="text" id="text"
          onChange={this.changeHandler}
        />
          <button type="submit" className="btn btn-success">
          {this.props.buttonText || "Add Message"}
        </button>

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser : state.currentUser,
    error : state.error
  }
}


export default  connect(mapStateToProps,{createMessage,addError,removeError,ModifyAPI})(MessageForm)
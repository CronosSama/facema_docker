//the Main Component , will have all Routes here and messages everything 
import React,{Component} from "react"
import {Switch,Route,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import Homepage from "../component/HomePage"
import AuthForm from "../component/AuthForm"
import {authUser} from "../store/actions/Auth"
import { removeError,addError } from "../store/actions/errors"
import withAuth from "../hocs/withAuth"
import MessageForm from "./MessageForm"
class Main extends Component{
  state = {
    messages : []
  }
  render(){
    const { currentUser,authUser,error,removeError} = this.props;
    console.log(currentUser.isAuthenticated)
    return (
      <div className="container">
        <Switch>
            <Route exact path ="/" render = {props=><Homepage currentUser = {currentUser} {...props}/>} />
            <Route exact path = "/signin" render = {
              props => {
                return <AuthForm error = {error} removeError = {removeError} onAuth = {authUser} buttonText = "Log in" heading = "Welcome Back" {...props} />
              }
            } />
            <Route exact path = "/signup" render = { 
              props => {
                return <AuthForm error = {error} removeError = {removeError} onAuth = {authUser} signUp buttonText = "sign up" heading = "Join us !!" {...props} />
              }
            } />
            <Route exact path ="/user/:id/messages/new" component={withAuth(MessageForm)} />
        </Switch>
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
export default withRouter(connect(mapStateToProps,{authUser,removeError})(Main))
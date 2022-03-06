import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../images/warbler-logo.png";
import {LogOut} from "../store/actions/Auth"
///api/user/${user_id}/messages

//currentUser.user.id // currentUser.isAuthenticated
class Navbar extends Component {



  logOutHandler = e =>{
    e.preventDefault()
    this.props.LogOut()
  }


  render() {
    const {currentUser} = this.props
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
            </Link>
          </div>
          {!currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
            <li>
              <Link to="/signin">Log in</Link>
            </li>
          </ul>
          ): <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to={`/user/${currentUser.user.id}/messages/new`}>New Message</Link>
          </li>
          <li>
            <a onClick={this.logOutHandler}>log out</a>
          </li>
        </ul>}
          
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps,{LogOut})(Navbar);

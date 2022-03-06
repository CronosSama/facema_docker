import React from "react"
import {Link} from "react-router-dom"
import MessageTimeLine from "./MessageTimeLine"
const HomePage = ({ currentUser }) => {
  if(currentUser.isAuthenticated){
    return (
      <div>
        <MessageTimeLine
          profileImageUrl={currentUser.user.profileImg}
          username={currentUser.user.username}
        />
      </div>
    );
  }
  else {
    return (
      <div className="home-hero">
      <h1>Whats happening From Docker-Composer?</h1>
      <h4>New to Warbler </h4>
      <Link to="/signup" className = "btn btn-primary" >
          Sign up Now ! 
      </Link>
  </div>
    )
  }
} 

  



export default HomePage
import React from "react"
import {Provider} from "react-redux"
import {BrowserRouter} from "react-router-dom"
import  {configureStore} from "../store/index"
import Navbar from "./Navbar"
import Main from "./Main"
import {setAuthorizationToken,setCurrentUser} from "../store/actions/Auth"
import jwtDecode from "jwt-decode"
const Store = configureStore()

if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken)
    try {
      Store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
      
    } catch (e) {
      Store.dispatch(setCurrentUser({}))
    }
}


const App = () => (
  <Provider store = {Store}>
  <BrowserRouter>
  <div className="onboarding">     
    <Navbar />
    <Main />


  </div>
  </BrowserRouter>
</Provider>
)


export default App;
